import Header from '@/components/header'
import React from 'react'
import Searchbar from './Searchbar.'
import LearningPath from './LearningPaths'
import { FaBook, FaAngular, FaJs, FaLightbulb, FaHistory, FaStar, FaEnvelope, FaCheck } from 'react-icons/fa'
import { SiJavascript } from 'react-icons/si'
import { GiCash } from 'react-icons/gi'
import { LucideVerified, Verified } from 'lucide-react'

function Hero() {
    return (
        <div>
            <div className='bg-gradient-to-r from-gray-50 to-blue-50  h-[65vh] md:h-[80vh] relative overflow-hidden'>
                {/* Floating Icons */}
                <FaAngular className="absolute top-1/3 right-1/3 text-red-500 text-5xl opacity-90 animate-float-delay" />
                <SiJavascript className="absolute top-1/5 right-1/4 text-yellow-500 text-4xl opacity-90 animate-float" />
                <FaLightbulb className="absolute top-1/6 left-1/6 text-yellow-500 text-4xl opacity-90 animate-float-delay" />
                <GiCash className="absolute top-1/2 right-1/2 text-green-500 text-4xl opacity-90 animate-float" />
                <FaHistory className="absolute top-3/4 right-1/3 text-purple-500 text-4xl opacity-90 animate-float-delay" />
                <FaStar className="absolute top-1/4 right-1/5 text-yellow-500 text-4xl opacity-90 animate-float" />
                <div className='absolute top-1/2 right-1/5 p-6 rounded-2xl  border border-gray-300 text-4xl animate-float text-gray-800 backdrop-blur-md'>
                    <div className="flex items-center gap-4">
                        <div className="bg-yellow-500 p-3 rounded-full w-fit">
                            <FaEnvelope className="text-white text-lg" />
                        </div>
                        <div>
                            <div className="text-sm font-bold">Congratulations</div>
                            <div className='text-sm flex items-center gap-2'>
                                You are learning with us
                                <LucideVerified className='text-white fill-green-500' />
                            </div>
                        </div>
                    </div>
                </div>

                <Header />
                <div className="hero-content text-secondary max-w-7xl mx-auto py-30 px-4 relative z-10">
                    <div className="left-section w-full text-center md:text-start md:w-1/2">
                        <div className="header space-y-6">
                            <div className="title text-2xl md:text-5xl font-bold tracking-wide">
                                Empowering the Next Generation of Tech Talent
                            </div>
                            <div className="subtitle">
                                Master in-demand tech skills through interactive courses, real-world projects, hackathons, internships, and expert mentorship — all in one platform
                            </div>
                        </div>
                        <div className="search-wrapper mt-18">
                            <Searchbar />
                        </div>
                    </div>
                    <div className="right-section"></div>
                </div>
                <div className="hidden lg:absolute lg:-bottom-30 left-1/2 lg:transform lg:-translate-x-1/2 w-full max-w-7xl mx-auto">
                    <LearningPath />
                </div>
            </div>
        </div>
    )
}

export default Hero