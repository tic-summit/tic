import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { baseURL } from '../baseUrl.jsx';

// Get all internships
export const useInternships = (options = {}) => {
  const { page = 1, limit = 10, category, type, level, search, sortBy } = options;
  
  return useQuery({
    queryKey: ['internships', page, limit, category, type, level, search, sortBy],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(category && category !== 'all' && { category }),
        ...(type && type !== 'all' && { type }),
        ...(level && level !== 'all' && { level }),
        ...(search && { search }),
        ...(sortBy && { sortBy })
      });
      
      const response = await axios.get(`${baseURL}/internships?${params}`);
      return response.data;
    },
  });
};

// Get a specific internship
export const useInternship = (internshipId) => {
  return useQuery({
    queryKey: ['internship', internshipId],
    queryFn: async () => {
      const response = await axios.get(`${baseURL}/internships/${internshipId}`);
      return response.data;
    },
    enabled: !!internshipId,
  });
};

// Get internship statistics
export const useInternshipStats = () => {
  return useQuery({
    queryKey: ['internship-stats'],
    queryFn: async () => {
      const response = await axios.get(`${baseURL}/internships/stats`);
      return response.data;
    },
  });
};

// Get internships by company
export const useCompanyInternships = (companyId, options = {}) => {
  const { page = 1, limit = 10 } = options;
  
  return useQuery({
    queryKey: ['company-internships', companyId, page, limit],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString()
      });
      
      const response = await axios.get(`${baseURL}/internships/company/${companyId}?${params}`);
      return response.data;
    },
    enabled: !!companyId,
  });
};

// Get featured internships
export const useFeaturedInternships = (limit = 6) => {
  return useQuery({
    queryKey: ['featured-internships', limit],
    queryFn: async () => {
      const response = await axios.get(`${baseURL}/internships/featured?limit=${limit}`);
      return response.data;
    },
  });
};

// Get internship categories
export const useInternshipCategories = () => {
  return useQuery({
    queryKey: ['internship-categories'],
    queryFn: async () => {
      const response = await axios.get(`${baseURL}/internships/categories`);
      return response.data;
    },
  });
};

// Create a new internship listing (Admin only)
export const useCreateInternship = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ internshipData, token }) => {
      const response = await axios.post(
        `${baseURL}/internships`,
        internshipData,
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
      queryClient.invalidateQueries({ queryKey: ['internships'] });
    },
  });
};

// Update an internship (Admin only)
export const useUpdateInternship = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ internshipId, updateData, token }) => {
      const response = await axios.patch(
        `${baseURL}/internships/${internshipId}`,
        updateData,
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
      queryClient.invalidateQueries({ queryKey: ['internships'] });
      queryClient.invalidateQueries({ queryKey: ['internship', variables.internshipId] });
    },
  });
};

// Delete an internship (Admin only)
export const useDeleteInternship = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ internshipId, token }) => {
      const response = await axios.delete(
        `${baseURL}/internships/${internshipId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['internships'] });
    },
  });
};
