import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { baseURL } from './baseUrl.jsx';

// Get all users (Admin only)
export const useAllUsers = (options = {}) => {
  const { page = 1, limit = 10, role, search, sortBy = 'createdAt', sortOrder = 'desc' } = options;
  
  return useQuery({
    queryKey: ['users', page, limit, role, search, sortBy, sortOrder],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sortBy,
        sortOrder,
        ...(role && { role }),
        ...(search && { search })
      });
      
      const response = await axios.get(`${baseURL}/users?${params}`);
      return response.data;
    },
  });
};

// Get user by ID
export const useUser = (userId) => {
  return useQuery({
    queryKey: ['user', userId],
    queryFn: async () => {
      const response = await axios.get(`${baseURL}/users/${userId}`);
      return response.data;
    },
    enabled: !!userId,
  });
};

// Update user (Admin only)
export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ userId, userData, token }) => {
      const response = await axios.put(
        `${baseURL}/users/${userId}`,
        userData,
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
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user', variables.userId] });
    },
  });
};

// Delete user (Admin only)
export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ userId, token }) => {
      const response = await axios.delete(
        `${baseURL}/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

// Create user (Admin only)
export const useCreateUser = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ userData, token }) => {
      const response = await axios.post(
        `${baseURL}/users`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};

// Update user role (Admin only)
export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ userId, role, token }) => {
      const response = await axios.patch(
        `${baseURL}/users/${userId}/role`,
        { role },
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
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user', variables.userId] });
    },
  });
};

// Update user status (Admin only)
export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ userId, status, token }) => {
      const response = await axios.patch(
        `${baseURL}/users/${userId}/status`,
        { status },
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
      queryClient.invalidateQueries({ queryKey: ['users'] });
      queryClient.invalidateQueries({ queryKey: ['user', variables.userId] });
    },
  });
};

// Get user statistics (Admin only)
export const useUserStats = () => {
  return useQuery({
    queryKey: ['user-stats'],
    queryFn: async () => {
      const response = await axios.get(`${baseURL}/users/stats`);
      return response.data;
    },
  });
};

// Bulk update users (Admin only)
export const useBulkUpdateUsers = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ userIds, updateData, token }) => {
      const response = await axios.patch(
        `${baseURL}/users/bulk-update`,
        { userIds, updateData },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
