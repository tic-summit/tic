"use client"

import { useState } from 'react';
import {
    X,
    LayoutDashboard,
} from 'lucide-react';
import Link from 'next/link';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useAuth } from '@/contexts/AuthContexts';
import { ProfileSection } from './components/ProfileSection';
import { CoursesTable } from './components/CourseTable';
import NavItems from './components/NavItems';


<CoursesTable />


const StudentDashboardContent = () => {
  const { user, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Navigation configuration
  const navigationItems = NavItems

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleNavItemClick = (id) => {
    console.log('Navigation clicked:', id); // Debug log
    const item = navigationItems.find(item => item.id === id);
    
    if (item?.action) {
      item.action();
      return;
    }
    
    console.log('Setting active tab to:', id); // Debug log
    setActiveTab(id);
    if (sidebarOpen) toggleSidebar();
  };

  // Get the component for the active tab
  const renderActiveComponent = () => {
    console.log('Current active tab:', activeTab); // Debug log
    const activeItem = navigationItems.find(item => item.id === activeTab);
    console.log('Active item found:', activeItem?.name); // Debug log
    return activeItem?.component || <PlaceholderContent title="Not Found" />;
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <div className="hero bg-gradient-to-r from-brand to-slate-800 py-8 text-white mb-4 relative overflow-hidden">
        <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header and Breadcrumb */}
          <div className="mb-16 md:mb-20">
            <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold'>Instructor Dashboard</h1>
            <div className="flex items-center gap-2 text-white/80 mt-2">
              <Link href={'/'} className="hover:text-white transition-colors">Home</Link>
              <span>/</span>
              <span>Dashboard</span>
            </div>
          </div>

          {/* Profile Section */}
          <ProfileSection user={user} />
        </div>
      </div>

      {/* Main Layout */}
      <div className="flex flex-col xl:flex-row max-w-[1500px] mx-auto px-4">
        {/* Sidebar */}
        <div className={`fixed xl:static inset-y-0 left-0 z-60 lg:z-10 w-80 xl:w-72 bg-white xl:bg-transparent border-r xl:border-r-0 transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full xl:translate-x-0'
        }`}>
          {/* Sidebar header - Mobile only */}
          <div className="xl:hidden flex items-center justify-between p-4 bg-gray-100 border-b border-gray-300">
            <h5 className="text-lg font-semibold">My profile</h5>
            <button
              onClick={toggleSidebar}
              className="p-1 rounded hover:bg-gray-200"
              aria-label="Close sidebar"
            >
              <X size={20} />
            </button>
          </div>

          {/* Sidebar content */}
          <div className="p-4 sm:border rounded-lg">
            <nav className="space-y-2">
              {navigationItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavItemClick(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-left rounded-lg transition-colors duration-200 ${
                    activeTab === item.id
                      ? 'bg-brand text-white'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.name}</span>
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Mobile overlay */}
        {sidebarOpen && (
          <div
            className="xl:hidden fixed inset-0 z-30 bg-black/50"
            onClick={toggleSidebar}
            aria-label="Close sidebar"
          />
        )}

        {/* Main content */}
        <div className="flex-1 xl:ml-0 pt-4 xl:pt-4 px-4 xl:px-6">
          {/* Mobile menu button */}
          <div className="xl:hidden bg-brand p-2 w-fit rounded-full mb-4">
            <button
              className="text-white p-2 hover:bg-brand-dark transition-colors"
              onClick={toggleSidebar}
              aria-label="Open sidebar"
            >
              <LayoutDashboard size={16} />
            </button>
          </div>

          {/* Dynamic content based on active tab */}
          {renderActiveComponent()}
        </div>
      </div>
    </div>
  );
};

export default function StudentDashboard() {
  return (
    <ProtectedRoute>
      <StudentDashboardContent />
    </ProtectedRoute>
  );
}