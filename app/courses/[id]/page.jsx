"use client"
import Header from '@/components/header';
import CourseCurriculum from '../components/CourseCurriculum';
import CourseInfo from '../components/CourseInfo';
import Banner from '../components/Banner';
import { useParams } from 'next/navigation';

const CourseTabs = () => {
    const params = useParams();
    const courseId = params?.id;
    
    if (!courseId) {
        return <div>Course ID not found</div>;
    }

    return (
        <div className="min-h-screen">
            <Banner courseId={courseId} />
            <div className="max-w-[1500px] mx-auto px-4 py-8">
                <div className='flex flex-col lg:flex-row justify-between gap-10'>
                    <CourseCurriculum courseId={courseId} />
                    <CourseInfo courseId={courseId} />
                </div>
            </div>
        </div>
    );
};

export default CourseTabs;