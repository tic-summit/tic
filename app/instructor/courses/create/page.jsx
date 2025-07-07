"use client"
import React, { useState } from 'react'
import CourseDetails from './components/CourseDetails'
import TopBar from '@/components/header/components/TopBar'
import Header from '@/components/header'
import { Button } from '@/components/ui/button'
import CourseMediaPage from './components/CourseMedia'
import CurriculumComponent from './components/Curriculum'
import ProgressSteps from './components/ProgressSteps'
import BasicInformationForm from './components/CourseDetails'
import CourseMediaForm from './components/CourseMedia'
import CurriculumForm from './components/Curriculum'

function CreateCourse() {
  const [activeStep, setActiveStep] = useState(1)
  const steps = [
    { id: 1, name: 'Course details', component: <BasicInformationForm /> },
    { id: 2, name: 'Course media', component: <CourseMediaForm /> },
    { id: 3, name: 'Curriculum', component: <CurriculumForm /> },
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

  const isLastStep = activeStep === steps.length
  const isFirstStep = activeStep === 1

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="hero bg-gradient-to-r from-brand to-slate-800 py-16 text-center text-white mb-10 lg:mb-18">
        <div className="max-w-7xl mx-auto px-4 relative -z-0 text-center">
          <h1 className='text-2xl md:text-4xl mt-2'>Create a new Course</h1>
          <p className="text-gray-300 mt-2">Build and customize your educational content with our intuitive course creation tools</p>
        </div>
      </div>
      
      <div className='max-w-7xl mx-auto px-6 pb-10'>
        <div className="description-form text-center">
          <p className="text-gray-500 mb-8">
            Fill out the form below to create your new course. Provide a clear title, engaging description, <br />
            and select the appropriate category to help students find and understand your content.
          </p>
        </div>
        
        <div className='border rounded-xl h-fit bg-white'>
          {/* Progress Steps - pass activeStep as prop */}
          <ProgressSteps activeStep={activeStep} steps={steps} />
          
          {/* Render current step component */}
          <div className="p-6 md:p-8">
            {steps.find(step => step.id === activeStep)?.component}
          </div>
          
          {/* Navigation buttons */}
          <div className="flex justify-between p-6 border-t">
            <div>
              {!isFirstStep && (
                <Button
                  variant="outline"
                  onClick={handlePrev}
                  className="gap-2"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                  </svg>
                  Previous
                </Button>
              )}
            </div>
            <div>
              <Button
                onClick={handleNext}
                className="gap-2"
              >
                {isLastStep ? 'Submit' : 'Next'}
                {!isLastStep && (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateCourse