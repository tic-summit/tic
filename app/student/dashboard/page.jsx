"use client"
import { useState } from 'react';
import {
    Menu,
    X,
    MonitorPlay,
    CheckCircle,
    Award,
    Search,
    Play,
    RotateCcw,
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
} from 'lucide-react';
import { FaAngleLeft, FaAngleRight, FaAward, FaCheckCircle, FaPlay, FaTv } from 'react-icons/fa';
import Image from 'next/image';
import Header from '@/components/header';
import TopBar from '@/components/header/components/TopBar';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContexts';

const DashboardContent = () => {
    const {user} = useAuth()
    console.log(user);
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className=" bg-gray-50">
            <TopBar />
            <Header/>
            <div className="hero bg-gradient-to-r from-brand to-slate-800 py-20 text-white mb-10 lg:mb-26">
                <div className="max-w-7xl mx-auto px-4 relative  -z-0">
                    <h1 className='text-2xl md:text-4xlmt-2'>Dashboard</h1>
                    <div className="flex items-center gap-2 text-white/70 px-2 mt-1">
                        <Link href={'/'}>Home</Link>
                    </div>
                    <div className="absolute -bottom-42 flex items-start gap-5">
                        <Image
                            className="w-[100px] h-[100px] md:w-[120px] md:h-[120px] object-cover rounded-full border-4 border-gray-50"
                            src="/Hero.webp"
                            width={150}
                            height={150}
                            alt="student"
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
                <div className={`fixed xl:static inset-y-0 left-0 z-50 w-80 xl:w-72 bg-white xl:bg-transparent border-r xl:border-r-0 transform transition-transform duration-300 ease-in-out ${sidebarOpen ? 'translate-x-0' : '-translate-x-full xl:translate-x-0'}`}>
                    {/* Sidebar header */}
                    <div className="xl:hidden flex items-center justify-between p-4 bg-gray-100 border-bborder-gray-300">
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
                    <div className="p-3 xl:p-0 border border-gray-300 rounded-lg">
                        <div className=" rounded-lg p-4 w-full">
                            {/* Dashboard menu */}
                            <nav className="space-y-1 z-50">
                                <a className="flex items-center px-3 py-2 text-sm font-medium text-white bg-brand rounded-md" href="#">
                                    <LayoutDashboard className="mr-3 h-5 w-5" />
                                    Dashboard
                                </a>

                                <a className="flex items-center px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-700 hover:text-white rounded-md" href="#">
                                    <ShoppingCart className="mr-3 h-5 w-5" />
                                    My Courses
                                </a>
                                <a className="flex items-center px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-700 hover:text-white rounded-md" href="#">
                                    <FileText className="mr-3 h-5 w-5" />
                                    Course Resume
                                </a>
                                <a className="flex items-center px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-700 hover:text-white rounded-md" href="#">
                                    <Diamond className="mr-3 h-5 w-5" />
                                    Quiz
                                </a>

                                <a className="flex items-center px-3 py-2 text-sm font-medium text-gray-800 hover:bg-gray-700 hover:text-white rounded-md" href="#">
                                    <Heart className="mr-3 h-5 w-5" />
                                    Saved
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
                    <div className="xl:hidden  bg-brand p-2 w-fit rounded-full">
                        <button
                            className="text-white p-2  hover:bg-gray-700"
                            onClick={toggleSidebar}
                        >
                            <LayoutDashboard size={16} />
                        </button>
                    </div>

                    {/* Counter boxes */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 mt-2">
                        {/* Counter item 1 */}
                        <div className="flex items-center p-4 bg-orange-50 rounded-lg border border-gray-300">
                            <div className="flex-shrink-0">
                                <FaTv className="h-8 w-8 text-orange-500" />
                            </div>
                            <div className="ml-4">
                                <h5 className="text-2xl font-bold text-gray-900">9</h5>
                                <p className="text-sm text-gray-600">Total Courses</p>
                            </div>
                        </div>

                        {/* Counter item 2 */}
                        <div className="flex items-center p-4 bg-purple-50 rounded-lg border border-gray-300">
                            <div className="flex-shrink-0">
                                <FaCheckCircle className="h-8 w-8 text-purple-500" />
                            </div>
                            <div className="ml-4">
                                <h5 className="text-2xl font-bold text-gray-900">52</h5>
                                <p className="text-sm text-gray-600">Complete lessons</p>
                            </div>
                        </div>

                        {/* Counter item 3 */}
                        <div className="flex items-center p-4 bg-green-50 rounded-lg border border-gray-300">
                            <div className="flex-shrink-0">
                                <FaAward className="h-8 w-8 text-green-500" />
                            </div>
                            <div className="ml-4">
                                <h5 className="text-2xl font-bold text-gray-900">8</h5>
                                <p className="text-sm text-gray-600">Achieved Certificates</p>
                            </div>
                        </div>
                    </div>

                    {/* Courses table card */}
                    <div className="bg-white rounded-lg shadow  border border-gray-300">
                        {/* Card header */}
                        <div className="px-6 py-4 border-b border-gray-200">
                            <h3 className="text-lg font-semibold text-gray-900">My Courses List</h3>
                        </div>

                        {/* Card body */}
                        <div className="p-6">
                            {/* Search and filter */}
                            <div className="flex flex-col md:flex-row gap-4 justify-between items-center mb-6">
                                {/* Search */}
                                <div className="relative w-full md:w-2/3">
                                    <input
                                        className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        type="search"
                                        placeholder="Search"
                                        aria-label="Search"
                                    />
                                    <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500" type="submit">
                                        <Search className="h-5 w-5" />
                                    </button>
                                </div>

                                {/* Sort dropdown */}
                                <div className="w-full md:w-1/3">
                                    <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                                        <option>Sort by</option>
                                        <option>Free</option>
                                        <option>Most popular</option>
                                        <option>Most Viewed</option>
                                        <option>Newest</option>
                                    </select>
                                </div>
                            </div>

                            {/* Course table */}
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Title</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Lectures</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Completed Lecture</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {/* Table row 1 */}
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 w-20 h-15">
                                                        <img className="w-20 h-15 rounded object-cover" src="https://via.placeholder.com/100x75" alt="" />
                                                    </div>
                                                    <div className="ml-4 flex-1">
                                                        <h6 className="text-sm font-medium text-gray-900 hover:text-blue-600">
                                                            <a href="#">Building Scalable APIs with GraphQL</a>
                                                        </h6>
                                                        <div className="mt-2">
                                                            <div className="flex justify-between items-center mb-1">
                                                                <span className="text-xs text-gray-500">Progress</span>
                                                                <span className="text-xs font-medium text-gray-700">85%</span>
                                                            </div>
                                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                                <div className="bg-brand h-2 rounded-full" style={{ width: '85%' }}></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">56</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">40</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm">
                                                <a href="#" className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200">
                                                    <FaPlay className="mr-1 h-3 w-3" />
                                                    Continue
                                                </a>
                                            </td>
                                        </tr>

                                        {/* Table row 2 */}
                                        <tr className="hover:bg-gray-50">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center">
                                                    <div className="flex-shrink-0 w-20 h-15">
                                                        <img className="w-20 h-15 rounded object-cover" src="https://via.placeholder.com/100x75" alt="" />
                                                    </div>
                                                    <div className="ml-4 flex-1">
                                                        <h6 className="text-sm font-medium text-gray-900 hover:text-blue-600">
                                                            <a href="#">Create a Design System in Figma</a>
                                                        </h6>
                                                        <div className="mt-2">
                                                            <div className="flex justify-between items-center mb-1">
                                                                <span className="text-xs text-gray-500">Progress</span>
                                                                <span className="text-xs font-medium text-gray-700">100%</span>
                                                            </div>
                                                            <div className="w-full bg-gray-200 rounded-full h-2">
                                                                <div className="bg-green-600 h-2 rounded-full" style={{ width: '100%' }}></div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">42</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">42</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                                                <button className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-green-700 bg-green-100 cursor-not-allowed opacity-75">
                                                    <FaCheckCircle className="mr-1 h-3 w-3" />
                                                    Complete
                                                </button>
                                                <a href="#" className="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50">
                                                    <Repeat className="mr-1 h-3 w-3" />
                                                    Restart
                                                </a>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="flex flex-col sm:flex-row justify-between items-center mt-6">
                                <p className="text-sm text-gray-700 mb-4 sm:mb-0">
                                    Showing 1 to 8 of 20 entries
                                </p>
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
                                    <a href="#" className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                                        <LucideFlagTriangleLeft className="h-3 w-3" />
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
                                        <FaAngleRight className="h-3 w-3" />
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

export default function Dashboard() {
    return (
      <ProtectedRoute>
        <DashboardContent />
      </ProtectedRoute>
    );
  }