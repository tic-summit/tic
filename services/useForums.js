import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { baseURL } from './baseUrl.jsx';

// Get all forum posts for a course
export const useForumPosts = (courseId, options = {}) => {
  const { page = 1, limit = 10 } = options;
  
  return useQuery({
    queryKey: ['forum-posts', courseId, page, limit],
    queryFn: async () => {
      const params = new URLSearchParams({
        courseId,
        page: page.toString(),
        limit: limit.toString(),
      });
      
      const response = await axios.get(`${baseURL}/forums?${params}`);
      return response.data;
    },
    enabled: !!courseId,
  });
};

// Create a new forum post
export const useCreateForumPost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ postData, token }) => {
      const response = await axios.post(
        `${baseURL}/forums`,
        postData,
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
      queryClient.invalidateQueries({ queryKey: ['forum-posts', variables.postData.courseId] });
    },
  });
};

// Add a reply to a forum post
export const useReplyToForumPost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ postId, replyData, token }) => {
      const response = await axios.post(
        `${baseURL}/forums/${postId}/reply`,
        replyData,
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
      queryClient.invalidateQueries({ queryKey: ['forum-posts'] });
      queryClient.invalidateQueries({ queryKey: ['forum-post', variables.postId] });
    },
  });
};

// Get forum post by ID
export const useForumPost = (postId) => {
  return useQuery({
    queryKey: ['forum-post', postId],
    queryFn: async () => {
      const response = await axios.get(`${baseURL}/forums/${postId}`);
      return response.data;
    },
    enabled: !!postId,
  });
};

// Update forum post
export const useUpdateForumPost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ postId, postData, token }) => {
      const response = await axios.put(
        `${baseURL}/forums/${postId}`,
        postData,
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
      queryClient.invalidateQueries({ queryKey: ['forum-posts'] });
      queryClient.invalidateQueries({ queryKey: ['forum-post', variables.postId] });
    },
  });
};

// Delete forum post
export const useDeleteForumPost = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ postId, token }) => {
      const response = await axios.delete(
        `${baseURL}/forums/${postId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['forum-posts'] });
    },
  });
};
