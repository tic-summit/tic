"use client";
import React from 'react';
import Link from 'next/link';
import { FaBookOpen, FaCheckCircle, FaPlay, FaRedo } from 'react-icons/fa';
import { useContinueCourseUrl } from '@/app/api/courses/useCourseProgressTracking';
import useCourseDetails from '@/app/api/courses/useCourseDetails.js';

export default function CourseRow({ course }) {
    const continueUrl = useContinueCourseUrl(course._id);
    const { curriculum } = useCourseDetails(course._id);
    
    // Determine the correct URL for continue/start course
    const getCourseUrl = () => {
        if (continueUrl) {
            return continueUrl;
        }
        
        // If no continue URL, navigate to first module
        if (curriculum && curriculum.length > 0) {
            return `/courses/${course._id}/${curriculum[0]._id}`;
        }
        
        // Fallback to course details page
        return `/courses/${course._id}`;
    };

    const courseUrl = getCourseUrl();

    return (
        <tr key={course._id} className="hover:bg-gray-50">
            <td className="px-6 py-4">
                <div className="flex items-center">
                    <div className="flex-shrink-0 w-20 h-15">
                        {course.thumbnail ? (
                            <img 
                                className="w-20 h-15 rounded object-cover" 
                                src={course.thumbnail} 
                                alt={course.title} 
                            />
                        ) : (
                            <div className="w-20 h-15 bg-gradient-to-br from-blue-500 to-purple-600 rounded flex items-center justify-center">
                                <FaBookOpen className="w-8 h-8 text-white" />
                            </div>
                        )}
                    </div>
                    <div className="ml-4 flex-1">
                        <h6 className="text-sm font-medium text-gray-900 hover:text-blue-600">
                            <Link href={`/courses/${course._id}`}>
                                {course.title}
                            </Link>
                        </h6>
                        <div className="mt-2">
                            <div className="flex justify-between items-center mb-1">
                                <span className="text-xs text-gray-500">Progress</span>
                                <span className="text-xs font-medium text-gray-700">{course.progress || 0}%</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                                <div 
                                    className={`h-2 rounded-full ${
                                        course.progress === 100 ? 'bg-green-600' : 'bg-brand'
                                    }`} 
                                    style={{ width: `${course.progress || 0}%` }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {course.category || 'General'}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {course.progress || 0}%
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {course.lastAccessed ? new Date(course.lastAccessed).toLocaleDateString() : 'Never'}
            </td>
            <td className="px-6 py-4 whitespace-nowrap text-sm">
                {course.progress === 100 ? (
                    <div className="flex space-x-2">
                        <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-green-700 bg-green-100 cursor-not-allowed opacity-75">
                            <FaCheckCircle className="mr-1 h-3 w-3" />
                            Complete
                        </button>
                        <Link 
                            href={courseUrl}
                            className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                            <FaRedo className="mr-1 h-3 w-3" />
                            Restart
                        </Link>
                    </div>
                ) : (
                    <Link 
                        href={courseUrl}
                        className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200"
                    >
                        <FaPlay className="mr-1 h-3 w-3" />
                        Continue
                    </Link>
                )}
            </td>
        </tr>
    );
}
