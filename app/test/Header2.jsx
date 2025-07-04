"use client"
import AuthButtons from '@/components/header/components/AuthButtons'
import { Input } from '@/components/ui/input'
import Logo from '@/components/ui/Logo'
import { AnimatePresence, motion } from 'framer-motion'
import { Bell, Menu, Search, X } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useRef, useState } from 'react'

function Header2() {
        const [openMenu, setIsOpenMenu] = useState(false);
            const searchRef = useRef(null);
               const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {

        const handleClick = () => {
            if (searchRef.current && !searchRef.current.contains(event.target)) setIsClicked(false);
        }

        document.addEventListener('mousedown', handleClick)

        return () => document.removeEventListener('mousedown', handleClick)
    })


    

        const Navbar = () => (
        <div>
            <ul className='text-[16px]  text-brand flex flex-col justify-center lg:flex-row items-center gap-8 font-semibold'>
                <li><Link href={'/'}>Home</Link></li>
                <li><Link href={'/courses'}>Courses</Link></li>
                <li><Link href={'/internships'}>Intenships</Link></li>
                <li><Link href={'/hackathons'}>Hackathons</Link></li>
                <li><Link href={'/mentor'}>Mentorship</Link></li>
            </ul>
        </div>
    )

    const MobileMenu = () => (
        <motion.div initial={{ y: "-100%", opacity: 0 }} exit={{ y: "-100%", opacity: 0 }} animate={{y: 0, opacity: 1 }} transition={{duration: 0.5}}  className='p-6 w-fit  fixed h-fit inset-0 bg-white'>
            <div className="flex justify-end text-gray-700" onClick={() => setIsOpenMenu(false)}><X className='h-6 w-6' /></div>
            <div className="content flex flex-col justify-between h-full  space-y-10">
                <Navbar />
                <AuthButtons />
            </div>
        </motion.div>
    )
  return (
    <div>
       <div className="header h-24 px-4 sticky left-0 right-0">
                <div className='max-w-[1400px] mx-auto h-full flex items-center justify-between'>
                    <div className="right-section">
                        <Logo />
                    </div>
                    <div className="middle-section hidden lg:block">
                        <Navbar />
                    </div>
                    <div className="left-section relative">
                        <div className='flex gap-20'>
                            <div className='flex items-center gap-4 '>
                                <div className=''>
                                    <div variant={`outline`} className={`border-none p-4`} onClick={() => setIsClicked(true)} ><Search className='w-6 h-5' /></div>
                                    <div ref={searchRef} className="search-wrap absolute left-0 rig -bottom-16 z-20">
                                        {/* SearchBar */}
                                        <AnimatePresence>
                                            {
                                                isClicked && <motion.div initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 50 }} transition={{ duration: 0.5 }} className='bg-gray-200 border p-2 rounded-lg min-w-full w-sm'>
                                                    <Input placeholder="Search courses" className={`border border-brand bg-white`} />
                                                </motion.div>
                                            }
                                        </AnimatePresence>
                                    </div>
                                </div>
                                <div className="relative">
                                    <div variant="outline" className="border-none bg-transparent p-2">
                                        <Bell  className="w-6 h-6" />
                                    </div>
                                    <div className="absolute -top-1 right-1 bg-green-600 text-white text-xs flex items-center justify-center w-5 h-5 rounded-full">
                                        0
                                    </div>
                                </div>
                            </div>
                            <div className='flex items-center'>
                                <div className="auth-btn hidden md:block">
                                    <AuthButtons />
                                </div>
                                <div className='lg:hidden p-2 rounded bg-gray-200'>
                                    <div onClick={() => setIsOpenMenu(true)}><Menu className='w-6 h-6' /></div>
                                    {/* Mobile Menu */}
                                    <div className="wrap">
                                    <AnimatePresence>
                                          {
                                        openMenu &&(
                                            
                                                <MobileMenu />
                                        )
                                      }
                                    </AnimatePresence>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Header2
