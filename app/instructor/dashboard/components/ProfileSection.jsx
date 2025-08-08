"use client"

import { useAuth } from "@/contexts/AuthContexts";
import { useInstructorCourses } from "@/services/useUserCourses";
import Image from "next/image";
import Link from "next/link";
import { FaBook, FaGem, FaCamera } from "react-icons/fa";
import { useRef, useState } from "react";
import { toast } from "sonner";
import useProfileImage from "@/services/useProfileImage";

export const ProfileSection = () => {
  const { user, updateUser } = useAuth();
  const { data, isLoading } = useInstructorCourses(user);
  const fileInputRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  
  const { mutate: uploadImage } = useProfileImage(user?.id, user?.token);

  const handleImageClick = () => {
      console.log('Image clicked!');

    fileInputRef.current?.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file
    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file (JPEG, PNG)');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error('Image size should be less than 2MB');
      return;
    }

    try {
      setIsUploading(true);
      uploadImage(file, {
        onSuccess: (response) => {
          if (response?.success && response?.imageUrl) {
            updateUser({ ...user, imageUrl: response.imageUrl });
            toast.success('Profile image updated successfully!');
          }
        },
        onError: (error) => {
          toast.error(error.response?.data?.message || 'Failed to upload image');
        }
      });
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  return (
    <div className="flex flex-col md:flex-row items-start gap-4 md:gap-8 pb-16 md:pb-24 ">
      {/* Profile Image Upload */}
      <div className="flex-shrink-0 relative -mt-8 md:-mt-16">
        {/* Clickable container */}
        <div 
          className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-lg overflow-hidden cursor-pointer"
          onClick={handleImageClick}
        >
          <Image
            src={user?.imageUrl || '/default-profile.png'}
            fill
            alt="Profile"
            className="object-cover"
          />
          
          {/* Camera overlay */}
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            <FaCamera className="text-white text-xl" />
          </div>
          
          {/* Loading indicator */}
          {isUploading && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-white"></div>
            </div>
          )}
        </div>
        
        {/* Hidden file input */}
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*"
          className="hidden"
        />
      </div>


      {/* Profile Info */}
      <div className="flex-1 flex flex-col md:flex-row md:items-end md:justify-between gap-4 w-full">
        <div>
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold">{user?.fullName || 'Instructor'}</h2>
          <p className="text-gray-300 text-sm sm:text-base">{user?.email || 'instructor@example.com'}</p>

          {/* Stats */}
          <div className="flex flex-wrap gap-4 mt-3 sm:mt-4">
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full">
              <FaBook className='text-brand h-4 w-4' />
              <span className="text-sm sm:text-base">{isLoading ? '...' : data?.count || 0} Courses</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 px-3 py-1.5 rounded-full">
              <FaGem className="h-4 w-4 text-blue-400" />
              <span className="text-sm sm:text-base">12k Students</span>
            </div>
          </div>
        </div>

        {/* Create Course Button */}
        <div className="flex justify-end">
          <Link
          href="/instructor/courses/create"
          className="inline-flex items-center justify-center border-2 border-green-500 hover:bg-green-500/10 text-green-500 hover:text-green-400 font-medium text-sm sm:text-base px-4 py-2 sm:px-6 sm:py-3 rounded-full transition-all duration-200 shadow-sm mt-4 md:mt-0"
        >
          Create course
        </Link>
        </div>
      </div>
    </div>
  );
};