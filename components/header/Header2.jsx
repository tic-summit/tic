"use client"

import AuthButtons from '@/components/header/components/AuthButtons'
import { Input } from '@/components/ui/input'
import Logo from '@/components/ui/Logo'
import { useAuth } from '@/contexts/AuthContexts'
import { AnimatePresence, motion } from 'framer-motion'
import { Bell, Menu, Search, X } from 'lucide-react'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import Navbar from './components/Navbar2'
import MobileMenu from './components/MobileMenu'
import CourseSidebar from '@/app/courses/[id]/[module]/components/courseSidebar'
import CourseHeadr from './components/CourseHeadr'

const SearchBar = ({ isOpen, onClose }) => {
    const searchRef = useRef(null)

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (searchRef.current && !searchRef.current.contains(event.target)) {
                onClose()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [onClose])

    return (
        <AnimatePresence>
            {isOpen && (
                <div
                    ref={searchRef}
                    className="fixed inset-0 z-50 bg-black/50 lg:bg-transparent lg:relative"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className='bg-white p-4 lg:p-2 lg:absolute lg:left-0 lg:right-0 lg:top-full lg:mx-auto lg:max-w-md lg:rounded-lg lg:shadow-lg'
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className='relative'>
                            <Input 
                                placeholder="Search courses" 
                                className='border border-brand bg-white pl-10 pr-4 py-3 w-full'
                                autoFocus
                            />
                            <Search className='absolute left-3 top-3.5 w-5 h-5 text-gray-400' />
                            <button 
                                className='absolute right-3 top-3.5 lg:hidden'
                                onClick={onClose}
                            >
                                <X className='w-5 h-5' />
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

function Header2() {
    const [openMenu, setOpenMenu] = useState(false)
    const [openSearch, setOpenSearch] = useState(false)
    const params = useParams()
    const { user } = useAuth()
    const pathName = usePathname();

    const navLinks = [
        { path: '/', pathName: 'Home' },
        { path: '/courses', pathName: 'courses' },
        { path: '/internships', pathName: 'Internships' },
        { path: '/hackathons', pathName: 'Hackathons' },
        { path: '/mentor', pathName: 'Mentorship' },
    ]

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (openMenu && !event.target.closest('.mobile-menu-trigger')) {
                setOpenMenu(false)
            }
        }

        document.addEventListener('click', handleClickOutside)
        return () => document.removeEventListener('click', handleClickOutside)
    }, [openMenu])

    const pathname = usePathname();

    if (pathname.startsWith(`/courses/${params.id}/`)) {
        return <CourseHeadr />;
    }

    return (
        <header className="h-16 lg:h-24 px-4 bg-white z-40 ">
            <div className={`${pathname === '/labs/new' ? '' : 'max-w-[1600px]'} mx-auto h-full flex items-center justify-between`}>
                {/* Left section - Logo */}
                <div className="flex items-center">
                    <Logo className="h-8 lg:h-10" />
                </div>

                {/* Middle section - Desktop Nav */}
                <div className="middle-section hidden lg:block">
                    <Navbar links={navLinks} onLinkClick={() => { }} />
                </div>

                {/* Right section - Icons and Auth */}
                <div className="flex items-center gap-2 sm:gap-4 md:gap-6 lg:gap-8">
                    <div className='flex items-center gap-2 sm:gap-4'>
                        {/* Search Button */}
                        <button
                            className='p-2 hover:bg-gray-100 rounded-full lg:hidden'
                            onClick={() => setOpenSearch(!openSearch)}
                        >
                            <Search className='w-5 h-5' />
                        </button>
                        
                        {/* Search Bar (desktop) */}
                        <div className='hidden lg:block relative'>
                            <button
                                className='p-2 hover:bg-gray-100 rounded-full'
                                onClick={() => setOpenSearch(!openSearch)}
                            >
                                <Search className='w-5 h-5' />
                            </button>
                        </div>

                        {/* Notifications */}
                        {/* <div className="relative">
                            <button className="p-2 hover:bg-gray-100 rounded-full">
                                <Bell className="w-5 h-5 sm:w-6 sm:h-6" />
                            </button>
                            <div className="absolute -top-1 right-0 bg-pink-400 text-white text-xs flex items-center justify-center w-4 h-4 sm:w-5 sm:h-5 rounded-full">
                                0
                            </div>
                        </div> */}
                    </div>

                    {/* Auth Buttons */}
                    <div className="hidden md:block">
                        <AuthButtons />
                    </div>

                    {/* Mobile Menu Button */}
                    <button 
                        className='p-2 rounded hover:bg-gray-200 lg:hidden mobile-menu-trigger'
                        onClick={() => setOpenMenu(true)}
                    >
                        <Menu className='w-6 h-6' />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {openMenu && (
                    <MobileMenu
                        isOpen={openMenu}
                        onClose={() => setOpenMenu(false)}
                        links={navLinks}
                    />
                )}
            </AnimatePresence>

            {/* Search Bar */}
            <SearchBar isOpen={openSearch} onClose={() => setOpenSearch(false)} />
        </header>
    )
}

export default Header2