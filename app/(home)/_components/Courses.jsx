"use client"
import { useCourses } from '@/app/courses/api/courses';
import CourseCard from '@/components/course/CourseCard';
import { BookOpen, Heart, Star } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

const HomeCourses = () => {
  const {courses} = useCourses();
    

  return (
    <div className='bg-brand/10'>
         <div className="max-w-7xl mx-auto px-4 py-8 ">
         <div className="container mx-auto px-4 py-8">
      <div 
        className="flex flex-row justify-between items-start md:items-center mb-6"
      >
        <div className="s mb-4 md:mb-0">
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-left">
            Featured Courses
          </h2>
        </div>
        
        <div className="all-btn all-category">
          <Link
            href="/courses" 
            className="bg-primary hover:bg-primary-dark border rounded-full border-secondary text-secondary font-semibold px-6 py-3  transition-colors duration-300 inline-block"
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