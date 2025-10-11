import React, { useState } from 'react';
import { 
  Briefcase, 
  Calendar, 
  Clock, 
  Users, 
  TrendingUp,
  CheckCircle,
  AlertCircle,
  FileText,
  Download,
  Eye,
  Plus,
  Filter
} from 'lucide-react';
import { 
  useInternships,
  useAllApplications,
  useUpdateApplicationStatus,
  useAllDailyActivities,
  useAllAttendanceRecords,
  useAllProgressReports
} from '@/services';
import { useAuth } from '@/contexts/AuthContexts';

const EnhancedInternshipDashboard = () => {
  const { user, token } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [filterStatus, setFilterStatus] = useState('all');
  const [dateRange, setDateRange] = useState('week');

  // API hooks
  const { data: internships, isLoading: internshipsLoading } = useInternships();
  const { data: applications, isLoading: applicationsLoading } = useAllApplications();
  const { data: dailyActivities } = useAllDailyActivities();
  const { data: attendanceRecords } = useAllAttendanceRecords();
  const { data: progressReports } = useAllProgressReports();
  
  const updateApplicationMutation = useUpdateApplicationStatus();

  // Calculate statistics
  const stats = {
    totalInternships: internships?.data?.length || 0,
    totalApplications: applications?.data?.length || 0,
    pendingApplications: applications?.data?.filter(app => app.status === 'pending').length || 0,
    approvedApplications: applications?.data?.filter(app => app.status === 'approved').length || 0,
    activeInterns: applications?.data?.filter(app => app.status === 'approved' && app.internship?.status === 'active').length || 0,
    pendingActivities: dailyActivities?.data?.filter(activity => activity.status === 'pending').length || 0
  };

  const handleUpdateApplicationStatus = async (applicationId, status, feedback = '') => {
    try {
      await updateApplicationMutation.mutateAsync({
        applicationId,
        status,
        feedback,
        token
      });
      alert(`Application ${status} successfully!`);
    } catch (error) {
      alert('Failed to update application: ' + error.message);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const StatCard = ({ title, value, icon: Icon, color, trend }) => (
    <div className="bg-white p-6 rounded-lg shadow border">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
          {trend && (
            <p className={`text-sm ${trend > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {trend > 0 ? '+' : ''}{trend}% from last month
            </p>
          )}
        </div>
        <Icon className={`h-8 w-8 ${color}`} />
      </div>
    </div>
  );

  const ApplicationCard = ({ application }) => (
    <div className="bg-white p-4 rounded-lg shadow border hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{application.student?.name}</h4>
          <p className="text-sm text-gray-600">{application.internship?.title}</p>
          <p className="text-xs text-gray-500">{application.internship?.company}</p>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(application.status)}`}>
          {application.status}
        </span>
      </div>
      
      <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
        <span>Applied: {new Date(application.appliedAt).toLocaleDateString()}</span>
        <span>{application.school} - {application.year}</span>
      </div>
      
      {application.status === 'pending' && (
        <div className="flex gap-2">
          <button
            onClick={() => handleUpdateApplicationStatus(application._id, 'approved')}
            className="flex-1 px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700"
          >
            Approve
          </button>
          <button
            onClick={() => handleUpdateApplicationStatus(application._id, 'rejected', 'Thank you for your interest.')}
            className="flex-1 px-3 py-1 bg-red-600 text-white text-sm rounded hover:bg-red-700"
          >
            Reject
          </button>
        </div>
      )}
      
      <div className="mt-3 flex justify-between items-center">
        <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1">
          <Eye size={14} />
          View Details
        </button>
        <button className="text-gray-600 hover:text-gray-800 text-sm flex items-center gap-1">
          <Download size={14} />
          Resume
        </button>
      </div>
    </div>
  );

  const ActivityCard = ({ activity }) => (
    <div className="bg-white p-4 rounded-lg shadow border">
      <div className="flex justify-between items-start mb-2">
        <div className="flex-1">
          <h4 className="font-medium text-gray-900">{activity.student?.name}</h4>
          <p className="text-sm text-gray-600">{activity.title}</p>
        </div>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getStatusColor(activity.status)}`}>
          {activity.status}
        </span>
      </div>
      
      <p className="text-sm text-gray-700 mb-2 line-clamp-2">{activity.description}</p>
      
      <div className="flex items-center justify-between text-xs text-gray-500">
        <span>{new Date(activity.date).toLocaleDateString()}</span>
        <span>{activity.hoursWorked} hours</span>
      </div>
      
      {activity.status === 'pending' && (
        <div className="mt-3 flex gap-2">
          <button className="flex-1 px-3 py-1 bg-green-600 text-white text-xs rounded hover:bg-green-700">
            Approve
          </button>
          <button className="flex-1 px-3 py-1 bg-yellow-600 text-white text-xs rounded hover:bg-yellow-700">
            Request Changes
          </button>
        </div>
      )}
    </div>
  );

  if (internshipsLoading || applicationsLoading) {
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
          <h1 className="text-2xl font-bold text-gray-900">Internship Management</h1>
          <p className="text-gray-600">Monitor and manage internship programs</p>
        </div>
        <div className="flex gap-3">
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="quarter">This Quarter</option>
          </select>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
            <Plus size={16} />
            New Internship
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Internships"
          value={stats.totalInternships}
          icon={Briefcase}
          color="text-blue-600"
          trend={12}
        />
        <StatCard
          title="Applications"
          value={stats.totalApplications}
          icon={FileText}
          color="text-green-600"
          trend={8}
        />
        <StatCard
          title="Active Interns"
          value={stats.activeInterns}
          icon={Users}
          color="text-purple-600"
          trend={-3}
        />
        <StatCard
          title="Pending Reviews"
          value={stats.pendingActivities}
          icon={AlertCircle}
          color="text-orange-600"
        />
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white rounded-lg shadow border">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {[
              { id: 'overview', label: 'Overview', icon: TrendingUp },
              { id: 'applications', label: 'Applications', icon: FileText },
              { id: 'activities', label: 'Daily Activities', icon: Calendar },
              { id: 'attendance', label: 'Attendance', icon: CheckCircle },
              { id: 'reports', label: 'Progress Reports', icon: FileText }
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
                {/* Recent Applications */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Applications</h3>
                  <div className="space-y-3">
                    {applications?.data?.slice(0, 3).map((application) => (
                      <ApplicationCard key={application._id} application={application} />
                    ))}
                  </div>
                </div>

                {/* Pending Activities */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Pending Activities</h3>
                  <div className="space-y-3">
                    {dailyActivities?.data?.filter(a => a.status === 'pending').slice(0, 3).map((activity) => (
                      <ActivityCard key={activity._id} activity={activity} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Applications Tab */}
          {activeTab === 'applications' && (
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">All Applications</h3>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {applications?.data
                  ?.filter(app => filterStatus === 'all' || app.status === filterStatus)
                  .map((application) => (
                    <ApplicationCard key={application._id} application={application} />
                  ))}
              </div>
            </div>
          )}

          {/* Daily Activities Tab */}
          {activeTab === 'activities' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Daily Activities</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {dailyActivities?.data?.map((activity) => (
                  <ActivityCard key={activity._id} activity={activity} />
                ))}
              </div>
            </div>
          )}

          {/* Attendance Tab */}
          {activeTab === 'attendance' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Attendance Records</h3>
              <div className="bg-white border rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Student
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Check In
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Check Out
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Hours
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {attendanceRecords?.data?.slice(0, 10).map((record) => (
                      <tr key={record._id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {record.student?.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(record.date).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {record.checkInTime}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {record.checkOutTime || 'Not checked out'}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {record.totalHours || '-'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Progress Reports Tab */}
          {activeTab === 'reports' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900">Progress Reports</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {progressReports?.data?.map((report) => (
                  <div key={report._id} className="bg-white p-4 rounded-lg shadow border">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-semibold text-gray-900">{report.student?.name}</h4>
                        <p className="text-sm text-gray-600">{report.reportType} Report</p>
                      </div>
                      <span className="text-xs text-gray-500">
                        {new Date(report.submittedAt).toLocaleDateString()}
                      </span>
                    </div>
                    
                    <p className="text-sm text-gray-700 mb-3 line-clamp-3">{report.content}</p>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        Period: {new Date(report.startDate).toLocaleDateString()} - {new Date(report.endDate).toLocaleDateString()}
                      </span>
                      <button className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1">
                        <Eye size={14} />
                        View
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EnhancedInternshipDashboard;
