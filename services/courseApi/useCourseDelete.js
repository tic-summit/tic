import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';

const deleteCourse = async ({ courseId, token }) => {
  try {
    const response = await axios.delete(`${baseURL}/courses/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to delete course');
  }
};

export const useDeleteCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteCourse,
    onSuccess: () => {
      toast.success('Course deleted successfully!');
      queryClient.invalidateQueries(['courses']);
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to delete course');
    },
  });
};