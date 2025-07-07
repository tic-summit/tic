"use client"
import { Button } from '@/components/ui/button'
import Logo from '@/components/ui/Logo';
import { ArrowLeft, ChevronLeft, ChevronRight, Menu, PlayCircleIcon, PlayIcon } from 'lucide-react'
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react'
import CourseMenu from './components/CourseMenu';

function page() {
    const router = useRouter();
    const { courseId, module } = useParams();
    const decodedModule = decodeURIComponent(module);


    const moduleTopics = [{
        title: 'Overview',
        duration: '09:00',
        module: 'overview',
        icon: <PlayCircleIcon className='fill-brand text-white h-8 w-8' />
    },
    {
        title: 'Why Digital Marketing?',
        duration: '11:00',
        module: 'why-digital-marketing',
        icon: <PlayCircleIcon className='fill-brand text-white h-8 w-8' />
    }]

    return (
        <div className='flex h-[calc(100vh-5rem)] border'>
           <CourseMenu />
            <div className="bg-gray-100 w-full border boder-gray-800 flex  h-[calc(100vh-5rem)] overflow-auto">
                <div className='max-w-[1500px] mx-auto'>

                    {/* Content goes here */}
                    <div className="">
                        <div className='py-4 px-4 max-w-4xl mx-auto'>
                            <div className="mb-10">
                                <div className='text-start text-lg'>
                                    <Button onClick={() => router.back()} variant='outline' className={`bg-transparent border-none cursor-pointer shadow-none text-brand  text-sm flex items-center`}><ArrowLeft className='h-6 w-6' /> Go Back</Button>
                                </div>
                            </div>
                            <div className="title">
                                <h1 className='text-3xl md:text-4xl font-bold text-center text-gray-800 tracking-wide'>{decodedModule}</h1>
                                <div className='flex justify-center mt-8 px-4'>
                                    <div className='border h-[50vh] max-w-4xl flex-1 relative'>
                                        <div className="thumbnail h-full w-full">
                                            <video
                                                className='w-full h-full object-cover'
                                                controls
                                                poster="/images.jpg">
                                                Your browser does not support the video tag.
                                            </video>
                                        </div>
                                        <div className="absolute"></div>
                                    </div>
                                </div>
                                <div>
                                    <div className="desc">
                                        <p className='text-gray-600 text-lg md:text-xl mt-6 max-w-4xl mx-auto  px-4'>
                                            In this video, we will explore the fundamentals of digital marketing, including key concepts, strategies, and tools used in the industry.
                                            Whether you're a beginner or looking to refresh your knowledge, this video will provide you with a solid foundation in digital marketing.
                                            We will cover topics such as search engine optimization (SEO), social media marketing, content marketing, email marketing, and more.
                                            By the end of this video, you will have a better understanding of how digital marketing works and how you can leverage it to grow your business or career.
                                        </p>
                                    </div>
                                </div>
                                <div>
                                    <div className="max-w-4xl mx-auto border rounded-lg bg-white mt-8">
                                        <div className='p-6 bg-gray-100'>
                                            <h2 className='font-bold text-gray-800'>Course Content</h2>
                                            {/* percentage completed */}
                                            <div className='flex  gap-6 items-center mt-3'>
                                                <div className='text-sm text-gray-800 font-bold'> 0% Completed</div>
                                                <div className='text-sm text-gray-700'>0/2 steps</div>
                                            </div>
                                        </div>
                                        {/* course topics */}
                                        <div className='p-5 flex flex-col gap-4'>
                                            {
                                                moduleTopics.map((topic, index) => (
                                                    <Link key={index} href={`/courses/68231bb687b6be6bce9cb4c9/${module}/${topic.module}`} className='flex items-center justify-between'>
                                                        <div className='flex items-center gap-2'>
                                                            {topic.icon}
                                                            <span className='font-bold text-gray-800'>{topic.title}</span>
                                                        </div>
                                                        <div className='flex items-center gap-2'>
                                                            <span className='text-gray-800'>{topic.duration}</span>
                                                            <input type='radio' />
                                                        </div>
                                                    </Link>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-10">
                                    <div className='text-center'>
                                        <Button onClick={() => router.back()} variant='outline' className={`bg-transparent border-none cursor-pointer shadow-none text-brand underline flex items-center`}><ArrowLeft /> Go Back</Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default page
