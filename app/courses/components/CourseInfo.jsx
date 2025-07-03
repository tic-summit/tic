"use client"
import useCourseDetails from '@/app/api/courses/useCourseDetails.js';
import { Facebook, Instagram, StarIcon, TimerIcon, Twitter, User2Icon } from 'lucide-react';

function CourseInfo({ courseId }) {
    const { courseInfo, loading, error } = useCourseDetails(courseId);

    console.log(useCourseDetails(courseId));

    if (loading) return (
        <div className="bg-white p-6 border border-gray-300 rounded-xl h-fit">
            <div className="animate-pulse space-y-4">
                <div className="h-6 w-1/3 bg-gray-200 rounded"></div>
                <div className="space-y-3">
                    {[...Array(7)].map((_, i) => (
                        <div key={i} className="flex gap-4">
                            <div className="h-4 w-16 bg-gray-200 rounded"></div>
                            <div className="h-4 w-32 bg-gray-200 rounded"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );

    if (error) return (
        <div className="bg-white p-6 border border-gray-300 rounded-xl h-fit text-red-500">
            Error loading course info: {error}
        </div>
    );

    if (!courseInfo) return null;

    return (
        <div className="bg-white p-6 border border-gray-300 rounded-xl h-fit min-w-76">
            <h3 className="text-xl font-bold mb-4">Course Info</h3>
            <ul className="space-y-3">
                <li className="flex">
                    <span className="text-gray-500 w-24">Class:</span>
                    <span className="text-gray-700">{courseInfo?.level}</span>
                </li>
                <li className="flex">
                    <span className="text-gray-500 w-24">Categories:</span>
                    <span className="text-gray-700">{courseInfo?.category}</span>
                </li>
                <li className="flex">
                    <span className="text-gray-500 w-24">Lessons:</span>
                    <span className="text-gray-700">{courseInfo?.features?.length || 0}</span>
                </li>
                <li className="flex">
                    <span className="text-gray-500 w-24">Quizzes:</span>
                    <span className="text-gray-700">2</span> {/* This would come from curriculum data */}
                </li>
                <li className="flex">
                    <span className="text-gray-500 w-24">Duration:</span>
                    <span className="text-gray-700">{courseInfo?.duration}</span>
                </li>
                <li className="flex">
                    <span className="text-gray-500 w-24">Packages:</span>
                    <span className="text-gray-700">{courseInfo?.price}</span>
                </li>
                <li className="flex">
                    <span className="text-gray-500 w-24">Capacity:</span>
                    <span className="text-gray-700">{courseInfo?.studentsEnrolled} enrolled</span>
                </li>
            </ul>

            <div className="mt-8">
                <h3 className="text-xl font-bold mb-4">Social Share</h3>
                <div className="flex space-x-3">
                    <a href="#" className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
                        <Facebook size={18} />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-blue-400 text-white flex items-center justify-center">
                        <Twitter size={18} />
                    </a>
                    <a href="#" className="w-10 h-10 rounded-full bg-pink-600 text-white flex items-center justify-center">
                        <Instagram size={18} />
                    </a>
                </div>
            </div>
        </div>
    );
}

export default CourseInfo;