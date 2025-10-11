import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { baseURL } from '../baseUrl.jsx';

// Submit progress report
export const useSubmitProgressReport = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ reportData, token }) => {
      const response = await axios.post(
        `${baseURL}/progress-reports`,
        reportData,
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
      queryClient.invalidateQueries({ queryKey: ['progress-reports'] });
    },
  });
};

// Submit final progress report
export const useSubmitFinalProgressReport = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ reportData, token }) => {
      const response = await axios.post(
        `${baseURL}/progress-reports/final`,
        reportData,
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
      queryClient.invalidateQueries({ queryKey: ['progress-reports'] });
    },
  });
};

// Get student's progress reports
export const useStudentProgressReports = (studentId, options = {}) => {
  const { page = 1, limit = 10, reportType } = options;
  
  return useQuery({
    queryKey: ['progress-reports', 'student', studentId, page, limit, reportType],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(reportType && { reportType })
      });
      
      const response = await axios.get(`${baseURL}/progress-reports/student/${studentId}?${params}`);
      return response.data;
    },
    enabled: !!studentId,
  });
};

// Get all progress reports (Mentor/Admin only)
export const useAllProgressReports = (options = {}) => {
  const { page = 1, limit = 10, reportType, internshipId } = options;
  
  return useQuery({
    queryKey: ['progress-reports', 'all', page, limit, reportType, internshipId],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(reportType && { reportType }),
        ...(internshipId && { internshipId })
      });
      
      const response = await axios.get(`${baseURL}/progress-reports?${params}`);
      return response.data;
    },
  });
};

// Get progress report by ID
export const useProgressReport = (reportId) => {
  return useQuery({
    queryKey: ['progress-report', reportId],
    queryFn: async () => {
      const response = await axios.get(`${baseURL}/progress-reports/${reportId}`);
      return response.data;
    },
    enabled: !!reportId,
  });
};

// Update progress report
export const useUpdateProgressReport = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ reportId, reportData, token }) => {
      const response = await axios.put(
        `${baseURL}/progress-reports/${reportId}`,
        reportData,
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
      queryClient.invalidateQueries({ queryKey: ['progress-reports'] });
      queryClient.invalidateQueries({ queryKey: ['progress-report', variables.reportId] });
    },
  });
};

// Delete progress report
export const useDeleteProgressReport = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ reportId, token }) => {
      const response = await axios.delete(
        `${baseURL}/progress-reports/${reportId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['progress-reports'] });
    },
  });
};
