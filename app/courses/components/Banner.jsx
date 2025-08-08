import React from 'react';
import { StarIcon, TimerIcon, User2Icon, CalendarIcon, BarChart2Icon, BookmarkIcon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContexts';
import Link from 'next/link';
import useCourseDetails from '@/app/api/courses/useCourseDetails.js';
import { useInstructorCourses } from '@/services/useUserCourses';
import { Icon } from '@iconify/react';

export default function Banner({ courseId }) {
  const { user, isAuthenticated } = useAuth();

  const { data: course, getCourseInfo: courseInfo, loading, error } = useCourseDetails(courseId);
  const { data: instructorCourses } = useInstructorCourses(user);

  if (loading) return (
    <div className="relative bg-gray-900 text-white py-24 overflow-hidden px-4">
      <div className="max-w-[1500px] mx-auto px-4 relative z-10">
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
      <div className="max-w-[1500px] mx-auto px-4 relative z-10">
        <div className="text-red-400">Error loading course details: {error}</div>
      </div>
    </div>
  );

  if (!course) return (
    <div className="relative bg-gray-900 text-white py-24 overflow-hidden px-4">
      <div className="max-w-[1500px] mx-auto px-4 relative z-10">
        <div><Icon icon="svg-spinners:bars-scale" width="24" height="24" /> </div>
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
      <div className="max-w-[1500px] mx-auto px-4 relative z-10">
        <div className="max-w-4xl">
          {/* Course Categories */}
          <div className="flex flex-wrap gap-2 mb-4">
            {course.categories?.map((category, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-brand/20 text-brand rounded-full text-xs font-medium"
              >
                {category}
              </span>
            ))}
          </div>

          {/* Course Title */}
          <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            {course.title}
          </h2>

          {/* Course Description */}
          <p className="text-lg text-gray-300 mb-6 max-w-2xl">
            {course.description}
          </p>

          {/* Course Meta Information */}
          <div className="flex flex-wrap items-center gap-4 mb-8 text-sm text-gray-300">
            {course.instructor && (
              <div className="flex items-center">
                <span>Created by </span>
                <span className="font-medium ml-1 text-white">{course.instructor.name}</span>
              </div>
            )}

            <div className="flex items-center">
              <CalendarIcon className="w-4 h-4 mr-1" />
              <span>Last updated {course.lastUpdated || 'May 2023'}</span>
            </div>

            <div className="flex items-center">
              <BarChart2Icon className="w-4 h-4 mr-1" />
              <span>{course.level || 'All Levels'}</span>
            </div>
          </div>

          {/* Course Info */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <BookmarkIcon className="w-4 h-4 mr-2" />
              <span>{course.modules?.length || 0} Lessons</span>
            </div>

            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <TimerIcon className="w-4 h-4 mr-2" />
              <span>{course.duration || 'Self-paced'}</span>
            </div>

            <div className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
              <User2Icon className="w-4 h-4 mr-2" />
              <span className="mr-3">{course.enrollmentCount?.toLocaleString() || '0'} students</span>
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <StarIcon
                    key={i}
                    className="w-3 h-3 text-yellow-400 fill-yellow-400"
                  />
                ))}
                <span className="ml-1 text-xs">5.0</span>
              </div>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex gap-4">
            {isAuthenticated ? (
              <>
                <>
                  {!user.userType === 'instructor' && (
                    <button className="bg-brand hover:bg-brand-dark text-white px-8 py-3 rounded-full font-medium text-sm transition-colors">
                      Enroll Now
                    </button>
                  )}
                </>
                <>
                  {instructorCourses?.courses.map(instructorCourse => instructorCourse?.title).includes(course.title) && (
                    <Link href={`/instructor/courses/${course._id}/edit`} className="bg-brand hover:bg-brand-dark text-white px-8 py-3 rounded-full font-medium text-sm transition-colors">
                      Edit Now
                    </Link>
                  )}
                </></>
            ) : (
              <Link
                href={'/auth/login'}
                className="bg-brand hover:bg-brand-dark text-white px-8 py-3 rounded-full font-medium text-sm transition-colors"
              >
                Login to Enroll
              </Link>
            )}
            <button className="border border-white/30 hover:bg-white/10 text-white px-6 py-3 rounded-full font-medium text-sm transition-colors">
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}