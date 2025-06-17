import { ArrowRight, Search } from 'lucide-react'
import React from 'react'

export default function Searchbar() {
  return (
    <div className='relative w-full border border-brand rounded-xl px-2 md:rounded-full bg-white pt-12 pb-6 md:p-4'>
      <input type="text" placeholder='Search Course, Hackathons, Internships' className='text-gray-800 border-none outline-none sm:px-10' />
      <Search className='hidden md:block absolute top-4 text-brand' />
      <button className="w-full flex justify-center md:w-fit md:absolute top-0 right-4 bg-brand p-2 rounded-full mt-2 ">
        <ArrowRight className='text-white' />
      </button>
    </div>
  )
}
