"use client"

import axios from 'axios';
import { useQuery } from '@tanstack/react-query';
import { baseURL } from '@/services/baseUrl';

const useQuizzes = (user) => {
  const fetchQuizzes = async () => {
    if (!user?.id) return { count: 0, quizzes: [] };
    
    const response = await axios.get(`${baseURL}/courses/instructors/${user.id}/quizzes`, {
      headers: {
        Authorization: `Bearer ${user.token}`
      }
    });
    
    if (!response.data.success) {
      console.error('Failed to fetch quizzes:', response.data.message);
      throw new Error('Failed to fetch quizzes');
    }

    return {
      count: response.data.count || 0,
      quizzes: response.data.quizzes || []
    };
  };

  return useQuery({
    queryKey: ['instructorQuizzes', user?.id],
    queryFn: fetchQuizzes,
    enabled: !!user?.id,
  });
};

export default useQuizzes;