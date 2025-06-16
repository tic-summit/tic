"use client";

import React, { useState, useEffect } from 'react';
import { Search, Grid, List, ChevronDown, Filter, X, ChevronRight, ChevronsLeft } from 'lucide-react';
import CourseCard from '@/components/course/CourseCard';
import Link from 'next/link';
import Header from '@/components/header';
import { motion, AnimatePresence } from 'framer-motion';

export default function CourseListing() {
    const [searchText, setSearchText] = useState('');
    const [selectedCategories, setSelectedCategories] = useState([]);
    const [costFilter, setCostFilter] = useState('all');
    const [startDate, setStartDate] = useState('');
    const [orderBy, setOrderBy] = useState('');
    const [displayType, setDisplayType] = useState('grid');
    const [currentPage, setCurrentPage] = useState(1);
    const [showMobileFilters, setShowMobileFilters] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    // Sample course data
    const courses = [
        {
            id: 19320,
            title: "Power Electronics",
            category: "Engineering",
            image: "/api/placeholder/420/295",
            url: "/courses/power-electronics/",
            price: "Free",
            originalPrice: null,
            curriculum: 7,
            duration: "1d 1h 50m",
            rating: 3.93,
            reviews: 15,
            lessons: 7,
            description: "Donec eu congue sem. Fusce ut eu est semper augue accumsan. Integer consequat ultricies arcu a feugiat."
        },
        {
            id: 19321,
            title: "Advanced Mathematics",
            category: "Mathematics",
            image: "/api/placeholder/420/295",
            url: "/courses/advanced-mathematics/",
            price: "$99",
            originalPrice: "$149",
            curriculum: 12,
            duration: "2d 3h 20m",
            rating: 4.5,
            reviews: 28,
            lessons: 15,
            description: "Master advanced mathematical concepts with practical applications in engineering and science."
        },
        {
            id: 19322,
            title: "Introduction to Law",
            category: "Law",
            image: "/api/placeholder/420/295",
            url: "/courses/intro-law/",
            price: "Free",
            originalPrice: null,
            curriculum: 8,
            duration: "1d 5h 30m",
            rating: 4.2,
            reviews: 42,
            lessons: 10,
            description: "Learn the fundamentals of law and legal systems in this comprehensive introduction course."
        },
        {
            id: 19323,
            title: "Health Sciences Basics",
            category: "Health",
            image: "/api/placeholder/420/295",
            url: "/courses/health-sciences/",
            price: "$79",
            originalPrice: "$120",
            curriculum: 9,
            duration: "1d 8h 15m",
            rating: 4.1,
            reviews: 35,
            lessons: 12,
            description: "Explore the fundamentals of health sciences and medical terminology."
        },
        {
            id: 19324,
            title: "Educational Psychology",
            category: "Education",
            image: "/api/placeholder/420/295",
            url: "/courses/educational-psychology/",
            price: "$59",
            originalPrice: "$89",
            curriculum: 6,
            duration: "18h 45m",
            rating: 4.3,
            reviews: 22,
            lessons: 8,
            description: "Understanding how people learn and develop in educational settings."
        },
        {
            id: 19325,
            title: "Structural Engineering",
            category: "Engineering",
            image: "/api/placeholder/420/295",
            url: "/courses/structural-engineering/",
            price: "$129",
            originalPrice: "$179",
            curriculum: 15,
            duration: "3d 2h 10m",
            rating: 4.7,
            reviews: 18,
            lessons: 20,
            description: "Learn the principles of structural design and analysis for buildings and bridges."
        }
    ];

    const categories = [
        { id: 18, name: "Education" },
        { id: 19, name: "Engineering" },
        { id: 21, name: "Health" },
        { id: 20, name: "Law" },
        { id: 22, name: "Mathematics" }
    ];

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            setIsMobile(mobile);
            if (!mobile && showMobileFilters) {
                setShowMobileFilters(false);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [showMobileFilters]);

    const handleCategoryChange = (categoryId) => {
        setSelectedCategories(prev =>
            prev.includes(categoryId)
                ? prev.filter(id => id !== categoryId)
                : [...prev, categoryId]
        );
    };

    const filteredCourses = courses.filter(course => {
        if (searchText && !course.title.toLowerCase().includes(searchText.toLowerCase())) {
            return false;
        }

        if (selectedCategories.length > 0) {
            const categoryId = categories.find(cat => cat.name === course.category)?.id;
            if (!selectedCategories.includes(categoryId)) {
                return false;
            }
        }

        if (costFilter === 'free' && course.price !== 'Free') {
            return false;
        }
        if (costFilter === 'paid' && course.price === 'Free') {
            return false;
        }

        return true;
    });

    const FiltersSection = () => (
        <div className="bg-white p-6 rounded-lg border border-gray-300 mb-6">
            <div className=" flex flex-col gap-6">
                {/* Search Filter */}
                <div className="dtlms-courses-search-filter">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <input
                            type="text"
                            placeholder="Search Course"
                            value={searchText}
                            onChange={(e) => setSearchText(e.target.value)}
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-brand/90"
                        />
                    </div>
                </div>

                {/* Category Filter */}
                <div className="dtlms-courses-category-filter">
                    <div className="dtlms-title text-sm font-semibold mb-3">Course Categories</div>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                        {categories.map(category => (
                            <label key={category.id} className="flex items-center text-sm cursor-pointer hover:bg-gray-50 p-1 rounded-full">
                                <input
                                    type="checkbox"
                                    checked={selectedCategories.includes(category.id)}
                                    onChange={() => handleCategoryChange(category.id)}
                                    className="mr-2 rounded"
                                />
                                {category.name}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Cost Filter */}
                <div className="dtlms-courses-cost-filter">
                    <div className="dtlms-title text-sm font-semibold mb-3">Cost</div>
                    <div className="space-y-2">
                        {[
                            { value: 'all', label: 'All' },
                            { value: 'free', label: 'Free' },
                            { value: 'paid', label: 'Paid' }
                        ].map(option => (
                            <label key={option.value} className="flex items-center text-sm cursor-pointer hover:bg-gray-50 p-1 rounded">
                                <input
                                    type="radio"
                                    name="cost"
                                    value={option.value}
                                    checked={costFilter === option.value}
                                    onChange={(e) => setCostFilter(e.target.value)}
                                    className="mr-2"
                                />
                                {option.label}
                            </label>
                        ))}
                    </div>
                </div>

                {/* Date Filter */}
                <div className="dtlms-courses-date-filter">
                    <div className="dtlms-title text-sm font-semibold mb-3">Start Date:</div>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
            </div>
        </div>
    );

    return (
        <div>
            <Header />
            <div className="hero bg-gradient-to-r from-brand to-gray-600 py-8 text-white">
                <div className="max-w-7xl mx-auto px-4">
                    <h1 className='text-2xl md:text-4xl'>Our Courses</h1>
                    <div className="flex items-center gap-2 text-white/70 px-2 mt-1">
                        <Link href={'/'}>Home /</Link>
                        <span>Courses</span>
                    </div>
                </div>
            </div>
            <div className="max-w-7xl mx-auto px-4 py-8 relative">
                {/* Mobile Filter Button */}
                {isMobile && (
                    <button
                        onClick={() => setShowMobileFilters(true)}
                        className="md:hidden  w-full right-4 bottom-4 z-30 bg-brand border text-white p-3 rounded-full shadow-lg flex items-center justify-center"
                    >
                        <Filter className="w-5 h-5" />
                    </button>
                )}

                {/* Mobile Filters Overlay */}
                <AnimatePresence>
                    {isMobile && showMobileFilters && (
                        <>
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setShowMobileFilters(false)}
                                className="fixed inset-0 z-40 bg-black/5"
                            />
                            <motion.div
                                initial={{ x: '100%' }}
                                animate={{ x: 0 }}
                                exit={{ x: '100%' }}
                                transition={{ type: 'tween', duration: 0.3 }}
                                className="fixed top-0 right-0 h-full w-4/5 bg-white z-50 overflow-y-auto"
                            >
                                <div className="flex justify-between items-center p-4 border-b">
                                    <h2 className="text-xl font-bold">Filters</h2>
                                    <button
                                        onClick={() => setShowMobileFilters(false)}
                                        className="text-gray-500 hover:text-gray-700"
                                    >
                                        <X className="w-6 h-6" />
                                    </button>
                                </div>
                                <div className="p-4">
                                    <FiltersSection />
                                    <button
                                        onClick={() => setShowMobileFilters(false)}
                                        className="w-full mt-4 py-2 bg-brand text-white rounded-md"
                                    >
                                        Apply Filters
                                    </button>
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>

                <div className="flex flex-col md:flex-row gap-6">
                    {/* Desktop Filters */}
                    {!isMobile && (
                        <div className="md:w-1/4">
                            <FiltersSection />
                        </div>
                    )}

                    {/* Main Content */}
                    <div className="flex-1">
                        {/* Top Filters */}
                        <div className="bg-white p-4 rounded-lg shadow-sm mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                            <div className="hidden md:flex gap-2">
                                <button
                                    onClick={() => setDisplayType('grid')}
                                    className={`flex items-center gap-2 px-5 py-2 rounded-full ${displayType === 'grid' ? 'bg-brand text-white' : 'bg-gray-200 text-gray-700'}`}
                                >
                                    <Grid className="w-4 h-4" />
                                    Grid
                                </button>
                                <button
                                    onClick={() => setDisplayType('list')}
                                    className={`flex items-center gap-2 px-5 py-2 rounded-full ${displayType === 'list' ? 'bg-brand text-white' : 'bg-gray-200 text-gray-700'}`}
                                >
                                    <List className="w-4 h-4" />
                                    List
                                </button>
                            </div>

                            <div className="dtlms-courses-orderby-filter flex items-center gap-2">
                                <label className="text-sm font-medium">Order by:</label>
                                <select
                                    value={orderBy}
                                    onChange={(e) => setOrderBy(e.target.value)}
                                    className="px-3 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                    <option value="">Select Order</option>
                                    <option value="recent-courses">Recent Courses</option>
                                    <option value="highest-rated">Highest Rated</option>
                                    <option value="most-members">Most Members</option>
                                    <option value="alphabetical">Alphabetical</option>
                                </select>
                            </div>
                        </div>

                        {/* Courses Grid */}
                        <div className={`${displayType === 'grid' ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-4'}`}>
                            {filteredCourses.map((course, index) => (
                                <CourseCard key={course.id} course={course} index={index} />
                            ))}
                        </div>

                        {/* No Results */}
                        {filteredCourses.length === 0 && (
                            <div className="text-center py-12">
                                <h3 className="text-lg font-medium text-gray-700">No courses found</h3>
                                <p className="text-gray-500 mt-2">Try adjusting your search or filter criteria</p>
                            </div>
                        )}

                        {/* Pagination */}
                        <div className="mt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
                            <div className="text-sm text-gray-600">
                                Showing 1-{filteredCourses.length} of {filteredCourses.length} courses
                            </div>
                            <div className="flex gap-2">
                                <button
                                    className="px-3 py-2 bg-brand text-white rounded-full disabled:opacity-50"
                                    disabled={currentPage === 1}
                                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                                >
                                    <ChevronsLeft />
                                </button>
                                <button className="px-4 py-2 bg-brand text-white rounded-full">1</button>
                                <button
                                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300"
                                    onClick={() => setCurrentPage(2)}
                                >
                                    2
                                </button>
                                <button
                                    className="flex items-center gap-1 px-4 py-2 bg-gray-200 text-gray-700 rounded-full hover:bg-gray-300"
                                    onClick={() => setCurrentPage(p => p + 1)}
                                >
                                    <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}