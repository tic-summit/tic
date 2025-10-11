import React, { useState, useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContexts';
import {
  // Course APIs
  getAllCourses,
  getCourseById,
  enrollInCourse,
  checkEnrollmentStatus,
  
  // User APIs
  useAllUsers,
  useUpdateUser,
  
  // Notification APIs
  useNotifications,
  useMarkAllNotificationsAsRead,
  useCreateNotification,
  
  // Internship APIs
  useInternships,
  useSubmitApplication,
  useAllApplications,
  
  // Virtual Lab APIs
  useVirtualLabSessions,
  useCreateVirtualLabSession,
  useJoinVirtualLabSession,
  
  // Forum APIs
  useForumPosts,
  useCreateForumPost,
  
  // Profile APIs
  useProfile,
  useUploadProfileImage,
  
  // Rating APIs
  useSubmitCourseRating,
  useCourseRatings
} from '@/services';

const IntegratedApiExample = () => {
  const { user, token } = useAuth();
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  // Hooks for different functionalities
  const { data: notifications } = useNotifications();
  const { data: users } = useAllUsers(user?.role === 'admin' ? {} : { enabled: false });
  const { data: internships } = useInternships();
  const { data: virtualLabs } = useVirtualLabSessions();
  const { data: forumPosts } = useForumPosts(selectedCourse?._id);
  
  // Mutations
  const markAllReadMutation = useMarkAllNotificationsAsRead();
  const createNotificationMutation = useCreateNotification();
  const updateUserMutation = useUpdateUser();
  const submitApplicationMutation = useSubmitApplication();
  const createVirtualLabMutation = useCreateVirtualLabSession();
  const createForumPostMutation = useCreateForumPost();
  const uploadImageMutation = useUploadProfileImage();
  const submitRatingMutation = useSubmitCourseRating();

  // Load courses on component mount
  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = async () => {
    try {
      const coursesData = await getAllCourses();
      setCourses(coursesData.data || []);
    } catch (error) {
      console.error('Failed to load courses:', error);
    } finally {
      setLoading(false);
    }
  };

  // Example: Enroll in course and check status
  const handleEnrollInCourse = async (courseId) => {
    try {
      setLoading(true);
      
      // Check if already enrolled
      const enrollmentStatus = await checkEnrollmentStatus(courseId, token);
      if (enrollmentStatus) {
        alert('You are already enrolled in this course!');
        return;
      }

      // Enroll in course
      const enrollmentResult = await enrollInCourse(courseId, token);
      alert('Successfully enrolled in course!');
      
      // Create notification for successful enrollment
      await createNotificationMutation.mutateAsync({
        notificationData: {
          title: 'Course Enrollment',
          message: `Successfully enrolled in ${selectedCourse?.title}`,
          type: 'success'
        },
        token
      });
      
    } catch (error) {
      alert('Enrollment failed: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  // Example: Submit internship application
  const handleApplyToInternship = async (internshipId, applicationData) => {
    try {
      await submitApplicationMutation.mutateAsync({
        internshipId,
        applicationData
      });
      
      // Create notification for application submission
      await createNotificationMutation.mutateAsync({
        notificationData: {
          title: 'Application Submitted',
          message: 'Your internship application has been submitted successfully',
          type: 'info'
        },
        token
      });
      
      alert('Application submitted successfully!');
    } catch (error) {
      alert('Application failed: ' + error.message);
    }
  };

  // Example: Create and join virtual lab
  const handleCreateAndJoinVirtualLab = async (labData) => {
    try {
      // Create virtual lab session
      const labSession = await createVirtualLabMutation.mutateAsync({
        sessionData: labData,
        token
      });
      
      // Join the created session
      // await useJoinVirtualLabSession().mutateAsync({
      //   sessionId: labSession.data._id,
      //   token
      // });
      
      alert('Virtual lab created and joined successfully!');
    } catch (error) {
      alert('Failed to create virtual lab: ' + error.message);
    }
  };

  // Example: Rate a course and create forum post
  const handleRateAndDiscussCourse = async (courseId, rating, review) => {
    try {
      // Submit course rating
      await submitRatingMutation.mutateAsync({
        courseId,
        ratingData: { rating, review },
        token
      });
      
      // Create a forum post about the rating
      await createForumPostMutation.mutateAsync({
        postData: {
          courseId,
          title: `Course Review: ${rating}/5 stars`,
          content: review
        },
        token
      });
      
      alert('Rating and forum post submitted successfully!');
    } catch (error) {
      alert('Failed to submit rating: ' + error.message);
    }
  };

  // Example: Admin function to update user and notify
  const handleAdminUpdateUser = async (userId, updateData) => {
    if (user?.role !== 'admin') {
      alert('Access denied: Admin only');
      return;
    }

    try {
      // Update user
      await updateUserMutation.mutateAsync({
        userId,
        userData: updateData,
        token
      });
      
      // Notify user of changes
      await createNotificationMutation.mutateAsync({
        notificationData: {
          title: 'Profile Updated',
          message: 'Your profile has been updated by an administrator',
          type: 'info'
        },
        token
      });
      
      alert('User updated successfully!');
    } catch (error) {
      alert('Failed to update user: ' + error.message);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading comprehensive dashboard...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      <h1 className="text-3xl font-bold text-center">
        Integrated API Example Dashboard
      </h1>
      
      {/* User Info Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">User Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p><strong>Name:</strong> {user?.name}</p>
            <p><strong>Email:</strong> {user?.email}</p>
            <p><strong>Role:</strong> {user?.role}</p>
          </div>
          <div className="space-y-2">
            <button
              onClick={() => markAllReadMutation.mutate({ token })}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Mark All Notifications Read ({notifications?.data?.filter(n => !n.isRead).length || 0})
            </button>
          </div>
        </div>
      </div>

      {/* Courses Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Available Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses.slice(0, 6).map((course) => (
            <div key={course._id} className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
              <h3 className="font-semibold text-lg">{course.title}</h3>
              <p className="text-gray-600 text-sm mb-2">{course.description}</p>
              <p className="text-sm"><strong>Instructor:</strong> {course.instructor?.name}</p>
              <p className="text-sm"><strong>Price:</strong> ${course.price}</p>
              <div className="mt-4 space-y-2">
                <button
                  onClick={() => handleEnrollInCourse(course._id)}
                  className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                >
                  Enroll Now
                </button>
                <button
                  onClick={() => setSelectedCourse(course)}
                  className="w-full px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selected Course Details */}
      {selectedCourse && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Course: {selectedCourse.title}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Course Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleRateAndDiscussCourse(
                    selectedCourse._id, 
                    5, 
                    'Great course! Highly recommended.'
                  )}
                  className="w-full px-4 py-2 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Rate Course (5 stars)
                </button>
                <button
                  onClick={() => {
                    const postData = {
                      title: 'Question about ' + selectedCourse.title,
                      content: 'I have a question about this course content...'
                    };
                    createForumPostMutation.mutate({
                      postData: { ...postData, courseId: selectedCourse._id },
                      token
                    });
                  }}
                  className="w-full px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-600"
                >
                  Create Forum Post
                </button>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Recent Forum Posts</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {forumPosts?.data?.slice(0, 3).map((post) => (
                  <div key={post._id} className="p-2 border rounded text-sm">
                    <p className="font-medium">{post.title}</p>
                    <p className="text-gray-600 text-xs">By: {post.author?.name}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Internships Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Available Internships</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {internships?.data?.slice(0, 4).map((internship) => (
            <div key={internship._id} className="border rounded-lg p-4">
              <h3 className="font-semibold">{internship.title}</h3>
              <p className="text-sm text-gray-600">{internship.company}</p>
              <p className="text-sm">{internship.location}</p>
              <button
                onClick={() => handleApplyToInternship(internship._id, {
                  resumeFile: null, // Would need actual file
                  applicationLetter: 'I am interested in this position...',
                  school: 'My University',
                  year: '2024'
                })}
                className="mt-2 px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600"
              >
                Apply Now
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Virtual Labs Section */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Virtual Labs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold mb-2">Create New Lab</h3>
            <button
              onClick={() => handleCreateAndJoinVirtualLab({
                title: 'Python Programming Lab',
                description: 'Learn Python basics in a virtual environment',
                labType: 'programming',
                maxParticipants: 20
              })}
              className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600"
            >
              Create Python Lab
            </button>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Available Labs</h3>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {virtualLabs?.data?.slice(0, 3).map((lab) => (
                <div key={lab._id} className="p-2 border rounded text-sm">
                  <p className="font-medium">{lab.title}</p>
                  <p className="text-gray-600 text-xs">
                    {lab.participants?.length || 0}/{lab.maxParticipants} participants
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Admin Section */}
      {user?.role === 'admin' && (
        <div className="bg-white p-6 rounded-lg shadow-md border-l-4 border-red-500">
          <h2 className="text-xl font-semibold mb-4 text-red-700">Admin Controls</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold mb-2">User Management</h3>
              <div className="space-y-2 max-h-40 overflow-y-auto">
                {users?.data?.slice(0, 5).map((userData) => (
                  <div key={userData._id} className="flex justify-between items-center p-2 border rounded">
                    <div>
                      <p className="text-sm font-medium">{userData.name}</p>
                      <p className="text-xs text-gray-600">{userData.role}</p>
                    </div>
                    <button
                      onClick={() => handleAdminUpdateUser(userData._id, {
                        role: userData.role === 'student' ? 'instructor' : 'student'
                      })}
                      className="px-2 py-1 text-xs bg-gray-500 text-white rounded hover:bg-gray-600"
                    >
                      Toggle Role
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">System Actions</h3>
              <div className="space-y-2">
                <button
                  onClick={() => createNotificationMutation.mutate({
                    notificationData: {
                      title: 'System Maintenance',
                      message: 'System maintenance scheduled for tonight',
                      type: 'warning'
                    },
                    token
                  })}
                  className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Send System Notification
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Notifications */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Recent Notifications</h2>
        <div className="space-y-2 max-h-48 overflow-y-auto">
          {notifications?.data?.slice(0, 5).map((notification) => (
            <div
              key={notification._id}
              className={`p-3 border rounded ${
                notification.isRead ? 'bg-gray-50' : 'bg-blue-50 border-blue-200'
              }`}
            >
              <p className="font-medium">{notification.title}</p>
              <p className="text-sm text-gray-600">{notification.message}</p>
              <p className="text-xs text-gray-500 mt-1">
                {new Date(notification.createdAt).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntegratedApiExample;
