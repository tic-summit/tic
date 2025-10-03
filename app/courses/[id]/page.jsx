"use client"
import Header from '@/components/header';
import CourseCurriculum from '../components/CourseCurriculum';
import CourseInfo from '../components/CourseInfo';
import Banner from '../components/Banner';
import { useParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContexts';
import { useEnrollmentStatus } from '@/app/api/courses/useCourseEnroll';
import { useCourseProgress } from '@/app/api/courses/useCourseProgress';
import CourseProgress from '@/components/course/CourseProgress';
import EnrollmentDebug from '@/components/course/EnrollmentDebug';

const CourseTabs = () => {
    const params = useParams();
    const courseId = params?.id;
    const { user, isAuthenticated } = useAuth();
    const { data: enrollmentStatus, isLoading: enrollmentLoading } = useEnrollmentStatus(courseId);
    const { data: progressData } = useCourseProgress(courseId);
    
    if (!courseId) {
        return <div>Course ID not found</div>;
    }

    const isEnrolled = enrollmentStatus?.isEnrolled || false;
    const isInstructor = user?.userType === 'instructor';

    return (
        <div className="min-h-screen">
            <Banner courseId={courseId} />
            <div className="max-w-[1500px] mx-auto px-4 py-8">
                <div className='flex flex-col lg:flex-row justify-between gap-10'>
                    <CourseCurriculum courseId={courseId} />
                    <div className="flex flex-col gap-6">
                        {/* Show progress for enrolled students */}
                        {isAuthenticated && isEnrolled && progressData && (
                            <CourseProgress 
                                course={progressData.course} 
                                enrollment={progressData.enrollment}
                            />
                        )}
                        <CourseInfo courseId={courseId} />
                    </div>
                </div>
            </div>
            <EnrollmentDebug courseId={courseId} />
        </div>
    );
};

export default CourseTabs;