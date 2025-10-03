"use client";
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContexts';
import { useEnrollCourse, useEnrollmentStatus } from '@/app/api/courses/useCourseEnroll';
import { Loader2, CheckCircle, PlayCircle, Lock } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

export default function EnrollmentButton({ courseId, courseTitle, className = "" }) {
  const { user, isAuthenticated } = useAuth();
  const { data: enrollmentStatus, isLoading: statusLoading } = useEnrollmentStatus(courseId);
  const enrollMutation = useEnrollCourse();

  // Debug logging
  console.log('EnrollmentButton Debug:', {
    courseId,
    isAuthenticated,
    userType: user?.userType,
    enrollmentStatus,
    statusLoading
  });

  const handleEnroll = async () => {
    if (!isAuthenticated) {
      toast.error('Please login to enroll in this course');
      return;
    }

    if (user?.userType === 'instructor') {
      toast.error('Instructors cannot enroll in courses');
      return;
    }

    try {
      await enrollMutation.mutateAsync({ courseId });
    } catch (error) {
      // Error is handled by the mutation's onError
    }
  };

  const handleStartCourse = () => {
    // Navigate to the first module/topic of the course
    // This will be implemented based on your course structure
    window.location.href = `/courses/${courseId}/${courseId}`;
  };

  if (statusLoading) {
    return (
      <Button disabled className={`${className} bg-gray-400`}>
        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
        Checking...
      </Button>
    );
  }

  // Debug: Show enrollment status in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Enrollment Status Debug:', {
      courseId,
      enrollmentStatus,
      isEnrolled: enrollmentStatus?.isEnrolled,
      rawData: enrollmentStatus
    });
  }

  if (!isAuthenticated) {
    return (
      <Link
        href="/auth/login"
        className={`${className} bg-brand hover:bg-brand-dark text-white px-8 py-3 rounded-full font-medium text-sm transition-colors inline-flex items-center justify-center`}
      >
        <Lock className="w-4 h-4 mr-2" />
        Login to Enroll
      </Link>
    );
  }

  if (user?.userType === 'instructor') {
    return (
      <Button disabled className={`${className} bg-gray-400`}>
        <Lock className="w-4 h-4 mr-2" />
        Instructor Account
      </Button>
    );
  }

  if (enrollmentStatus?.isEnrolled) {
    return (
      <Button
        onClick={handleStartCourse}
        className={`${className} bg-green-600 hover:bg-green-700 text-white`}
      >
        <PlayCircle className="w-4 h-4 mr-2" />
        Go to Course
      </Button>
    );
  }

  return (
    <Button
      onClick={handleEnroll}
      disabled={enrollMutation.isPending}
      className={`${className} bg-brand hover:bg-brand-dark text-white`}
    >
      {enrollMutation.isPending ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          Enrolling...
        </>
      ) : (
        <>
          <PlayCircle className="w-4 h-4 mr-2" />
          Enroll Now
        </>
      )}
    </Button>
  );
}
