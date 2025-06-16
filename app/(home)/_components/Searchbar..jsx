import { ArrowRight, Search } from 'lucide-react'
import React from 'react'

export default function Searchbar() {
  return (
    <div className='relative w-full border border-brand p-4 rounded-xl md:rounded-full bg-white pt-8 md:pt-0'>
    <input type="text" placeholder='Search Course, Hackathons, Internships' className='text-brand border-none outline-none sm:px-10'/>
    <Search className='hidden md:block absolute top-4 text-brand'/>
    <button className="w-full flex justify-center md:w-fit md:absolute top-0 right-4 bg-brand p-2 rounded-full mt-2 ">
      <ArrowRight />
    </button>
</div>
  )
}
