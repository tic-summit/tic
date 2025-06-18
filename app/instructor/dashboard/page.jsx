"use client"
import { useState } from 'react';
import {
    Menu,
    X,
    ChevronUp,
    LogOut,
    Edit,
    Settings,
    Trash,
    ChevronDown,
    ChevronLeft,
    ChevronRight,
    LayoutDashboard,
    BookOpen,
    ShoppingCart,
    FileText,
    Diamond,
    CreditCard,
    Heart,
    Lock,
    MenuIcon,
    FileX,
    BookX,
    Repeat,
    LucideFlagTriangleLeft,
    FileTerminalIcon,
    ListFilter,
    Users,
    Star,
    Wallet,
    BarChart2,
    FolderCheck,
    GraduationCap,
    Gem,
    Tv,
} from 'lucide-react';
import { FaAngleLeft, FaAngleRight, FaAward, FaCheckCircle, FaPlay, FaTv, FaUserGraduate, FaGem } from 'react-icons/fa';
import Image from 'next/image';
import Header from '@/components/header';
import TopBar from '@/components/header/components/TopBar';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContexts';

const InstructorDashboardContent = () => {
    const {user} = useAuth()
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className="bg-gray-50">
            <TopBar />
            <Header/>
            <div className="hero bg-gradient-to-r from-brand to-slate-800 py-20 text-white mb-10 lg:mb-26">
                <div className="max-w-7xl mx-auto px-4 relative -z-0">
                    <h1 className='text-2xl md:text-4xl mt-2'>Instructor Dashboard</h1>
                    <div className="flex items-center gap-2 text-white/70 px-2 mt-1">
                        <Link href={'/'}>Home</Link>
                    </div>
                    <div className="absolute -bottom-42 flex items-start gap-5">
                        <Image
                        
                            className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] object-cover rounded-full border-4 border-gray-50"
                            src="/Hero.webp"
                            width={150}
                            height={150}
                            alt="Instructor"
                        />
                        <div className="user-name flex flex-col">
                            <span className='text-2xl md:text-3xl mt-1 md:mt-0 lg:mb-0'>{user.fullName}</span>
                            <span className="email text-gray-800">{user.email}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex flex-col xl:flex-row max-w-7xl mx-auto px-4">

                {/* Left sidebar */}
                <div className={`fixed xl:static inset-y-0 left-0 z-60 lg:z-10 w-80 xl:w-72 bg-white xl:bg-transparent border-r xl:border-r-0 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full xl:translate-x-0'}`}>
                    {/* Sidebar header */}
                    <div className="xl:hidden flex items-center justify-between p-4 bg-gray-100 border-b border-gray-300">
                        <h5 className="text-lg font-semibold">My profile</h5>
                        <button
                            onClick={toggleSidebar}
                            className="p-1 rounded hover:bg-gray-200"
                            aria-label="Close"
                        >
                            <X size={20} />
                        </button>
                    </div>

                    {/* Sidebar content */}
                    <div className="p-3 xl:p-0 rounded-xl">
                        <div className="bg-white border border-gray-300 rounded-3 pb-0 p-3 w-full">
                            {/* Dashboard menu */}
                            <nav className="space-y-1 z-50">
                                <a className="flex items-center px-3 py-2 text-sm font-medium bg-brand text-white rounded-lg  " href="#">
                                    <LayoutDashboard className="mr-3 h-5 w-5" />
                                    Dashboard
                                </a>
                                <a className="flex items-center px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-700 hover:text-white rounded-md" href="#">
                                    <ShoppingCart className="mr-3 h-5 w-5" />
                                    My Courses
                                </a>
                                <a className="flex items-center px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-700 hover:text-white rounded-md" href="#">
                                    <Diamond className="mr-3 h-5 w-5" />
                                    Quiz
                                </a>
                                <a className="flex items-center px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-700 hover:text-white rounded-md" href="#">
                                    <BarChart2 className="mr-3 h-5 w-5" />
                                    Earnings
                                </a>
                                <a className="flex items-center px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-700 hover:text-white rounded-md" href="#">
                                    <Users className="mr-3 h-5 w-5" />
                                    Students
                                </a>
                                <a className="flex items-center px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-700 hover:text-white rounded-md" href="#">
                                    <FolderCheck className="mr-3 h-5 w-5" />
                                    Orders
                                </a>
                                <a className="flex items-center px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-700 hover:text-white rounded-md" href="#">
                                    <Star className="mr-3 h-5 w-5" />
                                    Reviews
                                </a>
                                <a className="flex items-center px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-700 hover:text-white rounded-md" href="#">
                                    <Edit className="mr-3 h-5 w-5" />
                                    Edit Profile
                                </a>
                            
                                <a className="flex items-center px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-700 hover:text-white rounded-md" href="#">
                                    <Settings className="mr-3 h-5 w-5" />
                                    Settings
                                </a>
                                <a className="flex items-center px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-700 hover:text-white rounded-md" href="#">
                                    <Trash className="mr-3 h-5 w-5" />
                                    Delete Profile
                                </a>
                                <a className="flex items-center px-3 py-2 text-sm font-medium text-red-400 hover:bg-red-900 hover:bg-opacity-25 hover:text-red-300 rounded-md" href="#">
                                    <LogOut className="mr-3 h-5 w-5" />
                                    Sign Out
                                </a>
                            </nav>
                        </div>
                    </div>
                </div>

                {/* Overlay for mobile */}
                {sidebarOpen && (
                    <div
                        className="xl:hidden fixed inset-0 z-30 bg-black/50"
                        onClick={toggleSidebar}
                    ></div>
                )}

                {/* Main content */}
                <div className="flex-1 xl:ml-0 pt-16 xl:pt-4 px-4 xl:px-6">
                    {/* Mobile menu button */}
                    <div className="xl:hidden bg-brand p-2 w-fit rounded-full">
                        <button
                            className="text-white p-2 hover:bg-gray-700"
                            onClick={toggleSidebar}
                        >
                            <LayoutDashboard size={16} />
                        </button>
                    </div>

                    {/* Counter boxes */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 mt-2">
                        {/* Counter item - Total Courses */}
                        <div className="flex items-center p-4 bg-yellow-50 rounded-lg border border-gray-300">
                            <div className="flex-shrink-0">
                                <Tv className="h-8 w-8 text-yellow-500" />
                            </div>
                            <div className="ml-4">
                                <h5 className="text-2xl font-bold text-gray-900">25</h5>
                                <p className="text-sm text-gray-600">Total Courses</p>
                            </div>
                        </div>

                        {/* Counter item - Total Students */}
                        <div className="flex items-center p-4 bg-purple-50 rounded-lg border border-gray-300">
                            <div className="flex-shrink-0">
                                <FaUserGraduate className="h-8 w-8 text-purple-500" />
                            </div>
                            <div className="ml-4">
                                <h5 className="text-2xl font-bold text-gray-900">25K+</h5>
                                <p className="text-sm text-gray-600">Total Students</p>
                            </div>
                        </div>

                        {/* Counter item - Enrolled Students */}
                        <div className="flex items-center p-4 bg-blue-50 rounded-lg border border-gray-300">
                            <div className="flex-shrink-0">
                                <FaGem className="h-8 w-8 text-blue-500" />
                            </div>
                            <div className="ml-4">
                                <h5 className="text-2xl font-bold text-gray-900">12K</h5>
                                <p className="text-sm text-gray-600">Enrolled Students</p>
                            </div>
                        </div>
                    </div>

                    {/* Earnings Chart */}
                    <div className="bg-white rounded-lg shadow border border-gray-300 mb-6">
                        <div className="p-6">
                         
                            {/* Placeholder for Chart - in a real app you would use a charting library */}
                            <div className="bg-gray-100 rounded h-80 flex items-center justify-center">
                                <p className="text-gray-500">Earnings Chart</p>
                            </div>
                        </div>
                    </div>

                    {/* Most Selling Courses */}
                    <div className="bg-white rounded-lg shadow border border-gray-300">
                        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                            <h3 className="text-lg font-semibold text-gray-900">Most Selling Courses</h3>
                            <a href="#" className="btn btn-sm btn-primary-soft mb-0">View all</a>
                        </div>

                        <div className="p-6">
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Name</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Selling</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {/* Table row 1 */}
                                        <tr>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 w-16 h-12">
                                                        <img className="w-16 h-12 rounded object-cover" src="https://via.placeholder.com/100x75" alt="Course" />
                                                    </div>
                                                    <div className="ml-4">
                                                        <h6 className="text-sm font-medium text-gray-900">
                                                            <a href="#">Building Scalable APIs with GraphQL</a>
                                                        </h6>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">34</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$1,25,478</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">9 months</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <button className="p-1 text-green-600 hover:text-green-800 mr-2">
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                                <button className="p-1 text-red-600 hover:text-red-800">
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </td>
                                        </tr>

                                        {/* Table row 2 */}
                                        <tr>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 w-16 h-12">
                                                        <img className="w-16 h-12 rounded object-cover" src="https://via.placeholder.com/100x75" alt="Course" />
                                                    </div>
                                                    <div className="ml-4">
                                                        <h6 className="text-sm font-medium text-gray-900">
                                                            <a href="#">Bootstrap 5 From Scratch</a>
                                                        </h6>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">45</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$2,85,478</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">6 months</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <button className="p-1 text-green-600 hover:text-green-800 mr-2">
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                                <button className="p-1 text-red-600 hover:text-red-800">
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </td>
                                        </tr>

                                        {/* Table row 3 */}
                                        <tr>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 w-16 h-12">
                                                        <img className="w-16 h-12 rounded object-cover" src="https://via.placeholder.com/100x75" alt="Course" />
                                                    </div>
                                                    <div className="ml-4">
                                                        <h6 className="text-sm font-medium text-gray-900">
                                                            <a href="#">Graphic Design Masterclass</a>
                                                        </h6>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">21</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$85,478</td>
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">4 months</span>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <button className="p-1 text-green-600 hover:text-green-800 mr-2">
                                                    <Edit className="h-4 w-4" />
                                                </button>
                                                <button className="p-1 text-red-600 hover:text-red-800">
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="flex flex-col sm:flex-row justify-between items-center mt-6">
                                <p className="text-sm text-gray-700 mb-4 sm:mb-0">
                                    Showing 1 to 5 of 20 entries
                                </p>
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                    <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                        <ChevronLeft className="h-3 w-3" />
                                    </a>
                                    <a href="#" className="relative inline-flex items-center px-3 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                        1
                                    </a>
                                    <a href="#" className="relative inline-flex items-center px-3 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-brand hover:bg-blue-100">
                                        2
                                    </a>
                                    <a href="#" className="relative inline-flex items-center px-3 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50">
                                        3
                                    </a>
                                    <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                        <ChevronRight className="h-3 w-3" />
                                    </a>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default function InstructorDashboard() {
    return (
        <ProtectedRoute>
            <InstructorDashboardContent />
        </ProtectedRoute>
    );
}