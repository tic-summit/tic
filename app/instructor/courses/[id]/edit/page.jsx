"use client"

import ProtectedRoute from '@/components/ProtectedRoute';
import {
    Save,
    X,
    Upload,
    Eye,
    ArrowLeft,
    Plus,
    Trash2,
    Video,
    FileText,
    Clock,
    DollarSign,
    BookOpen,
    Users,
    Star
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand"></div>
    </div>
);

const ErrorMessage = ({ message }) => (
    <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg">
        Error: {message}
    </div>
);

const FormField = ({ label, children, error, required = false }) => (
    <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">
            {label} {required && <span className="text-red-500">*</span>}
        </label>
        {children}
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
);

const LessonItem = ({ lesson, index }) => {
    return (
        <div className="border border-gray-200 rounded-lg p-4 bg-white">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                        <Video className="h-4 w-4 text-brand" />
                        <h4 className="font-medium text-gray-900">
                            {lesson.title || `Lesson ${index + 1}`}
                        </h4>
                        {lesson.duration && (
                            <span className="text-sm text-gray-500 flex items-center gap-1">
                                <Clock className="h-3 w-3" />
                                {lesson.duration}
                            </span>
                        )}
                    </div>
                    {lesson.content && (
                        <p className="text-sm text-gray-600 mb-2">{lesson.content}</p>
                    )}
                    {lesson.videoUrl && (
                        <a
                            href={lesson.videoUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-blue-600 hover:text-blue-800"
                        >
                            View Video
                        </a>
                    )}
                </div>
                <div className="flex gap-2 ml-4">
                    <button className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded">
                        <FileText className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded">
                        <Trash2 className="h-4 w-4" />
                    </button>
                </div>
            </div>
        </div>
    );
};

const CourseEditForm = () => {
    return (
        <form className="space-y-8">
            {/* Basic Information */}
            <div className="bg-white rounded-lg shadow border border-gray-300 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <BookOpen className="h-5 w-5" />
                    Basic Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField label="Course Title" required>
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand"
                            placeholder="Enter course title"
                        />
                    </FormField>

                    <FormField label="Category" required>
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand">
                            <option value="">Select category</option>
                            <option value="Programming">Programming</option>
                            <option value="Design">Design</option>
                            <option value="Business">Business</option>
                            <option value="Marketing">Marketing</option>
                            <option value="Photography">Photography</option>
                            <option value="Music">Music</option>
                            <option value="Other">Other</option>
                        </select>
                    </FormField>

                    <FormField label="Price ($)" required>
                        <input
                            type="number"
                            min="0"
                            step="0.01"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand"
                            placeholder="0.00"
                        />
                    </FormField>

                    <FormField label="Level">
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand">
                            <option value="Beginner">Beginner</option>
                            <option value="Intermediate">Intermediate</option>
                            <option value="Advanced">Advanced</option>
                        </select>
                    </FormField>

                    <FormField label="Duration">
                        <input
                            type="text"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand"
                            placeholder="e.g., 10 hours, 5 weeks"
                        />
                    </FormField>

                    <FormField label="Language">
                        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand">
                            <option value="English">English</option>
                            <option value="Spanish">Spanish</option>
                            <option value="French">French</option>
                            <option value="German">German</option>
                            <option value="Other">Other</option>
                        </select>
                    </FormField>
                </div>

                <FormField label="Short Description">
                    <textarea
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand"
                        placeholder="Brief course description"
                    />
                </FormField>

                <FormField label="Detailed Description" required>
                    <textarea
                        rows={6}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand"
                        placeholder="Detailed course description"
                    />
                </FormField>
            </div>

            {/* Thumbnail */}
            <div className="bg-white rounded-lg shadow border border-gray-300 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <Upload className="h-5 w-5" />
                    Course Thumbnail
                </h3>

                <FormField label="Thumbnail URL">
                    <div className="flex gap-4">
                        <input
                            type="url"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand"
                            placeholder="https://example.com/image.jpg"
                        />
                    </div>
                    <div className="mt-4">
                        <div className="relative w-48 h-32">
                            <Image
                                src=""
                                alt="Thumbnail preview"
                                fill
                                className="object-cover rounded-lg border"
                            />
                        </div>
                    </div>
                </FormField>
            </div>

            {/* Requirements */}
            <div className="bg-white rounded-lg shadow border border-gray-300 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Requirements
                </h3>

                <div className="space-y-3">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand"
                            placeholder="Enter a requirement"
                        />
                        <button
                            type="button"
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                    <button
                        type="button"
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                        <Plus className="h-4 w-4" />
                        Add Requirement
                    </button>
                </div>
            </div>

            {/* Learning Outcomes */}
            <div className="bg-white rounded-lg shadow border border-gray-300 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <Star className="h-5 w-5" />
                    What You'll Learn
                </h3>

                <div className="space-y-3">
                    <div className="flex gap-2">
                        <input
                            type="text"
                            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand"
                            placeholder="Enter a learning outcome"
                        />
                        <button
                            type="button"
                            className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                        >
                            <X className="h-4 w-4" />
                        </button>
                    </div>
                    <button
                        type="button"
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                        <Plus className="h-4 w-4" />
                        Add Learning Outcome
                    </button>
                </div>
            </div>

            {/* Lessons */}
            <div className="bg-white rounded-lg shadow border border-gray-300 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                    <Video className="h-5 w-5" />
                    Course Lessons
                </h3>

                <div className="space-y-4">
                    <LessonItem lesson={{}} index={0} />
                    <button
                        type="button"
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                    >
                        <Plus className="h-4 w-4" />
                        Add Lesson
                    </button>
                </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
                <Link
                    href="/instructor/dashboard?"
                    className="px-6 py-3 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                >
                    Cancel
                </Link>
                <button
                    type="submit"
                    className="px-6 py-3 bg-brand text-white rounded-md hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand transition-colors"
                >
                    <div className="flex items-center gap-2">
                        <Save className="h-4 w-4" />
                        Save Changes
                    </div>
                </button>
            </div>
        </form>
    );
};

export default function CourseEditPage() {
    return (
    <ProtectedRoute>
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <div className="bg-white shadow-sm border-b border-gray-200">
                <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center py-6">
                        <div className="flex items-center gap-4">
                            <Link
                                href="/instructor/courses"
                                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                            >
                                <ArrowLeft className="h-5 w-5" />
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold text-gray-900">Edit Course</h1>
                                <p className="text-gray-600">Course Title</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <Link
                                href="#"
                                className="flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
                            >
                                <Eye className="h-4 w-4" />
                                Preview
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <CourseEditForm />
            </div>
        </div>
    </ProtectedRoute>
    );
}