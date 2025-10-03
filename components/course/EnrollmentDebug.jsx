"use client";
import React from 'react';
import { useEnrollmentStatus, useStudentEnrollments } from '@/app/api/courses/useCourseEnroll';
import { useAuth } from '@/contexts/AuthContexts';
import { Button } from '@/components/ui/button';
import { RefreshCw } from 'lucide-react';

export default function EnrollmentDebug({ courseId }) {
  const { user, isAuthenticated } = useAuth();
  const { data: enrollmentStatus, isLoading: statusLoading, refetch: refetchStatus } = useEnrollmentStatus(courseId);
  const { data: enrollments, refetch: refetchEnrollments } = useStudentEnrollments();

  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  const handleRefresh = () => {
    refetchStatus();
    refetchEnrollments();
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white border rounded-lg shadow-lg p-4 max-w-md z-50">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-semibold text-sm">Enrollment Debug</h3>
        <Button size="sm" onClick={handleRefresh}>
          <RefreshCw className="w-4 h-4" />
        </Button>
      </div>
      
      <div className="text-xs space-y-1">
        <div><strong>Course ID:</strong> {courseId}</div>
        <div><strong>Authenticated:</strong> {isAuthenticated ? 'Yes' : 'No'}</div>
        <div><strong>User Type:</strong> {user?.userType || 'N/A'}</div>
        <div><strong>Status Loading:</strong> {statusLoading ? 'Yes' : 'No'}</div>
        <div><strong>Enrollment Status:</strong> {JSON.stringify(enrollmentStatus)}</div>
        <div><strong>Is Enrolled:</strong> {enrollmentStatus?.isEnrolled ? 'Yes' : 'No'}</div>
        <div><strong>Total Enrollments:</strong> {enrollments?.enrollments?.length || 0}</div>
        <div><strong>Enrolled Courses:</strong> {enrollments?.enrollments?.map(e => e.course?._id).join(', ') || 'None'}</div>
      </div>
    </div>
  );
}
