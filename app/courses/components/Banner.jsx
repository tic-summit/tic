import React, { use } from 'react'
import { StarIcon, TimerIcon, User2Icon } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContexts';
import Link from 'next/link';


export default function Banner() {
 const {user, isAuthenticated} = useAuth()

  return (
    <div className="relative bg-gray-900 text-white py-24 overflow-hidden px-4">
                {/* Background Image with Fade Effect */}
                <div className="absolute inset-0 z-0">
                    <img
                        src="https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=1600&h=900&fit=crop"
                        alt="Course background"
                        className="w-full h-full object-cover opacity-50"
                        loading="eager"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 to-gray-900/40"></div>
                </div>

                {/* Content */}
                <div className="max-w-7xl mx-auto px-4 relative z-10">
                    <div className="max-w-4xl">
                        {/* Course Title with Fade Animation */}
                        <h2
                            className="text-4xl md:text-5xl font-bold mb-6 leading-tight"
                            data-aos="fade-up"
                        >
                            Master Modern Web Development
                        </h2>

                        {/* Course Description */}
                        <p
                            className="text-lg text-gray-300 mb-8 max-w-2xl"
                            data-aos="fade-up"
                            data-aos-delay="100"
                        >
                            Dive into the latest technologies and frameworks with our comprehensive course designed for all skill levels.
                        </p>

                        {/* Course Info with Staggered Animations */}
                        <div className="flex flex-wrap items-center gap-6">
                            <div
                                className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full"
                                data-aos="fade-up"
                                data-aos-delay="150"
                            >
                                <img
                                    src="https://dreamslms-wp.dreamstechnologies.com/wp-content/themes/dreamslms/assets/images/icon-01.svg"
                                    alt="Lessons"
                                    className="w-5 h-5 mr-2"
                                />
                                <span>24 Comprehensive Lessons</span>
                            </div>

                            <div
                                className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full"
                                data-aos="fade-up"
                                data-aos-delay="200"
                            >
                                <TimerIcon className="w-5 h-5 mr-2" />
                                <span>35 Hours of Content</span>
                            </div>

                            <div
                                className="flex items-center bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full"
                                data-aos="fade-up"
                                data-aos-delay="250"
                            >
                                <User2Icon className="w-5 h-5 mr-2" />
                                <span className="mr-4">1,240 Enrolled</span>
                                <div className="flex items-center">
                                    {[...Array(5)].map((_, i) => (
                                        <StarIcon
                                            key={i}
                                            className="w-4 h-4 text-yellow-400 fill-yellow-400"
                                        />
                                    ))}
                                    <span className="ml-2">4.9/5</span>
                                </div>
                            </div>
                        </div>

                        {/* CTA Button */}
                        {isAuthenticated ?<button
                            className="mt-8 bg-primary border border-white hover:bg-primary-dark text-white px-8 py-3 rounded-full font-medium all duration-300 transform hover:scale-105"
                            data-aos="fade-up"
                            data-aos-delay="300"
                        >
                            Enroll Now
                        </button>
                        : <Link
                        href={'/auth/login'}
                        className="bg-primary mt-8 block w-fit border border-white hover:bg-primary-dark text-white px-8 py-3 rounded-full font-medium all duration-300 transform hover:scale-105"
                        >
                            Login to Enroll
                        </Link> }
                    </div>
                </div>
            </div>
  )
}
