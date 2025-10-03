"use client";
import React from 'react';
import { useParams } from 'next/navigation';
import CourseForum from '@/components/forum/CourseForum';
import ProtectedRoute from '@/components/ProtectedRoute';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CourseForumPage() {
  const params = useParams();
  const courseId = params?.id;

  if (!courseId) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Course not found</h1>
            <Link href="/courses">
              <Button>Back to Courses</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="mb-6">
            <Link href={`/courses/${courseId}`}>
              <Button variant="outline" className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Course
              </Button>
            </Link>
          </div>

          {/* Forum Content */}
          <CourseForum courseId={courseId} />
        </div>
      </div>
    </ProtectedRoute>
  );
}
