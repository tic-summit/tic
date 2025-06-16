"use client"
import Link from 'next/link';
import { usePathname } from 'next/navigation'
import React from 'react'

function AuthButtons(mobile) {
    const pathname = usePathname();

    return (
        <>
            <div className="auth-buttons flex flex-col md:flex-row items-center gap-4">
                <Link href={'/aut/login'} className={`px-4 py-2 flex-1 w-full md:w-fit rounded-full border text-center  ${ (pathname === '/' && !mobile)  ? 'border-white text-white' : mobile && 'bg-brand text-white'} font-semibold `}>Login</ Link>
                <Link href={'/auth/signup'} className="px-4 py-2 flex-1 w-full md:w-fit  rounded-full border text-center border-gray-800 text-gray-800 font-semibold dark:bg-white ">Register</Link>
            </div></>
    )
}

export default AuthButtons