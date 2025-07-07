'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';

export default function CourseSidebar() {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const modules = [
    {
      title: 'Introduction Marketing',
      submodule: ['Overview', 'Why digital marketing'],
    },
    {
      title: 'Content',
      submodule: ['Content 1', 'Content 2'],
    },
    {
      title: 'Introduction',
      submodule: [],
    },
  ];

  const toggleModule = (index) => {
    setExpandedIndex(prev => (prev === index ? null : index));
  };

  return (
    <div>
      <div className="border p-4 bg-brand rounded">
        {/* course title */}
        <h1 className="font-bold text-xl text-white">Cyber Security</h1>
      </div>

      <div className="mt-4 space-y-3">
        {modules.map((module, index) => {
          const isOpen = expandedIndex === index;
          return (
            <motion.div
              key={index}
              layout
              initial={false}
              className="border rounded overflow-hidden bg-white"
            >
              <div
                className="flex p-4 justify-between items-center cursor-pointer"
                onClick={() => toggleModule(index)}
              >
                <div className="flex gap-2 text-brand font-bold items-center">
                  <input type="radio" />
                  {module.title}
                </div>
                {module.submodule.length > 0 && (
                  isOpen ? (
                    <ChevronUp className="text-gray-600 h-5 w-5" />
                  ) : (
                    <ChevronDown className="text-gray-600 h-5 w-5" />
                  )
                )}
              </div>

              <AnimatePresence initial={false}>
                {isOpen && module.submodule.length > 0 && (
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
                    className="px-4 pb-4 space-y-2 bg-gray-100"
                  >
                    {module.submodule.map((item, i) => (
                      <div
                        key={i}
                        className="flex gap-2 text-sm text-gray-800 items-center"
                      >
                        <input type="radio" />
                        {item}
                      </div>
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
