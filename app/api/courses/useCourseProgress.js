import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import api from '@/services/api';
import { toast } from 'sonner';

const updateProgress = async ({ courseId, moduleId, topicId }) => {
  try {
    // Since there's no specific progress endpoint, we'll store progress in localStorage for now
    // In a real implementation, this would call the backend API
    const progressKey = `course_progress_${courseId}`;
    const existingProgress = JSON.parse(localStorage.getItem(progressKey) || '{}');
    
    const updatedProgress = {
      ...existingProgress,
      completedTopics: [...(existingProgress.completedTopics || []), topicId].filter((v, i, a) => a.indexOf(v) === i),
      moduleProgress: {
        ...existingProgress.moduleProgress,
        [moduleId]: {
          ...existingProgress.moduleProgress?.[moduleId],
          completedTopics: [...(existingProgress.moduleProgress?.[moduleId]?.completedTopics || []), topicId].filter((v, i, a) => a.indexOf(v) === i)
        }
      },
      lastUpdated: new Date().toISOString()
    };
    
    localStorage.setItem(progressKey, JSON.stringify(updatedProgress));
    
    console.log('Progress updated:', updatedProgress);
    return { success: true, progress: updatedProgress };
  } catch (error) {
    console.error('Failed to update progress:', error);
    return { success: false, error: error.message };
  }
};

const getCourseProgress = async (courseId) => {
  try {
    // Get progress from localStorage for now
    const progressKey = `course_progress_${courseId}`;
    const progress = JSON.parse(localStorage.getItem(progressKey) || '{}');
    
    // Calculate percentage based on completed topics
    const totalTopics = 10; // This should come from the course data
    const completedTopics = progress.completedTopics?.length || 0;
    const percentage = totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0;
    
    return {
      progress: {
        ...progress,
        percentage,
        completedTopics: progress.completedTopics || [],
        moduleProgress: progress.moduleProgress || {}
      }
    };
  } catch (error) {
    console.error('Failed to get progress:', error);
    return { 
      progress: { 
        percentage: 0, 
        completedTopics: [], 
        moduleProgress: {} 
      } 
    };
  }
};

export const useUpdateProgress = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateProgress,
    onSuccess: (data, variables) => {
      // Invalidate progress queries for the specific course
      queryClient.invalidateQueries(['courseProgress', variables.courseId]);
      queryClient.invalidateQueries(['enrollmentStatus', variables.courseId]);
    },
    onError: (error) => {
      console.error('Progress update failed:', error);
      // Don't show toast for progress updates to avoid spam
    },
  });
};

export const useCourseProgress = (courseId) => {
  return useQuery({
    queryKey: ['courseProgress', courseId],
    queryFn: () => getCourseProgress(courseId),
    enabled: !!courseId,
    staleTime: 30 * 1000, // 30 seconds
    retry: 1,
  });
};
