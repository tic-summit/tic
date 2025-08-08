"use client"
import { Button } from '@/components/ui/button'
import { ArrowLeft, PlayCircleIcon } from 'lucide-react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import React from 'react'
import CourseMenu from './components/CourseMenu'
import useCourseDetails from '@/app/api/courses/useCourseDetails.js'

function Page() {
    const router = useRouter();
    const { courseId, module: moduleSlug, topic: topicSlug } = useParams();
    
    const {
        course,
        curriculum,
        loading,
        error
    } = useCourseDetails(courseId);

    console.log(course);
  
  

    // Find the current module and topic
    const currentModule = curriculum?.find(m => m.slug === moduleSlug);
    const currentTopic = currentModule?.topics?.find(t => t.slug === topicSlug);

    // Get next and previous topics for navigation
    const allTopics = curriculum?.flatMap(m => m.topics || []);
    const currentIndex = allTopics?.findIndex(t => t.slug === topicSlug);
    const nextTopic = currentIndex !== -1 && allTopics?.[currentIndex + 1];
    const prevTopic = currentIndex !== -1 && allTopics?.[currentIndex - 1];
   if(!currentModule || !currentTopic) {
     return <div className='flex items-center justify-center h-full'>
        <p className='text-gray-500'>Module or Topic not found</p>
   </div>;}
    return (
        <div className='flex h-[calc(100vh-5rem)] border'>
            <CourseMenu />
            <div className="bg-gray-100 w-full border boder-gray-800 flex h-[calc(100vh-5rem)] overflow-auto">
                <div className='max-w-[1500px] mx-auto w-full'>
                    <div className="py-4 px-4 max-w-4xl mx-auto">
                        <div className="mb-10">
                            <Button 
                                onClick={() => router.back()} 
                                variant='outline' 
                                className="bg-transparent border-none cursor-pointer shadow-none text-brand text-sm flex items-center"
                            >
                                <ArrowLeft className='h-6 w-6' /> Go Back
                            </Button>
                        </div>

                        <div className="title">
                            <h1 className='text-3xl md:text-4xl font-bold text-center text-gray-800 tracking-wide'>
                                {currentTopic?.title || 'Topic Not Found'}
                            </h1>
                            
                            <div className='flex justify-center mt-8 px-4'>
                                <div className='border h-[50vh] max-w-4xl flex-1 relative rounded-lg overflow-hidden'>
                                    <div className="thumbnail h-full w-full bg-black">
                                        {currentTopic?.videoUrl ? (
                                            <video
                                                className='w-full h-full object-cover'
                                                controls
                                                poster={currentTopic?.thumbnailUrl}
                                            >
                                                <source src={currentTopic.videoUrl} type="video/mp4" />
                                                Your browser does not support the video tag.
                                            </video>
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-white">
                                                Video Coming Soon
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="desc mt-6">
                                <p className='text-gray-600 text-lg md:text-xl max-w-4xl mx-auto px-4'>
                                    {currentTopic?.description || 'No description available for this topic.'}
                                </p>
                            </div>

                            <div className="max-w-4xl mx-auto border rounded-lg bg-white mt-8">
                                <div className='p-6 bg-gray-100 rounded-t-lg'>
                                    <h2 className='font-bold text-gray-800'>Course Content</h2>
                                    <div className='flex gap-6 items-center mt-3'>
                                        <div className='text-sm text-gray-800 font-bold'>0% Completed</div>
                                        <div className='text-sm text-gray-700'>0/{allTopics?.length} steps</div>
                                    </div>
                                </div>
                                
                                <div className='p-5 flex flex-col gap-4'>
                                    {currentModule?.topics?.map((topic) => (
                                        <Link 
                                            key={topic.id}
                                            href={`/courses/${courseId}/${currentModule.slug}/${topic.slug}`}
                                            className={`flex items-center justify-between p-3 rounded ${topic.slug === topicSlug ? 'bg-brand/10' : 'hover:bg-gray-50'}`}
                                        >
                                            <div className='flex items-center gap-3'>
                                                <PlayCircleIcon className={`h-6 w-6 ${topic.slug === topicSlug ? 'fill-brand text-white' : 'text-gray-400'}`} />
                                                <span className={`font-medium ${topic.slug === topicSlug ? 'text-brand' : 'text-gray-800'}`}>
                                                    {topic.title}
                                                </span>
                                            </div>
                                            <div className='flex items-center gap-3'>
                                                <span className='text-gray-600 text-sm'>{topic.duration}</span>
                                                <div className={`w-4 h-4 rounded-full border ${topic.slug === topicSlug ? 'bg-brand border-brand' : 'border-gray-300'}`}></div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-10 flex justify-between max-w-4xl mx-auto">
                                {prevTopic ? (
                                    <Link 
                                        href={`/courses/${courseId}/${prevTopic.moduleSlug}/${prevTopic.slug}`}
                                        className="border border-gray-300 rounded-md px-4 py-2 text-sm text-brand font-semibold hover:bg-gray-100"
                                    >
                                        Previous
                                    </Link>
                                ) : (
                                    <div></div>
                                )}
                                
                                {nextTopic ? (
                                    <Link 
                                        href={`/courses/${courseId}/${nextTopic.moduleSlug}/${nextTopic.slug}`}
                                        className="border border-gray-300 rounded-md px-4 py-2 text-sm text-brand font-semibold hover:bg-gray-100"
                                    >
                                        Next
                                    </Link>
                                ) : (
                                    <Link 
                                        href={`/courses/${courseId}`}
                                        className="border border-gray-300 rounded-md px-4 py-2 text-sm text-brand font-semibold hover:bg-gray-100"
                                    >
                                        Finish Course
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page