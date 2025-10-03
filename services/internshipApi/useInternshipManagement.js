import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { baseURL } from '../baseUrl';

// Get all internships with advanced filtering
export const useAllInternships = (options = {}) => {
  const { 
    page = 1, 
    limit = 10, 
    category, 
    type, 
    level, 
    search, 
    sortBy = 'createdAt', 
    sortOrder = 'desc',
    status = 'active'
  } = options;
  
  return useQuery({
    queryKey: ['all-internships', page, limit, category, type, level, search, sortBy, sortOrder, status],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sortBy,
        sortOrder,
        status,
        ...(category && category !== 'all' && { category }),
        ...(type && type !== 'all' && { type }),
        ...(level && level !== 'all' && { level }),
        ...(search && { search })
      });
      
      const response = await axios.get(`${baseURL}/internships?${params}`);
      return response.data;
    },
  });
};

// Get internship by ID
export const useInternshipById = (internshipId) => {
  return useQuery({
    queryKey: ['internship', internshipId],
    queryFn: async () => {
      const response = await axios.get(`${baseURL}/internships/${internshipId}`);
      return response.data;
    },
    enabled: !!internshipId,
  });
};

// Create new internship
export const useCreateInternship = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (internshipData) => {
      const response = await axios.post(`${baseURL}/internships`, internshipData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['all-internships']);
      queryClient.invalidateQueries(['internship-stats']);
    },
  });
};

// Update internship
export const useUpdateInternship = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ internshipId, updateData }) => {
      const response = await axios.put(`${baseURL}/internships/${internshipId}`, updateData);
      return response.data;
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(['internship', variables.internshipId]);
      queryClient.invalidateQueries(['all-internships']);
      queryClient.invalidateQueries(['internship-stats']);
    },
  });
};

// Delete internship
export const useDeleteInternship = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (internshipId) => {
      const response = await axios.delete(`${baseURL}/internships/${internshipId}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['all-internships']);
      queryClient.invalidateQueries(['internship-stats']);
    },
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
  const { page = 1, limit = 10, status = 'active' } = options;
  
  return useQuery({
    queryKey: ['company-internships', companyId, page, limit, status],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        status
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

// Get internship types
export const useInternshipTypes = () => {
  return useQuery({
    queryKey: ['internship-types'],
    queryFn: async () => {
      const response = await axios.get(`${baseURL}/internships/types`);
      return response.data;
    },
  });
};

// Get internship levels
export const useInternshipLevels = () => {
  return useQuery({
    queryKey: ['internship-levels'],
    queryFn: async () => {
      const response = await axios.get(`${baseURL}/internships/levels`);
      return response.data;
    },
  });
};

// Search internships
export const useSearchInternships = (searchTerm, options = {}) => {
  const { page = 1, limit = 10, filters = {} } = options;
  
  return useQuery({
    queryKey: ['search-internships', searchTerm, page, limit, filters],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        search: searchTerm,
        ...filters
      });
      
      const response = await axios.get(`${baseURL}/internships/search?${params}`);
      return response.data;
    },
    enabled: !!searchTerm && searchTerm.length > 2,
  });
};
