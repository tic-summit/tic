"use client"
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import ProtectedRoute from '@/components/ProtectedRoute'
import EditBasicInformationForm from './components/EditCourseDetails'
import EditCourseMediaForm from './components/EditCourseMedia'
import EditCurriculumForm from './components/EditCurrulum'
import EditProgressSteps from './components/EditProgress'

function CreateCourse() {
  const [activeStep, setActiveStep] = useState(1)
  const [courseId, setCourseId] = useState(null)
  const [completedSteps, setCompletedSteps] = useState([])
    const handleStepComplete = () => {
    if (!completedSteps.includes(activeStep)) {
      setCompletedSteps([...completedSteps, activeStep])
    }
    handleNext()
  }

  console.log(courseId)

  const steps = [
    { id: 1, name: 'Course details', component: <EditBasicInformationForm setCourseId={setCourseId} onComplete={handleStepComplete} /> },
    { id: 2, name: 'Course media', component: <EditCourseMediaForm courseId={courseId} onComplete={handleStepComplete} /> },
    { id: 3, name: 'Curriculum', component: <EditCurriculumForm courseId={courseId} onComplete={handleStepComplete} /> },
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
    <ProtectedRoute>
      <div className="bg-gray-50 min-h-screen">
      <div className="hero bg-gradient-to-r from-brand to-slate-800 py-16 text-center text-white mb-10 lg:mb-18">
        <div className="max-w-[1500px] mx-auto px-4 relative -z-0 text-center">
          <h1 className='text-2xl md:text-4xl mt-2'>Edit Course</h1>
        </div>
      </div>
      
      <div className='max-w-[1500px] mx-auto px-6 pb-10'>
        <div className="description-form text-center">
          <p className="text-gray-500 mb-8">
            Fill out the form below to create your new course. Provide a clear title, engaging description, <br />
            and select the appropriate category to help students find and understand your content.
          </p>
        </div>
        
        <div className='border rounded-xl h-fit bg-white'>
          <EditProgressSteps
            activeStep={activeStep}
            steps={steps}
            completedSteps={completedSteps}
          />
          
          <div className="p-2 md:p-8">
            {React.cloneElement(steps.find(step => step.id === activeStep)?.component, {
              courseId: courseId
            })}
          </div>
          
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
              {!isLastStep && (
                <Button
                  onClick={handleNext}
                  className="gap-2"
                  disabled={!completedSteps.includes(activeStep)}
                >
                  Next
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </Button>
              )}
              {isLastStep && (
                <Button className="gap-2">
                  Submit Course
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
    </ProtectedRoute>
  )
}

export default CreateCourse