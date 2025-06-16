import { Mail, MapPin, MapPinIcon, Phone } from 'lucide-react'
import React from 'react'

export default function TopBar() {
  return (
    <div class="top-bar py-2">
    <div class="max-w-[1450px] mx-auto px-4 text-sm">
        <div class="flex flex-col items-center md:flex-row md:items-start md:justify-between text-gray-800">
            <div class="flex items-center gap-4">
                <a href="mailto:dreamslms@example.com" className='flex items-center gap-2'><Mail className='inline-block  w-4 h-4'/>TicFoundation@example.com</a>
            </div>
            <div class="flex items-center gap-1">
                <MapPinIcon className='w-4 h-4'/>Yaounde, Melen, Polytechnique, Technipole</div>
        </div>
    </div>
</div>
  )
}
