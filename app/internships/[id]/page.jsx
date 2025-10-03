"use client";

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContexts';
import { useInternshipById, useMyApplications } from '@/services/internshipApi';
import { 
  ArrowLeft, 
  MapPin, 
  Clock, 
  Users, 
  Building, 
  Calendar, 
  Star, 
  DollarSign, 
  BookOpen, 
  Share2, 
  Heart,
  CheckCircle,
  XCircle,
  AlertCircle,
  Loader2
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import InternshipApplicationForm from '../components/InternshipApplicationForm';
import Image from 'next/image';
import Link from 'next/link';
import { toast } from 'sonner';

export default function InternshipDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [isLiked, setIsLiked] = useState(false);
  const [showApplicationForm, setShowApplicationForm] = useState(false);

  const internshipId = params.id;

  // Fetch internship details
  const { data: internshipData, isLoading, error } = useInternshipById(internshipId);
  const internship = internshipData?.data;

  // Fetch user's applications
  const { data: myApplications } = useMyApplications({
    page: 1,
    limit: 100
  });

  const hasApplied = myApplications?.data?.some(app => app.internshipId === internshipId);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getDaysUntilDeadline = (deadline) => {
    if (!deadline) return 0;
    const today = new Date();
    const deadlineDate = new Date(deadline);
    const diffTime = deadlineDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getTypeColor = (type) => {
    if (!type) return 'bg-gray-100 text-gray-800';
    switch (type.toLowerCase()) {
      case 'remote':
        return 'bg-green-100 text-green-800';
      case 'hybrid':
        return 'bg-yellow-100 text-yellow-800';
      case 'on-site':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelColor = (level) => {
    if (!level) return 'bg-gray-100 text-gray-800';
    switch (level.toLowerCase()) {
      case 'beginner':
        return 'bg-green-100 text-green-800';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800';
      case 'advanced':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const handleApply = () => {
    if (!isAuthenticated) {
      toast.error('Please login to apply for this internship');
      return;
    }
    setShowApplicationForm(true);
  };

  const handleApplicationSuccess = () => {
    setShowApplicationForm(false);
    toast.success('Application submitted successfully!');
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: internship?.title,
          text: `Check out this internship: ${internship?.title}`,
          url: window.location.href,
        });
      } catch (err) {
        console.log('Error sharing:', err);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      toast.success('Link copied to clipboard!');
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-brand mx-auto mb-4" />
          <p className="text-gray-600">Loading internship details...</p>
        </div>
      </div>
    );
  }

  if (error || !internship) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="text-center py-12">
            <XCircle className="h-16 w-16 text-red-400 mx-auto mb-4" />
            <h2 className="text-xl font-semibold text-gray-900 mb-2">Internship Not Found</h2>
            <p className="text-gray-600 mb-6">The internship you're looking for doesn't exist or has been removed.</p>
            <Link href="/internships">
              <Button>Browse Internships</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const daysUntilDeadline = getDaysUntilDeadline(internship.deadline);
  const isDeadlineNear = daysUntilDeadline <= 7 && daysUntilDeadline > 0;
  const isDeadlinePassed = daysUntilDeadline <= 0;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => router.back()}>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">{internship.title}</h1>
                <p className="text-gray-600">{internship.company}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="ghost" onClick={() => setIsLiked(!isLiked)}>
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-current text-red-500' : 'text-gray-400'}`} />
              </Button>
              <Button variant="ghost" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Company Info */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                    {internship.companyLogo ? (
                      <Image
                        src={internship.companyLogo}
                        alt={internship.company}
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Building className="h-8 w-8 text-gray-500" />
                    )}
                  </div>
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-900">{internship.company}</h2>
                    <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-1" />
                        <span>{internship.location}</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-400 mr-1" />
                        <span>{internship.rating || 'N/A'}</span>
                        <span className="ml-1">({internship.reviewsCount || 0} reviews)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Job Details */}
            <Card>
              <CardHeader>
                <CardTitle>Job Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Type</p>
                    <Badge className={getTypeColor(internship.type)}>
                      {internship.type}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Level</p>
                    <Badge className={getLevelColor(internship.level)}>
                      {internship.level}
                    </Badge>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Duration</p>
                    <p className="text-sm text-gray-600">{internship.duration}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Salary</p>
                    <p className="text-sm text-gray-600">{internship.salary}</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Start Date</p>
                    <p className="text-sm text-gray-600">{formatDate(internship.startDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">End Date</p>
                    <p className="text-sm text-gray-600">{formatDate(internship.endDate)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Application Deadline</p>
                    <p className={`text-sm ${isDeadlinePassed ? 'text-red-600' : 'text-gray-600'}`}>
                      {formatDate(internship.deadline)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Applications</p>
                    <p className="text-sm text-gray-600">
                      {internship.applicationsCount || 0}/{internship.maxApplications || 0}
                    </p>
                  </div>
                </div>

                {/* Application Progress */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Application Progress</span>
                    <span className="text-gray-900">
                      {internship.applicationsCount || 0}/{internship.maxApplications || 0}
                    </span>
                  </div>
                  <Progress 
                    value={((internship.applicationsCount || 0) / (internship.maxApplications || 1)) * 100} 
                    className="h-2"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Description and Requirements */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description">Description</TabsTrigger>
                <TabsTrigger value="requirements">Requirements</TabsTrigger>
                <TabsTrigger value="benefits">Benefits</TabsTrigger>
              </TabsList>
              
              <TabsContent value="description" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>About this Internship</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-700 leading-relaxed">{internship.description}</p>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="requirements" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Requirements</CardTitle>
                    <CardDescription>Skills and qualifications needed for this internship</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {internship.requirements?.map((req, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-gray-700">{req}</span>
                        </div>
                      )) || <span className="text-gray-500">No requirements listed</span>}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="benefits" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Benefits & Perks</CardTitle>
                    <CardDescription>What you'll get from this internship</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {internship.benefits?.map((benefit, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                          <span className="text-sm text-gray-700">{benefit}</span>
                        </div>
                      )) || <span className="text-gray-500">No benefits listed</span>}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Apply Card */}
            <Card>
              <CardContent className="p-6">
                <div className="text-center space-y-4">
                  <div className="text-2xl font-bold text-gray-900">{internship.salary}</div>
                  <div className="text-sm text-gray-600">per month</div>
                  
                  {isDeadlinePassed ? (
                    <Button disabled className="w-full">
                      <XCircle className="h-4 w-4 mr-2" />
                      Application Closed
                    </Button>
                  ) : hasApplied ? (
                    <Button disabled className="w-full">
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Applied
                    </Button>
                  ) : (
                    <Button onClick={handleApply} className="w-full">
                      <BookOpen className="h-4 w-4 mr-2" />
                      Apply Now
                    </Button>
                  )}

                  {isDeadlineNear && !isDeadlinePassed && (
                    <div className="flex items-center justify-center text-sm text-orange-600">
                      <AlertCircle className="h-4 w-4 mr-1" />
                      <span>{daysUntilDeadline} days left to apply</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Info */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Category</span>
                  <span className="text-sm font-medium">{internship.category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Type</span>
                  <Badge className={getTypeColor(internship.type)}>
                    {internship.type}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Level</span>
                  <Badge className={getLevelColor(internship.level)}>
                    {internship.level}
                  </Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Duration</span>
                  <span className="text-sm font-medium">{internship.duration}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Location</span>
                  <span className="text-sm font-medium">{internship.location}</span>
                </div>
              </CardContent>
            </Card>

            {/* Company Info */}
            <Card>
              <CardHeader>
                <CardTitle>About {internship.company}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">
                  {internship.companyDescription || 'Learn more about this company and their mission.'}
                </p>
                <div className="flex items-center space-x-4 text-sm text-gray-500">
                  <div className="flex items-center">
                    <Users className="h-4 w-4 mr-1" />
                    <span>{internship.companySize || 'N/A'} employees</span>
                  </div>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span>{internship.rating || 'N/A'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Application Form Dialog */}
      <Dialog open={showApplicationForm} onOpenChange={setShowApplicationForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Apply for {internship.title}</DialogTitle>
            <DialogDescription>
              Submit your application for this internship opportunity
            </DialogDescription>
          </DialogHeader>
          <InternshipApplicationForm
            internship={internship}
            onSuccess={handleApplicationSuccess}
            onCancel={() => setShowApplicationForm(false)}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}