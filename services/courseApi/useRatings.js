import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { baseURL } from '../baseUrl.jsx';

// Submit course rating
export const useSubmitCourseRating = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ courseId, ratingData, token }) => {
      const response = await axios.post(
        `${baseURL}/ratings/course/${courseId}`,
        ratingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );
      return response.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['course-ratings', variables.courseId] });
      queryClient.invalidateQueries({ queryKey: ['course', variables.courseId] });
    },
  });
};

// Get course ratings
export const useCourseRatings = (courseId, options = {}) => {
  const { page = 1, limit = 10 } = options;
  
  return useQuery({
    queryKey: ['course-ratings', courseId, page, limit],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
      });
      
      const response = await axios.get(`${baseURL}/ratings/course/${courseId}?${params}`);
      return response.data;
    },
    enabled: !!courseId,
  });
};

// Get user's course rating
export const useUserCourseRating = (courseId, userId) => {
  return useQuery({
    queryKey: ['user-course-rating', courseId, userId],
    queryFn: async () => {
      const response = await axios.get(`${baseURL}/ratings/course/${courseId}/user/${userId}`);
      return response.data;
    },
    enabled: !!(courseId && userId),
  });
};

// Update course rating
export const useUpdateCourseRating = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ ratingId, ratingData, token }) => {
      const response = await axios.put(
        `${baseURL}/ratings/${ratingId}`,
        ratingData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );
      return response.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['course-ratings'] });
      queryClient.invalidateQueries({ queryKey: ['user-course-rating'] });
    },
  });
};

// Delete course rating
export const useDeleteCourseRating = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ ratingId, token }) => {
      const response = await axios.delete(
        `${baseURL}/ratings/${ratingId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['course-ratings'] });
      queryClient.invalidateQueries({ queryKey: ['user-course-rating'] });
    },
  });
};

// Get course rating statistics
export const useCourseRatingStats = (courseId) => {
  return useQuery({
    queryKey: ['course-rating-stats', courseId],
    queryFn: async () => {
      const response = await axios.get(`${baseURL}/ratings/course/${courseId}/stats`);
      return response.data;
    },
    enabled: !!courseId,
  });
};
