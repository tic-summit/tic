import React, { useState } from 'react';
import { 
  Users, 
  BookOpen, 
  Briefcase, 
  TrendingUp, 
  Settings, 
  Shield,
  AlertTriangle,
  Bell,
  BarChart3,
  UserCheck,
  UserX,
  Crown,
  Eye,
  Edit,
  Trash2,
  Plus,
  Download,
  Search,
  Filter
} from 'lucide-react';
import { 
  useAllUsers,
  useUpdateUser,
  useDeleteUser,
  useCreateUser,
  useUpdateUserRole,
  useUpdateUserStatus,
  useUserStats,
  useBulkUpdateUsers,
  getAllCourses,
  useAllApplications,
  useNotifications,
  useCreateNotification
} from '@/services';
import { useAuth } from '@/contexts/AuthContexts';

const EnhancedAdminDashboard = () => {
  const { user, token } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student'
  });

  // API hooks
  const { data: users, isLoading: usersLoading } = useAllUsers();
  const { data: userStats } = useUserStats();
  const { data: applications } = useAllApplications();
  const { data: notifications } = useNotifications();
  
  const updateUserMutation = useUpdateUser();
  const deleteUserMutation = useDeleteUser();
  const createUserMutation = useCreateUser();
  const updateRoleMutation = useUpdateUserRole();
  const updateStatusMutation = useUpdateUserStatus();
  const bulkUpdateMutation = useBulkUpdateUsers();
  const createNotificationMutation = useCreateNotification();

  // Filter users
  const filteredUsers = users?.data?.filter(u => {
    const matchesSearch = u.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         u.email?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || u.role === filterRole;
    return matchesSearch && matchesRole;
  }) || [];

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      await createUserMutation.mutateAsync({
        userData: newUserData,
        token
      });
      setShowCreateUserModal(false);
      setNewUserData({ name: '', email: '', password: '', role: 'student' });
      alert('User created successfully!');
    } catch (error) {
      alert('Failed to create user: ' + error.message);
    }
  };

  const handleUpdateUserRole = async (userId, newRole) => {
    try {
      await updateRoleMutation.mutateAsync({
        userId,
        role: newRole,
        token
      });
      alert('User role updated successfully!');
    } catch (error) {
      alert('Failed to update role: ' + error.message);
    }
  };

  const handleUpdateUserStatus = async (userId, newStatus) => {
    try {
      await updateStatusMutation.mutateAsync({
        userId,
        status: newStatus,
        token
      });
      alert('User status updated successfully!');
    } catch (error) {
      alert('Failed to update status: ' + error.message);
    }
  };

  const handleBulkAction = async (action) => {
    if (selectedUsers.length === 0) {
      alert('Please select users first');
      return;
    }

    try {
      let updateData = {};
      switch (action) {
        case 'activate':
          updateData = { status: 'active' };
          break;
        case 'deactivate':
          updateData = { status: 'inactive' };
          break;
        case 'verify':
          updateData = { emailVerified: true };
          break;
        default:
          return;
      }

      await bulkUpdateMutation.mutateAsync({
        userIds: selectedUsers,
        updateData,
        token
      });
      setSelectedUsers([]);
      alert(`Successfully ${action}d ${selectedUsers.length} users`);
    } catch (error) {
      alert(`Failed to ${action} users: ` + error.message);
    }
  };

  const handleSendNotification = async (notificationData) => {
    try {
      await createNotificationMutation.mutateAsync({
        notificationData,
        token
      });
      alert('Notification sent successfully!');
    } catch (error) {
      alert('Failed to send notification: ' + error.message);
    }
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin':
        return 'bg-red-100 text-red-800';
      case 'instructor':
        return 'bg-blue-100 text-blue-800';
      case 'mentor':
        return 'bg-purple-100 text-purple-800';
      case 'student':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, change }) => (
    <div className="bg-white p-6 rounded-lg shadow border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {change && (
            <p className={`text-sm ${change > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {change > 0 ? '+' : ''}{change}% from last month
            </p>
          )}
        </div>
        <Icon className={`h-8 w-8 ${color}`} />
      </div>
    </div>
  );

  if (usersLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-gray-200 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage users, content, and system settings</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowCreateUserModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Plus size={16} />
            Add User
          </button>
          <button
            onClick={() => handleSendNotification({
              title: 'System Update',
              message: 'System maintenance scheduled for tonight at 2 AM',
              type: 'info'
            })}
            className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-2"
          >
            <Bell size={16} />
            Send Notification
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value={userStats?.totalUsers || users?.data?.length || 0}
          icon={Users}
          color="text-blue-600"
          change={15}
        />
        <StatCard
          title="Active Students"
          value={userStats?.activeStudents || users?.data?.filter(u => u.role === 'student' && u.status === 'active').length || 0}
          icon={UserCheck}
          color="text-green-600"
          change={8}
        />
        <StatCard
          title="Instructors"
          value={userStats?.instructors || users?.data?.filter(u => u.role === 'instructor').length || 0}
          icon={Crown}
          color="text-purple-600"
          change={3}
        />
        <StatCard
          title="Pending Applications"
          value={applications?.data?.filter(app => app.status === 'pending').length || 0}
          icon={AlertTriangle}
          color="text-orange-600"
        />
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow border">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'users', label: 'User Management', icon: Users },
              { id: 'content', label: 'Content', icon: BookOpen },
              { id: 'settings', label: 'Settings', icon: Settings },
              { id: 'security', label: 'Security', icon: Shield }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <tab.icon size={16} />
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Users */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Registrations</h3>
                  <div className="space-y-3">
                    {users?.data?.slice(0, 5).map((user) => (
                      <div key={user._id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getRoleColor(user.role)}`}>
                            {user.role}
                          </span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(user.status)}`}>
                            {user.status}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* System Activity */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">System Activity</h3>
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <p className="text-sm text-gray-900">New course published: "Advanced React Development"</p>
                      <p className="text-xs text-gray-500">2 hours ago</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <p className="text-sm text-gray-900">5 new internship applications received</p>
                      <p className="text-xs text-gray-500">4 hours ago</p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <p className="text-sm text-gray-900">Virtual lab session "Python Basics" completed</p>
                      <p className="text-xs text-gray-500">6 hours ago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div className="space-y-4">
              {/* User Management Controls */}
              <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
                <div className="flex gap-4 flex-1">
                  <div className="relative flex-1 max-w-md">
                    <Search size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <select
                    value={filterRole}
                    onChange={(e) => setFilterRole(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="all">All Roles</option>
                    <option value="student">Students</option>
                    <option value="instructor">Instructors</option>
                    <option value="mentor">Mentors</option>
                    <option value="admin">Admins</option>
                  </select>
                </div>
                
                {selectedUsers.length > 0 && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleBulkAction('activate')}
                      className="px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700"
                    >
                      Activate ({selectedUsers.length})
                    </button>
                    <button
                      onClick={() => handleBulkAction('deactivate')}
                      className="px-3 py-2 bg-red-600 text-white text-sm rounded-lg hover:bg-red-700"
                    >
                      Deactivate ({selectedUsers.length})
                    </button>
                  </div>
                )}
              </div>

              {/* Users Table */}
              <div className="bg-white border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left">
                        <input
                          type="checkbox"
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedUsers(filteredUsers.map(u => u._id));
                            } else {
                              setSelectedUsers([]);
                            }
                          }}
                          checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                          className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Joined
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredUsers.map((userData) => (
                      <tr key={userData._id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(userData._id)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedUsers([...selectedUsers, userData._id]);
                              } else {
                                setSelectedUsers(selectedUsers.filter(id => id !== userData._id));
                              }
                            }}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{userData.name}</div>
                            <div className="text-sm text-gray-500">{userData.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={userData.role}
                            onChange={(e) => handleUpdateUserRole(userData._id, e.target.value)}
                            className={`px-2 py-1 text-xs font-medium rounded-full border-0 ${getRoleColor(userData.role)}`}
                          >
                            <option value="student">Student</option>
                            <option value="instructor">Instructor</option>
                            <option value="mentor">Mentor</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={userData.status}
                            onChange={(e) => handleUpdateUserStatus(userData._id, e.target.value)}
                            className={`px-2 py-1 text-xs font-medium rounded-full border-0 ${getStatusColor(userData.status)}`}
                          >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                            <option value="pending">Pending</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {new Date(userData.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <button className="text-blue-600 hover:text-blue-800">
                              <Eye size={16} />
                            </button>
                            <button className="text-gray-600 hover:text-gray-800">
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm('Are you sure you want to delete this user?')) {
                                  deleteUserMutation.mutate({ userId: userData._id, token });
                                }
                              }}
                              className="text-red-600 hover:text-red-800"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Other tabs would be implemented similarly */}
          {activeTab === 'content' && (
            <div className="text-center py-12">
              <BookOpen size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Content Management</h3>
              <p className="text-gray-600">Manage courses, modules, and learning materials</p>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="text-center py-12">
              <Settings size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">System Settings</h3>
              <p className="text-gray-600">Configure system preferences and integrations</p>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="text-center py-12">
              <Shield size={48} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">Security Settings</h3>
              <p className="text-gray-600">Manage security policies and access controls</p>
            </div>
          )}
        </div>
      </div>

      {/* Create User Modal */}
      {showCreateUserModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New User</h3>
            
            <form onSubmit={handleCreateUser} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={newUserData.name}
                  onChange={(e) => setNewUserData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={newUserData.email}
                  onChange={(e) => setNewUserData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                <input
                  type="password"
                  value={newUserData.password}
                  onChange={(e) => setNewUserData(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                <select
                  value={newUserData.role}
                  onChange={(e) => setNewUserData(prev => ({ ...prev, role: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="student">Student</option>
                  <option value="instructor">Instructor</option>
                  <option value="mentor">Mentor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowCreateUserModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={createUserMutation.isPending}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
                >
                  {createUserMutation.isPending ? 'Creating...' : 'Create User'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedAdminDashboard;
