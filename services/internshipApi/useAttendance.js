import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { baseURL } from '../baseUrl.jsx';

// Submit attendance record
export const useSubmitAttendance = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ attendanceData, token }) => {
      const response = await axios.post(
        `${baseURL}/attendance`,
        attendanceData,
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
      queryClient.invalidateQueries({ queryKey: ['attendance'] });
    },
  });
};

// Update attendance record
export const useUpdateAttendance = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ attendanceId, attendanceData, token }) => {
      const response = await axios.put(
        `${baseURL}/attendance/${attendanceId}`,
        attendanceData,
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
      queryClient.invalidateQueries({ queryKey: ['attendance'] });
      queryClient.invalidateQueries({ queryKey: ['attendance-record', variables.attendanceId] });
    },
  });
};

// Get student's attendance records
export const useStudentAttendance = (studentId, options = {}) => {
  const { page = 1, limit = 10, startDate, endDate } = options;
  
  return useQuery({
    queryKey: ['attendance', 'student', studentId, page, limit, startDate, endDate],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(startDate && { startDate }),
        ...(endDate && { endDate })
      });
      
      const response = await axios.get(`${baseURL}/attendance/student/${studentId}?${params}`);
      return response.data;
    },
    enabled: !!studentId,
  });
};

// Get all attendance records (Mentor/Admin only)
export const useAllAttendanceRecords = (options = {}) => {
  const { page = 1, limit = 10, startDate, endDate, internshipId } = options;
  
  return useQuery({
    queryKey: ['attendance', 'all', page, limit, startDate, endDate, internshipId],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(startDate && { startDate }),
        ...(endDate && { endDate }),
        ...(internshipId && { internshipId })
      });
      
      const response = await axios.get(`${baseURL}/attendance?${params}`);
      return response.data;
    },
  });
};

// Delete attendance record
export const useDeleteAttendance = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ attendanceId, token }) => {
      const response = await axios.delete(
        `${baseURL}/attendance/${attendanceId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['attendance'] });
    },
  });
};

// Get attendance statistics
export const useAttendanceStats = (studentId, options = {}) => {
  const { startDate, endDate } = options;
  
  return useQuery({
    queryKey: ['attendance-stats', studentId, startDate, endDate],
    queryFn: async () => {
      const params = new URLSearchParams({
        ...(startDate && { startDate }),
        ...(endDate && { endDate })
      });
      
      const response = await axios.get(`${baseURL}/attendance/stats/${studentId}?${params}`);
      return response.data;
    },
    enabled: !!studentId,
  });
};
