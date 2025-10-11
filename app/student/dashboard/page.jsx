"use client"
import { useState } from 'react';
import {
    X,
    Search,
    LogOut,
    Edit,
    Settings,
    Trash,
    LayoutDashboard,
    ShoppingCart,
    FileText,
    Diamond,
    Heart,
    Repeat,
    LucideFlagTriangleLeft,
    BookOpen,
    Clock,
    Star,
    PlayCircle,
    ArrowRight
} from 'lucide-react';
import { FaAngleLeft, FaAngleRight, FaAward, FaCheckCircle, FaPlay, FaTv } from 'react-icons/fa';
import Image from 'next/image';
import Header from '@/components/header';
import TopBar from '@/components/header/components/TopBar';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContexts';
import { Sider } from '@/components/ui/sider';
// Updated imports to use our new API services
import { 
  useStudentEnrollments, 
  getAllCourses,
  getEnrolledCourses,
  useNotifications,
  useProfile,
  useUserCourseRating
} from '@/services';
import { Progress } from '@/components/ui/progress';
import QuizCard from '@/components/quiz/QuizCard';
import QuizTaking from '@/components/quiz/QuizTaking';
import ContinueCourse from '@/components/course/ContinueCourse';
import { useAllCourseProgress } from '@/app/api/courses/useCourseProgressTracking';
import CourseRow from '@/components/course/CourseRow';
import CourseCard from '@/components/course/CourseCard';
import ResumeCourseCard from '@/components/course/ResumeCourseCard';
import { Button } from '@/components/ui/button';



  
  

const DashboardContent = () => {
    const {user, logout, token} = useAuth()
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('dashboard');
    const [selectedQuiz, setSelectedQuiz] = useState(null);
    const [isTakingQuiz, setIsTakingQuiz] = useState(false);
    const [quizSearchTerm, setQuizSearchTerm] = useState('');
    
    // Use our new API services
    const { data: enrolledData, isLoading, error } = useStudentEnrollments(token);
    const { data: notifications } = useNotifications();
    const { data: userProfile } = useProfile(user?.id);
    
    const courses = enrolledData?.data?.courses || [];
    
    // Filter courses based on search term
    const filteredCourses = courses.filter(course => 
        course.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.category?.toLowerCase().includes(searchTerm.toLowerCase())
    );
    
    // Calculate statistics
    const totalCourses = courses.length;
    const completedCourses = courses.filter(course => course.progress === 100).length;
    const totalProgress = courses.reduce((sum, course) => sum + (course.progress || 0), 0);
    const averageProgress = totalCourses > 0 ? Math.round(totalProgress / totalCourses) : 0;
    
    // Get unread notifications count
    const unreadNotifications = notifications?.data?.filter(n => !n.isRead).length || 0;
    const handleTabClick = (tabId) => {
        if (tabId === 'logout') {
            logout();
            return;
        }
        setActiveTab(tabId);
    };

    const handleStartQuiz = (quiz) => {
        setSelectedQuiz(quiz);
        setIsTakingQuiz(true);
    };

    const handleQuizComplete = (score, passed) => {
        console.log('Quiz completed:', { score, passed });
        setIsTakingQuiz(false);
        setSelectedQuiz(null);
        // Here you would typically update the quiz completion status via API
    };

    const handleQuizCancel = () => {
        setIsTakingQuiz(false);
        setSelectedQuiz(null);
    };


    const defaultNavItems = [
        {
          id: 'dashboard',
          name: 'Dashboard',
          icon: <LayoutDashboard className="mr-3 h-5 w-5" />,
          href: '#',
          onClick: () => handleTabClick('dashboard'),
          className: activeTab === 'dashboard' 
            ? 'flex items-center px-3 py-2 text-sm font-medium text-white bg-brand rounded-md'
            : 'flex items-center px-3 py-2 text-sm font-medium text-gray-800 hover:bg-brand hover:text-white rounded-md'
        },
        {
          id: 'courses',
          name: 'My Courses',
          icon: <ShoppingCart className="mr-3 h-5 w-5" />,
          href: '#',
          onClick: () => handleTabClick('courses'),
          className: activeTab === 'courses' 
            ? 'flex items-center px-3 py-2 text-sm font-medium text-white bg-brand rounded-md'
            : 'flex items-center px-3 py-2 text-sm font-medium text-gray-800 hover:bg-brand hover:text-white rounded-md'
        },
        {
          id: 'resume',
          name: 'Course Resume',
          icon: <FileText className="mr-3 h-5 w-5" />,
          href: '#',
          onClick: () => handleTabClick('resume'),
          className: activeTab === 'resume' 
            ? 'flex items-center px-3 py-2 text-sm font-medium text-white bg-brand rounded-md'
            : 'flex items-center px-3 py-2 text-sm font-medium text-gray-800 hover:bg-brand hover:text-white rounded-md'
        },
        {
          id: 'quiz',
          name: 'Quiz',
          icon: <Diamond className="mr-3 h-5 w-5" />,
          href: '#',
          onClick: () => handleTabClick('quiz'),
          className: activeTab === 'quiz' 
            ? 'flex items-center px-3 py-2 text-sm font-medium text-white bg-brand rounded-md'
            : 'flex items-center px-3 py-2 text-sm font-medium text-gray-800 hover:bg-brand hover:text-white rounded-md'
        },
        {
          id: 'saved',
          name: 'Saved',
          icon: <Heart className="mr-3 h-5 w-5" />,
          href: '#',
          onClick: () => handleTabClick('saved'),
          className: activeTab === 'saved' 
            ? 'flex items-center px-3 py-2 text-sm font-medium text-white bg-brand rounded-md'
            : 'flex items-center px-3 py-2 text-sm font-medium text-gray-800 hover:bg-brand hover:text-white rounded-md'
        },
        {
          id: 'edit-profile',
          name: 'Edit Profile',
          icon: <Edit className="mr-3 h-5 w-5" />,
          href: '#',
          onClick: () => handleTabClick('edit-profile'),
          className: activeTab === 'edit-profile' 
            ? 'flex items-center px-3 py-2 text-sm font-medium text-white bg-brand rounded-md'
            : 'flex items-center px-3 py-2 text-sm font-medium text-gray-800 hover:bg-brand hover:text-white rounded-md'
        },
        {
          id: 'settings',
          name: 'Settings',
          icon: <Settings className="mr-3 h-5 w-5" />,
          href: '#',
          onClick: () => handleTabClick('settings'),
          className: activeTab === 'settings' 
            ? 'flex items-center px-3 py-2 text-sm font-medium text-white bg-brand rounded-md'
            : 'flex items-center px-3 py-2 text-sm font-medium text-gray-800 hover:bg-brand hover:text-white rounded-md'
        },
        {
          id: 'delete-profile',
          name: 'Delete Profile',
          icon: <Trash className="mr-3 h-5 w-5" />,
          href: '#',
          onClick: () => handleTabClick('delete-profile'),
          className: activeTab === 'delete-profile' 
            ? 'flex items-center px-3 py-2 text-sm font-medium text-white bg-brand rounded-md'
            : 'flex items-center px-3 py-2 text-sm font-medium text-gray-800 hover:bg-brand hover:text-white rounded-md'
        },
        {
          id: 'logout',
          name: 'Sign Out',
          icon: <LogOut className="mr-3 h-5 w-5" />,
          href: '#',
          onClick: () => handleTabClick('logout'),
          className: 'flex items-center px-3 py-2 text-sm font-medium text-red-400 hover:bg-red-900 hover:bg-opacity-25 hover:text-red-300 rounded-md',
          isDestructive: true
        }
      ];

    const toggleSidebar = () => {
        setSidebarOpen(!sidebarOpen);
    };

    const toggleDropdown = () => {
        setDropdownOpen(!dropdownOpen);
    };

    return (
        <div className=" bg-gray-50">
            <div className="hero bg-gradient-to-r from-brand to-slate-800 py-20 text-white mb-10 lg:mb-26">
                <div className="max-w-[1500px] mx-auto px-4 relative  -z-0">
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
            <div className="flex flex-col xl:flex-row max-w-[1500px] mx-auto px-4">

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
                    <Sider 
                        navItems={defaultNavItems}
                        activeId={activeTab}
                        onItemClick={handleTabClick}
                    />
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

                    {/* Tab Content */}
                    {activeTab === 'dashboard' && (
                        <div>

                    {/* Counter boxes */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 mt-2">
                        {/* Counter item 1 */}
                        <div className="flex items-center p-4 bg-orange-50 rounded-lg border border-gray-300">
                            <div className="flex-shrink-0">
                                <FaTv className="h-8 w-8 text-orange-500" />
                            </div>
                            <div className="ml-4">
                                <h5 className="text-2xl font-bold text-gray-900">
                                    {isLoading ? '...' : totalCourses}
                                </h5>
                                <p className="text-sm text-gray-600">Total Courses</p>
                            </div>
                        </div>

                        {/* Counter item 2 */}
                        <div className="flex items-center p-4 bg-purple-50 rounded-lg border border-gray-300">
                            <div className="flex-shrink-0">
                                <FaCheckCircle className="h-8 w-8 text-purple-500" />
                            </div>
                            <div className="ml-4">
                                <h5 className="text-2xl font-bold text-gray-900">
                                    {isLoading ? '...' : completedCourses}
                                </h5>
                                <p className="text-sm text-gray-600">Completed Courses</p>
                            </div>
                        </div>

                        {/* Counter item 3 */}
                        <div className="flex items-center p-4 bg-green-50 rounded-lg border border-gray-300">
                            <div className="flex-shrink-0">
                                <FaAward className="h-8 w-8 text-green-500" />
                            </div>
                            <div className="ml-4">
                                <h5 className="text-2xl font-bold text-gray-900">
                                    {isLoading ? '...' : averageProgress}%
                                </h5>
                                <p className="text-sm text-gray-600">Average Progress</p>
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
                                        placeholder="Search courses..."
                                        aria-label="Search"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
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
                                {isLoading ? (
                                    <div className="flex justify-center items-center py-12">
                                        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-brand"></div>
                                    </div>
                                ) : error ? (
                                    <div className="text-center py-12">
                                        <div className="text-red-500 text-lg">Error loading courses: {error.message}</div>
                                    </div>
                                ) : filteredCourses.length === 0 ? (
                                    <div className="text-center py-12">
                                        <BookOpen className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                        <h3 className="text-lg font-medium text-gray-900 mb-2">
                                            {searchTerm ? 'No courses found' : 'No enrolled courses yet'}
                                        </h3>
                                        <p className="text-gray-600 mb-4">
                                            {searchTerm 
                                                ? 'Try adjusting your search terms'
                                                : 'Explore our courses and start your learning journey!'
                                            }
                                        </p>
                                        {!searchTerm && (
                                            <Link href="/courses" className="bg-brand hover:bg-brand-dark text-white px-6 py-3 rounded-md font-medium transition-colors">
                                                Browse Courses
                                            </Link>
                                        )}
                                    </div>
                                ) : (
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Title</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Progress</th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Accessed</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                            {filteredCourses.map((course) => (
                                                <CourseRow key={course._id} course={course} />
                                            ))}
                                        </tbody>
                                    </table>
                                )}
                            </div>

                            {/* Pagination */}
                            {filteredCourses.length > 0 && (
                                <div className="flex flex-col sm:flex-row justify-between items-center mt-6">
                                    <p className="text-sm text-gray-700 mb-4 sm:mb-0">
                                        Showing {filteredCourses.length} of {totalCourses} courses
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                        </div>
                    )}

                    {/* My Courses Tab */}
                    {activeTab === 'courses' && (
                        <div className="min-h-screen bg-gray-50 py-8">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="mb-8">
                                    <h1 className="text-3xl font-bold text-gray-900">My Courses</h1>
                                    <p className="text-gray-600 mt-2">
                                        Continue your learning journey and track your progress
                                    </p>
                                </div>

                                {isLoading ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {[...Array(6)].map((_, i) => (
                                            <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
                                                <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                                                <div className="h-3 bg-gray-300 rounded w-1/2 mb-2"></div>
                                                <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                                            </div>
                                        ))}
                                    </div>
                                ) : error ? (
                                    <div className="text-center py-12">
                                        <div className="text-red-500 text-lg">Error loading courses: {error.message}</div>
                                    </div>
                                ) : courses.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {courses.map((course, index) => (
                                            <CourseCard key={course._id} course={course} index={index} isEnrolled={true} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12 bg-white rounded-lg shadow">
                                        <BookOpen className="w-20 h-20 text-gray-400 mx-auto mb-6" />
                                        <h2 className="text-2xl font-bold text-gray-900 mb-3">No Courses Enrolled Yet</h2>
                                        <p className="text-gray-600 mb-6">
                                            It looks like you haven't enrolled in any courses. Explore our catalog and start your learning journey!
                                        </p>
                                        <Link href="/courses" className="bg-brand hover:bg-brand-dark text-white px-6 py-3 rounded-md font-medium transition-colors">
                                            Browse Courses
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Course Resume Tab */}
                    {activeTab === 'resume' && (
                        <div className="min-h-screen bg-gray-50 py-8">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="mb-8">
                                    <h1 className="text-3xl font-bold text-gray-900">Course Resume</h1>
                                    <p className="text-gray-600 mt-2">
                                        Pick up where you left off in your courses
                                    </p>
                                </div>

                                {isLoading ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {[...Array(6)].map((_, i) => (
                                            <div key={i} className="bg-white rounded-lg shadow p-6 animate-pulse">
                                                <div className="h-4 bg-gray-300 rounded w-3/4 mb-4"></div>
                                                <div className="h-3 bg-gray-300 rounded w-1/2 mb-2"></div>
                                                <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                                            </div>
                                        ))}
                                    </div>
                                ) : error ? (
                                    <div className="text-center py-12">
                                        <div className="text-red-500 text-lg">Error loading courses: {error.message}</div>
                                    </div>
                                ) : courses.length > 0 ? (
                                    <div className="space-y-6">
                                        {/* Recently Accessed Courses */}
                                        <div>
                                            <h2 className="text-xl font-semibold text-gray-900 mb-4">Continue Learning</h2>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                {courses.map((course, index) => (
                                                    <ContinueCourse 
                                                        key={course._id} 
                                                        course={course}
                                                        index={index}
                                                    />
                                                ))}
                                            </div>
                                        </div>

                                        {/* All Courses */}
                                        <div>
                                            <h2 className="text-xl font-semibold text-gray-900 mb-4">All Your Courses</h2>
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                                {courses.map((course, index) => (
                                                    <ResumeCourseCard key={course._id} course={course} index={index} />
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="bg-white rounded-lg shadow p-8 text-center">
                                        <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                        <h3 className="text-xl font-semibold text-gray-900 mb-2">No Courses Enrolled</h3>
                                        <p className="text-gray-600 mb-6">
                                            You need to be enrolled in courses to see your resume.
                                        </p>
                                        <Link 
                                            href="/courses" 
                                            className="bg-brand hover:bg-brand-dark text-white px-6 py-3 rounded-md font-medium transition-colors"
                                        >
                                            Browse Courses
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Quiz Tab */}
                    {activeTab === 'quiz' && (
                        <div className="min-h-screen bg-gray-50 py-8">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="mb-8">
                                    <h1 className="text-3xl font-bold text-gray-900">Quizzes</h1>
                                    <p className="text-gray-600 mt-2">
                                        Test your knowledge with course quizzes
                                    </p>
                                </div>

                                {isTakingQuiz ? (
                                    <QuizTaking
                                        quiz={selectedQuiz}
                                        onComplete={handleQuizComplete}
                                        onCancel={handleQuizCancel}
                                    />
                                ) : (
                                    <div>
                                        {/* Search and Filter */}
                                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                                            <div className="flex flex-col md:flex-row gap-4">
                                                <div className="flex-1 relative">
                                                    <input
                                                        type="text"
                                                        placeholder="Search quizzes..."
                                                        value={quizSearchTerm}
                                                        onChange={(e) => setQuizSearchTerm(e.target.value)}
                                                        className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                                    />
                                                    <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                </div>
                                                <div className="flex gap-2">
                                                    <Button variant="outline" size="sm">
                                                        All Quizzes
                                                    </Button>
                                                    <Button variant="outline" size="sm">
                                                        Completed
                                                    </Button>
                                                    <Button variant="outline" size="sm">
                                                        Pending
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Quizzes Grid */}
                                        {courses.length > 0 ? (
                                            <div className="space-y-6">
                                                {courses.map((course) => {
                                                    const { data: quizData, isLoading: quizLoading } = useCourseQuizzes(
                                                        user?._id, 
                                                        course._id, 
                                                        user?.token
                                                    );
                                                    const quizzes = quizData?.quizzes || [];

                                                    if (quizLoading) {
                                                        return (
                                                            <div key={course._id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                                                <div className="animate-pulse">
                                                                    <div className="h-4 bg-gray-300 rounded w-1/4 mb-4"></div>
                                                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                                        {[...Array(3)].map((_, i) => (
                                                                            <div key={i} className="h-32 bg-gray-200 rounded"></div>
                                                                        ))}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        );
                                                    }

                                                    if (quizzes.length === 0) {
                                                        return null;
                                                    }

                                                    const filteredQuizzes = quizzes.filter(quiz =>
                                                        quiz.title.toLowerCase().includes(quizSearchTerm.toLowerCase()) ||
                                                        quiz.description?.toLowerCase().includes(quizSearchTerm.toLowerCase())
                                                    );

                                                    return (
                                                        <div key={course._id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                                                            <div className="flex items-center justify-between mb-6">
                                                                <div>
                                                                    <h3 className="text-lg font-semibold text-gray-900">{course.title}</h3>
                                                                    <p className="text-sm text-gray-600">
                                                                        {quizzes.length} quiz{quizzes.length !== 1 ? 'zes' : ''} available
                                                                    </p>
                                                                </div>
                                                                <Link 
                                                                    href={`/courses/${course._id}`}
                                                                    className="text-brand hover:text-brand-dark text-sm font-medium"
                                                                >
                                                                    View Course →
                                                                </Link>
                                                            </div>

                                                            {filteredQuizzes.length > 0 ? (
                                                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                                                    {filteredQuizzes.map((quiz) => (
                                                                        <QuizCard
                                                                            key={quiz._id}
                                                                            quiz={{
                                                                                ...quiz,
                                                                                courseId: course._id
                                                                            }}
                                                                            courseTitle={course.title}
                                                                            onStartQuiz={handleStartQuiz}
                                                                        />
                                                                    ))}
                                                                </div>
                                                            ) : (
                                                                <div className="text-center py-8">
                                                                    <Diamond className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                                                    <p className="text-gray-600">No quizzes found matching your search.</p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        ) : (
                                            <div className="bg-white rounded-lg shadow p-8 text-center">
                                                <Diamond className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                                <h3 className="text-xl font-semibold text-gray-900 mb-2">No Quizzes Available</h3>
                                                <p className="text-gray-600 mb-6">
                                                    You need to be enrolled in courses to access quizzes.
                                                </p>
                                                <Link 
                                                    href="/courses" 
                                                    className="bg-brand hover:bg-brand-dark text-white px-6 py-3 rounded-md font-medium transition-colors"
                                                >
                                                    Browse Courses
                                                </Link>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Saved Tab */}
                    {activeTab === 'saved' && (
                        <div className="min-h-screen bg-gray-50 py-8">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="mb-8">
                                    <h1 className="text-3xl font-bold text-gray-900">Saved Courses</h1>
                                    <p className="text-gray-600 mt-2">
                                        Your bookmarked courses and resources
                                    </p>
                                </div>
                                <div className="bg-white rounded-lg shadow p-8 text-center">
                                    <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">No Saved Courses</h3>
                                    <p className="text-gray-600">Save courses you're interested in to access them later.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Edit Profile Tab */}
                    {activeTab === 'edit-profile' && (
                        <div className="min-h-screen bg-gray-50 py-8">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="mb-8">
                                    <h1 className="text-3xl font-bold text-gray-900">Edit Profile</h1>
                                    <p className="text-gray-600 mt-2">
                                        Update your personal information and preferences
                                    </p>
                                </div>
                                <div className="bg-white rounded-lg shadow p-8 text-center">
                                    <Edit className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Profile Editor Coming Soon</h3>
                                    <p className="text-gray-600">Profile editing functionality will be available soon.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Settings Tab */}
                    {activeTab === 'settings' && (
                        <div className="min-h-screen bg-gray-50 py-8">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="mb-8">
                                    <h1 className="text-3xl font-bold text-gray-900">Settings</h1>
                                    <p className="text-gray-600 mt-2">
                                        Manage your account settings and preferences
                                    </p>
                                </div>
                                <div className="bg-white rounded-lg shadow p-8 text-center">
                                    <Settings className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Settings Coming Soon</h3>
                                    <p className="text-gray-600">Account settings and preferences will be available soon.</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Delete Profile Tab */}
                    {activeTab === 'delete-profile' && (
                        <div className="min-h-screen bg-gray-50 py-8">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                <div className="mb-8">
                                    <h1 className="text-3xl font-bold text-gray-900">Delete Profile</h1>
                                    <p className="text-gray-600 mt-2">
                                        Permanently delete your account and all associated data
                                    </p>
                                </div>
                                <div className="bg-white rounded-lg shadow p-8 text-center">
                                    <Trash className="w-16 h-16 text-red-400 mx-auto mb-4" />
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Account Deletion</h3>
                                    <p className="text-gray-600 mb-4">This action cannot be undone. All your data will be permanently deleted.</p>
                                    <button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-md font-medium transition-colors">
                                        Delete Account
                                    </button>
                            </div>
                        </div>
                    </div>
                    )}
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