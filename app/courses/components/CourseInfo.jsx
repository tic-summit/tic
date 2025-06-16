import React from 'react'
import { Facebook, Instagram, StarIcon, TimerIcon, Twitter, User2Icon } from 'lucide-react';


function CourseInfo() {
  return (
    <div className=" bg-white roun p-6 flex- border border-gray-300 rounded-xl">
    <h3 className="text-xl font-bold mb-4">Course Info</h3>
    <ul className="space-y-3">
        <li className="flex">
            <span className="text-gray-500 w-24">Class:</span>
            <span className="text-gray-700">Kids Swimming Class, Learning to read, Music Class</span>
        </li>
        <li className="flex">
            <span className="text-gray-500 w-24">Categories:</span>
            <span className="text-gray-700">Education</span>
        </li>
        <li className="flex">
            <span className="text-gray-500 w-24">Lessons:</span>
            <span className="text-gray-700">5</span>
        </li>
        <li className="flex">
            <span className="text-gray-500 w-24">Quizzes:</span>
            <span className="text-gray-700">2</span>
        </li>
        <li className="flex">
            <span className="text-gray-500 w-24">Duration:</span>
            <span className="text-gray-700">1 day 1 hour 50 minutes</span>
        </li>
        <li className="flex">
            <span className="text-gray-500 w-24">Packages:</span>
            <span className="text-gray-700">Platinum Member, Gold Member</span>
        </li>
        <li className="flex">
            <span className="text-gray-500 w-24">Capacity:</span>
            <span className="text-gray-700">50</span>
        </li>
    </ul>

    <div className="mt-8">
        <h3 className="text-xl font-bold mb-4">Social Share</h3>
        <div className="flex space-x-3">
            <a href="#" className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center">
                <Facebook size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-blue-400 text-white flex items-center justify-center">
                <Twitter size={18} />
            </a>
            <a href="#" className="w-10 h-10 rounded-full bg-pink-600 text-white flex items-center justify-center">
                <Instagram size={18} />
            </a>
        </div>
    </div>
</div>
  )
}

export default CourseInfo