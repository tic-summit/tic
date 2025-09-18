"use client"
import { useState } from 'react';
import {
    BookOpen,
    Users,
    UserCircle,
    Newspaper,
    Star,
    Clock,
    FileText,
    ChevronRight,
    ChevronLeft,
    Facebook,
    Twitter,
    Instagram,
    Linkedin,
    User2Icon,
    TimerIcon,
    StarIcon,
    Info,
    Check,
    Award,
    Globe,
    Languages,
} from 'lucide-react';
import useCourseDetails from '@/app/api/courses/useCourseDetails.js';
import { Skeleton } from '@/components/ui/skeleton';
import { FaCertificate } from 'react-icons/fa';
import Link from 'next/link';

export default function CourseCurriculum({ courseId }) {
    const [activeTab, setActiveTab] = useState('overview');
    const [scrollPosition, setScrollPosition] = useState(0);

    const {
        data: course,
        getCurriculum: curriculum,
        loading,
        error,
        getInstructorInfo: instructor,
        courseDetails
    } = useCourseDetails(courseId);

    const scrollTabs = (direction) => {
        const container = document.querySelector('.tabs-container');
        const scrollAmount = direction === 'right' ? 200 : -200;
        container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        setScrollPosition(container.scrollLeft + scrollAmount);
    };

    const tabs = [
        { id: 'overview', icon: <Info size={18} />, label: 'Overview' },
        { id: 'curriculum', icon: <BookOpen size={18} />, label: 'Curriculum' },
        { id: 'members', icon: <Users size={18} />, label: 'Members' },
        { id: 'instructors', icon: <UserCircle size={18} />, label: 'Instructors' },
        { id: 'news', icon: <Newspaper size={18} />, label: 'News' },
        { id: 'reviews', icon: <Star size={18} />, label: 'Reviews' }
    ];

    if (loading) return (
        <div className="flex-1 flex items-center justify-center p-6">
            <div role="status">
                <svg aria-hidden="true" className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-brand" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
            </div>
        </div>
    );

    if (error) return <div className="flex-1 p-6 text-red-500">Error: {error}</div>;

    return (
        <div className='flex-1'>
            <div className="bg-white roun overflow-hidden rounded-xl">
                {/* Tabs Navigation */}
                <div className="relative mb-8">
                    <div className="flex items-center">
                        {scrollPosition > 0 && (
                            <button
                                onClick={() => scrollTabs('left')}
                                className="p-2 mr-2 rounded-full bg-gray-100 hover:bg-gray-200"
                            >
                                <ChevronLeft size={20} />
                            </button>
                        )}

                        <div className="tabs-container flex overflow-x-auto scrollbar-hide space-x-1">
                            {tabs.map(tab => (
                                <button
                                    key={tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`flex items-center px-4 py-2 rounded-xl whitespace-nowrap text-xs ${activeTab === tab.id
                                            ? 'bg-brand text-white'
                                            : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                        }`}
                                >
                                    {tab.icon}
                                    <span className="ml-2">{tab.label}</span>
                                </button>
                            ))}
                        </div>

                        <button
                            onClick={() => scrollTabs('right')}
                            className="p-2 ml-2 rounded-full bg-gray-100 hover:bg-gray-200"
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                </div>

                <div className='border border-gray-300 rounded-xl'>
                    {/* Overview Tab */}
                    {activeTab === 'overview' && (
                        <div className="p-6">
                            <h3 className="text-2xl font-bold mb-6">About This Course</h3>

                            {/* Course Description */}
                            {course?.description && (
                                <div className="mb-8">
                                    <h4 className="text-lg font-semibold mb-3">Description</h4>
                                    <p className="text-gray-700 leading-relaxed">
                                        {course.description}
                                    </p>
                                </div>
                            )}

                            {/* What You'll Learn Section */}
                            {course?.whatYouLearn && course.whatYouLearn.length > 0 && (
                                <div className="mb-8">
                                    <h4 className="text-lg font-semibold mb-3">What you'll learn</h4>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                        {course.whatYouLearn.map((outcome, index) => (
                                            <div key={index} className="flex items-start">
                                                <Check className="text-green-500 mt-1 mr-2 flex-shrink-0" />
                                                <span>{outcome}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Course Features */}
                            <div className="mb-8">
                                <h4 className="text-lg font-semibold mb-3">This course includes:</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {courseDetails?.duration && (
                                        <div className="flex items-center">
                                            <TimerIcon className="text-brand mr-2" size={18} />
                                            <span>{courseDetails.duration} on-demand video</span>
                                        </div>
                                    )}
                                    {courseDetails?.resources && (
                                        <div className="flex items-center">
                                            <FileText className="text-brand mr-2" size={18} />
                                            <span>{courseDetails.resources} downloadable resources</span>
                                        </div>
                                    )}
                                    <div className="flex items-center">
                                        <Globe className="text-brand mr-2" size={18} />
                                        <span>Full lifetime access</span>
                                    </div>
                                    {course?.language && (
                                        <div className="flex items-center">
                                            <Languages className="text-brand mr-2" size={18} />
                                            <span>{course.language} captions</span>
                                        </div>
                                    )}
                                    <div className="flex items-center">
                                        <FaCertificate className="text-brand mr-2" size={18} />
                                        <span>Certificate of completion</span>
                                    </div>
                                </div>
                            </div>

                            {/* Requirements */}
                            {course?.requirements && course.requirements.length > 0 && (
                                <div className="mb-8">
                                    <h4 className="text-lg font-semibold mb-3">Requirements</h4>
                                    <ul className="list-disc pl-5 space-y-1">
                                        {course.requirements.map((req, index) => (
                                            <li key={index}>{req}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Target Audience */}
                            {courseDetails?.audience && courseDetails.audience.length > 0 && (
                                <div className="mb-8">
                                    <h4 className="text-lg font-semibold mb-3">Who this course is for:</h4>
                                    <ul className="list-disc pl-5 space-y-1">
                                        {courseDetails.audience.map((aud, index) => (
                                            <li key={index}>{aud}</li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </div>
                    )}

                    {/* Curriculum Tab */}
                    {activeTab === 'curriculum' && (
                        <div className="p-6">
                            <h3 className="text-2xl font-bold mb-6">Course Curriculum</h3>
                            {curriculum && curriculum.length > 0 ? (
                                <div className="space-y-4">
                                    {curriculum.map((module, index) => (
                                        <Link href={`/courses/${courseId}/${module.title}`} key={module.id} className="border border-gray-200 rounded-lg p-4 block">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center">
                                                    <FileText className="text-primary mr-3" size={20} />
                                                    <h4 className="font-medium">{module.title}</h4>
                                                </div>
                                                <div className="flex items-center space-x-4">
                                                    {module.resources?.videoUrl && (
                                                        <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                                            Video
                                                        </span>
                                                    )}
                                                    {module.duration && (
                                                        <span className="text-sm text-gray-500 flex items-center">
                                                            <Clock className="mr-1" size={14} />
                                                            {module.duration}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            {module.summaries && module.summaries.length > 0 && (
                                                <div className="ml-10 mt-3 pl-4 border-l-2 border-gray-200">
                                                    {module.summaries.map(summary => (
                                                        <div key={summary.id} className="flex items-center justify-between py-2">
                                                            <div className="flex items-center">
                                                                <FileText className="text-gray-400 mr-3" size={18} />
                                                                <span className="text-gray-600">{summary.title}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </Link>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500">No curriculum available</p>
                            )}
                        </div>
                    )}

                    {/* Members Tab */}
                    {activeTab === 'members' && (
                        <div className="p-6">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-bold">Course Members</h3>
                                {courseDetails?.enrolledCount && (
                                    <p className="text-gray-600">{courseDetails.enrolledCount} enrolled students</p>
                                )}
                            </div>
                            {courseDetails?.members && courseDetails.members.length > 0 ? (
                                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                                    {courseDetails.members.map((member, index) => (
                                        <div key={index} className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg">
                                            <img
                                                src={member.avatar}
                                                alt={member.name}
                                                className="w-16 h-16 rounded-full object-cover mb-2"
                                            />
                                            <p className="text-sm font-medium text-center">{member.name}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500">No members to display</p>
                            )}
                        </div>
                    )}

                    {/* Instructors Tab */}
                    {activeTab === 'instructors' && (
                        <div className="p-6">
                            <h3 className="text-2xl font-bold mb-6">Instructors</h3>
                            {instructor ? (
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="flex items-start p-4 border border-gray-200 rounded-lg">
                                        <div className="w-20 h-20 rounded-full bg-gray-200 flex items-center justify-center mr-4">
                                            <User2Icon size={32} className="text-gray-400" />
                                        </div>
                                        <div>
                                            <h4 className="font-bold text-lg">{instructor.name}</h4>
                                            {instructor.role && (
                                                <p className="text-gray-600 mb-3">{instructor.role}</p>
                                            )}
                                            <div className="flex space-x-3">
                                                <a href="#" className="text-gray-500 hover:text-blue-600">
                                                    <Facebook size={18} />
                                                </a>
                                                <a href="#" className="text-gray-500 hover:text-blue-400">
                                                    <Twitter size={18} />
                                                </a>
                                                <a href="#" className="text-gray-500 hover:text-pink-600">
                                                    <Instagram size={18} />
                                                </a>
                                                <a href="#" className="text-gray-500 hover:text-blue-700">
                                                    <Linkedin size={18} />
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <p className="text-gray-500">No instructor information available</p>
                            )}
                        </div>
                    )}

                    {/* News Tab */}
                    {activeTab === 'news' && (
                        <div className="p-6">
                            <h3 className="text-2xl font-bold mb-6">Course News</h3>
                            {courseDetails?.news && courseDetails.news.length > 0 ? (
                                <div className="space-y-6">
                                    {courseDetails.news.map((newsItem, index) => (
                                        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                                            {newsItem.image && (
                                                <img
                                                    src={newsItem.image}
                                                    alt={newsItem.title}
                                                    className="w-full h-48 object-cover"
                                                />
                                            )}
                                            <div className="p-4">
                                                <h4 className="font-bold text-xl mb-2">{newsItem.title}</h4>
                                                {newsItem.date && (
                                                    <div className="text-sm text-gray-500 mb-3">
                                                        {new Date(newsItem.date).toLocaleDateString()}
                                                    </div>
                                                )}
                                                <p className="text-gray-700">{newsItem.content}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-gray-500">No news available</p>
                            )}
                        </div>
                    )}

                    {/* Reviews Tab */}
                    {activeTab === 'reviews' && (
                        <div className="p-6">
                            <h3 className="text-2xl font-bold mb-6">Course Reviews</h3>
                            {courseDetails?.reviews ? (
                                <>
                                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                                        <div className="bg-gray-50 p-6 rounded-lg text-center">
                                            <div className="text-4xl font-bold mb-2">{courseDetails.reviews.averageRating || 0}</div>
                                            <div className="flex justify-center mb-2">
                                                {[...Array(5)].map((_, i) => (
                                                    <Star 
                                                        key={i} 
                                                        className={i < Math.floor(courseDetails.reviews.averageRating || 0) ? "text-yellow-400" : "text-gray-300"} 
                                                        size={20} 
                                                        fill="currentColor"
                                                    />
                                                ))}
                                            </div>
                                            <div className="text-gray-600">{courseDetails.reviews.total || 0} Reviews</div>
                                        </div>
                                        <div className="md:col-span-2">
                                            {[1, 2, 3, 4, 5].reverse().map(stars => (
                                                <div key={stars} className="flex items-center mb-2">
                                                    <span className="w-16 text-gray-700">{stars} Star{stars !== 1 ? 's' : ''}</span>
                                                    <div className="flex-1 bg-gray-200 h-2 rounded-full mx-2">
                                                        <div 
                                                            className="bg-yellow-400 h-2 rounded-full" 
                                                            style={{ 
                                                                width: `${courseDetails.reviews.breakdown?.[stars] || 0}%` 
                                                            }}
                                                        ></div>
                                                    </div>
                                                    <span className="w-8 text-gray-600">{courseDetails.reviews.counts?.[stars] || 0}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {courseDetails.reviews.comments && courseDetails.reviews.comments.length > 0 && (
                                        <div className="border-t pt-6">
                                            <h4 className="text-xl font-bold mb-4">Comments ({courseDetails.reviews.comments.length})</h4>
                                            {courseDetails.reviews.comments.map((comment, index) => (
                                                <div key={index} className="border-b pb-6 mb-6">
                                                    <div className="flex items-start mb-3">
                                                        <img
                                                            src={comment.avatar}
                                                            alt={comment.name}
                                                            className="w-10 h-10 rounded-full mr-3"
                                                        />
                                                        <div>
                                                            <div className="font-bold">{comment.name}</div>
                                                            <div className="text-sm text-gray-500 mb-2">
                                                                {new Date(comment.date).toLocaleDateString()}
                                                            </div>
                                                            <p className="text-gray-700">{comment.content}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <p className="text-gray-500">No reviews available</p>
                            )}

                            {/* Review Form */}
                            <div className="border-t pt-6">
                                <h4 className="text-xl font-bold mb-4">Leave a Review</h4>
                                <form className="space-y-4">
                                    <div className="grid md:grid-cols-3 gap-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Your Name</label>
                                            <input type="text" className="w-full px-3 py-2 border rounded-md" required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Your Email</label>
                                            <input type="email" className="w-full px-3 py-2 border rounded-md" required />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-700 mb-1">Your Phone</label>
                                            <input type="tel" className="w-full px-3 py-2 border rounded-md" required />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                                        <input type="text" className="w-full px-3 py-2 border rounded-md" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                                        <div className="flex">
                                            {[1, 2, 3, 4, 5].map(star => (
                                                <Star key={star} className="text-gray-300 hover:text-yellow-400 cursor-pointer" size={24} />
                                            ))}
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Comment</label>
                                        <textarea rows="4" className="w-full px-3 py-2 border rounded-md" required></textarea>
                                    </div>
                                    <div className="flex items-center">
                                        <input type="checkbox" id="remember" className="mr-2" />
                                        <label htmlFor="remember" className="text-sm text-gray-700">
                                            Save my name, email, and website in this browser for the next time I comment.
                                        </label>
                                    </div>
                                    <button
                                        type="submit"
                                        className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-md"
                                    >
                                        Post Comment
                                    </button>
                                </form>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}