"use client" // This directive is necessary because we're using client-side hooks like useState, useEffect, and usePathname

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
                    className="search-wrap absolute left-0 right-0 z-10 w-full max-w-md mx-auto"
                >

                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                        transition={{ duration: 0.5 }}
                        className='bg-gray-200 border p-2 rounded-lg min-w-full'
                    >
                        <Input placeholder="Search courses" className='border border-brand bg-white text-ellipsis' />
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

// Main Header component
function Header2() {
    const [openMenu, setOpenMenu] = useState(false)
    const [openSearch, setOpenSearch] = useState(false)
    const [isCourseMenuOpen, setIsCourseMenuOpen] = useState(false)
    const params = useParams()
    const { user } = useAuth()

    const navLinks = [
        { path: '/', pathName: 'Home' },
        { path: '/courses', pathName: 'courses' },
        { path: '/internships', pathName: 'Internships' },
        { path: '/hackathons', pathName: 'Hackathons' }, // Fixed duplicate pathName
        { path: '/mentor', pathName: 'Mentorship' },
    ]

    // Close menu when clicking outside
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
        return (
            <CourseHeadr />
       );
    }

    return (
        <header className="h-24 px-4  bg-white z-40      relative">
            <div className='max-w-[1400px] mx-auto h-full flex items-center justify-between'>
                <div className="right-section">
                    <Logo />
                </div>

                <div className="middle-section hidden lg:block">
                    <Navbar links={navLinks} onLinkClick={() => { }} />
                </div>

                <div className="left-section">
                    <div className='flex gap-4 md:gap-8 lg:gap-20 relative'>
                        <div className='flex items-center gap-4'>
                            <div className='relative'>
                                <button
                                    className='border-none p-4 hover:bg-gray-100 rounded-full'
                                    onClick={() => setOpenSearch(!openSearch)}
                                >
                                    <Search className='w-5 h-5' />
                                </button>
                            </div>

                            <div className="relative">
                                <button className="border-none bg-transparent p-2 hover:bg-gray-100 rounded-full">
                                    <Bell className="w-6 h-6" />
                                </button>
                                <div className="absolute -top-1 right-1 bg-green-600 text-white text-xs flex items-center justify-center w-5 h-5 rounded-full">
                                    0
                                </div>
                            </div>
                        </div>

                        <div className='flex items-center gap-4'>
                            <div className="auth-btn hidden md:block">
                                <AuthButtons />
                            </div>

                            <div className='lg:hidden p-2 rounded hover:bg-gray-200 mobile-menu-trigger'>
                                <button onClick={() => setOpenMenu(true)}>
                                    <Menu className='w-6 h-6' />
                                </button>

                                <AnimatePresence>
                                    {openMenu && (
                                        <MobileMenu
                                            isOpen={openMenu}
                                            onClose={() => setOpenMenu(false)}
                                            links={navLinks}
                                        />
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SearchBar isOpen={openSearch} onClose={() => setOpenSearch(false)} />
        </header>
    )
}

export default Header2