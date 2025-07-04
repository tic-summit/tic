"use client" // This directive is necessary because we're using client-side hooks like useState, useEffect, and usePathname

import AuthButtons from '@/components/header/components/AuthButtons'
import { Input } from '@/components/ui/input'
import Logo from '@/components/ui/Logo'
import { AnimatePresence, motion } from 'framer-motion'
import { Bell, Menu, Search, X } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

// Reusable NavLink component with active state
const NavLink = ({ path, pathName, onClick }) => {
  const pathname = usePathname()
  const isActive = pathname === path
  
  return (
    <li>
      <Link 
        href={path} 
        className={`${isActive ? 'text-brand-dark font-bold' : 'text-brand'}`}
        onClick={onClick}
      >
        {pathName}
      </Link>
    </li>
  )
}

// Reusable Navbar component
const Navbar = ({ links, onLinkClick }) => (
  <div>
    <ul className='text-[16px] flex flex-col justify-center lg:flex-row items-center gap-8 font-semibold'>
      {links.map((link, index) => (
        <NavLink 
          key={index} 
          path={link.path} 
          pathName={link.pathName} 
          onClick={onLinkClick}
        />
      ))}
    </ul>
  </div>
)

// Reusable MobileMenu component
const MobileMenu = ({ isOpen, onClose, links }) => (
  <motion.div
    initial={{ y: "-100%", opacity: 0 }}
    exit={{ y: "-100%", opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    transition={{ duration: 0.5 }}
    className="p-6 w-[300px] fixed left-0 top-[6rem] bg-white z-50 shadow-lg"
  >
    <div className="flex justify-end text-gray-700" onClick={onClose}>
      <X className='h-6 w-6' />
    </div>
    <div className="content flex flex-col justify-between h-full space-y-10">
      <Navbar links={links} onLinkClick={onClose} />
      <AuthButtons />
    </div>
  </motion.div>
)

// Reusable SearchBar component
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
        <div ref={searchRef} className="search-wrap absolute left-0 right-0 z-10 max-w-sm">
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
  
  const navLinks = [
    { path: '/', pathName: 'home' },
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

  return (
    <header className="h-24 px-4 sticky top-0 left-0 right-0 bg-white z-40 shadow-sm">
      <div className='max-w-[1400px] mx-auto h-full flex items-center justify-between'>
        <div className="right-section">
          <Logo />
        </div>
        
        <div className="middle-section hidden lg:block">
          <Navbar links={navLinks} onLinkClick={() => {}} />
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
                <SearchBar isOpen={openSearch} onClose={() => setOpenSearch(false)} />
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
    </header>
  )
}

export default Header2