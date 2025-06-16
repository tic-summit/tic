import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation'
import React from 'react'



function Logo() {

  const pathname = usePathname();

  return (
    <Link href={'/'} className={`S{pathname === '/' ? 'text-white' : text-gray-900} text-xl md:text-3xl`}>Logo</Link>
  )
}

export default Logo