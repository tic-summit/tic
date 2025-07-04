import { Mail, MapPin, MapPinIcon, Phone } from 'lucide-react'
import React from 'react'

export default function TopBar() {
  return (
    <div className="top-bar h-14 flex flex-col justify-center bg-indigo-950">
      <div className="max-w-[1460px] mx-auto px-4 text-sm w-full">
        <div className="flex flex-col items-center md:flex-row md:items-start md:justify-between text-white w-full">
          <div className="flex items-center gap-1">
            <a href="mailto:dreamslms@example.com" className='flex items-center gap-1'><Mail className='inline-block  w-4 h-4' />TicFoundation@example.com</a>
          </div>
          <div className="flex items-center gap-1">
            <MapPinIcon className='w-4 h-4' />Yaounde, Melen, Polytechnique, Technipole</div>
        </div>
      </div>
    </div>
  )
}
