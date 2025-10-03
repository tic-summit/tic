"use client";
import { Button } from '@/components/ui/button';
import { ArrowLeft, PlayCircleIcon, CheckCircle, Lock } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
import React from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContexts';
import { useEnrollmentStatus } from '@/app/api/courses/useCourseEnroll';
import useCourseDetails from '@/app/api/courses/useCourseDetails.js';
import { useCourseProgress } from '@/app/api/courses/useCourseProgress';
import EnrollmentButton from '@/components/course/EnrollmentButton';

export default function EnrolledCourse() {
  const router = useRouter();
  const { id: courseId } = useParams();
  const { user, isAuthenticated } = useAuth();
  const { data: enrollmentStatus, isLoading: enrollmentLoading } = useEnrollmentStatus(courseId);
  const { course, curriculum, loading, error } = useCourseDetails(courseId);
  const { data: progressData } = useCourseProgress(courseId);

  if (loading || enrollmentLoading) return (
    <div className="flex items-center justify-center h-[calc(100vh-5rem)]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center h-[calc(100vh-5rem)]">
      <p className="text-red-500">{error.message}</p>
    </div>
  );

  if (!course) return (
    <div className="flex items-center justify-center h-[calc(100vh-5rem)]">
      <p className="text-gray-500">Course not found</p>
    </div>
  );

  const isEnrolled = enrollmentStatus?.isEnrolled || false;
  const isInstructor = user?.userType === 'instructor';
  const canAccess = isEnrolled || isInstructor;
  const modules = course?.modules || [];
  const progress = progressData?.progress || { percentage: 0, completedTopics: [] };

  return (
    <ProtectedRoute>
      <div className="flex h-[calc(100vh-5rem)] border">
        <div className="bg-gray-100 w-full flex h-[calc(100vh-5rem)] overflow-auto">
          <div className="max-w-[1500px] mx-auto w-full">
            <div className="py-4 px-4 max-w-4xl mx-auto">
              <div className="mb-10">
                <Button
                  onClick={() => router.push('/courses')}
                  variant="outline"
                  className="bg-transparent border-none cursor-pointer shadow-none text-brand text-sm flex items-center"
                >
                  <ArrowLeft className="h-6 w-6" /> Back to Courses
                </Button>
              </div>

              <div className="title">
                <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 tracking-wide">
                  {course.title}
                </h1>
                <p className="text-lg text-gray-600 text-center mt-4">
                  {canAccess 
                    ? (isEnrolled 
                        ? "Welcome! You're enrolled in this course. Start learning by exploring the content below."
                        : "Instructor view - You can access all course content.")
                    : "Explore the course curriculum below and enroll to access all learning materials."
                  }
                </p>
              </div>

              <div className="max-w-4xl mx-auto border rounded-lg bg-white mt-8">
                <div className="p-6 bg-gray-100 rounded-t-lg">
                  <div className="flex justify-between items-center">
                    <h2 className="font-bold text-gray-800">Course Content</h2>
                    {isEnrolled && (
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-green-600" />
                        <span className="text-sm text-green-600 font-medium">Enrolled</span>
                      </div>
                    )}
                  </div>
                  {isEnrolled && (
                    <div className="flex gap-6 items-center mt-3">
                      <div className="text-sm text-gray-800 font-bold">
                        {Math.round(progress.percentage || 0)}% Completed
                      </div>
                      <div className="text-sm text-gray-700">
                        {progress.completedTopics?.length || 0}/{modules.reduce((acc, m) => acc + (m.topics?.length || 0), 0)} steps
                      </div>
                    </div>
                  )}
                </div>

                {/* Show full curriculum for enrolled users, preview for non-enrolled */}
                <div className="p-5 flex flex-col gap-4">
                  {modules.map((module, index) => (
                    <div key={module._id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="font-semibold text-gray-800 text-lg">{module.title}</h3>
                        {canAccess && (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">
                              {module.topics?.length || 0} topics
                            </span>
                            <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                          </div>
                        )}
                      </div>
                      
                      {/* Module description */}
                      {module.description && (
                        <p className="text-gray-600 text-sm mb-3">{module.description}</p>
                      )}
                      
                      {module.topics && module.topics.length > 0 ? (
                        <div className="mt-3 pl-4 border-l-2 border-gray-200">
                          {module.topics.map((topic, topicIndex) => {
                            const isCompleted = canAccess && (progress.completedTopics?.includes(topic._id) || false);
                            const canAccessTopic = canAccess;
                            
                            return (
                              <div key={topic._id} className="flex items-center justify-between p-3 rounded hover:bg-gray-50 group">
                                <div className="flex items-center gap-3 flex-1">
                                  {canAccessTopic ? (
                                    isCompleted ? (
                                      <CheckCircle className="h-6 w-6 text-green-600" />
                                    ) : (
                                      <PlayCircleIcon className="h-6 w-6 text-gray-400 group-hover:text-brand" />
                                    )
                                  ) : (
                                    <Lock className="h-6 w-6 text-gray-300" />
                                  )}
                                  <div className="flex-1">
                                    <span className={`font-medium ${
                                      isCompleted 
                                        ? 'text-green-700 line-through' 
                                        : canAccessTopic 
                                          ? 'text-gray-800 group-hover:text-brand' 
                                          : 'text-gray-500'
                                    }`}>
                                      {topic.title}
                                    </span>
                                    {topic.description && (
                                      <p className="text-sm text-gray-500 mt-1">{topic.description}</p>
                                    )}
                                    {/* Show content type indicators */}
                                    {canAccessTopic && topic.content && (
                                      <div className="flex items-center gap-2 mt-2">
                                        {topic.content.videoUrl && (
                                          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                            📹 Video
                                          </span>
                                        )}
                                        {topic.content.pdfUrl && (
                                          <span className="text-xs bg-red-100 text-red-800 px-2 py-1 rounded-full">
                                            📄 PDF
                                          </span>
                                        )}
                                        {topic.content.textContent && (
                                          <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                                            📝 Text
                                          </span>
                                        )}
                                        {topic.type === 'quiz' && (
                                          <span className="text-xs bg-purple-100 text-purple-800 px-2 py-1 rounded-full">
                                            🧠 Quiz
                                          </span>
                                        )}
                                      </div>
                                    )}
                                  </div>
                                </div>
                                <div className="flex items-center gap-3">
                                  <span className="text-gray-600 text-sm">{topic.duration || 'N/A'}</span>
                                  {canAccessTopic && (
                                    <Link
                                      href={`/courses/${courseId}/${module._id}/${topic._id}`}
                                      className={`px-3 py-1 text-xs rounded-full transition-colors ${
                                        isCompleted 
                                          ? 'bg-green-100 text-green-800' 
                                          : 'bg-brand text-white hover:bg-brand-dark'
                                      }`}
                                    >
                                      {isCompleted ? 'Review' : 'Start'}
                                    </Link>
                                  )}
                                  <div className={`w-4 h-4 rounded-full border ${
                                    isCompleted 
                                      ? 'bg-green-600 border-green-600' 
                                      : canAccessTopic
                                        ? 'border-gray-300'
                                        : 'border-gray-200 bg-gray-100'
                                  }`}></div>
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      ) : (
                        <p className="text-gray-500 mt-3">No topics available</p>
                      )}
                    </div>
                  ))}
                  
                  {/* Show enrollment prompt for non-enrolled users */}
                  {!canAccess && (
                    <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                      <div className="text-center">
                        <Lock className="w-12 h-12 text-blue-500 mx-auto mb-4" />
                        <h4 className="text-lg font-semibold text-gray-900 mb-2">
                          {!isAuthenticated ? 'Login to access course content' : 'Enroll to access course content'}
                        </h4>
                        <p className="text-gray-600 mb-4">
                          {!isAuthenticated 
                            ? 'Sign in to access all course materials and start learning.'
                            : 'Enroll now to access all course materials, track your progress, and earn your certificate.'
                          }
                        </p>
                        <EnrollmentButton 
                          courseId={courseId} 
                          courseTitle={course.title}
                          className="px-6 py-3 rounded-lg font-medium"
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {canAccess && modules.length > 0 && (
                <div className="mt-10 flex justify-center max-w-4xl mx-auto">
                  <Link
                    href={`/courses/${courseId}/${modules[0]._id}`}
                    className="bg-brand hover:bg-brand-dark text-white px-8 py-3 rounded-full font-medium text-sm transition-colors"
                  >
                    {isEnrolled ? 'Start Course' : 'View Course Content'}
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}