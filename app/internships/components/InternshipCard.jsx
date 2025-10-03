import { useState } from 'react';
import { MapPin, Clock, Users, Building, Calendar, Star, DollarSign, BookOpen, Eye, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Progress } from '@/components/ui/progress';
import Image from 'next/image';
import Link from 'next/link';

export default function InternshipCard({ internship, hasApplied, onApply }) {
  const [isLiked, setIsLiked] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
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

  const daysUntilDeadline = getDaysUntilDeadline(internship.deadline);
  const isDeadlineNear = daysUntilDeadline <= 7 && daysUntilDeadline > 0;
  const isDeadlinePassed = daysUntilDeadline <= 0;

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

  return (
    <>
      <Card className="border-brand">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
                {internship.companyLogo ? (
                  <Image
                    src={internship.companyLogo}
                    alt={internship.company}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <Building className="h-6 w-6 text-gray-500" />
                )}
              </div>
              <div className="flex-1">
                <CardTitle className="text-lg font-semibold text-gray-900 mb-1">
                  {internship.title}
                </CardTitle>
                <CardDescription className="text-sm text-gray-600 mb-2">
                  {internship.company}
                </CardDescription>
                <div className="flex items-center space-x-2 mb-2">
                  <div className="flex items-center text-sm text-gray-500">
                    <Star className="h-4 w-4 text-yellow-400 mr-1" />
                    <span>{internship.rating}</span>
                    <span className="ml-1">({internship.reviewsCount} reviews)</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsLiked(!isLiked)}
                className={isLiked ? 'text-red-500' : 'text-gray-400'}
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
              </Button>
            </div>
          </div>
        </CardHeader>

        <CardContent>
          <div className="space-y-3">
            {/* Location and Type */}
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{internship.location || 'N/A'}</span>
              </div>
              <Badge className={getTypeColor(internship.type)}>
                {internship.type || 'N/A'}
              </Badge>
              <Badge className={getLevelColor(internship.level)}>
                {internship.level || 'N/A'}
              </Badge>
            </div>

            {/* Duration and Salary */}
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                <span>{internship.duration || 'N/A'}</span>
              </div>
              <div className="flex items-center">
                <DollarSign className="h-4 w-4 mr-1" />
                <span>{internship.salary || 'N/A'}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-gray-700 line-clamp-2">
              {internship.description || 'No description available'}
            </p>

            {/* Requirements */}
            <div className="flex flex-wrap gap-1">
              {internship.requirements?.slice(0, 3).map((req, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {req}
                </Badge>
              ))}
              {internship.requirements && internship.requirements.length > 3 && (
                <Badge variant="secondary" className="text-xs">
                  +{internship.requirements.length - 3} more
                </Badge>
              )}
            </div>

            {/* Application Progress */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Applications</span>
                <span className="text-gray-900">
                  {internship.applicationsCount || 0}/{internship.maxApplications || 0}
                </span>
              </div>
              <Progress 
                value={((internship.applicationsCount || 0) / (internship.maxApplications || 1)) * 100} 
                className="h-2"
              />
            </div>

            {/* Deadline */}
            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm">
                <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                <span className="text-gray-600">Deadline: </span>
                <span className={`ml-1 font-medium ${
                  isDeadlinePassed 
                    ? 'text-red-600' 
                    : isDeadlineNear 
                    ? 'text-orange-600' 
                    : 'text-gray-900'
                }`}>
                  {formatDate(internship.deadline)}
                </span>
              </div>
              {isDeadlineNear && !isDeadlinePassed && (
                <Badge variant="destructive" className="text-xs">
                  {daysUntilDeadline} days left
                </Badge>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between">
          <div className="flex space-x-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4 mr-2" />
                  View Details
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>{internship.title}</DialogTitle>
                  <DialogDescription>
                    {internship.company} • {internship.location}
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  {/* Company Info */}
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
                    <div>
                      <h3 className="text-lg font-semibold">{internship.company}</h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 mr-1" />
                          <span>{internship.rating} ({internship.reviewsCount} reviews)</span>
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          <span>{internship.location}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Job Details */}
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

                  {/* Description */}
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Description</h4>
                    <p className="text-gray-700">{internship.description}</p>
                  </div>

                  {/* Requirements */}
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Requirements</h4>
                    <div className="flex flex-wrap gap-2">
                      {internship.requirements?.map((req, index) => (
                        <Badge key={index} variant="secondary">
                          {req}
                        </Badge>
                      )) || <span className="text-gray-500">No requirements listed</span>}
                    </div>
                  </div>

                  {/* Benefits */}
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Benefits</h4>
                    <div className="flex flex-wrap gap-2">
                      {internship.benefits?.map((benefit, index) => (
                        <Badge key={index} variant="outline">
                          {benefit}
                        </Badge>
                      )) || <span className="text-gray-500">No benefits listed</span>}
                    </div>
                  </div>

                  {/* Timeline */}
                  <div>
                    <h4 className="text-lg font-semibold mb-2">Timeline</h4>
                    <div className="grid grid-cols-2 gap-4">
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
                          {internship.applicationsCount}/{internship.maxApplications}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="flex space-x-2">
            {hasApplied ? (
              <Button disabled variant="outline">
                <BookOpen className="h-4 w-4 mr-2" />
                Applied
              </Button>
            ) : isDeadlinePassed ? (
              <Button disabled variant="outline">
                Application Closed
              </Button>
            ) : (
              <Button onClick={onApply}>
                Apply Now
              </Button>
            )}
          </div>
        </CardFooter>
      </Card>
    </>
  );
}
