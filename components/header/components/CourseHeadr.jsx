'use client';

import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import Logo from '@/components/ui/Logo';
import AuthButtons from './AuthButtons';
import CourseSidebar from '@/app/courses/[id]/[module]/components/courseSidebar';

export default function CourseHeadr() {
  const [isCourseMenuOpen, setIsCourseMenuOpen] = useState(false);
  const sidebarRef = useRef(null);

  // Prevent page scroll when sidebar is open
  useEffect(() => {
    document.body.style.overflow = isCourseMenuOpen ? 'hidden' : 'auto';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isCourseMenuOpen]);

  // Click outside to close (optional)
  useEffect(() => {
    const handleClose = (event) => {
      if (
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target)
      ) {
        setIsCourseMenuOpen(false);
      }
    };

    if (isCourseMenuOpen) {
      document.addEventListener('mousedown', handleClose);
    }

    return () => {
      document.removeEventListener('mousedown', handleClose);
    };
  }, [isCourseMenuOpen]);

  return (
    <header className="bg-white shadow-md h-20 flex items-center justify-between px-2">
      {/* Desktop Logo */}
      <div className="max-[771px]:hidden min-[771px]:block">
        <Logo />
      </div>

      {/* Mobile Menu Button */}
      <div onClick={() => setIsCourseMenuOpen(true)} className="min-[771px]:hidden">
        <Menu />
      </div>

      {/* Animated Mobile Sidebar */}
      <AnimatePresence>
        {isCourseMenuOpen && (
          <motion.div
            ref={sidebarRef}
            initial={{ x: '-100%', opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: '-100%', opacity: 0 }}
            transition={{ type: 'tween', duration: 0.4, ease: 'easeInOut' }}
            className="fixed top-0 left-0 bottom-0 z-50 w-[21.75rem] bg-white py-4 min-[771px]:hidden shadow-md"
          >
            <div className="flex items-center justify-between mb-5 px-4">
              <Logo />
              <div
                onClick={() => setIsCourseMenuOpen(false)}
                className="text-gray-700 cursor-pointer"
              >
                <X className="h-6 w-6" />
              </div>
            </div>
            <CourseSidebar />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth Buttons */}
      <AuthButtons />
    </header>
  );
}
