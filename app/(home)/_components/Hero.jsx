import Header from '@/components/header'
import React from 'react'
import Searchbar from './Searchbar.'
import LearningPath from './LearningPaths'

function Hero() {
    return (
        <div>
            <div className='bg-gradient-to-r from-brand to-gray-700  h-[70vh] md:h-[80vh] relative '>
                <Header />
                <div className="hero-content text-white dark:text-white max-w-7xl mx-auto py-30 px-4">
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