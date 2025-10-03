import { useAuth } from "@/contexts/AuthContexts";
import { useEnrolledCourses } from "@/app/api/student/useStudentCourses";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Star, PlayCircle, Award, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export const StudentCoursesContent = () => {
  const { user } = useAuth();
  const { data: enrolledData, isLoading, error } = useEnrolledCourses(user?.id, user?.token);
  const courses = enrolledData?.courses || [];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-lg shadow border border-gray-300 p-6">
        <div className="text-center">
          <div className="text-red-500 text-6xl mb-4">⚠️</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Courses</h3>
          <p className="text-gray-600">There was a problem loading your courses. Please try again later.</p>
        </div>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow border border-gray-300 p-6">
        <div className="text-center">
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No Courses Enrolled</h3>
          <p className="text-gray-600 mb-6">You haven't enrolled in any courses yet. Start your learning journey!</p>
          <Link 
            href="/courses"
            className="inline-flex items-center px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors"
          >
            <BookOpen className="h-4 w-4 mr-2" />
            Browse Courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">My Courses</h2>
        <Link 
          href="/courses"
          className="text-brand hover:text-brand-dark font-medium"
        >
          Browse More Courses
        </Link>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <div key={course._id} className="bg-white rounded-lg shadow border border-gray-300 overflow-hidden hover:shadow-lg transition-shadow">
            {/* Course Image */}
            <div className="relative h-48 bg-gradient-to-br from-brand to-blue-600">
              {course.image ? (
                <Image
                  src={course.image}
                  alt={course.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full">
                  <BookOpen className="h-16 w-16 text-white opacity-50" />
                </div>
              )}
              <div className="absolute top-4 right-4">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  course.progress === 100 
                    ? 'bg-green-100 text-green-800' 
                    : course.progress > 0 
                    ? 'bg-yellow-100 text-yellow-800'
                    : 'bg-gray-100 text-gray-800'
                }`}>
                  {course.progress === 100 ? 'Completed' : course.progress > 0 ? 'In Progress' : 'Not Started'}
                </span>
              </div>
            </div>

            {/* Course Content */}
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                {course.title}
              </h3>
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {course.description || 'No description available'}
              </p>

              {/* Progress Section */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-700">Progress</span>
                  <span className="text-sm text-gray-500">{course.progress || 0}%</span>
                </div>
                <Progress value={course.progress || 0} className="h-2" />
              </div>

              {/* Course Stats */}
              <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>{course.duration || 'N/A'}</span>
                </div>
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-1" />
                  <span>{course.rating || 'N/A'}</span>
                </div>
              </div>

              {/* Action Button */}
              <Link
                href={`/courses/${course._id}`}
                className="w-full inline-flex items-center justify-center px-4 py-2 bg-brand text-white rounded-lg hover:bg-brand-dark transition-colors"
              >
                <PlayCircle className="h-4 w-4 mr-2" />
                {course.progress === 100 ? 'Review Course' : course.progress > 0 ? 'Continue Learning' : 'Start Course'}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Stats */}
      <div className="bg-white rounded-lg shadow border border-gray-300 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-brand">{courses.length}</div>
            <div className="text-sm text-gray-600">Total Courses</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {courses.filter(course => course.progress === 100).length}
            </div>
            <div className="text-sm text-gray-600">Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {Math.round(courses.reduce((sum, course) => sum + (course.progress || 0), 0) / courses.length) || 0}%
            </div>
            <div className="text-sm text-gray-600">Average Progress</div>
          </div>
        </div>
      </div>
    </div>
  );
};
