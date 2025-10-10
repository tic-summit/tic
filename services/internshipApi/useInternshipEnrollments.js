import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { baseURL } from '../baseUrl.jsx';

// Get all enrollments for a specific internship
export const useInternshipEnrollments = (internshipId, options = {}) => {
  const { page = 1, limit = 10, status } = options;
  
  return useQuery({
    queryKey: ['internship-enrollments', internshipId, page, limit, status],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(status && { status })
      });
      
      const response = await axios.get(`${baseURL}/intern-enrollments/internship/${internshipId}?${params}`);
      return response.data;
    },
    enabled: !!internshipId,
  });
};

// Get all enrollments for a specific student
export const useStudentInternshipEnrollments = (studentId, options = {}) => {
  const { page = 1, limit = 10, status } = options;
  
  return useQuery({
    queryKey: ['student-internship-enrollments', studentId, page, limit, status],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(status && { status })
      });
      
      const response = await axios.get(`${baseURL}/intern-enrollments/student/${studentId}?${params}`);
      return response.data;
    },
    enabled: !!studentId,
  });
};

// Get a specific enrollment
export const useEnrollment = (enrollmentId) => {
  return useQuery({
    queryKey: ['enrollment', enrollmentId],
    queryFn: async () => {
      const response = await axios.get(`${baseURL}/intern-enrollments/${enrollmentId}`);
      return response.data;
    },
    enabled: !!enrollmentId,
  });
};

// Get enrollment statistics
export const useInternshipEnrollmentStats = (internshipId) => {
  return useQuery({
    queryKey: ['internship-enrollment-stats', internshipId],
    queryFn: async () => {
      const params = internshipId ? `?internshipId=${internshipId}` : '';
      const response = await axios.get(`${baseURL}/enrollments/stats${params}`);
      return response.data;
    },
  });
};

// Assign mentor to enrollment
export const useAssignMentor = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ enrollmentId, mentorId }) => {
      const response = await axios.patch(`${baseURL}/intern-enrollments/${enrollmentId}/assign-mentor`, {
        mentorId
      });
      return response.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['enrollment', variables.enrollmentId]);
      queryClient.invalidateQueries(['internship-enrollments']);
      queryClient.invalidateQueries(['student-enrollments']);
    },
  });
};

// Update enrollment status
export const useUpdateEnrollmentStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ enrollmentId, status, completionReason, finalGrade }) => {
      const response = await axios.put(`${baseURL}/intern-enrollments/${enrollmentId}/status`, {
        status,
        completionReason,
        finalGrade
      });
      return response.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['enrollment', variables.enrollmentId]);
      queryClient.invalidateQueries(['internship-enrollments']);
      queryClient.invalidateQueries(['student-enrollments']);
      queryClient.invalidateQueries(['enrollment-stats']);
    },
  });
};
