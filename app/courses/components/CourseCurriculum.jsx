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
    StarIcon
} from 'lucide-react';

export default function CourseCurriculum() {
    const [activeTab, setActiveTab] = useState('curriculum');
        const [scrollPosition, setScrollPosition] = useState(0);
    
     
    
        const curriculumItems = [
            { title: 'Aliquam massa turpis', duration: '2 hrs', preview: true },
            { title: 'Cras pharetra nisl et magna', duration: '30 mins', preview: true },
            { title: 'Nullam vestibulum eros', duration: '20 mins', preview: false },
            { title: 'Placerat odio eu', duration: '2 hrs', preview: true },
            { title: 'Aliquam dolor non', duration: '30 mins', preview: false, hasChildren: true }
        ];
    
        const members = Array(10).fill(null).map((_, i) => ({
            name: `Member ${i + 1}`,
            avatar: `https://i.pravatar.cc/150?img=${i + 10}`
        }));
    
        const instructors = [
            {
                name: 'James Catwin',
                role: 'Art Director',
                avatar: 'https://dtlmselementor.wpengine.com/wp-content/uploads/2023/11/Teacher-image-2.jpg'
            },
            {
                name: 'Jim Morrison',
                role: 'Chief Programmer',
                avatar: 'https://dtlmselementor.wpengine.com/wp-content/uploads/2023/11/Teacher-image-4.jpg'
            }
        ];
    
        const scrollTabs = (direction) => {
            const container = document.querySelector('.tabs-container');
            const scrollAmount = direction === 'right' ? 200 : -200;
            container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            setScrollPosition(container.scrollLeft + scrollAmount);
        };
    const tabs = [
        { id: 'curriculum', icon: <BookOpen size={18} />, label: 'Curriculum' },
        { id: 'members', icon: <Users size={18} />, label: 'Members' },
        { id: 'instructors', icon: <UserCircle size={18} />, label: 'Instructors' },
        { id: 'news', icon: <Newspaper size={18} />, label: 'News' },
        { id: 'reviews', icon: <Star size={18} />, label: 'Reviews' }
    ];
  return (
    <div className='flex-1'>
    {/* Tab Content */}
    <div className="bg-white roun overflow-hidden rounded-xl">
        {/* Tabs Navigation */}
        <div className="relative mb-8">
            <div className="flex items-center">
                {scrollPosition > 0 && (
                    <button
                        onClick={() => scrollTabs('left')}
                        className="p-2 mr-2 rounded-full bg-gray-100 hover:bg-gray-200 "
                    >
                        <ChevronLeft size={20} />
                    </button>
                )}

                <div className="tabs-container flex overflow-x-auto scrollbar-hide space-x-1">
                    {tabs.map(tab => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center px-4 py-2 border-r whitespace-nowrap  ${activeTab === tab.id
                                ? 'bg-brand text-white'
                                : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                                }`}
                        >
                            <span className="mr-2">{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>

                <button
                    onClick={() => scrollTabs('right')}
                    className="p-2 ml-2 rounded-full bg-gray-100 hover:bg-gray-200 "
                >
                    <ChevronRight size={20} />
                </button>
            </div>
        </div>
        <div className='border border-gray-300 rounded-xl'>

            {/* Curriculum Tab */}
            {activeTab === 'curriculum' && (
                <div className="p-6 ">
                    <h3 className="text-2xl font-bold mb-6">Course Curriculum</h3>
                    <div className="space-y-4">
                        {curriculumItems.map((item, index) => (
                            <div key={index} className="border border-gray-200 rounded-lg p-4 ">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center">
                                        <FileText className="text-primary mr-3" size={20} />
                                        <h4 className="font-medium">{item.title}</h4>
                                    </div>
                                    <div className="flex items-center space-x-4">
                                        {item.preview && (
                                            <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                                                Preview
                                            </span>
                                        )}
                                        <span className="text-sm text-gray-500 flex items-center">
                                            <Clock className="mr-1" size={14} />
                                            {item.duration}
                                        </span>
                                    </div>
                                </div>
                                {item.hasChildren && (
                                    <div className="ml-10 mt-3 pl-4 border-l-2 border-gray-200">
                                        <div className="flex items-center justify-between py-2">
                                            <div className="flex items-center">
                                                <FileText className="text-gray-400 mr-3" size={18} />
                                                <span className="text-gray-600">Fill In The Blank Questions</span>
                                            </div>
                                            <span className="text-sm text-gray-500 flex items-center">
                                                <Clock className="mr-1" size={14} />
                                                30 mins
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Members Tab */}
            {activeTab === 'members' && (
                <div className="p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-bold">Course Members</h3>
                        <p className="text-gray-600">115 enrolled students</p>
                    </div>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                        {members.map((member, index) => (
                            <div key={index} className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg ">
                                <img
                                    src={member.avatar}
                                    alt={member.name}
                                    className="w-16 h-16 rounded-full object-cover mb-2"
                                />
                                <p className="text-sm font-medium text-center">{member.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Instructors Tab */}
            {activeTab === 'instructors' && (
                <div className="p-6">
                    <h3 className="text-2xl font-bold mb-6">Instructors</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                        {instructors.map((instructor, index) => (
                            <div key={index} className="flex items-start p-4 border border-gray-200 rounded-lg">
                                <img
                                    src={instructor.avatar}
                                    alt={instructor.name}
                                    className="w-20 h-20 rounded-full object-cover mr-4"
                                />
                                <div>
                                    <h4 className="font-bold text-lg">{instructor.name}</h4>
                                    <p className="text-gray-600 mb-3">{instructor.role}</p>
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
                        ))}
                    </div>
                </div>
            )}

            {/* News Tab */}
            {activeTab === 'news' && (
                <div className="p-6">
                    <h3 className="text-2xl font-bold mb-6">Course News</h3>
                    <div className="border border-gray-200 rounded-lg overflow-hidden">
                        <img
                            src="https://dtlmselementor.wpengine.com/wp-content/uploads/2023/11/blog15.jpg"
                            alt="Course News"
                            className="w-full h-48 object-cover"
                        />
                        <div className="p-4">
                            <h4 className="font-bold text-xl mb-2">Image – Minus id quod</h4>
                            <div className="text-sm text-gray-500 mb-3">24 Fri</div>
                            <p className="text-gray-700">
                                There are many variations of passages of Lorem Ipsum available, but the majority have
                                suffered alteration in some form, by injected humour, or randomised words which don't
                                look even slightly believable. Nam libero tempore, cum soluta nobis est eligendi optio
                                cumque nihil impedit quo
                            </p>
                        </div>
                    </div>
                </div>
            )}

            {/* Reviews Tab */}
            {activeTab === 'reviews' && (
                <div className="p-6">
                    <h3 className="text-2xl font-bold mb-6">Course Reviews</h3>
                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                        <div className="bg-gray-50 p-6 rounded-lg text-center">
                            <div className="text-4xl font-bold mb-2">0</div>
                            <div className="flex justify-center mb-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className="text-gray-300" size={20} />
                                ))}
                            </div>
                            <div className="text-gray-600">1 Review</div>
                        </div>
                        <div className="md:col-span-2">
                            {[1, 2, 3, 4, 5].reverse().map(stars => (
                                <div key={stars} className="flex items-center mb-2">
                                    <span className="w-16 text-gray-700">{stars} Star{stars !== 1 ? 's' : ''}</span>
                                    <div className="flex-1 bg-gray-200 h-2 rounded-full mx-2">
                                        <div className="bg-gray-400 h-2 rounded-full" style={{ width: '0%' }}></div>
                                    </div>
                                    <span className="w-8 text-gray-600">0</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="border-t pt-6">
                        <h4 className="text-xl font-bold mb-4">Comments (1)</h4>
                        <div className="border-b pb-6 mb-6">
                            <div className="flex items-start mb-3">
                                <img
                                    src="https://secure.gravatar.com/avatar/7fc6ccfdd919319ec9dc75839c627608?s=50&d=mm&r=g"
                                    alt="User"
                                    className="w-10 h-10 rounded-full mr-3"
                                />
                                <div>
                                    <div className="font-bold">dummy</div>
                                    <div className="text-sm text-gray-500 mb-2">30 Thu at 8:49 am</div>
                                    <p className="text-gray-700">
                                        <strong>Test</strong><br />
                                        Ut ac euismod velit. Aliquam condimentum dolor accumsan, venenatis sapien eu,
                                        egestas nunc. Suspendisse euismod semper fermentum.
                                    </p>
                                </div>
                            </div>
                        </div>

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
                                className="bg-primary hover:bg-primary-dark text-white px-6 py-2 rounded-md "
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
  )
}
