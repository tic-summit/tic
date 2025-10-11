# TIC Learning Management System - API Implementation

This document outlines all the implemented APIs based on the backend documentation provided. All APIs have been implemented with proper error handling, authentication, and React Query integration.

## 🚀 Quick Start

```javascript
// Import any API functions you need
import {
  // Auth APIs
  loginUser,
  signupUser,
  // Course APIs
  getAllCourses,
  useEnrollInCourse,
  // User Management
  useAllUsers,
  // etc.
} from '@/services';

// Or import specific services
import { useAllCourses } from '@/services/courseApi/courseApi';
import { useNotifications } from '@/services/notificationApi/useNotifications';
```

## 📚 Available APIs

### 🔐 Authentication APIs
**Location**: `services/authApi/authApi.js`

- ✅ `signupUser(userData)` - Register new user
- ✅ `loginUser(credentials)` - User login
- ✅ `refreshToken(refreshToken)` - Refresh access token
- ✅ `logoutUser(refreshToken)` - User logout
- ✅ `verifyEmail(token)` - Verify email address
- ✅ `forgotPassword(email)` - Request password reset
- ✅ `verifyResetToken(token)` - Verify reset token
- ✅ `resetPassword(token, userId, newPassword)` - Reset password

### 📖 Course APIs
**Location**: `services/courseApi/`

#### Basic Course Operations
- ✅ `getAllCourses()` - Get all courses
- ✅ `getCourseById(courseId)` - Get course details with modules and enrollments
- ✅ `getCoursesByInstructor(instructorId, token)` - Get instructor's courses
- ✅ `getEnrolledCourses(studentId, token)` - Get student's enrolled courses
- ✅ `deleteCourse(courseId, token)` - Delete course

#### Multi-step Course Creation
- ✅ `createCourseStep1(courseData, token)` - Create course basics
- ✅ `updateCourseStep2(courseId, formData, token)` - Upload course media
- ✅ `finalizeCourseCurriculum(courseId, curriculumData, token)` - Add curriculum

#### Course Updates
- ✅ `updateCourseStep1(courseId, courseData, token)` - Update basic info
- ✅ `updateCourseStep3(courseId, curriculumData, token)` - Update curriculum

#### Course Content
- ✅ `getInstructorQuizzes(instructorId, token)` - Get instructor's quizzes
- ✅ `getInstructorModules(instructorId, token)` - Get instructor's modules
- ✅ `getStudentCourseModules(studentId, courseId, token)` - Get student course modules
- ✅ `getStudentCourseQuizzes(studentId, courseId, token)` - Get student course quizzes

### 📝 Enrollment APIs
**Location**: `services/enrollmentApi/enrollmentApi.js`

- ✅ `enrollInCourse(courseId, token)` - Enroll in course
- ✅ `getInstructorEnrollments(instructorId, token)` - Get instructor enrollments
- ✅ `manualEnrollStudent(enrollmentData, token)` - Manual enrollment
- ✅ `getStudentEnrollments(token)` - Get student enrollments
- ✅ `checkEnrollmentStatus(courseId, token)` - Check enrollment status
- ✅ `updateCourseProgress(courseId, progressData, token)` - Update progress

### 💼 Internship APIs
**Location**: `services/internshipApi/`

#### Basic Internship Operations
- ✅ `useInternships(options)` - Get all internships with filtering
- ✅ `useInternship(internshipId)` - Get specific internship
- ✅ `useCreateInternship()` - Create internship (Admin)
- ✅ `useUpdateInternship()` - Update internship (Admin)
- ✅ `useDeleteInternship()` - Delete internship (Admin)
- ✅ `useCompanyInternships(companyId)` - Get company internships
- ✅ `useFeaturedInternships(limit)` - Get featured internships

#### Internship Applications
- ✅ `useSubmitApplication()` - Submit application
- ✅ `useUpdateApplicationStatus()` - Update status (Admin/Mentor)
- ✅ `useAllApplications(options)` - Get all applications (Admin/Mentor)
- ✅ `useMyApplications(options)` - Get user applications
- ✅ `useBulkUpdateApplicationStatus()` - Bulk status update

#### Daily Activities
- ✅ `useSubmitDailyActivity()` - Submit daily activity
- ✅ `useUpdateDailyActivity()` - Update activity
- ✅ `useApproveDailyActivity()` - Approve activity (Mentor/Admin)
- ✅ `useRejectDailyActivity()` - Reject activity (Mentor/Admin)
- ✅ `useStudentDailyActivities(studentId)` - Get student activities
- ✅ `useAllDailyActivities(options)` - Get all activities (Mentor/Admin)

#### Attendance Management
- ✅ `useSubmitAttendance()` - Submit attendance
- ✅ `useUpdateAttendance()` - Update attendance
- ✅ `useStudentAttendance(studentId)` - Get student attendance
- ✅ `useAllAttendanceRecords(options)` - Get all attendance (Mentor/Admin)
- ✅ `useAttendanceStats(studentId)` - Get attendance statistics

#### Progress Reports
- ✅ `useSubmitProgressReport()` - Submit progress report
- ✅ `useSubmitFinalProgressReport()` - Submit final report
- ✅ `useStudentProgressReports(studentId)` - Get student reports
- ✅ `useAllProgressReports(options)` - Get all reports (Mentor/Admin)

### 🏗️ Module Management APIs
**Location**: `services/courseApi/useModules.js`

#### Module Operations
- ✅ `useCreateModule()` - Create module
- ✅ `useCourseModules(courseId)` - Get course modules
- ✅ `useModule(moduleId)` - Get module by ID
- ✅ `useUpdateModule()` - Update module
- ✅ `useDeleteModule()` - Delete module
- ✅ `useReorderModules()` - Reorder modules

#### Topic Operations
- ✅ `useCreateTopic()` - Create topic
- ✅ `useUpdateTopic()` - Update topic
- ✅ `useDeleteTopic()` - Delete topic

#### Quiz Operations
- ✅ `useCreateQuiz()` - Create quiz
- ✅ `useQuiz(quizId)` - Get quiz by ID
- ✅ `useUpdateQuiz()` - Update quiz
- ✅ `useDeleteQuiz()` - Delete quiz

#### Summary Operations
- ✅ `useCreateSummary()` - Create summary
- ✅ `useSummary(summaryId)` - Get summary by ID
- ✅ `useUpdateSummary()` - Update summary
- ✅ `useDeleteSummary()` - Delete summary

### 🔔 Notification APIs
**Location**: `services/notificationApi/useNotifications.js`

- ✅ `useNotifications(options)` - Get user notifications
- ✅ `useUnreadNotificationCount()` - Get unread count
- ✅ `useNotificationStats(days)` - Get notification statistics
- ✅ `useMarkNotificationAsRead()` - Mark as read
- ✅ `useMarkAllNotificationsAsRead()` - Mark all as read
- ✅ `useDeleteNotification()` - Delete notification
- ✅ `useClearAllNotifications()` - Clear all notifications
- ✅ `useCreateNotification()` - Create notification (Admin)
- ✅ `useNotificationPreferences()` - Get preferences
- ✅ `useUpdateNotificationPreferences()` - Update preferences
- ✅ `useNotificationSettings()` - Get admin settings
- ✅ `useUpdateNotificationSettings()` - Update admin settings

### 👤 Profile APIs
**Location**: `services/useProfile.js`

- ✅ `useUploadProfileImage()` - Upload profile image
- ✅ `useProfileImage(userId)` - Get profile image
- ✅ `useUpdateProfile()` - Update profile
- ✅ `useProfile(userId)` - Get user profile

### ⭐ Rating APIs
**Location**: `services/courseApi/useRatings.js`

- ✅ `useSubmitCourseRating()` - Submit course rating
- ✅ `useCourseRatings(courseId)` - Get course ratings
- ✅ `useUserCourseRating(courseId, userId)` - Get user's rating
- ✅ `useUpdateCourseRating()` - Update rating
- ✅ `useDeleteCourseRating()` - Delete rating
- ✅ `useCourseRatingStats(courseId)` - Get rating statistics

### 👥 User Management APIs
**Location**: `services/useUsers.js`

- ✅ `useAllUsers(options)` - Get all users (Admin)
- ✅ `useUser(userId)` - Get user by ID
- ✅ `useCreateUser()` - Create user (Admin)
- ✅ `useUpdateUser()` - Update user (Admin)
- ✅ `useDeleteUser()` - Delete user (Admin)
- ✅ `useUpdateUserRole()` - Update user role (Admin)
- ✅ `useUpdateUserStatus()` - Update user status (Admin)
- ✅ `useUserStats()` - Get user statistics (Admin)
- ✅ `useBulkUpdateUsers()` - Bulk update users (Admin)

### 🧪 Virtual Labs APIs
**Location**: `services/useVirtualLabs.js`

- ✅ `useCreateVirtualLabSession()` - Create lab session
- ✅ `useVirtualLabSessions(options)` - Get all sessions
- ✅ `useVirtualLabSession(sessionId)` - Get session by ID
- ✅ `useUpdateVirtualLabSession()` - Update session
- ✅ `useDeleteVirtualLabSession()` - Delete session
- ✅ `useJoinVirtualLabSession()` - Join session
- ✅ `useLeaveVirtualLabSession()` - Leave session
- ✅ `useUserVirtualLabSessions(userId)` - Get user sessions
- ✅ `useVirtualLabTemplates()` - Get templates
- ✅ `useCreateVirtualLabTemplate()` - Create template (Admin)

### 💬 Forum APIs
**Location**: `services/useForums.js`

- ✅ `useForumPosts(courseId)` - Get forum posts for course
- ✅ `useCreateForumPost()` - Create forum post
- ✅ `useReplyToForumPost()` - Reply to post
- ✅ `useForumPost(postId)` - Get forum post by ID
- ✅ `useUpdateForumPost()` - Update forum post
- ✅ `useDeleteForumPost()` - Delete forum post

## 🎯 Usage Examples

### Basic Course Operations
```javascript
import { useAllCourses, useEnrollInCourse } from '@/services';

function CoursesPage() {
  const { data: courses, isLoading } = useAllCourses();
  const enrollMutation = useEnrollInCourse();
  
  const handleEnroll = async (courseId) => {
    try {
      await enrollMutation.mutateAsync({ courseId, token });
      alert('Enrolled successfully!');
    } catch (error) {
      alert('Enrollment failed: ' + error.message);
    }
  };
  
  // Component JSX...
}
```

### User Management (Admin)
```javascript
import { useAllUsers, useUpdateUserRole } from '@/services';

function AdminUserManagement() {
  const { data: users } = useAllUsers();
  const updateRoleMutation = useUpdateUserRole();
  
  const handleRoleChange = async (userId, newRole) => {
    await updateRoleMutation.mutateAsync({ userId, role: newRole, token });
  };
  
  // Component JSX...
}
```

### Internship Management
```javascript
import { 
  useInternships, 
  useSubmitApplication,
  useSubmitDailyActivity 
} from '@/services';

function InternshipDashboard() {
  const { data: internships } = useInternships();
  const applyMutation = useSubmitApplication();
  const activityMutation = useSubmitDailyActivity();
  
  // Component logic...
}
```

### Virtual Labs
```javascript
import { 
  useVirtualLabSessions, 
  useCreateVirtualLabSession,
  useJoinVirtualLabSession 
} from '@/services';

function VirtualLabsPage() {
  const { data: sessions } = useVirtualLabSessions();
  const createMutation = useCreateVirtualLabSession();
  const joinMutation = useJoinVirtualLabSession();
  
  // Component logic...
}
```

## 🔧 Configuration

### Base URL Configuration
The base URL is configured in `services/baseUrl.jsx`. Make sure it points to your backend API:

```javascript
export const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';
```

### Authentication
Most APIs require authentication. The token should be passed from your auth context:

```javascript
import { useAuth } from '@/contexts/AuthContexts';

function MyComponent() {
  const { token } = useAuth();
  
  // Use token in API calls
  const mutation = useSomeAPI();
  mutation.mutate({ data, token });
}
```

## 📁 File Structure

```
services/
├── index.js                     # Main exports
├── api.js                       # Base API configuration
├── baseUrl.jsx                  # Base URL configuration
├── authApi/
│   └── authApi.js              # Authentication APIs
├── courseApi/
│   ├── courseApi.js            # Course management
│   ├── UpdateCourseApi.js      # Course updates
│   ├── useCourseDelete.js      # Course deletion
│   ├── useModules.js           # Module management
│   └── useRatings.js           # Course ratings
├── enrollmentApi/
│   ├── enrollmentApi.js        # Enrollment operations
│   └── useEnrollments.js       # Enrollment hooks
├── internshipApi/
│   ├── index.js                # Internship exports
│   ├── useInternships.js       # Basic internship ops
│   ├── useInternshipApplications.js  # Applications
│   ├── useDailyActivities.js   # Daily activities
│   ├── useAttendance.js        # Attendance management
│   ├── useProgressReports.js   # Progress reports
│   └── useInternshipManagement.js
├── notificationApi/
│   ├── index.js
│   └── useNotifications.js     # Notification management
├── useProfile.js               # Profile management
├── useUsers.js                 # User management
├── useVirtualLabs.js           # Virtual labs
└── useForums.js                # Forum management
```

## 🚨 Error Handling

All APIs include comprehensive error handling:

```javascript
try {
  const result = await apiCall();
  // Handle success
} catch (error) {
  // Error message is available in error.message
  console.error('API Error:', error.message);
  // Show user-friendly error message
}
```

## 🔄 React Query Integration

All APIs use React Query for:
- ✅ Automatic caching
- ✅ Background refetching
- ✅ Optimistic updates
- ✅ Error boundaries
- ✅ Loading states

## 📋 Response Formats

All APIs follow consistent response formats from the backend:

### Success Response (200/201)
```json
{
  "success": true,
  "data": { /* actual data */ },
  "message": "Operation completed successfully"
}
```

### Error Response (400/401/403/404/500)
```json
{
  "success": false,
  "message": "Error description",
  "errors": [ /* validation errors if any */ ]
}
```

## 🔐 Authentication & Authorization

APIs are protected based on user roles:
- **Public**: Course listing, course details
- **Student**: Enrollment, progress, assignments
- **Instructor**: Course creation, student management
- **Admin**: User management, system settings
- **Mentor**: Internship supervision, progress review

## 📊 Example Dashboard Integration

See `components/ComprehensiveDashboard.jsx` for a complete example of how to integrate multiple APIs in a single dashboard component.

---

**Note**: This implementation covers all endpoints documented in the backend API specification. Each API includes proper TypeScript support, error handling, and React Query integration for optimal performance and user experience.
