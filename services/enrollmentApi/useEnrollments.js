import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  enrollInCourse, 
  getInstructorEnrollments, 
  manualEnrollStudent,
  getStudentEnrollments,
  checkEnrollmentStatus
} from './enrollmentApi';

/**
 * Hook to enroll a student in a course
 */
export const useEnrollInCourse = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ courseId, token }) =>
      enrollInCourse(courseId, token),
    onSuccess: (data) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['studentEnrollments'] });
      queryClient.invalidateQueries({ queryKey: ['instructorEnrollments'] });
      queryClient.invalidateQueries({ queryKey: ['courseEnrollments'] });
      
      console.log('Enrollment successful:', data.message);
    },
    onError: (error) => {
      console.error('Enrollment failed:', error);
    },
  });
};

/**
 * Hook to get enrollments for courses created by the instructor
 */
export const useInstructorEnrollments = (token) => {
  return useQuery({
    queryKey: ['instructorEnrollments'],
    queryFn: () => getInstructorEnrollments(token),
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to manually enroll a student in a course (for instructors)
 */
export const useManualEnrollStudent = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ enrollmentData, token }) => manualEnrollStudent(enrollmentData, token),
    onSuccess: (data) => {
      // Invalidate relevant queries
      queryClient.invalidateQueries({ queryKey: ['instructorEnrollments'] });
      queryClient.invalidateQueries({ queryKey: ['studentEnrollments'] });
      
      console.log('Manual enrollment successful:', data.message);
    },
    onError: (error) => {
      console.error('Manual enrollment failed:', error);
    },
  });
};

/**
 * Hook to get student's enrolled courses
 */
export const useStudentEnrollments = (token) => {
  return useQuery({
    queryKey: ['studentEnrollments'],
    queryFn: () => getStudentEnrollments(token),
    enabled: !!token,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

/**
 * Hook to check if student is enrolled in a specific course
 */
export const useEnrollmentStatus = (courseId, token) => {
  return useQuery({
    queryKey: ['enrollmentStatus', courseId],
    queryFn: () => checkEnrollmentStatus(courseId, token),
    enabled: !!courseId && !!token,
    staleTime: 2 * 60 * 1000, // 2 minutes
  });
};

/**
 * Hook to get enrollment statistics for instructor dashboard
 */
export const useEnrollmentStats = (token) => {
  return useQuery({
    queryKey: ['enrollmentStats'],
    queryFn: async () => {
      const data = await getInstructorEnrollments(token);
      return {
        totalEnrolledStudents: data.totalEnrolledStudents,
        enrollmentsPerCourse: data.enrollmentsPerCourse,
        recentEnrollments: data.enrollments.slice(0, 5), // Last 5 enrollments
      };
    },
    enabled: !!token,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};