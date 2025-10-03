import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { baseURL } from '../baseUrl';

// Get user notifications
export const useNotifications = (options = {}) => {
  const { 
    page = 1, 
    limit = 20, 
    type, 
    status, 
    category 
  } = options;
  
  return useQuery({
    queryKey: ['notifications', page, limit, type, status, category],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(type && { type }),
        ...(status && { status }),
        ...(category && { category })
      });
      
      const response = await axios.get(`${baseURL}/notifications?${params}`);
      return response.data;
    },
  });
};

// Get unread notification count
export const useUnreadNotificationCount = () => {
  return useQuery({
    queryKey: ['unread-notification-count'],
    queryFn: async () => {
      const response = await axios.get(`${baseURL}/notifications/unread-count`);
      return response.data;
    },
    refetchInterval: 30000, // Refetch every 30 seconds
  });
};

// Get notification statistics
export const useNotificationStats = (days = 30) => {
  return useQuery({
    queryKey: ['notification-stats', days],
    queryFn: async () => {
      const response = await axios.get(`${baseURL}/notifications/stats?days=${days}`);
      return response.data;
    },
  });
};

// Get notification preferences
export const useNotificationPreferences = () => {
  return useQuery({
    queryKey: ['notification-preferences'],
    queryFn: async () => {
      const response = await axios.get(`${baseURL}/notifications/preferences`);
      return response.data;
    },
  });
};

// Mark notification as read
export const useMarkNotificationAsRead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (notificationId) => {
      const response = await axios.patch(`${baseURL}/notifications/${notificationId}/read`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['notifications']);
      queryClient.invalidateQueries(['unread-notification-count']);
      queryClient.invalidateQueries(['notification-stats']);
    },
  });
};

// Mark all notifications as read
export const useMarkAllNotificationsAsRead = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      const response = await axios.patch(`${baseURL}/notifications/read-all`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['notifications']);
      queryClient.invalidateQueries(['unread-notification-count']);
      queryClient.invalidateQueries(['notification-stats']);
    },
  });
};

// Delete a notification
export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (notificationId) => {
      const response = await axios.delete(`${baseURL}/notifications/${notificationId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['notifications']);
      queryClient.invalidateQueries(['unread-notification-count']);
      queryClient.invalidateQueries(['notification-stats']);
    },
  });
};

// Clear all notifications
export const useClearAllNotifications = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async () => {
      const response = await axios.delete(`${baseURL}/notifications`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['notifications']);
      queryClient.invalidateQueries(['unread-notification-count']);
      queryClient.invalidateQueries(['notification-stats']);
    },
  });
};

// Update notification preferences
export const useUpdateNotificationPreferences = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (preferences) => {
      const response = await axios.put(`${baseURL}/notifications/preferences`, preferences);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['notification-preferences']);
    },
  });
};

// Send test notification
export const useSendTestNotification = () => {
  return useMutation({
    mutationFn: async (testData) => {
      const response = await axios.post(`${baseURL}/notifications/test`, testData);
      return response.data;
    },
  });
};

// Register push notification token
export const useRegisterPushToken = () => {
  return useMutation({
    mutationFn: async (tokenData) => {
      const response = await axios.post(`${baseURL}/notifications/push-tokens`, tokenData);
      return response.data;
    },
  });
};

// Unregister push notification token
export const useUnregisterPushToken = () => {
  return useMutation({
    mutationFn: async (tokenData) => {
      const response = await axios.delete(`${baseURL}/notifications/push-tokens`, {
        data: tokenData
      });
      return response.data;
    },
  });
};
