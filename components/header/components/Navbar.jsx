'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';

const links = [
  { name: 'Home', href: '/' },
  { name: 'Courses', href: '/courses' },
  { name: 'Internships', href: '/internships' },
  { name: 'Hackathons', href: '/hackathons' },
  { name: 'Mentorship', href: '/mentor' },
];

export default function Navbar({ mobile, variants }) {
  const pathname = usePathname();

  return (
    <nav>
      <ul className={`flex ${mobile ? 'flex-col gap-3' : 'flex-row items-center gap-2 md:gap-10'}`}>
        {links.map((link) => {
          const isActive = pathname === link.href;
          
          return (
            <motion.li 
              key={link.name}
              variants={variants}
              whileHover={!mobile ? { scale: 1.05 } : {}}
              whileTap={!mobile ? { scale: 0.95 } : {}}
            >
              <Link
                href={link.href}
                className={`block transition-colors text-lg font-light ${mobile ? 'py-2' : 'py-6'} ${
                  isActive 
                    ? ' lg:border-b-4 border-brand ' 
                    : mobile 
                      ? 'text-gray-800' 
                      : 'text-current hover:border-b-4 hover:border-brand hover:transition-colors duration-200'
                }`}
              > 
                {link.name}
              </Link>
            </motion.li>
          );
        })}
      </ul>
    </nav>
  );
}