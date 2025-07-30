'use client';
import useCourseDetails from '@/app/api/courses/useCourseDetails.js';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp, PlayCircle } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useState } from 'react';

export default function CourseSidebar() {
  const [expandedModule, setExpandedModule] = useState(null);
  const { courseId } = useParams();
  
  const {
    curriculum,
    loading,
    error
  } = useCourseDetails(courseId);

  const toggleModule = (moduleId) => {
    setExpandedModule(prev => (prev === moduleId ? null : moduleId));
  };


  return (
    <div className="h-full">
      <div className="border p-4 bg-brand rounded">
        <h1 className="font-bold text-xl text-white">Course Content</h1>
      </div>

      <div className="mt-4 space-y-3 pb-6">
        {curriculum?.map((module) => {
          const isOpen = expandedModule === module.id;
          return (
            <motion.div
              key={module.id}
              layout
              initial={false}
              className="border rounded overflow-hidden bg-white"
            >
              <div
                className="flex p-4 justify-between items-center cursor-pointer"
                onClick={() => toggleModule(module.id)}
              >
                <div className="flex gap-3 text-brand font-bold items-center">
                  <div className={`w-4 h-4 rounded-full border-2 border-brand ${isOpen ? 'bg-brand' : ''}`}></div>
                  {module.title}
                </div>
                {module.topics?.length > 0 && (
                  isOpen ? (
                    <ChevronUp className="text-gray-600 h-5 w-5" />
                  ) : (
                    <ChevronDown className="text-gray-600 h-5 w-5" />
                  )
                )}
              </div>

              <AnimatePresence initial={false}>
                {isOpen && module.topics?.length > 0 && (
                  <motion.div
                    key="content"
                    initial="collapsed"
                    animate="open"
                    exit="collapsed"
                    variants={{
                      open: { opacity: 1, height: 'auto' },
                      collapsed: { opacity: 0, height: 0 },
                    }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="px-4 pb-4 space-y-2 bg-gray-50"
                  >
                    {module.topics.map((topic) => (
                      <Link 
                        key={topic.id} 
                        href={`/courses/${courseId}/${module.slug}/${topic.slug}`}
                        className="flex gap-3 items-center p-3 hover:bg-gray-100 rounded transition-colors"
                      >
                        <PlayCircle className="h-5 w-5 text-brand flex-shrink-0" />
                        <div>
                          <div className="text-sm font-medium text-gray-800">{topic.title}</div>
                          <div className="text-xs text-gray-500">{topic.duration}</div>
                        </div>
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}