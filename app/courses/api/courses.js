"use client"
import axios from 'axios';
import { useCallback, useEffect, useState } from 'react';

// Configure axios instance
const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  }
});

// // Add auth token interceptor
// apiClient.interceptors.request.use(async (config) => {
//   // Only add auth header for protected routes
//   if (config.url?.startsWith('/courses') || config.url?.startsWith('/api')) {
//     try {
//       const { data: session } = await axios.get(
//         `${process.env.NEXTAUTH_URL}/api/auth/session`
//       );
//       if (session?.accessToken) {
//         config.headers.Authorization = `Bearer ${session.accessToken}`;
//       }
//     } catch (error) {
//       console.error('Error getting session:', error);
//     }
//   }
//   return config;
// });

// Default images and fallback data
const COURSE_CONFIG = {
  DEFAULT_IMAGES: {
    web: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop',
    mobile: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop',
    programming: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop',
    default: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop'
  },
  FALLBACK_COURSES: [
    {
      id: 'fallback-1',
      title: "Introduction to Web Development",
      instructor: "David Powell",
      price: "Free",
      originalPrice: null,
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop',
      lessons: 12,
      duration: "8 hrs",
      rating: 4,
      reviews: 23,
    }
  ]
};

// Transform API response to frontend format
const transformCourseData = (course) => ({
  id: course._id,
  title: course.title,
  instructor: course.instructor?.fullName || "Unknown Instructor",
  price: course.price || "Free",
  originalPrice: course.price === 'Free' ? null : `$${Math.round(parseInt(String(course.price).replace(/\D/g, '')) * 1.15)}`,
  image: course.thumbnail || COURSE_CONFIG.DEFAULT_IMAGES[course.category?.toLowerCase()] || COURSE_CONFIG.DEFAULT_IMAGES.default,
  instructorImage: course.instructor?.avatar || 'https://dreamslms.dreamstechnologies.com/wp-content/uploads/2023/02/profile5.jpg',
  lessons: course.features?.length || 10,
  duration: course.duration || "Unknown duration",
  rating: course.rating || 0,
  reviews: course.studentsEnrolled || 0,
  isNew: new Date(course.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
});

// Cache implementation
const courseCache = {
  data: null,
  lastFetch: 0,
  ttl: 5 * 60 * 1000, // 5 minutes cache
  isStale() {
    return Date.now() - this.lastFetch > this.ttl;
  }
};

// Main data fetching function
export const fetchCourses = async (forceRefresh = false) => {
  if (!forceRefresh && courseCache.data && !courseCache.isStale()) {
    return courseCache.data;
  }

  try {
    const response = await apiClient.get('/courses');
    courseCache.data = response.data.map(transformCourseData);
    courseCache.lastFetch = Date.now();
    return courseCache.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    if (courseCache.data) {
      return courseCache.data; // Return stale data if available
    }
    return COURSE_CONFIG.FALLBACK_COURSES;
  }
};

// React Hook implementation
export const useCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    try {
      setLoading(true);
      const data = await fetchCourses(true);
      setCourses(data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchCourses();
        setCourses(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { courses, loading, error, refresh };
};

// Export initialized promise
export const coursesPromise = fetchCourses();
export default coursesPromise;