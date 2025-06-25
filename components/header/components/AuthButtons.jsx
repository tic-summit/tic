"use client"
import { useAuth } from '@/contexts/AuthContexts';
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

function AuthButtons(mobile) {
    const pathname = usePathname();
    const { isAuthenticated, logout, user } = useAuth()

    return (
        <>
            {!isAuthenticated ? (<div><div className="auth-buttons flex flex-col md:flex-row items-center gap-4">
                <Link href={'/auth/login'} className={`px-4 py-2 flex-1 w-full md:w-fit rounded-full  text-center  text-lg ${(pathname === '/' && !mobile) ? ' text-white' : mobile && 'bg-brand text-white'} font-semibold `}>Login</ Link>
                <Link href={'/auth/signup'} className="px-4 py-2 flex-1 w-full md:w-fit  rounded-full border text-center text-lg border-gray-800 text-gray-800 font-semibold dark:bg-white ">Register</Link>
            </div>
            </div>) :
            <div className='flex items-center gap-2'>  
            <Link href={`${user?.userType === "instructor" ? '/instructor/dashboard' : '/student/dashboard'}`} className='px-4 py-2 flex-1 md:flex-0 text-nowrap sm:w-fit rounded-full border border-brand text-brand text-center'>Dashoboard</Link>
             <button onClick={logout} className={`px-4 py-2 flex-1 md:flex-0 text-nowrap sm:w-fit rounded-full border text-center  ${(pathname === '/' && !mobile) ? 'border-white text-white' : mobile && 'bg-brand text-white'} font-semibold `}>Log out</ button>
</div>            }
        </>
    )
}

export default AuthButtons