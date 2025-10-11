import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContexts';
import {
  useAllCourses,
  getAllCourses,
  getCourseById,
  useEnrollInCourse,
  useUserCourseRating,
  useSubmitCourseRating,
  useAllUsers,
  useUpdateUser,
  useNotifications,
  useMarkAllNotificationsAsRead,
  useVirtualLabSessions,
  useCreateVirtualLabSession,
  useForumPosts,
  useCreateForumPost
} from '@/services';

const ComprehensiveDashboard = () => {
  const { user, token } = useAuth();
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  // Course-related hooks
  const { data: courses, isLoading: coursesLoading } = useAllCourses();
  const enrollMutation = useEnrollInCourse();
  const ratingMutation = useSubmitCourseRating();

  // User management (Admin only)
  const { data: users, isLoading: usersLoading } = useAllUsers(
    user?.role === 'admin' ? {} : { enabled: false }
  );
  const updateUserMutation = useUpdateUser();

  // Notifications
  const { data: notifications } = useNotifications();
  const markAllReadMutation = useMarkAllNotificationsAsRead();

  // Virtual Labs
  const { data: labSessions } = useVirtualLabSessions();
  const createLabMutation = useCreateVirtualLabSession();

  // Forums
  const { data: forumPosts } = useForumPosts(selectedCourseId);
  const createForumPostMutation = useCreateForumPost();

  // Handle course enrollment
  const handleEnrollInCourse = async (courseId) => {
    try {
      await enrollMutation.mutateAsync({
        courseId,
        token
      });
      alert('Successfully enrolled in course!');
    } catch (error) {
      alert('Failed to enroll: ' + error.message);
    }
  };

  // Handle course rating
  const handleRateCourse = async (courseId, rating, review) => {
    try {
      await ratingMutation.mutateAsync({
        courseId,
        ratingData: { rating, review },
        token
      });
      alert('Rating submitted successfully!');
    } catch (error) {
      alert('Failed to submit rating: ' + error.message);
    }
  };

  // Handle user role update (Admin only)
  const handleUpdateUserRole = async (userId, newRole) => {
    try {
      await updateUserMutation.mutateAsync({
        userId,
        userData: { role: newRole },
        token
      });
      alert('User role updated successfully!');
    } catch (error) {
      alert('Failed to update user role: ' + error.message);
    }
  };

  // Handle creating virtual lab session
  const handleCreateVirtualLab = async (labData) => {
    try {
      await createLabMutation.mutateAsync({
        sessionData: {
          title: labData.title,
          description: labData.description,
          labType: labData.type,
          maxParticipants: labData.maxParticipants
        },
        token
      });
      alert('Virtual lab session created successfully!');
    } catch (error) {
      alert('Failed to create virtual lab: ' + error.message);
    }
  };

  // Handle creating forum post
  const handleCreateForumPost = async (courseId, postData) => {
    try {
      await createForumPostMutation.mutateAsync({
        postData: {
          courseId,
          title: postData.title,
          content: postData.content
        },
        token
      });
      alert('Forum post created successfully!');
    } catch (error) {
      alert('Failed to create forum post: ' + error.message);
    }
  };

  if (coursesLoading) {
    return <div className="p-4">Loading dashboard...</div>;
  }

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold">Comprehensive Dashboard</h1>
      
      {/* User Info */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-2">Welcome, {user?.name}</h2>
        <p>Role: {user?.role}</p>
        <p>Email: {user?.email}</p>
      </div>

      {/* Notifications */}
      <div className="bg-white p-4 rounded-lg shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Notifications</h2>
          <button
            onClick={() => markAllReadMutation.mutate({ token })}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            Mark All Read
          </button>
        </div>
        <div className="space-y-2">
          {notifications?.data?.slice(0, 5).map((notification) => (
            <div key={notification._id} className="p-2 border rounded">
              <p className="font-medium">{notification.title}</p>
              <p className="text-sm text-gray-600">{notification.message}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Courses Section */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Available Courses</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {courses?.data?.map((course) => (
            <div key={course._id} className="border rounded-lg p-4">
              <h3 className="font-semibold">{course.title}</h3>
              <p className="text-sm text-gray-600 mb-2">{course.description}</p>
              <p className="text-sm">Instructor: {course.instructor?.name}</p>
              <p className="text-sm">Price: ${course.price}</p>
              <div className="mt-3 space-y-2">
                <button
                  onClick={() => handleEnrollInCourse(course._id)}
                  className="w-full px-4 py-2 bg-green-500 text-white rounded"
                  disabled={enrollMutation.isPending}
                >
                  {enrollMutation.isPending ? 'Enrolling...' : 'Enroll'}
                </button>
                <button
                  onClick={() => setSelectedCourseId(course._id)}
                  className="w-full px-4 py-2 bg-blue-500 text-white rounded"
                >
                  View Forums
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Forum Posts (when course selected) */}
      {selectedCourseId && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">
            Forum Posts for Selected Course
          </h2>
          <div className="mb-4">
            <ForumPostForm
              onSubmit={(postData) => handleCreateForumPost(selectedCourseId, postData)}
              isLoading={createForumPostMutation.isPending}
            />
          </div>
          <div className="space-y-3">
            {forumPosts?.data?.map((post) => (
              <div key={post._id} className="border rounded p-3">
                <h4 className="font-medium">{post.title}</h4>
                <p className="text-sm text-gray-600">{post.content}</p>
                <p className="text-xs text-gray-500 mt-2">
                  By: {post.author?.name} | {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Virtual Labs */}
      <div className="bg-white p-4 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Virtual Lab Sessions</h2>
        <div className="mb-4">
          <VirtualLabForm
            onSubmit={handleCreateVirtualLab}
            isLoading={createLabMutation.isPending}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {labSessions?.data?.map((session) => (
            <div key={session._id} className="border rounded p-4">
              <h3 className="font-semibold">{session.title}</h3>
              <p className="text-sm text-gray-600">{session.description}</p>
              <p className="text-sm">Type: {session.labType}</p>
              <p className="text-sm">Status: {session.status}</p>
              <p className="text-sm">
                Participants: {session.participants?.length || 0}/{session.maxParticipants}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Admin Section */}
      {user?.role === 'admin' && (
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">User Management (Admin)</h2>
          {usersLoading ? (
            <p>Loading users...</p>
          ) : (
            <div className="space-y-2">
              {users?.data?.slice(0, 10).map((userData) => (
                <div key={userData._id} className="flex justify-between items-center p-2 border rounded">
                  <div>
                    <p className="font-medium">{userData.name}</p>
                    <p className="text-sm text-gray-600">{userData.email}</p>
                    <p className="text-sm">Role: {userData.role}</p>
                  </div>
                  <select
                    value={userData.role}
                    onChange={(e) => handleUpdateUserRole(userData._id, e.target.value)}
                    className="px-2 py-1 border rounded"
                  >
                    <option value="student">Student</option>
                    <option value="instructor">Instructor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

// Forum Post Form Component
const ForumPostForm = ({ onSubmit, isLoading }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, content });
    setTitle('');
    setContent('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        placeholder="Post title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        placeholder="Post content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full p-2 border rounded h-20"
        required
      />
      <button
        type="submit"
        disabled={isLoading}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        {isLoading ? 'Creating...' : 'Create Post'}
      </button>
    </form>
  );
};

// Virtual Lab Form Component
const VirtualLabForm = ({ onSubmit, isLoading }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('programming');
  const [maxParticipants, setMaxParticipants] = useState(10);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ title, description, type, maxParticipants });
    setTitle('');
    setDescription('');
    setType('programming');
    setMaxParticipants(10);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <input
        type="text"
        placeholder="Lab title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full p-2 border rounded"
        required
      />
      <textarea
        placeholder="Lab description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full p-2 border rounded h-16"
        required
      />
      <div className="flex gap-4">
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="flex-1 p-2 border rounded"
        >
          <option value="programming">Programming</option>
          <option value="networking">Networking</option>
          <option value="database">Database</option>
          <option value="cybersecurity">Cybersecurity</option>
        </select>
        <input
          type="number"
          placeholder="Max participants"
          value={maxParticipants}
          onChange={(e) => setMaxParticipants(parseInt(e.target.value))}
          className="flex-1 p-2 border rounded"
          min="1"
          max="50"
          required
        />
      </div>
      <button
        type="submit"
        disabled={isLoading}
        className="px-4 py-2 bg-green-500 text-white rounded"
      >
        {isLoading ? 'Creating...' : 'Create Virtual Lab'}
      </button>
    </form>
  );
};

export default ComprehensiveDashboard;
