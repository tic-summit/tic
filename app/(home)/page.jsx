import Header from '@/components/header'
import React from 'react'
import HomeCourses from './_components/Courses'
import TopBar from '@/components/header/components/TopBar'
import LearningPath from './_components/LearningPaths'
import Hero2 from './_components/Hero2'
import FeaturesSection from './_components/FeaturesSection'
import InternshipsSection from './_components/InternshipsSection'
import HackathonsSection from './_components/HackathonsSection'
import MentorsSection from './_components/MentorsSection'
import NewsletterSection from './_components/NewsletterSection'
import Footer from './_components/Footer'

export default function Home() {
  return (
    <div className=''>
      <Hero2 />
      <HomeCourses />
      <FeaturesSection />
      <InternshipsSection />
      <HackathonsSection />
      <MentorsSection />
      <NewsletterSection />
      <Footer />
    </div>
  )
}
