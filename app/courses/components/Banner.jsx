import React from 'react';
import { StarIcon, TimerIcon, User2Icon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContexts';
import Link from 'next/link';
import useCourseDetails from '@/app/api/courses/useCourseDetails.js';

export default function Banner({ courseId }) {
  const { user, isAuthenticated } = useAuth();
  const { course, courseInfo, loading, error } = useCourseDetails(courseId);

  if (loading) return (
    <div className="relative bg-gray-900 text-white py-24 overflow-hidden px-4">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="max-w-4xl space-y-6">
          <div className="h-12 bg-gray-700 rounded w-3/4 animate-pulse"></div>
          <div className="h-6 bg-gray-700 rounded w-1/2 animate-pulse"></div>
          <div className="flex flex-wrap gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-8 bg-gray-700 rounded-full w-48 animate-pulse"></div>
            ))}
          </div>
          <div className="h-12 bg-primary rounded-full w-48 mt-8 animate-pulse"></div>
        </div>
      </div>
    </div>
  );

  if (error) return (
    <div className="relative bg-gray-900 text-white py-24 overflow-hidden px-4">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-red-400">Error loading course details: {error}</div>
      </div>
    </div>
  );

  if (!course) return (
    <div className="relative bg-gray-900 text-white py-24 overflow-hidden px-4">
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div>Course not found</div>
      </div>
    </div>
  );

  return (
    <div className="relative bg-gray-900 text-white py-24 overflow-hidden px-4">
      {/* Background Image with Fade Effect */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-gray-900/40"></div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          {/* Course Title */}
          <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            {course.title}
          </h2>

          {/* Course Description */}
          <p className="text-lg text-gray-300 mb-8 max-w-2xl">
            {course.description}
          </p>

          {/* Course Info */}
          <div className="flex flex-wrap items-center gap-6">
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <img
                src="https://dreamslms-wp.dreamstechnologies.com/wp-content/themes/dreamslms/assets/images/icon-01.svg"
                alt="Lessons"
                className="w-5 h-5 mr-2"
              />
              <span>{course.modules?.length || 0} Comprehensive Lessons</span>
            </div>

            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <TimerIcon className="w-5 h-5 mr-2" />
              <span>Self-paced Learning</span>
            </div>

            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <User2Icon className="w-5 h-5 mr-2" />
              <span className="mr-4">{course.enrollmentCount || 0} Enrolled</span>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className="w-4 h-4 text-yellow-400 fill-yellow-400"
                  />
                ))}
                <span className="ml-2">5/5</span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          {isAuthenticated ? (
            <button
              className="mt-8 border hover:bg-primary-dark text-white px-8 py-3 rounded-full font-medium  text-sm"
            >
              Enroll Now
            </button>
          ) : (
            <Link
              href={'/auth/login'}
              className=" mt-8 block w-fit border  text-white px-8 py-3 rounded-full font-medium text-sm"
            >
              Login to Enroll
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}