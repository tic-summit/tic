import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useState, useEffect } from 'react';

// Local storage keys
const PROGRESS_KEY = 'courseProgress';
const LAST_ACCESSED_KEY = 'lastAccessedTopics';

// Get course progress from localStorage
const getCourseProgress = (courseId) => {
  try {
    const progress = JSON.parse(localStorage.getItem(`${PROGRESS_KEY}_${courseId}`) || '{}');
    return {
      courseId,
      completedTopics: progress.completedTopics || [],
      lastAccessedTopic: progress.lastAccessedTopic || null,
      lastAccessedModule: progress.lastAccessedModule || null,
      progressPercentage: progress.progressPercentage || 0,
      totalTopics: progress.totalTopics || 0
    };
  } catch (error) {
    console.error('Error getting course progress:', error);
    return {
      courseId,
      completedTopics: [],
      lastAccessedTopic: null,
      lastAccessedModule: null,
      progressPercentage: 0,
      totalTopics: 0
    };
  }
};

// Update course progress
const updateCourseProgress = ({ courseId, topicId, moduleId, isCompleted = false }) => {
  try {
    const progressKey = `${PROGRESS_KEY}_${courseId}`;
    const existingProgress = JSON.parse(localStorage.getItem(progressKey) || '{}');
    
    const updatedProgress = {
      ...existingProgress,
      lastAccessedTopic: topicId,
      lastAccessedModule: moduleId,
      lastAccessedAt: new Date().toISOString(),
      completedTopics: isCompleted 
        ? [...(existingProgress.completedTopics || []), topicId].filter((v, i, a) => a.indexOf(v) === i)
        : existingProgress.completedTopics || []
    };
    
    localStorage.setItem(progressKey, JSON.stringify(updatedProgress));
    
    // Also update the last accessed topics globally
    const lastAccessed = JSON.parse(localStorage.getItem(LAST_ACCESSED_KEY) || '{}');
    lastAccessed[courseId] = {
      topicId,
      moduleId,
      accessedAt: new Date().toISOString()
    };
    localStorage.setItem(LAST_ACCESSED_KEY, JSON.stringify(lastAccessed));
    
    return updatedProgress;
  } catch (error) {
    console.error('Error updating course progress:', error);
    return null;
  }
};

// Get last accessed topic for a course
const getLastAccessedTopic = (courseId) => {
  try {
    const lastAccessed = JSON.parse(localStorage.getItem(LAST_ACCESSED_KEY) || '{}');
    return lastAccessed[courseId] || null;
  } catch (error) {
    console.error('Error getting last accessed topic:', error);
    return null;
  }
};

// Get all course progress
const getAllCourseProgress = () => {
  try {
    const lastAccessed = JSON.parse(localStorage.getItem(LAST_ACCESSED_KEY) || '{}');
    return lastAccessed;
  } catch (error) {
    console.error('Error getting all course progress:', error);
    return {};
  }
};

export const useCourseProgress = (courseId) => {
  return useQuery({
    queryKey: ['courseProgress', courseId],
    queryFn: () => getCourseProgress(courseId),
    enabled: !!courseId,
    staleTime: 0, // Always fresh
  });
};

export const useUpdateCourseProgress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCourseProgress,
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['courseProgress', variables.courseId]);
      queryClient.invalidateQueries(['allCourseProgress']);
    },
  });
};

export const useLastAccessedTopic = (courseId) => {
  return useQuery({
    queryKey: ['lastAccessedTopic', courseId],
    queryFn: () => getLastAccessedTopic(courseId),
    enabled: !!courseId,
    staleTime: 0,
  });
};

export const useAllCourseProgress = () => {
  return useQuery({
    queryKey: ['allCourseProgress'],
    queryFn: getAllCourseProgress,
    staleTime: 0,
  });
};

// Hook to get continue course URL
export const useContinueCourseUrl = (courseId) => {
  const { data: lastAccessed } = useLastAccessedTopic(courseId);
  
  if (!lastAccessed || !lastAccessed.topicId || !lastAccessed.moduleId) {
    // For new courses, we'll need to get the first module from course details
    // This will be handled by the component that uses this hook
    return null; // Indicates we need to fetch course details first
  }
  
  // Navigate to module page to view course resources
  return `/courses/${courseId}/${lastAccessed.moduleId}`;
};
