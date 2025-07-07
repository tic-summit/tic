"use client"
import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import CourseSidebar from './courseSidebar'
import { ChevronLeft, ChevronRight } from 'lucide-react'


export default function CourseMenu() {
    const [isOpen, setIsOpen] = useState(true);

    useEffect(() => {
        const handleClose = () => {
            if (window.screen.availWidth <= 1018) setIsOpen(false);
            else setIsOpen(true)
        }
        window.addEventListener('resize', handleClose)
        return () => window.removeEventListener('resize', handleClose)
    })

    return (
        <AnimatePresence>
            <motion.div
                animate={{ width: isOpen ? 348 : 56 }} // Tailwind w-87 ≈ 348px, w-14 ≈ 56px
                transition={{ duration: 0.2, ease: 'easeInOut' }}
                className={`sidebar max-[771px]:hidden  relative border`}>
                <div className='hidden min-[771px]:block'>
                    <div onClick={() => setIsOpen(!isOpen)} id="toggle-button" className="toggle-button absolute -right-2 top-2 rounded bg-brand text-white border border-white">{isOpen ? <ChevronLeft className='h-6 w-6' /> : <ChevronRight className='h-6 w-6' />}</div>
                    <div>
                        {/* Sidbar content */}
                        {/* max-[1018px]:hidden */}
                        {isOpen && <CourseSidebar />}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    )
}
