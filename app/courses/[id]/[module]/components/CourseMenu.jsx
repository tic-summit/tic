"use client"
import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import CourseSidebar from './courseSidebar';

export default function CourseMenu() {
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        const handleClose = () => {
            if (window.innerWidth <= 1018) setIsOpen(false);
            else setIsOpen(true)
        }
        // Set initial state based on screen width
        handleClose();
        window.addEventListener('resize', handleClose)
        return () => window.removeEventListener('resize', handleClose)
    }, [])

    return (
        <AnimatePresence>
            <motion.div
                animate={{ width: isOpen ? 348 : 56 }}
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className={`sidebar max-[771px]:hidden relative border h-[calc(100vh-5rem)]`}>
                <div className='hidden min-[771px]:block h-full'>
                    <div onClick={() => setIsOpen(!isOpen)} id="toggle-button" className="toggle-button absolute -right-2 top-2 rounded bg-brand text-white border border-white z-10 cursor-pointer">
                        {isOpen ? <ChevronLeft className='h-6 w-6' /> : <ChevronRight className='h-6 w-6' />}
                    </div>
                    <div className='h-full overflow-y-auto'>
                        {isOpen && <CourseSidebar />}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}