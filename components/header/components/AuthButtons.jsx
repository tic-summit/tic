"use client"
import { usePathname } from 'next/navigation'
import React from 'react'

function AuthButtons(mobile) {
    const pathname = usePathname();

    return (
        <>
            <div className="auth-buttons flex flex-col md:flex-row items-center gap-4">
                <button className={`px-4 py-2 flex-1 w-full md:w-fit rounded-full border ${ (pathname === '/' && !mobile)  ? 'border-white text-white' : mobile && 'bg-brand text-white'} font-semibold `}>Login</button>
                <button className="px-4 py-2 flex-1 w-full md:w-fit  rounded-full border border-gray-800 text-gray-800 font-semibold dark:bg-white">Register</button>
            </div></>
    )
}

export default AuthButtons