import CourseCard from '@/components/course/CourseCard';
import { BookOpen, Heart, Star } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const HomeCourses = () => {
    const courses = [
        {
          id: 1,
          title: "Introduction to Web Development",
          instructor: "David Powell",
          price: "Free",
          originalPrice: null,
          image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400&h=300&fit=crop",
          lessons: 12,
          duration: "8 hrs",
          rating: 4,
          reviews: 23,
        },
        {
          id: 2,
          title: "Complete HTML, CSS and JavaScript Course",
          instructor: "David Powell",
          price: "Free",
          originalPrice: null,
          image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=400&h=300&fit=crop",
          instructorImage: "https://dreamslms-wp.dreamstechnologies.com/wp-content/uploads/2023/02/profile5.jpg",
          lessons: 18,
          duration: "30 hrs",
          rating: 5,
          reviews: 45,
        },
        {
          id: 3,
          title: "Fullstack WordPress Developer Course",
          instructor: "David Powell",
          price: "$260",
          originalPrice: "$300",
          image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=300&fit=crop",
          instructorImage: "https://dreamslms-wp.dreamstechnologies.com/wp-content/uploads/2023/02/profile5.jpg",
          lessons: 25,
          duration: "78 hrs 30 mins",
          rating: 4,
          reviews: 12,
        },
        {
          id: 4,
          title: "Advanced Android & Kotlin Development Course",
          instructor: "Michael Morgan",
          price: "$15",
          originalPrice: "$18",
          image: "https://images.unsplash.com/photo-1607252650355-f7fd0460ccdb?w=400&h=300&fit=crop",
          instructorImage: "https://dreamslms-wp.dreamstechnologies.com/wp-content/uploads/2023/02/profile5.jpg",
          lessons: 9,
          duration: "78 hrs 30 mins",
          rating: 5,
          reviews: 8,
        },
        {
          id: 5,
          title: "iOS & Swift Complete Application Development",
          instructor: "Michael Morgan",
          price: "Free",
          originalPrice: null,
          image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=400&h=300&fit=crop",
          lessons: 4,
          duration: "60 hrs 30 mins",
          rating: 4,
          reviews: 15,
        },
        {
          id: 6,
          title: "REST APIs with Flask and Python",
          instructor: "Michael Morgan",
          price: "$12",
          originalPrice: "$14",
          image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?w=400&h=300&fit=crop",
          instructorImage: "https://dreamslms-wp.dreamstechnologies.com/wp-content/uploads/2023/02/profile5.jpg",
          lessons: 4,
          duration: "50 hrs 30 mins",
          rating: 4,
          reviews: 7,
        }
      ];


  return (
    <div className='bg-gradient-to-b'>
         <div className="max-w-7xl mx-auto px-4 py-8 ">
         <div className="container mx-auto px-4 py-8">
      <div 
        className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6"
      >
        <div className="section-sub-head mb-4 md:mb-0">
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-left">
            Featured Courses
          </h2>
        </div>
        
        <div className="all-btn all-category">
          <Link
            href="/courses" 
            className="bg-primary hover:bg-primary-dark border rounded-full border-brand px-6 py-3  font-medium transition-colors duration-300 inline-block"
          >
            All Courses
          </Link>
        </div>
      </div>

      <div 
        className="section-text max-w-2xl mb-8"
        data-aos="fade-up"
      >
        <p className="text-gray-600">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget aenean accumsan bibendum gravida maecenas augue elementum et neque. Suspendisse imperdiet.
        </p>
      </div>
    </div>
      <div className="course-feature">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course, index) => (
        <CourseCard 
        key={course.id} 
        course={course} 
        index={index} 
      />
          ))}
        </div>
      </div>
    </div>
    </div>
   
  );
};

export default HomeCourses;