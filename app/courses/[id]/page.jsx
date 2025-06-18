
"use client"

import Header from '@/components/header';
import CourseCurriculum from '../components/CourseCurriculum';
import CourseInfo from '../components/CourseInfo';
import Banner from '../components/Banner';

const CourseTabs = () => {
    

    return (
        <div>
            <Header />
            {/* Banner Section with Gradient Overlay */}
            <Banner />
            <div className="max-w-7xl mx-auto px-4 py-8">


                <div className='flex flex-col lg:flex-row justify-between gap-10'>
                    <CourseCurriculum />
                   
                    {/* Sidebar */}
                   <CourseInfo />
                </div>
            </div>
        </div>
    );
};

export default CourseTabs;