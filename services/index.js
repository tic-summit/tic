// Authentication APIs
export * from './authApi/authApi';
export * from './authApi/useAuth';

// Course APIs
export * from './courseApi/courseApi';
export * from './courseApi/UpdateCourseApi';
export * from './courseApi/useCourseDelete';
export * from './courseApi/useModules';
export * from './courseApi/useRatings';

// Enrollment APIs
export * from './enrollmentApi/enrollmentApi';
export * from './enrollmentApi/useEnrollments';

// Internship APIs
export * from './internshipApi';

// Notification APIs
export * from './notificationApi';

// Profile APIs
export * from './useProfile';

// User Management APIs
export * from './useUsers';

// Virtual Labs APIs
export * from './useVirtualLabs';

// Forums APIs
export * from './useForums';

// Existing utility services
export * from './api';
export { baseURL } from './baseUrl.jsx';
export * from './queryClientComponent';
export * from './useProfileImage';
export * from './useQuizzes';
export * from './useUserCourses';
