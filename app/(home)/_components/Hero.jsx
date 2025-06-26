"use client"
import Header from '@/components/header'
import React from 'react'
import LearningPath from './LearningPaths'
import { FaBook, FaAngular, FaJs, FaLightbulb, FaHistory, FaStar, FaEnvelope } from 'react-icons/fa'
import { SiJavascript } from 'react-icons/si'
import { GiCash } from 'react-icons/gi'
import { ArrowBigRight, ArrowRight, LucideVerified } from 'lucide-react'
import Image from 'next/image'
import { useAuth } from '@/contexts/AuthContexts'
import Link from 'next/link'
import Searchbar from './Searchbar.'

function Hero() {
    const { user, isAuthenticated } = useAuth()

    return (
        <div >
            <div className='bg-indigo-950 relative overflow-hidden'>
                {/* Floating Icons - Improved positioning and responsiveness */}
                <FaAngular className="absolute top-16 sm:top-1/3 right-1/4 sm:right-1/2 text-red-500 text-3xl sm:text-5xl opacity-70 z-10 animate-bounce" />
                <SiJavascript className="hidden sm:block absolute top-12 sm:top-1/5 right-1/6 sm:right-1/4 text-yellow-500 text-2xl sm:text-4xl opacity-70 z-10 animate-pulse" />
                <FaLightbulb className="absolute top-16 left-1/6 text-yellow-500 text-2xl sm:text-4xl opacity-70 z-10 animate-bounce" />
                <FaStar className="absolute top-1/4 right-1/6 sm:right-1/5 text-yellow-500 text-2xl sm:text-4xl opacity-70 z-10 animate-pulse" />

                {/* Notification Card - Optional feature */}
                <div className='hidden xl:block absolute bottom-20 right-1/3 p-6 rounded-2xl border border-gray-300 z-20 text-gray-800 backdrop-blur-md bg-white/30 shadow-lg'>
                    <div className="flex items-center gap-4">
                        <div className="bg-yellow-500 p-3 rounded-full">
                            <FaEnvelope className="text-white text-lg" />
                        </div>
                        <div>
                            <div className="text-sm font-bold text-white">Congratulations</div>
                            <div className='text-sm flex items-center gap-2 text-white'>
                                Learning with us
                                <LucideVerified className='text-white fill-green-500 w-4 h-4' />
                            </div>
                        </div>
                    </div>
                </div>

                <Header />

                <div className="max-w-7xl mx-auto pt-12 pb-0 md:pt-20   px-4 relative z-10 h-auto flex flex-col md:flex-row md:items-center md:justify-between gap-10">
                    {/* Left Section - Content */}
                    <div className="w-full text-center md:text-left md:w-1/2">
                        <div className="space-y-4 sm:space-y-6">
                            {/* Logo/Icon */}
                            <div className="flex justify-center md:justify-start">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-16 h-16 sm:w-40 sm:h-20 text-brand"
                                    viewBox="0 0 100 100"
                                    fill="currentColor"
                                >
                                    <path d="M20.6,85c0.3,0,0.6-0.2,0.8-0.4c0.5-0.5,0.5-1.4,0-1.9c-1.2-1.2-4-2.2-8.1-3.6c-0.2-0.1-0.4-0.1-0.6-0.2  c2.9-0.9,5.9-1.6,8.9-2.3c2.4-0.6,5-1.1,7.5-1.8c5.4-1.5,11.1-2.8,16.6-4.1c11.7-2.7,23.7-5.4,34.5-10.7c5.7-2.8,8.5-5.6,8.6-8.7  c0.1-3-2.4-5.8-7.5-8.5c-0.4-0.2-0.8-0.4-1.2-0.6c-1.3-0.6-3-1.5-3.2-2.3c-0.1-0.3,0.2-0.8,0.8-1.4c2.1-2.3,5.1-4.3,8.1-6.1  c1-0.6,1.9-1.2,2.8-1.8c6.4-4.4,6.5-7.7,5.5-9.7C90.9,15,82.2,15,76.4,15c-1,0-2,0-2.9,0c-0.7,0-1.4,0.6-1.4,1.3  c0,0.7,0.6,1.4,1.3,1.4c0.9,0,1.9,0,3,0c5.4,0,12.8,0,15.1,4.4c0.7,1.4-0.9,3.7-4.6,6.2c-0.9,0.6-1.8,1.2-2.7,1.8  c-3.1,2-6.2,4-8.6,6.6c-1.2,1.3-1.6,2.5-1.4,3.7c0.4,2.1,2.6,3.2,4.6,4.2c0.4,0.2,0.8,0.4,1.1,0.6c4,2.2,6.1,4.3,6.1,6.1  c0,1.9-2.5,4.1-7,6.3C68.5,62.7,56.6,65.4,45,68.1c-5.5,1.3-11.3,2.6-16.7,4.1c-2.4,0.7-4.9,1.2-7.3,1.8c-3.1,0.7-6.3,1.4-9.5,2.4  c0.7-0.7,1.7-1.6,2.6-2.4c0.6-0.4,1.1-0.8,1.6-1.2c1.8-1.8,2-1.9,1.8-2.7l-0.2-0.8l-0.8-0.2c-0.8-0.2-0.8-0.2-4,2.7  c-0.6,0.4-1.2,0.7-1.9,1.1c-1.9,1.1-3.8,2.2-4.8,3.7c-0.3,0.4-0.3,1-0.2,1.5c0.4,1.2,2.1,1.9,6.8,3.5c2.6,0.9,6.2,2.1,7,2.9  C19.8,84.9,20.2,85,20.6,85z" />
                                </svg>
                            </div>

                            {/* Main Heading */}
                            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-wide text-white leading-tight">
                                Empowering the Next{' '}
                                <br className="hidden sm:block" />
                                Generation of{' '}
                                <span className="text-white">Tech Talent</span>
                            </h1>

                            {/* Subtitle */}
                            <p className="text-base sm:text-lg lg:text-xl text-white leading-relaxed max-w-2xl mx-auto md:mx-0">
                                Master in-demand tech skills through interactive courses, real-world projects, hackathons, internships, and expert mentorship — all in one platform
                            </p>
                        </div>

                        {/* Search Bar */}
                        <div className="mt-6 sm:mt-8 md:mt-12">
                            <Searchbar />
                        </div>
                    </div>

                    {/* Right Section - Hero Image */}
                    <div className="md:w-1/2 h-auto px-10  ml-10 md:ml-20 bg-slate-600/10 rounded-full">
                        {/* Background Shape */}

                        {/* Hero Image */}
                        <img
                            src="/hero.png"
                            alt="Tech students learning"
                            className="w-full h-auto "
                        />
                    </div>
                </div>

                <div>
                   <svg id="svg" 
                   xmlns="http://www.w3.org/2000/svg" 
                   viewBox="0, 0, 400,27.708333333333336"
                   >
                    <g id="svgg">
                        <path id="path0" d="M0.000 13.854 L 0.000 27.708 200.000 27.708 L 400.000 27.708 400.000 14.216 L 400.000 0.725 395.573 1.822 C 322.012 20.064,241.242 29.243,178.709 26.467 C 123.876 24.033,57.451 14.315,4.123 0.926 C 2.094 0.417,0.336 0.000,0.217 0.000 C 0.069 0.000,0.000 4.399,0.000 13.854 " stroke="none" fill="#fff" fillRule="evenodd"></path>
                    </g>
                </svg>
                </div>

            </div>
        </div>
    )
}

export default Hero