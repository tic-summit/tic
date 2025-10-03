import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { baseURL } from '@/services/baseUrl';
import { toast } from 'sonner';

const getEnrolledCourses = async ({ studentId, token }) => {
  try {
    const response = await axios.get(`${baseURL}/courses/enrolled/${studentId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch enrolled courses');
  }
};

const getCourseModules = async ({ studentId, courseId, token }) => {
  try {
    const response = await axios.get(`${baseURL}/courses/${studentId}/enrolled/${courseId}/modules`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch course modules');
  }
};

const getCourseQuizzes = async ({ studentId, courseId, token }) => {
  try {
    const response = await axios.get(`${baseURL}/courses/${studentId}/enrolled/${courseId}/quizzes`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to fetch course quizzes');
  }
};

export const useEnrolledCourses = (studentId, token) => {
  return useQuery({
    queryKey: ['enrolledCourses', studentId],
    queryFn: () => getEnrolledCourses({ studentId, token }),
    enabled: !!studentId && !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};

export const useCourseModules = (studentId, courseId, token) => {
  return useQuery({
    queryKey: ['courseModules', studentId, courseId],
    queryFn: () => getCourseModules({ studentId, courseId, token }),
    enabled: !!studentId && !!courseId && !!token,
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 1,
  });
};

export const useCourseQuizzes = (studentId, courseId, token) => {
  return useQuery({
    queryKey: ['courseQuizzes', studentId, courseId],
    queryFn: () => getCourseQuizzes({ studentId, courseId, token }),
    enabled: !!studentId && !!courseId && !!token,
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 1,
  });
};
