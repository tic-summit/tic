import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { baseURL } from '../baseUrl.jsx';

// Submit daily activity
export const useSubmitDailyActivity = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ activityData, token }) => {
      const response = await axios.post(
        `${baseURL}/daily-activities`,
        activityData,
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
      queryClient.invalidateQueries({ queryKey: ['daily-activities'] });
    },
  });
};

// Update daily activity
export const useUpdateDailyActivity = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ activityId, activityData, token }) => {
      const response = await axios.put(
        `${baseURL}/daily-activities/${activityId}`,
        activityData,
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
      queryClient.invalidateQueries({ queryKey: ['daily-activities'] });
      queryClient.invalidateQueries({ queryKey: ['daily-activity', variables.activityId] });
    },
  });
};

// Approve daily activity (Mentor/Admin only)
export const useApproveDailyActivity = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ activityId, token }) => {
      const response = await axios.put(
        `${baseURL}/daily-activities/${activityId}/approve`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      return response.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['daily-activities'] });
      queryClient.invalidateQueries({ queryKey: ['daily-activity', variables.activityId] });
    },
  });
};

// Reject daily activity (Mentor/Admin only)
export const useRejectDailyActivity = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ activityId, feedback, token }) => {
      const response = await axios.put(
        `${baseURL}/daily-activities/${activityId}/reject`,
        { feedback },
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
      queryClient.invalidateQueries({ queryKey: ['daily-activities'] });
      queryClient.invalidateQueries({ queryKey: ['daily-activity', variables.activityId] });
    },
  });
};

// Add feedback to daily activity (Mentor/Admin only)
export const useAddActivityFeedback = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ activityId, feedback, token }) => {
      const response = await axios.put(
        `${baseURL}/daily-activities/${activityId}/feedback`,
        { feedback },
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
      queryClient.invalidateQueries({ queryKey: ['daily-activities'] });
      queryClient.invalidateQueries({ queryKey: ['daily-activity', variables.activityId] });
    },
  });
};

// Get student's daily activities
export const useStudentDailyActivities = (studentId, options = {}) => {
  const { page = 1, limit = 10, startDate, endDate } = options;
  
  return useQuery({
    queryKey: ['daily-activities', 'student', studentId, page, limit, startDate, endDate],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(startDate && { startDate }),
        ...(endDate && { endDate })
      });
      
      const response = await axios.get(`${baseURL}/daily-activities/student/${studentId}?${params}`);
      return response.data;
    },
    enabled: !!studentId,
  });
};

// Get all daily activities (Mentor/Admin only)
export const useAllDailyActivities = (options = {}) => {
  const { page = 1, limit = 10, status, startDate, endDate } = options;
  
  return useQuery({
    queryKey: ['daily-activities', 'all', page, limit, status, startDate, endDate],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(status && { status }),
        ...(startDate && { startDate }),
        ...(endDate && { endDate })
      });
      
      const response = await axios.get(`${baseURL}/daily-activities?${params}`);
      return response.data;
    },
  });
};

// Delete daily activity
export const useDeleteDailyActivity = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ activityId, token }) => {
      const response = await axios.delete(
        `${baseURL}/daily-activities/${activityId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['daily-activities'] });
    },
  });
};

// Get daily activity by ID
export const useDailyActivity = (activityId) => {
  return useQuery({
    queryKey: ['daily-activity', activityId],
    queryFn: async () => {
      const response = await axios.get(`${baseURL}/daily-activities/${activityId}`);
      return response.data;
    },
    enabled: !!activityId,
  });
};

// Upload attachment for daily activity
export const useUploadActivityAttachment = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ activityId, file, token }) => {
      const formData = new FormData();
      formData.append('attachment', file);
      
      const response = await axios.post(
        `${baseURL}/daily-activities/${activityId}/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          }
        }
      );
      return response.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['daily-activity', variables.activityId] });
      queryClient.invalidateQueries({ queryKey: ['daily-activities'] });
    },
  });
};
