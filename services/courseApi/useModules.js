import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { baseURL } from '../baseUrl.jsx';

// Create module
export const useCreateModule = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ courseId, moduleData, token }) => {
      const response = await axios.post(
        `${baseURL}/modules/${courseId}/modules`,
        moduleData,
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
      queryClient.invalidateQueries({ queryKey: ['modules', variables.courseId] });
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });
};

// Get modules for a course
export const useCourseModules = (courseId) => {
  return useQuery({
    queryKey: ['modules', courseId],
    queryFn: async () => {
      const response = await axios.get(`${baseURL}/modules/${courseId}/modules`);
      return response.data;
    },
    enabled: !!courseId,
  });
};

// Get module by ID
export const useModule = (moduleId) => {
  return useQuery({
    queryKey: ['module', moduleId],
    queryFn: async () => {
      const response = await axios.get(`${baseURL}/modules/${moduleId}`);
      return response.data;
    },
    enabled: !!moduleId,
  });
};

// Update module
export const useUpdateModule = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ moduleId, moduleData, token }) => {
      const response = await axios.put(
        `${baseURL}/modules/${moduleId}`,
        moduleData,
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
      queryClient.invalidateQueries({ queryKey: ['module', variables.moduleId] });
      queryClient.invalidateQueries({ queryKey: ['modules'] });
    },
  });
};

// Delete module
export const useDeleteModule = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ moduleId, token }) => {
      const response = await axios.delete(
        `${baseURL}/modules/${moduleId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['modules'] });
    },
  });
};

// Reorder modules
export const useReorderModules = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ courseId, moduleOrders, token }) => {
      const response = await axios.patch(
        `${baseURL}/modules/${courseId}/reorder`,
        { moduleOrders },
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
      queryClient.invalidateQueries({ queryKey: ['modules', variables.courseId] });
    },
  });
};

// Create topic
export const useCreateTopic = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ moduleId, topicData, token }) => {
      const response = await axios.post(
        `${baseURL}/modules/${moduleId}/topics`,
        topicData,
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
      queryClient.invalidateQueries({ queryKey: ['module', variables.moduleId] });
      queryClient.invalidateQueries({ queryKey: ['topics'] });
    },
  });
};

// Update topic
export const useUpdateTopic = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ topicId, topicData, token }) => {
      const response = await axios.put(
        `${baseURL}/modules/topics/${topicId}`,
        topicData,
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
      queryClient.invalidateQueries({ queryKey: ['topic', variables.topicId] });
      queryClient.invalidateQueries({ queryKey: ['topics'] });
      queryClient.invalidateQueries({ queryKey: ['modules'] });
    },
  });
};

// Delete topic
export const useDeleteTopic = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ topicId, token }) => {
      const response = await axios.delete(
        `${baseURL}/modules/topics/${topicId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['topics'] });
      queryClient.invalidateQueries({ queryKey: ['modules'] });
    },
  });
};

// Create quiz
export const useCreateQuiz = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ moduleId, quizData, token }) => {
      const response = await axios.post(
        `${baseURL}/modules/${moduleId}/quizzes`,
        quizData,
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
      queryClient.invalidateQueries({ queryKey: ['module', variables.moduleId] });
      queryClient.invalidateQueries({ queryKey: ['quizzes'] });
    },
  });
};

// Get quiz by ID
export const useQuiz = (quizId) => {
  return useQuery({
    queryKey: ['quiz', quizId],
    queryFn: async () => {
      const response = await axios.get(`${baseURL}/modules/quizzes/${quizId}`);
      return response.data;
    },
    enabled: !!quizId,
  });
};

// Update quiz
export const useUpdateQuiz = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ quizId, quizData, token }) => {
      const response = await axios.put(
        `${baseURL}/modules/quizzes/${quizId}`,
        quizData,
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
      queryClient.invalidateQueries({ queryKey: ['quiz', variables.quizId] });
      queryClient.invalidateQueries({ queryKey: ['quizzes'] });
      queryClient.invalidateQueries({ queryKey: ['modules'] });
    },
  });
};

// Delete quiz
export const useDeleteQuiz = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ quizId, token }) => {
      const response = await axios.delete(
        `${baseURL}/modules/quizzes/${quizId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['quizzes'] });
      queryClient.invalidateQueries({ queryKey: ['modules'] });
    },
  });
};

// Create summary
export const useCreateSummary = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ moduleId, summaryData, token }) => {
      const response = await axios.post(
        `${baseURL}/modules/${moduleId}/summaries`,
        summaryData,
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
      queryClient.invalidateQueries({ queryKey: ['module', variables.moduleId] });
      queryClient.invalidateQueries({ queryKey: ['summaries'] });
    },
  });
};

// Get summary by ID
export const useSummary = (summaryId) => {
  return useQuery({
    queryKey: ['summary', summaryId],
    queryFn: async () => {
      const response = await axios.get(`${baseURL}/modules/summaries/${summaryId}`);
      return response.data;
    },
    enabled: !!summaryId,
  });
};

// Update summary
export const useUpdateSummary = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ summaryId, summaryData, token }) => {
      const response = await axios.put(
        `${baseURL}/modules/summaries/${summaryId}`,
        summaryData,
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
      queryClient.invalidateQueries({ queryKey: ['summary', variables.summaryId] });
      queryClient.invalidateQueries({ queryKey: ['summaries'] });
      queryClient.invalidateQueries({ queryKey: ['modules'] });
    },
  });
};

// Delete summary
export const useDeleteSummary = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async ({ summaryId, token }) => {
      const response = await axios.delete(
        `${baseURL}/modules/summaries/${summaryId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['summaries'] });
      queryClient.invalidateQueries({ queryKey: ['modules'] });
    },
  });
};
