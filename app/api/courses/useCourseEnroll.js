import { useMutation, useQueryClient, useQuery } from '@tanstack/react-query';
import api from '@/services/api';
import { toast } from 'sonner';
import { baseURL } from '@/services/baseUrl';

const enrollCourse = async ({ courseId }) => {
  try {
    const response = await api.post(`${baseURL}/enrollments/${courseId}`, {});
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to enroll in course');
  }
};

// Since there are no valid endpoints for checking enrollment status or getting student enrollments,
// we'll use localStorage to track enrollment status for now
const checkEnrollmentStatus = async (courseId) => {
  try {
    // Check localStorage for enrollment status
    const enrollments = JSON.parse(localStorage.getItem('userEnrollments') || '[]');
    const isEnrolled = enrollments.includes(courseId);
    
    console.log('Enrollment status check (localStorage):', { 
      courseId, 
      isEnrolled, 
      totalEnrollments: enrollments.length,
      enrolledCourses: enrollments
    });
    
    return { isEnrolled };
  } catch (error) {
    console.log('Enrollment status error:', error);
    return { isEnrolled: false };
  }
};

const getStudentEnrollments = async () => {
  try {
    // Get enrollments from localStorage for now
    const enrollments = JSON.parse(localStorage.getItem('userEnrollments') || '[]');
    return { enrollments: enrollments.map(courseId => ({ course: { _id: courseId } })) };
  } catch (error) {
    throw new Error('Failed to fetch enrollments');
  }
};

const manualEnrollStudent = async ({ studentId, courseId }) => {
  try {
    const response = await api.post(`${baseURL}/enrollments/manual`, {
      studentId,
      courseId
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response?.data?.message || 'Failed to enroll student');
  }
};

export const useEnrollCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: enrollCourse,
    onSuccess: (data, variables) => {
      // Update localStorage with the new enrollment
      const enrollments = JSON.parse(localStorage.getItem('userEnrollments') || '[]');
      if (!enrollments.includes(variables.courseId)) {
        enrollments.push(variables.courseId);
        localStorage.setItem('userEnrollments', JSON.stringify(enrollments));
      }
      
      toast.success(data.message || 'Enrollment successful!');
      queryClient.invalidateQueries(['courseDetails', variables.courseId]);
      queryClient.invalidateQueries(['enrollments']);
      queryClient.invalidateQueries(['enrollmentStatus']);
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to enroll in course');
    },
  });
};

export const useEnrollmentStatus = (courseId) => {
  return useQuery({
    queryKey: ['enrollmentStatus', courseId],
    queryFn: () => checkEnrollmentStatus(courseId),
    enabled: !!courseId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
};

export const useStudentEnrollments = () => {
  return useQuery({
    queryKey: ['studentEnrollments'],
    queryFn: getStudentEnrollments,
    staleTime: 2 * 60 * 1000, // 2 minutes
    retry: 1,
  });
};

export const useManualEnrollStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: manualEnrollStudent,
    onSuccess: (data, variables) => {
      // Update localStorage with the new enrollment
      const enrollments = JSON.parse(localStorage.getItem('userEnrollments') || '[]');
      if (!enrollments.includes(variables.courseId)) {
        enrollments.push(variables.courseId);
        localStorage.setItem('userEnrollments', JSON.stringify(enrollments));
      }
      
      toast.success(data.message || 'Student enrolled successfully!');
      queryClient.invalidateQueries(['studentEnrollments']);
      queryClient.invalidateQueries(['enrollmentStatus']);
    },
    onError: (error) => {
      toast.error(error.message || 'Failed to enroll student');
    },
  });
};