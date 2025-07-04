"use client"
import React, { useState } from 'react'
import CourseDetails from './components/CourseDetails'
import TopBar from '@/components/header/components/TopBar'
import Header from '@/components/header'
import { Button } from '@/components/ui/button'
import CourseMediaPage from './components/CourseMedia'
import CurriculumComponent from './components/Curriculum'

function CreateCourse() {
  const [activeStep, setActiveStep] = useState(1)

  const steps = [
    { id: 1, name: 'Course details', component: <CourseDetails /> },
    { id: 2, name: 'Course media', component: <CourseMediaPage /> },
    { id: 3, name: 'Curriculum', component: <CurriculumComponent />},
  ]

  const handleNext = () => {
    if (activeStep < steps.length) {
      setActiveStep(activeStep + 1)
    }
  }

  const handlePrev = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1)
    }
  }

  return (
    <div className="bg-gray-50">
=      <div className="hero bg-gradient-to-r from-brand to-slate-800 py-16 text-center text-white mb-10 lg:mb-18">
        <div className="max-w-7xl mx-auto px-4 relative -z-0 text-center">
          <h1 className='text-2xl md:text-4xl mt-2'>Create a new Course</h1>
          <p className="text-gray-300 mt-2">Build and customize your educational content with our intuitive course creation tools</p>
        </div>
      </div>

      <div className='max-w-7xl mx-auto px-6'>
        <div className="description-form text-center">
          <p className="text-gray-500 mb-8">
            Fill out the form below to create your new course. Provide a clear title, engaging description, <br />
            and select the appropriate category to help students find and understand your content.
          </p>
        </div>
        <div className='border rounded-xl h-fit'>
          <div className='flex gap-3 items-center justify-between border-b p-6'>
            {steps.map((step) => (
              <div key={step.id} className='flex flex-col gap-2 items-center justify-center'>
                <Button
                  variant={activeStep === step.id ? 'brand' : 'outline'}
                  className={`rounded-full text-sm h-14 w-14 cursor-pointer shadow ${
                    activeStep === step.id ? 'bg-brand text-white' : 'bg-white text-gray-700'
                  }`}
                  onClick={() => setActiveStep(step.id)}
                >
                  {step.id}
                </Button>
                <div className={`text-sm font-bold ${
                  activeStep === step.id ? 'text-brand' : 'text-gray-500'
                }`}>
                  {step.name}
                </div>
              </div>
            ))}
          </div>
          
          {/* Current Step Content */}
          <div className="p-6">
            {steps.find(step => step.id === activeStep)?.component}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between p-6 border-t">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={activeStep === 1}
              className={`${activeStep === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              Previous
            </Button>
            {activeStep < steps.length ? (
              <Button variant="brand" onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button variant="brand">
                Submit Course
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateCourse