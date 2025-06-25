"use client";

import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ThemeToggle from '../ui/ThemeToggle';
import Logo from '../ui/Logo';
import Navbar from './components/Navbar';
import AuthButtons from './components/AuthButtons';
import { usePathname } from 'next/navigation';

export default function Header() {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 10);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu when route changes
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [pathname]);

    // Animation variants
    const headerVariants = {
        scrolled: {
            backgroundColor: pathname === '/' ? 'white' : 'rgb(255, 255, 255)',
            color: pathname === '/' ? 'rgb(31, 41, 55)' : 'rgb(31, 41, 55)'
        },
        normal: {
            backgroundColor: pathname === '/' ? 'rgba(0, 0, 0, 0)' : 'rgb(255, 255, 255)',
            color: pathname === '/' ? 'rgb(255, 255, 255)' : 'rgb(31, 41, 55)'
        }
    };

    const mobileMenuVariants = {
        open: {
            opacity: 1,
            height: "auto",
            transition: {
                type: "spring",
                bounce: 0,
                duration: 0.7,
                delayChildren: 0.3,
                staggerChildren: 0.05
            }
        },
        closed: {
            opacity: 0,
            height: 0,
            transition: {
                type: "spring",
                bounce: 0,
                duration: 0.3
            }
        }
    };

    const navItemVariants = {
        open: {
            y: 0,
            opacity: 1,
            transition: {
                y: { stiffness: 1000, velocity: -100 }
            }
        },
        closed: {
            y: 50,
            opacity: 0,
            transition: {
                y: { stiffness: 1000 }
            }
        }
    };

    return (
        <motion.header 
            className="sticky top-0 z-50  font-semibold text-sm d"
            initial="normal"
            animate={isScrolled || pathname === '/' ? "scrolled" : "normal"}
            variants={headerVariants}
            transition={{ duration: 0.3 }}
        >
            {/* Main header */}
            <div className="bg-brand/10">
                <div className="max-w-7xl mx-auto px-4  flex items-center justify-between gap-4">
                {/* Logo */}
                <div className="flex-1">
                    <Logo />
                </div>

                {/* Desktop Navigation */}
                <div className="hidden lg:flex flex-1 justify-center">
                    <Navbar />
                </div>

                {/* Desktop Auth Buttons and Theme Toggle */}
                <div className="hidden lg:flex items-center gap-4 flex-1 justify-end">
                    <AuthButtons />
                </div>

                {/* Mobile Menu Button */}
                <motion.button 
                    className={`lg:hidden p-2 ${pathname === '/' ? 'text-blue-950' : 'text-gray-800'}`}
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
                    whileTap={{ scale: 0.95 }}
                >
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </motion.button>
            </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div 
                        className="lg:hidden overflow-hidden"
                        initial="closed"
                        animate="open"
                        exit="closed"
                        variants={mobileMenuVariants}
                    >
                        <div className="px-4 py-3 bg-white border-t border-gray-200">
                            <Navbar mobile variants={navItemVariants} isMobileMenuOpen={isMobileMenuOpen} />
                            <motion.div 
                                className="mt-4 pt-4 border-t border-gray-200 flex flex-col gap-3"
                                variants={navItemVariants}
                            >
                                <AuthButtons mobile />
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.header>
    );
}