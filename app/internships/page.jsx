"use client";

import { useState, useEffect } from 'react';
import { Search, Filter, MapPin, Clock, Users, Building, Calendar, Star, BookOpen, Plus, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { useAuth } from '@/contexts/AuthContexts';
import { useMyApplications, useAllInternships, useInternshipCategories } from '@/services/internshipApi';
import InternshipApplicationForm from './components/InternshipApplicationForm';
import InternshipCard from './components/InternshipCard';
import { toast } from 'sonner';

export default function InternshipsPage() {
  const { user, isAuthenticated } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedInternship, setSelectedInternship] = useState(null);
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Fetch internships from API
  const { data: internshipsData, isLoading: internshipsLoading, error: internshipsError } = useAllInternships({
    page: currentPage,
    limit: itemsPerPage,
    category: selectedCategory !== 'all' ? selectedCategory : undefined,
    type: selectedType !== 'all' ? selectedType : undefined,
    level: selectedLevel !== 'all' ? selectedLevel : undefined,
    search: searchTerm || undefined,
    sortBy: sortBy
  });

  // Fetch categories
  const { data: categoriesData } = useInternshipCategories();

  // Fetch user's applications
  const { data: myApplications, isLoading: applicationsLoading } = useMyApplications({
    page: 1,
    limit: 100
  });

  const internships = internshipsData?.data || [];
  const totalPages = internshipsData?.pagination?.pages || 1;
  const categories = categoriesData?.data || [];

  // Check if user has already applied to an internship
  const hasApplied = (internshipId) => {
    if (!myApplications?.data) return false;
    return myApplications.data.some(app => app.internshipId === internshipId);
  };

  const handleApply = (internship) => {
    if (!isAuthenticated) {
      toast.error('Please login to apply for internships');
      return;
    }
    setSelectedInternship(internship);
    setShowApplicationForm(true);
  };

  const handleApplicationSuccess = () => {
    setShowApplicationForm(false);
    setSelectedInternship(null);
    toast.success('Application submitted successfully!');
  };

  const types = ['all', 'Remote', 'Hybrid', 'On-site'];
  const levels = ['all', 'Beginner', 'Intermediate', 'Advanced'];

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, selectedCategory, selectedType, selectedLevel, sortBy]);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Your Dream Internship
            </h1>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Discover amazing internship opportunities and kickstart your career with hands-on experience
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative border border-brand rounded">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search internships, companies, or skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-7 text-lg bg-white text-gray-900 placeholder-gray-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Filter className="h-5 w-5 mr-2" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map(category => (
                        <SelectItem key={category._id || category} value={category.name || category}>
                          {category.name || category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Type</label>
                  <Select value={selectedType} onValueChange={setSelectedType}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {types.map(type => (
                        <SelectItem key={type} value={type}>
                          {type === 'all' ? 'All Types' : type}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Level</label>
                  <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {levels.map(level => (
                        <SelectItem key={level} value={level}>
                          {level === 'all' ? 'All Levels' : level}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">Sort By</label>
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest</SelectItem>
                      <SelectItem value="oldest">Oldest</SelectItem>
                      <SelectItem value="salary-high">Salary: High to Low</SelectItem>
                      <SelectItem value="salary-low">Salary: Low to High</SelectItem>
                      <SelectItem value="rating">Rating</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Internships Grid */}
          <div className="lg:w-3/4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-gray-900">
                {internshipsData?.pagination?.total || 0} Internships Found
              </h2>
            </div>

            {internshipsLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="h-8 w-8 animate-spin text-brand" />
                <span className="ml-2 text-gray-600">Loading internships...</span>
              </div>
            ) : internshipsError ? (
              <Card>
                <CardContent className="text-center py-12">
                  <div className="text-red-500 text-6xl mb-4">⚠️</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Error Loading Internships</h3>
                  <p className="text-gray-600">There was a problem loading internships. Please try again later.</p>
                </CardContent>
              </Card>
            ) : internships.length === 0 ? (
              <Card>
                <CardContent className="text-center py-12">
                  <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No Internships Found</h3>
                  <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2  gap-6">
                {internships.map((internship) => (
                  <InternshipCard
                    key={internship._id}
                    internship={internship}
                    hasApplied={hasApplied(internship._id)}
                    onApply={() => handleApply(internship)}
                  />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </Button>
                  {[...Array(totalPages)].map((_, index) => (
                    <Button
                      key={index + 1}
                      variant={currentPage === index + 1 ? "default" : "outline"}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </Button>
                  ))}
                  <Button
                    variant="outline"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Application Form Dialog */}
      <Dialog open={showApplicationForm} onOpenChange={setShowApplicationForm}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Apply for {selectedInternship?.title}</DialogTitle>
            <DialogDescription>
              Submit your application for this internship opportunity
            </DialogDescription>
          </DialogHeader>
          {selectedInternship && (
            <InternshipApplicationForm
              internship={selectedInternship}
              onSuccess={handleApplicationSuccess}
              onCancel={() => setShowApplicationForm(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}