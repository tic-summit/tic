import Header from '@/components/header'
import React from 'react'
import HomeCourses from './_components/Courses'
import TopBar from '@/components/header/components/TopBar'
import LearningPath from './_components/LearningPaths'
import Hero2 from './_components/Hero2'
import CallToAction from './_components/CallToAction'

export default function Home() {
  return (
    <div className='bg-gray-100'>
      <Hero2 />
      <LearningPath />
      <HomeCourses />
      <CallToAction />
    </div>
  )
}
