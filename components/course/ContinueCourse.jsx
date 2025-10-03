"use client";
import React from 'react';
import { 
  PlayCircle, 
  Clock, 
  BookOpen, 
  CheckCircle,
  ArrowRight,
  Calendar,
  Target
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { useContinueCourseUrl, useCourseProgress } from '@/app/api/courses/useCourseProgressTracking';
import useCourseDetails from '@/app/api/courses/useCourseDetails.js';

export default function ContinueCourse({ course, className = "" }) {
  const continueUrl = useContinueCourseUrl(course._id);
  const { data: progress } = useCourseProgress(course._id);
  const { curriculum } = useCourseDetails(course._id);
  
  const formatDate = (dateString) => {
    if (!dateString) return 'Never';
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now - date) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d ago`;
    return date.toLocaleDateString();
  };

  const getProgressStatus = () => {
    if (!progress) return { text: 'Start Course', color: 'bg-blue-100 text-blue-800' };
    
    if (progress.progressPercentage === 100) {
      return { text: 'Course Complete', color: 'bg-green-100 text-green-800' };
    }
    
    if (progress.progressPercentage > 0) {
      return { text: 'Continue Course', color: 'bg-orange-100 text-orange-800' };
    }
    
    return { text: 'Start Course', color: 'bg-blue-100 text-blue-800' };
  };

  const status = getProgressStatus();

  // Determine the correct URL for continue/start course
  const getCourseUrl = () => {
    if (continueUrl) {
      return continueUrl;
    }
    
    // If no continue URL, navigate to first module
    if (curriculum && curriculum.length > 0) {
      return `/courses/${course._id}/${curriculum[0]._id}`;
    }
    
    // Fallback to course details page
    return `/courses/${course._id}`;
  };

  const courseUrl = getCourseUrl();

  return (
    <div className={`bg-white rounded-lg border border-gray-200 p-6 ${className}`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {course.title}
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            {course.description || 'Continue your learning journey'}
          </p>
          
          {/* Progress Info */}
          {progress && (
            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Progress</span>
                <span className="font-medium text-gray-900">
                  {progress.completedTopics?.length || 0} of {progress.totalTopics || 0} topics
                </span>
              </div>
              
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-brand h-2 rounded-full transition-all duration-300" 
                  style={{ width: `${progress.progressPercentage || 0}%` }}
                ></div>
              </div>
              
              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>{Math.round(progress.progressPercentage || 0)}% complete</span>
                <span>Last accessed: {formatDate(progress.lastAccessedAt)}</span>
              </div>
            </div>
          )}
        </div>
        
        <div className={`px-3 py-1 rounded-full text-xs font-medium ${status.color}`}>
          {status.text}
        </div>
      </div>

      {/* Course Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <BookOpen className="w-4 h-4 mr-2" />
          <span>{course.category || 'General'}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="w-4 h-4 mr-2" />
          <span>{course.duration || 'Self-paced'}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Link 
          href={courseUrl}
          className="flex-1 bg-brand hover:bg-brand-dark text-white px-4 py-2 rounded-md font-medium transition-colors flex items-center justify-center"
        >
          <PlayCircle className="w-4 h-4 mr-2" />
          {progress?.progressPercentage > 0 ? 'Continue Learning' : 'Start Course'}
          <ArrowRight className="w-4 h-4 ml-2" />
        </Link>
        
        <Link 
          href={`/courses/${course._id}`}
          className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
        >
          View Course
        </Link>
      </div>

      {/* Last Accessed Info */}
      {progress?.lastAccessedTopic && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-center text-sm text-blue-800">
            <Target className="w-4 h-4 mr-2" />
            <span>
              Last accessed: {progress.lastAccessedModule} - {progress.lastAccessedTopic}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
