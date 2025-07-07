import Header from '@/components/header'
import React from 'react'
import HomeCourses from './_components/Courses'
import TopBar from '@/components/header/components/TopBar'
import LearningPath from './_components/LearningPaths'
import Hero2 from './_components/Hero2'

export default function Home() {
  return (
    <div>
      <Hero2 />
      <LearningPath />
      <HomeCourses />
    </div>
  )
}
