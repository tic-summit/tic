import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { baseURL } from '@/services/baseUrl';
import { toast } from 'sonner';

const getForumPosts = async (courseId) => {
  try {
    const response = await axios.get(`${baseURL}/forums?courseId=${courseId}`);
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch forum posts');
  }
};

const createForumPost = async ({ courseId, content, token }) => {
  try {
    const response = await axios.post(`${baseURL}/forums`, {
      post: content,
      courseId
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create forum post');
  }
};

const createForumComment = async ({ postId, content, token }) => {
  try {
    const response = await axios.post(`${baseURL}/forums/${postId}/reply`, {
      content
    }, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to create comment');
  }
};

export const useForumPosts = (courseId) => {
  return useQuery({
    queryKey: ['forumPosts', courseId],
    queryFn: () => getForumPosts(courseId),
    enabled: !!courseId,
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 1,
  });
};

export const useCreateForumPost = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createForumPost,
    onSuccess: (data, variables) => {
      toast.success('Post created successfully!');
      queryClient.invalidateQueries(['forumPosts', variables.courseId]);
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to create post');
    },
  });
};

export const useCreateForumComment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createForumComment,
    onSuccess: (data, variables) => {
      toast.success('Comment added successfully!');
      queryClient.invalidateQueries(['forumPosts']);
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to add comment');
    },
  });
};
