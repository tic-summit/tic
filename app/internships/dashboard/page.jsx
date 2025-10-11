"use client";

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContexts';
import { useMyApplications, useStudentInternshipEnrollments, useApplicationStats } from '@/services/internshipApi';
import { 
  LayoutDashboard, 
  Briefcase, 
  FileText, 
  Calendar, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Plus,
  Eye,
  Download
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Link from 'next/link';
import { toast } from 'sonner';

export default function InternshipDashboard() {
  const { user, isAuthenticated } = useAuth();
  const [selectedTab, setSelectedTab] = useState('overview');
  const [statusFilter, setStatusFilter] = useState('all');

  // Fetch data
  const { data: applications, isLoading: applicationsLoading } = useMyApplications({
    page: 1,
    limit: 50,
    status: statusFilter === 'all' ? undefined : statusFilter
  });

  const { data: enrollments, isLoading: enrollmentsLoading } = useStudentInternshipEnrollments(user?.id, {
    page: 1,
    limit: 50,
    status: statusFilter === 'all' ? undefined : statusFilter
  });

  const { data: stats } = useApplicationStats();

  // Calculate dashboard statistics
  const totalApplications = applications?.data?.length || 0;
  const pendingApplications = applications?.data?.filter(app => app.status === 'Applied').length || 0;
  const acceptedApplications = applications?.data?.filter(app => app.status === 'Accepted').length || 0;
  const rejectedApplications = applications?.data?.filter(app => app.status === 'Rejected').length || 0;
  const activeEnrollments = enrollments?.data?.filter(enrollment => enrollment.status === 'active').length || 0;
  const completedEnrollments = enrollments?.data?.filter(enrollment => enrollment.status === 'completed').length || 0;

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'applied':
        return 'bg-yellow-100 text-yellow-800';
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'under_review':
        return 'bg-blue-100 text-blue-800';
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'completed':
        return 'bg-purple-100 text-purple-800';
      case 'terminated':
        return 'bg-red-100 text-red-800';
      case 'on_hold':
        return 'bg-orange-100 text-orange-800';
      case 'suspended':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status?.toLowerCase()) {
      case 'applied':
        return <Clock className="h-4 w-4" />;
      case 'accepted':
        return <CheckCircle className="h-4 w-4" />;
      case 'rejected':
        return <XCircle className="h-4 w-4" />;
      case 'under_review':
        return <Eye className="h-4 w-4" />;
      case 'active':
        return <CheckCircle className="h-4 w-4" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4" />;
      case 'terminated':
        return <XCircle className="h-4 w-4" />;
      case 'on_hold':
        return <AlertCircle className="h-4 w-4" />;
      case 'suspended':
        return <AlertCircle className="h-4 w-4" />;
      default:
        return <Clock className="h-4 w-4" />;
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-12">
            <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Authentication Required</h2>
            <p className="text-gray-600 mb-6">Please login to view your internship dashboard.</p>
            <Link href="/auth/login">
              <Button>Login</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Internship Dashboard</h1>
              <p className="text-gray-600">Manage your internship applications and enrollments</p>
            </div>
            <Link href="/internships">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Find Internships
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Briefcase className="h-6 w-6 text-blue-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Applications</p>
                  <p className="text-2xl font-bold text-gray-900">{totalApplications}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <Clock className="h-6 w-6 text-yellow-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Pending</p>
                  <p className="text-2xl font-bold text-gray-900">{pendingApplications}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Accepted</p>
                  <p className="text-2xl font-bold text-gray-900">{acceptedApplications}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-purple-600" />
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Active Enrollments</p>
                  <p className="text-2xl font-bold text-gray-900">{activeEnrollments}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="enrollments">Enrollments</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Applications */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Applications</CardTitle>
                  <CardDescription>Your latest internship applications</CardDescription>
                </CardHeader>
                <CardContent>
                  {applicationsLoading ? (
                    <div className="text-center py-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand mx-auto"></div>
                    </div>
                  ) : applications?.data?.length > 0 ? (
                    <div className="space-y-4">
                      {applications.data.slice(0, 3).map((application) => (
                        <div key={application._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-medium text-gray-900">{application.internship?.title || 'Internship'}</p>
                            <p className="text-sm text-gray-600">{application.internship?.company || 'Company'}</p>
                            <p className="text-xs text-gray-500">{formatDate(application.appliedAt)}</p>
                          </div>
                          <Badge className={getStatusColor(application.status)}>
                            {application.status}
                          </Badge>
                        </div>
                      ))}
                      <Link href="/internships/dashboard?tab=applications">
                        <Button variant="outline" className="w-full">
                          View All Applications
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Briefcase className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No applications yet</p>
                      <Link href="/internships">
                        <Button className="mt-2">Find Internships</Button>
                      </Link>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Active Enrollments */}
              <Card>
                <CardHeader>
                  <CardTitle>Active Enrollments</CardTitle>
                  <CardDescription>Your current internship enrollments</CardDescription>
                </CardHeader>
                <CardContent>
                  {enrollmentsLoading ? (
                    <div className="text-center py-4">
                      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand mx-auto"></div>
                    </div>
                  ) : enrollments?.data?.length > 0 ? (
                    <div className="space-y-4">
                      {enrollments.data.slice(0, 3).map((enrollment) => (
                        <div key={enrollment._id} className="p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center justify-between mb-2">
                            <p className="font-medium text-gray-900">{enrollment.internship?.title || 'Internship'}</p>
                            <Badge className={getStatusColor(enrollment.status)}>
                              {enrollment.status}
                            </Badge>
                          </div>
                          <div className="text-sm text-gray-600">
                            <p>Start: {formatDate(enrollment.actualStartDate)}</p>
                            <p>End: {formatDate(enrollment.actualEndDate)}</p>
                          </div>
                        </div>
                      ))}
                      <Link href="/internships/dashboard?tab=enrollments">
                        <Button variant="outline" className="w-full">
                          View All Enrollments
                        </Button>
                      </Link>
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <TrendingUp className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-gray-600">No active enrollments</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">My Applications</h2>
              <div className="flex items-center space-x-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="Applied">Applied</SelectItem>
                    <SelectItem value="Under Review">Under Review</SelectItem>
                    <SelectItem value="Accepted">Accepted</SelectItem>
                    <SelectItem value="Rejected">Rejected</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {applicationsLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand mx-auto"></div>
              </div>
            ) : applications?.data?.length > 0 ? (
              <div className="space-y-4">
                {applications.data.map((application) => (
                  <Card key={application._id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {application.internship?.title || 'Internship'}
                          </h3>
                          <p className="text-gray-600">{application.internship?.company || 'Company'}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <span>Applied: {formatDate(application.appliedAt)}</span>
                            <span>School: {application.school}</span>
                            <span>Year: {application.year}</span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge className={getStatusColor(application.status)}>
                            {getStatusIcon(application.status)}
                            <span className="ml-1">{application.status}</span>
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <Briefcase className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Applications Found</h3>
                  <p className="text-gray-600 mb-6">You haven't applied to any internships yet.</p>
                  <Link href="/internships">
                    <Button>Find Internships</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Enrollments Tab */}
          <TabsContent value="enrollments" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">My Enrollments</h2>
              <div className="flex items-center space-x-2">
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="terminated">Terminated</SelectItem>
                    <SelectItem value="on_hold">On Hold</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {enrollmentsLoading ? (
              <div className="text-center py-12">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand mx-auto"></div>
              </div>
            ) : enrollments?.data?.length > 0 ? (
              <div className="space-y-4">
                {enrollments.data.map((enrollment) => (
                  <Card key={enrollment._id}>
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {enrollment.internship?.title || 'Internship'}
                          </h3>
                          <p className="text-gray-600">{enrollment.internship?.company || 'Company'}</p>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4 text-sm text-gray-500">
                            <div>
                              <p className="font-medium">Start Date</p>
                              <p>{formatDate(enrollment.actualStartDate)}</p>
                            </div>
                            <div>
                              <p className="font-medium">End Date</p>
                              <p>{formatDate(enrollment.actualEndDate)}</p>
                            </div>
                            <div>
                              <p className="font-medium">Working Days</p>
                              <p>{enrollment.workingDays?.join(', ') || 'N/A'}</p>
                            </div>
                            <div>
                              <p className="font-medium">Hours</p>
                              <p>{enrollment.dailyStartTime} - {enrollment.dailyEndTime}</p>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <Badge className={getStatusColor(enrollment.status)}>
                            {getStatusIcon(enrollment.status)}
                            <span className="ml-1">{enrollment.status}</span>
                          </Badge>
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card>
                <CardContent className="text-center py-12">
                  <TrendingUp className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Enrollments Found</h3>
                  <p className="text-gray-600 mb-6">You don't have any internship enrollments yet.</p>
                  <Link href="/internships">
                    <Button>Find Internships</Button>
                  </Link>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
