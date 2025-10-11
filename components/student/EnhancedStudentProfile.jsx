import React, { useState } from 'react';
import { 
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Award,
  BookOpen,
  TrendingUp,
  Star,
  Trophy,
  Target,
  Clock,
  Edit,
  Save,
  X,
  Upload,
  Settings,
  Bell,
  Shield,
  Eye,
  EyeOff,
  Download,
  Share2,
  Camera,
  BarChart3,
  Activity,
  Zap,
  ThumbsUp,
  MessageSquare,
  Heart,
  CheckCircle2,
  AlertCircle,
  BookmarkPlus
} from 'lucide-react';
import { 
  useProfile,
  useUpdateProfile,
  useUserCourses,
  useUserAchievements,
  useUserProgress,
  useUserStats,
  useProfileImage,
  useUpdateProfileImage,
  useUserActivity,
  useUserBookmarks,
  useUserNotifications
} from '@/services';
import { useAuth } from '@/contexts/AuthContexts';

const EnhancedStudentProfile = ({ userId = null }) => {
  const { user, token } = useAuth();
  const targetUserId = userId || user?.id;
  const isOwnProfile = !userId || userId === user?.id;
  
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [editedProfile, setEditedProfile] = useState({});
  const [showImageUpload, setShowImageUpload] = useState(false);

  // API hooks
  const { data: profile, isLoading: profileLoading } = useProfile(targetUserId);
  const { data: userCourses } = useUserCourses(targetUserId);
  const { data: achievements } = useUserAchievements(targetUserId);
  const { data: userProgress } = useUserProgress(targetUserId);
  const { data: userStats } = useUserStats(targetUserId);
  const { data: userActivity } = useUserActivity(targetUserId);
  const { data: userBookmarks } = useUserBookmarks(targetUserId);
  const { data: profileImage } = useProfileImage(targetUserId);
  
  const updateProfileMutation = useUpdateProfile();
  const updateImageMutation = useUpdateProfileImage();

  const handleSaveProfile = async () => {
    try {
      await updateProfileMutation.mutateAsync({
        profileData: editedProfile,
        token
      });
      setIsEditing(false);
      alert('Profile updated successfully!');
    } catch (error) {
      alert('Failed to update profile: ' + error.message);
    }
  };

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    try {
      await updateImageMutation.mutateAsync({
        imageData: formData,
        token
      });
      setShowImageUpload(false);
      alert('Profile image updated successfully!');
    } catch (error) {
      alert('Failed to update image: ' + error.message);
    }
  };

  const getSkillLevel = (level) => {
    switch (level) {
      case 'beginner':
        return { color: 'bg-green-100 text-green-800', label: 'Beginner' };
      case 'intermediate':
        return { color: 'bg-yellow-100 text-yellow-800', label: 'Intermediate' };
      case 'advanced':
        return { color: 'bg-red-100 text-red-800', label: 'Advanced' };
      default:
        return { color: 'bg-gray-100 text-gray-800', label: 'Unknown' };
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, trend }) => (
    <div className="bg-white p-4 rounded-lg border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p className={`text-xs ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend > 0 ? '+' : ''}{trend}% this month
            </p>
          )}
        </div>
        <Icon className={`h-6 w-6 ${color}`} />
      </div>
    </div>
  );

  const AchievementBadge = ({ achievement }) => (
    <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-yellow-50 to-orange-50 border border-yellow-200 rounded-lg">
      <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center">
        <Trophy className="h-6 w-6 text-white" />
      </div>
      <div>
        <h4 className="font-semibold text-gray-900">{achievement.title}</h4>
        <p className="text-sm text-gray-600">{achievement.description}</p>
        <p className="text-xs text-gray-500">
          Earned on {new Date(achievement.earnedAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );

  const CourseCard = ({ course }) => (
    <div className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow">
      <div className="flex items-start justify-between mb-3">
        <h4 className="font-semibold text-gray-900">{course.title}</h4>
        <span className={`px-2 py-1 text-xs rounded-full ${
          course.status === 'completed' ? 'bg-green-100 text-green-800' :
          course.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {course.status}
        </span>
      </div>
      
      <div className="mb-3">
        <div className="flex justify-between text-sm text-gray-600 mb-1">
          <span>Progress</span>
          <span>{course.progress}%</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full" 
            style={{ width: `${course.progress}%` }}
          ></div>
        </div>
      </div>
      
      <div className="flex items-center justify-between text-sm text-gray-500">
        <span>{course.instructor}</span>
        <div className="flex items-center gap-1">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span>{course.rating}</span>
        </div>
      </div>
    </div>
  );

  const ActivityItem = ({ activity }) => (
    <div className="flex items-start gap-3 p-3 hover:bg-gray-50 rounded-lg">
      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
        activity.type === 'course_completed' ? 'bg-green-100 text-green-600' :
        activity.type === 'achievement_earned' ? 'bg-yellow-100 text-yellow-600' :
        activity.type === 'forum_post' ? 'bg-blue-100 text-blue-600' :
        'bg-gray-100 text-gray-600'
      }`}>
        {activity.type === 'course_completed' && <CheckCircle2 size={16} />}
        {activity.type === 'achievement_earned' && <Trophy size={16} />}
        {activity.type === 'forum_post' && <MessageSquare size={16} />}
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-900">{activity.description}</p>
        <p className="text-xs text-gray-500">{new Date(activity.createdAt).toLocaleDateString()}</p>
      </div>
    </div>
  );

  if (profileLoading) {
    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="animate-pulse space-y-6">
          <div className="h-48 bg-gray-200 rounded-lg"></div>
          <div className="grid grid-cols-3 gap-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-24 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-6">
            <div className="relative">
              <div className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center text-2xl font-bold">
                {profileImage ? (
                  <img 
                    src={profileImage} 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  profile?.data?.name?.[0]?.toUpperCase()
                )}
              </div>
              {isOwnProfile && (
                <button
                  onClick={() => setShowImageUpload(true)}
                  className="absolute bottom-0 right-0 w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600"
                >
                  <Camera size={16} />
                </button>
              )}
            </div>
            
            <div>
              <h1 className="text-2xl font-bold">{profile?.data?.name}</h1>
              <p className="text-blue-100">{profile?.data?.title || 'Student'}</p>
              <div className="flex items-center gap-4 mt-2 text-blue-100">
                <div className="flex items-center gap-1">
                  <Mail size={16} />
                  <span className="text-sm">{profile?.data?.email}</span>
                </div>
                {profile?.data?.location && (
                  <div className="flex items-center gap-1">
                    <MapPin size={16} />
                    <span className="text-sm">{profile?.data?.location}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
          
          {isOwnProfile && (
            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSaveProfile}
                    disabled={updateProfileMutation.isPending}
                    className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center gap-2"
                  >
                    <Save size={16} />
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 flex items-center gap-2"
                  >
                    <X size={16} />
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setEditedProfile(profile?.data || {});
                  }}
                  className="px-4 py-2 bg-white/20 text-white rounded-lg hover:bg-white/30 flex items-center gap-2"
                >
                  <Edit size={16} />
                  Edit Profile
                </button>
              )}
            </div>
          )}
        </div>
        
        {/* Bio */}
        <div className="mt-4">
          {isEditing ? (
            <textarea
              value={editedProfile.bio || ''}
              onChange={(e) => setEditedProfile(prev => ({ ...prev, bio: e.target.value }))}
              className="w-full p-3 bg-white/10 rounded-lg text-white placeholder-blue-200 resize-none"
              rows="3"
              placeholder="Tell us about yourself..."
            />
          ) : (
            <p className="text-blue-100">
              {profile?.data?.bio || 'No bio available.'}
            </p>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard
          title="Courses Enrolled"
          value={userCourses?.data?.length || 0}
          icon={BookOpen}
          color="text-blue-600"
          trend={12}
        />
        <StatCard
          title="Courses Completed"
          value={userCourses?.data?.filter(c => c.status === 'completed').length || 0}
          icon={CheckCircle2}
          color="text-green-600"
          trend={25}
        />
        <StatCard
          title="Achievements"
          value={achievements?.data?.length || 0}
          icon={Trophy}
          color="text-yellow-600"
          trend={8}
        />
        <StatCard
          title="Study Hours"
          value={userStats?.data?.totalStudyHours || 0}
          icon={Clock}
          color="text-purple-600"
          trend={15}
        />
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow border">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview', icon: User },
              { id: 'courses', label: 'Courses', icon: BookOpen },
              { id: 'achievements', label: 'Achievements', icon: Trophy },
              { id: 'activity', label: 'Activity', icon: Activity },
              { id: 'skills', label: 'Skills', icon: Zap }
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
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-6">
                {/* Recent Courses */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Courses</h3>
                  <div className="grid gap-4">
                    {userCourses?.data?.slice(0, 3).map((course) => (
                      <CourseCard key={course._id} course={course} />
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-2">
                    {userActivity?.data?.slice(0, 5).map((activity) => (
                      <ActivityItem key={activity._id} activity={activity} />
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                {/* Quick Stats */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Average Grade</span>
                      <span className="font-semibold text-gray-900">85%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Streak Days</span>
                      <span className="font-semibold text-gray-900">12</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                      <span className="text-gray-600">Forum Posts</span>
                      <span className="font-semibold text-gray-900">24</span>
                    </div>
                  </div>
                </div>

                {/* Latest Achievements */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Latest Achievements</h3>
                  <div className="space-y-3">
                    {achievements?.data?.slice(0, 2).map((achievement) => (
                      <div key={achievement._id} className="flex items-center gap-3 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                        <Trophy className="h-8 w-8 text-yellow-600" />
                        <div>
                          <p className="font-medium text-gray-900">{achievement.title}</p>
                          <p className="text-sm text-gray-600">{achievement.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Courses Tab */}
          {activeTab === 'courses' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">All Courses</h3>
                <div className="flex gap-2">
                  <select className="px-3 py-2 border border-gray-300 rounded-lg">
                    <option>All Status</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                  </select>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {userCourses?.data?.map((course) => (
                  <CourseCard key={course._id} course={course} />
                ))}
              </div>
            </div>
          )}

          {/* Achievements Tab */}
          {activeTab === 'achievements' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Achievements</h3>
                <span className="text-sm text-gray-600">
                  {achievements?.data?.length || 0} earned
                </span>
              </div>
              
              <div className="grid gap-4">
                {achievements?.data?.map((achievement) => (
                  <AchievementBadge key={achievement._id} achievement={achievement} />
                ))}
              </div>
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === 'activity' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Activity Timeline</h3>
              
              <div className="space-y-2">
                {userActivity?.data?.map((activity) => (
                  <ActivityItem key={activity._id} activity={activity} />
                ))}
              </div>
            </div>
          )}

          {/* Skills Tab */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Skills</h3>
                {isOwnProfile && (
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    Add Skill
                  </button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {profile?.data?.skills?.map((skill, index) => {
                  const skillInfo = getSkillLevel(skill.level);
                  return (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900">{skill.name}</h4>
                        <span className={`px-2 py-1 text-xs rounded-full ${skillInfo.color}`}>
                          {skillInfo.label}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-600 h-2 rounded-full" 
                          style={{ width: `${skill.proficiency}%` }}
                        ></div>
                      </div>
                      <p className="text-sm text-gray-600 mt-2">{skill.description}</p>
                    </div>
                  );
                }) || (
                  <div className="col-span-2 text-center py-8">
                    <Zap size={48} className="mx-auto text-gray-400 mb-4" />
                    <p className="text-gray-600">No skills added yet</p>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Image Upload Modal */}
      {showImageUpload && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Update Profile Image</h3>
            
            <div className="space-y-4">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full p-3 border border-gray-300 rounded-lg"
              />
              
              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowImageUpload(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedStudentProfile;
