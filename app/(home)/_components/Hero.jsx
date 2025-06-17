import Header from '@/components/header'
import React from 'react'
import Searchbar from './Searchbar.'
import LearningPath from './LearningPaths'
import { FaBook, FaAngular, FaJs, FaLightbulb, FaHistory, FaStar, FaEnvelope } from 'react-icons/fa'
import { SiJavascript } from 'react-icons/si'
import { GiCash } from 'react-icons/gi'
import { LucideVerified } from 'lucide-react'
import Image from 'next/image'

function Hero() {
    return (
        <div>
            <div className='bg-gradient-to-r from-gray-50 to-blue-50 h-[65vh] md:h-[80vh] relative overflow-hidden'>
                {/* Floating Icons - Adjusted for mobile */}
                <FaAngular className="hidden sm:block absolute top-1/4 sm:top-1/3 right-1/4 sm:right-1/3 text-red-500 text-3xl sm:text-5xl opacity-70 z-10 animate-float-delay" />
                <SiJavascript className="hidden sm:block absolute top-1/6 sm:top-1/5 right-1/6 sm:right-1/4 text-yellow-500 text-2xl sm:text-4xl opacity-70 z-10 animate-float" />
                <FaLightbulb className="absolute top-1/6 left-1/6 text-yellow-500 text-2xl sm:text-4xl opacity-70 z-10 animate-float-delay" />
                <FaHistory className="hidden sm:block absolute top-3/4 right-1/4 sm:right-1/3 text-purple-500 text-2xl sm:text-4xl opacity-70 z-10 animate-float-delay" />
                <FaStar className="absolute top-1/4 right-1/6 sm:right-1/5 text-yellow-500 text-2xl sm:text-4xl opacity-70 z-10 animate-float" />
                
                {/* Notification Card - Adjusted for mobile */}
                <div className='absolute bottom-4 sm:bottom-18 right-4 sm:right-1/3 p-4 sm:p-6 rounded-2xl border border-gray-300 text-xl sm:text-4xl z-20 animate-float text-gray-800 backdrop-blur-md bg-white/30'>
                    <div className="flex items-center gap-2 sm:gap-4">
                        <div className="bg-yellow-500 p-2 sm:p-3 rounded-full w-fit">
                            <FaEnvelope className="text-white text-sm sm:text-lg" />
                        </div>
                        <div>
                            <div className="text-xs sm:text-sm font-bold text-gray-800">Congratulations</div>
                            <div className='text-xs sm:text-sm flex items-center gap-1 sm:gap-2 text-gray-700'>
                                Learning with us
                                <LucideVerified className='text-white fill-green-500 w-3 h-3 sm:w-4 sm:h-4' />
                            </div>
                        </div>
                    </div>
                </div>

                <Header />
                <div className="hero-content text-secondary max-w-7xl mx-auto py-20 sm:py-30 px-4 relative z-10 h-full flex flex-col md:flex-row items-center md:justify-between">
                    <div className="left-section w-full text-center md:text-start md:w-1/2">
                        <div className="header space-y-4 sm:space-y-6">
                            <div className="title text-lg sm:text-4xl font-bold tracking-wide">
                                Empowering < br className='lg:hidden' /> the Next Generation of Tech Talent
                            </div>
                            <div className="subtitle text-[17px] sm:text-lg">
                                Master in-demand tech skills through interactive courses, real-world projects, hackathons, internships, and expert mentorship — all in one platform
                            </div>
                        </div>
                        <div className="search-wrapper mt-6 sm:mt-8 md:mt-12">
                            <Searchbar />
                        </div>
                    </div>
                    
                    {/* Right Section with Hero Image */}
                    <div className="right-section hidden lg:block md:w-1/2 h-full relative rounded-[30%_70%_70%_30%_/_30%_30%_70%_70%] bg-brand ml-10 md:ml-20">
                        <div className="absolute right-0 md:right-10 bottom-0 w-full max-w-xs md:max-w-xl">
                            <Image
                                src="/hero.png"
                                alt="Tech students learning"
                                width={600}
                                height={600}
                                className="w-full h-auto object-contain"
                                priority
                            />
                        </div>
                    </div>
                </div>
                
                <div className="hidden lg:absolute lg:-bottom-30 left-1/2 lg:transform lg:-translate-x-1/2 w-full max-w-7xl mx-auto">
                    <LearningPath />
                </div>
            </div>
        </div>
    )
}

export default Hero