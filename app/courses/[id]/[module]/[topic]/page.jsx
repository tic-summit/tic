"use client"
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useParams, useRouter } from 'next/navigation';
import React, { use } from 'react'
import CourseMenu from '../components/CourseMenu';

function page() {
    const router = useRouter();
    const params = useParams();
    const {id:courseId ,module, topic } = params;

    return (
         <div className='flex h-[cal(100vh-5rem)]'>
                   <CourseMenu />
            <div className='flex-1 h-full overflow-auto'>
                <div className="header border p-4">
                    <div className='text-brand flex items-center justify-center gap-4'>NEXT TOPIC <ChevronRight /></div>
                </div>
                <div className=" px-4 max-w-3xl mx-auto mt-10">
                    <h1 className='text-3xl font-bold'>{topic}</h1>
                    <div className="mt-5">
                        <div className="badge bg-gray-100 p-4 rounded-lg  max-w-sm text-sm text-gray-600 text-cnter">The complete digital marketing course</div>
                    </div>
                    <div className="mt-10">
                        <div>
                            <p className='text-gray-600 text-lg md:text-xl '>
                                This is the content for the {topic} topic.
                                Here you can add detailed information, resources, and any other relevant content that will help learners understand the topic better.
                                You can also include links to additional resources, videos, or any other materials that will enhance
                                the learning experience.
                                Feel free to customize this section with images, videos, or any other media that will make
                                the content more engaging and informative.
                                <br />
                                You can also add quizzes, exercises, or any other interactive elements to test the learners' understanding of the topic.
                                Make sure to provide clear instructions and explanations for each section to ensure that learners can follow along
                                easily and gain a comprehensive understanding of the topic.
                            </p>
                        </div>
                    </div>
                    <div className="mt-10">
                        {/* previous button and next button */}
                        <div className="flex justify-between">
                            <button className="border border-gray-300 rounded-md px-4 py-2 text-sm text-brand font-semibold hover:bg-gray-100">Previous</button>
                            <button className="border border-gray-300 rounded-md px-4 py-2 text-sm text-brand font-semibold hover:bg-gray-100">Next</button>
                        </div>
                        {/* back to course button */}
                        <div className="mt-4">
                            <button onClick={() => router.push(`/courses/${courseId}/`)} className="border border-gray-300 cursor-pointer rounded-md px-4 py-2 text-sm bg-brand text-white hover:bg-brand/90 font-semibold  w-full ">Back to Course</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
