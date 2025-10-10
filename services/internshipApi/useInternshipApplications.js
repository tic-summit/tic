import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { baseURL } from '../baseUrl.jsx';

// Get all applications (Admin/Mentor only)
export const useAllApplications = (options = {}) => {
  const { 
    page = 1, 
    limit = 10, 
    status, 
    internshipId, 
    studentId, 
    sortBy = 'appliedAt', 
    sortOrder = 'desc' 
  } = options;
  
  return useQuery({
    queryKey: ['all-applications', page, limit, status, internshipId, studentId, sortBy, sortOrder],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sortBy,
        sortOrder,
        ...(status && { status }),
        ...(internshipId && { internshipId }),
        ...(studentId && { studentId })
      });
      
      const response = await axios.get(`${baseURL}/applications?${params}`);
      return response.data;
    },
  });
};

// Get current user's applications
export const useMyApplications = (options = {}) => {
  const { 
    page = 1, 
    limit = 10, 
    status, 
    sortBy = 'appliedAt', 
    sortOrder = 'desc' 
  } = options;
  
  return useQuery({
    queryKey: ['my-applications', page, limit, status, sortBy, sortOrder],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sortBy,
        sortOrder,
        ...(status && { status })
      });
      
      const response = await axios.get(`${baseURL}/applications/my-applications?${params}`);
      return response.data;
    },
  });
};

// Get a specific application
export const useApplication = (applicationId) => {
  return useQuery({
    queryKey: ['application', applicationId],
    queryFn: async () => {
      const response = await axios.get(`${baseURL}/applications/${applicationId}`);
      return response.data;
    },
    enabled: !!applicationId,
  });
};

// Get applications for a specific internship
export const useInternshipApplications = (internshipId, options = {}) => {
  const { 
    page = 1, 
    limit = 10, 
    status, 
    sortBy = 'appliedAt', 
    sortOrder = 'desc' 
  } = options;
  
  return useQuery({
    queryKey: ['internship-applications', internshipId, page, limit, status, sortBy, sortOrder],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sortBy,
        sortOrder,
        ...(status && { status })
      });
      
      const response = await axios.get(`${baseURL}/applications/internship/${internshipId}?${params}`);
      return response.data;
    },
    enabled: !!internshipId,
  });
};

// Get application statistics
export const useApplicationStats = (internshipId) => {
  return useQuery({
    queryKey: ['application-stats', internshipId],
    queryFn: async () => {
      const params = internshipId ? `?internshipId=${internshipId}` : '';
      const response = await axios.get(`${baseURL}/applications/stats${params}`);
      return response.data;
    },
  });
};

// Submit internship application
export const useSubmitApplication = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ internshipId, applicationData }) => {
      const formData = new FormData();
      
      // Append required fields
      formData.append('resumeFile', applicationData.resumeFile);
      formData.append('applicationLetter', applicationData.applicationLetter);
      formData.append('school', applicationData.school);
      formData.append('year', applicationData.year);
      
      // Append optional fields
      if (applicationData.supportLetter) {
        formData.append('supportLetter', applicationData.supportLetter);
      }
      if (applicationData.linkedinUrl) {
        formData.append('linkedinUrl', applicationData.linkedinUrl);
      }
      if (applicationData.githubUrl) {
        formData.append('githubUrl', applicationData.githubUrl);
      }
      if (applicationData.portfolioUrl) {
        formData.append('portfolioUrl', applicationData.portfolioUrl);
      }
      
      const response = await axios.post(`${baseURL}/internship/${internshipId}/apply`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['my-applications']);
      queryClient.invalidateQueries(['internship-applications', variables.internshipId]);
      queryClient.invalidateQueries(['application-stats']);
    },
  });
};

// Update application status (Admin/Mentor only)
export const useUpdateApplicationStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ applicationId, status, feedback }) => {
      const response = await axios.patch(`${baseURL}/internship/${applicationId}/status`, {
        status,
        feedback
      });
      return response.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['application', variables.applicationId]);
      queryClient.invalidateQueries(['all-applications']);
      queryClient.invalidateQueries(['my-applications']);
      queryClient.invalidateQueries(['internship-applications']);
      queryClient.invalidateQueries(['application-stats']);
    },
  });
};

// Delete an application
export const useDeleteApplication = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (applicationId) => {
      const response = await axios.delete(`${baseURL}/applications/${applicationId}`);
      return response.data;
    },
    onSuccess: (data, applicationId) => {
      queryClient.invalidateQueries(['my-applications']);
      queryClient.invalidateQueries(['all-applications']);
      queryClient.invalidateQueries(['internship-applications']);
      queryClient.invalidateQueries(['application-stats']);
    },
  });
};

// Bulk update application statuses (Admin/Mentor only)
export const useBulkUpdateApplicationStatus = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ applicationIds, status, feedback }) => {
      const response = await axios.patch(`${baseURL}/internship/bulk-status`, {
        applicationIds,
        status,
        feedback
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['all-applications']);
      queryClient.invalidateQueries(['my-applications']);
      queryClient.invalidateQueries(['internship-applications']);
      queryClient.invalidateQueries(['application-stats']);
    },
  });
};
