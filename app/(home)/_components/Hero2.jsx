
"use client"
import AuthButtons from '@/components/header/components/AuthButtons'
import TopBar from '@/components/header/components/TopBar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Logo from '@/components/ui/Logo'
import { ArrowRight, Bell, Menu, Search, SearchIcon, X } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { animate, AnimatePresence, motion } from 'framer-motion'

function Hero2() {



    return (
        <div className='bg-[#f1f0f8]'>
            {/*Header */}

            {/* Hero */}
            {/* bg-[#f1f0f8 */}
            <div className=''>
                <div className='max-w-[1500px] mx-auto'>
                    <div className='grid grid-cols-1 md:grid-cols-2 h-[calc(70vh-6rem)]   md:h-[calc(95vh-6rem)] gap-4  pl-4  overflow-hidden'>
                        <div className="letf-section md:ml-10 h-[calc(70vh-6rem)]  md:h-[calc(95vh-6rem)]  flex flex-col  justify-center">
                            <div className="hero-title space-y-8 px-2 md:px-10">
                                <h1 className='text-3xl md:text-4xl lg:text-7xl  tracking-tight leading-10 md:leading-16 lg:leading-24'>
                                    <span className='text-green-400'>Empowering</span> The Next <span className='text-brand'>Genration</span> Of Tech Talents
                                </h1>
                                <div className="hero-subtitle ">
                                    <h2 className='text-gray-700'>
                                        Master in-demand tech skills through interactive courses,
                                        real-world projects, hackathons, internships,
                                        and expert mentorship — all in one platform
                                    </h2>
                                </div>
                                <div className="hero-action">
                                    <Link href={`/courses`} className='  text-xl flex items-center gap-2 text-brand'>Explore Courses <ArrowRight /></Link>
                                </div>
                            </div>
                        </div>
                        <div className="hidden md:block right-section  h-full ml-16">
                            <div className="h-full border-none pt-6">
                                <img
                                    src="/hero.png"
                                    alt=""
                                    className="object-cover h-[90%]"
                                />
                            </div>
                        </div>

                    </div>
                </div>
            </div>

            {/* <div>
                <svg id="svg"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0, 0, 400,27.708333333333336"
                >
                    <g id="svgg">
                        <path id="path0"
                            d="M0.000 13.854 L 0.000 27.708 200.000 27.708 L 400.000 27.708 400.000 14.216 L 400.000 0.725 395.573 1.822 C 322.012 20.064,241.242 29.243,178.709 26.467 C 123.876 24.033,57.451 14.315,4.123 0.926 C 2.094 0.417,0.336 0.000,0.217 0.000 C 0.069 0.000,0.000 4.399,0.000 13.854 "
                            stroke="none"
                            fill="#fff"
                            fillRule="evenodd"></path>
                    </g>
                </svg>
            </div> */}
        </div>
    )
}

export default Hero2
