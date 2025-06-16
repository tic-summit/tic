import Header from '@/components/header'
import React from 'react'
import Hero from './_components/Hero'
import HomeCourses from './_components/Courses'
import TopBar from '@/components/header/components/TopBar'

export default function Home() {
  return (
    <div>
      <TopBar />
      <Hero />
      <HomeCourses />
    </div>
  )
}
