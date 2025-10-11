import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { baseURL } from './baseUrl.jsx';

// Create virtual lab session
export const useCreateVirtualLabSession = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ sessionData, token }) => {
      const response = await axios.post(
        `${baseURL}/virtual-labs/sessions`,
        sessionData,
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
      queryClient.invalidateQueries({ queryKey: ['virtual-lab-sessions'] });
    },
  });
};

// Get all virtual lab sessions
export const useVirtualLabSessions = (options = {}) => {
  const { page = 1, limit = 10, status, labType } = options;
  
  return useQuery({
    queryKey: ['virtual-lab-sessions', page, limit, status, labType],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(status && { status }),
        ...(labType && { labType })
      });
      
      const response = await axios.get(`${baseURL}/virtual-labs/sessions?${params}`);
      return response.data;
    },
  });
};

// Get virtual lab session by ID
export const useVirtualLabSession = (sessionId) => {
  return useQuery({
    queryKey: ['virtual-lab-session', sessionId],
    queryFn: async () => {
      const response = await axios.get(`${baseURL}/virtual-labs/sessions/${sessionId}`);
      return response.data;
    },
    enabled: !!sessionId,
  });
};

// Update virtual lab session
export const useUpdateVirtualLabSession = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ sessionId, sessionData, token }) => {
      const response = await axios.put(
        `${baseURL}/virtual-labs/sessions/${sessionId}`,
        sessionData,
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
      queryClient.invalidateQueries({ queryKey: ['virtual-lab-sessions'] });
      queryClient.invalidateQueries({ queryKey: ['virtual-lab-session', variables.sessionId] });
    },
  });
};

// Delete virtual lab session
export const useDeleteVirtualLabSession = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ sessionId, token }) => {
      const response = await axios.delete(
        `${baseURL}/virtual-labs/sessions/${sessionId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['virtual-lab-sessions'] });
    },
  });
};

// Join virtual lab session
export const useJoinVirtualLabSession = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ sessionId, token }) => {
      const response = await axios.post(
        `${baseURL}/virtual-labs/sessions/${sessionId}/join`,
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
      queryClient.invalidateQueries({ queryKey: ['virtual-lab-session', variables.sessionId] });
    },
  });
};

// Leave virtual lab session
export const useLeaveVirtualLabSession = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ sessionId, token }) => {
      const response = await axios.post(
        `${baseURL}/virtual-labs/sessions/${sessionId}/leave`,
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
      queryClient.invalidateQueries({ queryKey: ['virtual-lab-session', variables.sessionId] });
    },
  });
};

// Get user's virtual lab sessions
export const useUserVirtualLabSessions = (userId, options = {}) => {
  const { page = 1, limit = 10, status } = options;
  
  return useQuery({
    queryKey: ['user-virtual-lab-sessions', userId, page, limit, status],
    queryFn: async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(status && { status })
      });
      
      const response = await axios.get(`${baseURL}/virtual-labs/users/${userId}/sessions?${params}`);
      return response.data;
    },
    enabled: !!userId,
  });
};

// Get virtual lab templates
export const useVirtualLabTemplates = () => {
  return useQuery({
    queryKey: ['virtual-lab-templates'],
    queryFn: async () => {
      const response = await axios.get(`${baseURL}/virtual-labs/templates`);
      return response.data;
    },
  });
};

// Create virtual lab template (Admin only)
export const useCreateVirtualLabTemplate = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ templateData, token }) => {
      const response = await axios.post(
        `${baseURL}/virtual-labs/templates`,
        templateData,
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
      queryClient.invalidateQueries({ queryKey: ['virtual-lab-templates'] });
    },
  });
};
