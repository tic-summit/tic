"use client"
import { useMutation, useQuery } from '@tanstack/react-query';
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
  price: course?.price ?? "Free",
  originalPrice: (course.price === 'Free' ||  course.price === '$NaN')? null : course.price,
  image: course.thumbnail || COURSE_CONFIG.DEFAULT_IMAGES[course.category?.toLowerCase()] || COURSE_CONFIG.DEFAULT_IMAGES.default,
  instructorImage: course.instructor?.avatar || 'https://dreamslms.dreamstechnologies.com/wp-content/uploads/2023/02/profile5.jpg',
  lessons: course.features?.length || 10,
  duration: course.duration || "Unknown duration",
  rating: course.rating || 0,
  reviews: course.studentsEnrolled || 0,
  isNew: new Date(course.createdAt) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
});

const fetchCourses = async () => {
      const response = await apiClient.get(`/courses`, {
      });
      console.log(response);
      return response.data.map(transformCourseData);}

// Main data fetching function
export const useCourses =  (page) => {
  return useQuery({
    queryKey: ['courses', page],
    queryFn: fetchCourses,
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    retry: 1,
  })

};



// React Hook implementation

