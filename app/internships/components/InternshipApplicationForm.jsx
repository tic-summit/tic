import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContexts';
import { useSubmitApplication } from '@/services/internshipApi/useInternshipApplications';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Upload, FileText, X, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

export default function InternshipApplicationForm({ internship, onSuccess, onCancel }) {
  const { user } = useAuth();
  const submitApplication = useSubmitApplication();
  
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    school: '',
    year: '',
    applicationLetter: '',
    linkedinUrl: '',
    githubUrl: '',
    portfolioUrl: '',
    resumeFile: null,
    supportLetter: null
  });
  const [errors, setErrors] = useState({});

  const steps = [
    { id: 1, title: 'Personal Info', description: 'Basic information' },
    { id: 2, title: 'Documents', description: 'Upload required files' },
    { id: 3, title: 'Review', description: 'Review and submit' }
  ];

  const yearOptions = [
    'Year one',
    'Year two', 
    'Year three',
    'Year four',
    'Graduate',
    'Post-graduate'
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const handleFileChange = (field, file) => {
    if (file) {
      // Validate file size (5MB max)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        setErrors(prev => ({
          ...prev,
          [field]: 'File size must be less than 5MB'
        }));
        return;
      }

      // Validate file type
      const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({
          ...prev,
          [field]: 'Only PDF and Word documents are allowed'
        }));
        return;
      }

      setFormData(prev => ({
        ...prev,
        [field]: file
      }));

      // Clear error
      if (errors[field]) {
        setErrors(prev => ({
          ...prev,
          [field]: ''
        }));
      }
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    switch (step) {
      case 1:
        if (!formData.school.trim()) newErrors.school = 'School is required';
        if (!formData.year) newErrors.year = 'Year is required';
        if (!formData.applicationLetter.trim()) newErrors.applicationLetter = 'Application letter is required';
        break;
      case 2:
        if (!formData.resumeFile) newErrors.resumeFile = 'Resume is required';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => prev - 1);
  };

  const handleSubmit = async () => {
    if (!validateStep(1) || !validateStep(2)) {
      setCurrentStep(1);
      return;
    }

    setIsSubmitting(true);
    try {
      await submitApplication.mutateAsync({
        internshipId: internship._id,
        applicationData: formData
      });
      onSuccess();
    } catch (error) {
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep1 = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="school">School/University *</Label>
          <Input
            id="school"
            value={formData.school}
            onChange={(e) => handleInputChange('school', e.target.value)}
            placeholder="Enter your school name"
            className={errors.school ? 'border-red-500' : ''}
          />
          {errors.school && <p className="text-sm text-red-500">{errors.school}</p>}
        </div>

        <div className="space-y-2">
          <Label htmlFor="year">Academic Year *</Label>
          <Select value={formData.year} onValueChange={(value) => handleInputChange('year', value)}>
            <SelectTrigger className={errors.year ? 'border-red-500' : ''}>
              <SelectValue placeholder="Select your year" />
            </SelectTrigger>
            <SelectContent>
              {yearOptions.map(year => (
                <SelectItem key={year} value={year}>{year}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.year && <p className="text-sm text-red-500">{errors.year}</p>}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="applicationLetter">Application Letter *</Label>
        <Textarea
          id="applicationLetter"
          value={formData.applicationLetter}
          onChange={(e) => handleInputChange('applicationLetter', e.target.value)}
          placeholder="Write a compelling application letter explaining why you're interested in this internship..."
          rows={6}
          className={errors.applicationLetter ? 'border-red-500' : ''}
        />
        {errors.applicationLetter && <p className="text-sm text-red-500">{errors.applicationLetter}</p>}
        <p className="text-sm text-gray-500">
          Tell us about your interest in this role, relevant experience, and what you hope to learn.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="linkedinUrl">LinkedIn Profile</Label>
          <Input
            id="linkedinUrl"
            type="url"
            value={formData.linkedinUrl}
            onChange={(e) => handleInputChange('linkedinUrl', e.target.value)}
            placeholder="https://linkedin.com/in/username"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="githubUrl">GitHub Profile</Label>
          <Input
            id="githubUrl"
            type="url"
            value={formData.githubUrl}
            onChange={(e) => handleInputChange('githubUrl', e.target.value)}
            placeholder="https://github.com/username"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="portfolioUrl">Portfolio Website</Label>
          <Input
            id="portfolioUrl"
            type="url"
            value={formData.portfolioUrl}
            onChange={(e) => handleInputChange('portfolioUrl', e.target.value)}
            placeholder="https://yourportfolio.com"
          />
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="resumeFile">Resume/CV *</Label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
          <input
            id="resumeFile"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => handleFileChange('resumeFile', e.target.files[0])}
            className="hidden"
          />
          <label htmlFor="resumeFile" className="cursor-pointer">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">
              {formData.resumeFile ? formData.resumeFile.name : 'Upload your resume'}
            </p>
            <p className="text-sm text-gray-500">
              PDF or Word document, max 5MB
            </p>
          </label>
        </div>
        {errors.resumeFile && <p className="text-sm text-red-500">{errors.resumeFile}</p>}
        {formData.resumeFile && (
          <div className="flex items-center space-x-2 text-sm text-green-600">
            <CheckCircle className="h-4 w-4" />
            <span>File uploaded successfully</span>
          </div>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="supportLetter">Support Letter (Optional)</Label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
          <input
            id="supportLetter"
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={(e) => handleFileChange('supportLetter', e.target.files[0])}
            className="hidden"
          />
          <label htmlFor="supportLetter" className="cursor-pointer">
            <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">
              {formData.supportLetter ? formData.supportLetter.name : 'Upload support letter'}
            </p>
            <p className="text-sm text-gray-500">
              Recommendation letter or reference (optional)
            </p>
          </label>
        </div>
        {formData.supportLetter && (
          <div className="flex items-center space-x-2 text-sm text-green-600">
            <CheckCircle className="h-4 w-4" />
            <span>File uploaded successfully</span>
          </div>
        )}
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Application Summary</CardTitle>
          <CardDescription>Review your application before submitting</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <h4 className="font-medium text-gray-900">Personal Information</h4>
            <div className="mt-2 space-y-1 text-sm text-gray-600">
              <p><strong>Name:</strong> {user?.fullName}</p>
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>School:</strong> {formData.school}</p>
              <p><strong>Year:</strong> {formData.year}</p>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900">Application Letter</h4>
            <p className="mt-2 text-sm text-gray-600 line-clamp-3">
              {formData.applicationLetter}
            </p>
          </div>

          <div>
            <h4 className="font-medium text-gray-900">Documents</h4>
            <div className="mt-2 space-y-1 text-sm text-gray-600">
              <p><strong>Resume:</strong> {formData.resumeFile?.name || 'Not uploaded'}</p>
              <p><strong>Support Letter:</strong> {formData.supportLetter?.name || 'Not provided'}</p>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900">Social Links</h4>
            <div className="mt-2 space-y-1 text-sm text-gray-600">
              {formData.linkedinUrl && <p><strong>LinkedIn:</strong> {formData.linkedinUrl}</p>}
              {formData.githubUrl && <p><strong>GitHub:</strong> {formData.githubUrl}</p>}
              {formData.portfolioUrl && <p><strong>Portfolio:</strong> {formData.portfolioUrl}</p>}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-start">
          <AlertCircle className="h-5 w-5 text-blue-600 mr-2 mt-0.5" />
          <div className="text-sm text-blue-800">
            <p className="font-medium">Important:</p>
            <p>Once submitted, you cannot edit your application. Please review all information carefully.</p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span>Step {currentStep} of {steps.length}</span>
          <span>{Math.round((currentStep / steps.length) * 100)}% Complete</span>
        </div>
        <Progress value={(currentStep / steps.length) * 100} className="h-2" />
      </div>

      {/* Step Content */}
      <div className="min-h-[400px]">
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
      </div>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between pt-6 border-t">
        <div>
          {currentStep > 1 && (
            <Button variant="outline" onClick={handlePrevious}>
              Previous
            </Button>
          )}
        </div>
        
        <div className="flex space-x-2">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          
          {currentStep < steps.length ? (
            <Button onClick={handleNext}>
              Next
            </Button>
          ) : (
            <Button 
              onClick={handleSubmit} 
              disabled={isSubmitting}
              className="bg-green-600 hover:bg-green-700"
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
