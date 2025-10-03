import React from 'react'

export default function EditProgressSteps({ activeStep, steps, completedSteps }) {
  return (
    <div className='max-w-sm md:max-w-md lg:max-w-lg mx-auto p-4 md:p-6'>
      <div className="flex justify-between items-center gap-2 md:gap-4">
        {steps.map((step, index) => (
          <React.Fragment key={step.id}>
            {/* Step Indicator */}
            <div className='relative flex flex-col items-center'>
              <div className={`
                rounded-full text-xs md:text-sm text-white 
                w-6 h-6 md:w-8 md:h-8 flex items-center justify-center
                ${activeStep === step.id ? 'bg-brand border-2 border-brand' : 
                   completedSteps.includes(step.id) ? 'bg-green-500 border-2 border-green-500' : 
                   'bg-gray-300 border-2 border-gray-300'}
              `}>
                {step.id.toString().padStart(2, '0')}
              </div>
              <div className={`
                hidden md:block
                absolute top-full mt-1 text-xs md:text-sm 
                whitespace-nowrap text-center w-[80px] md:w-auto
                ${activeStep === step.id ? 'text-brand font-medium' : 
                   completedSteps.includes(step.id) ? 'text-green-500 font-medium' : 
                   'text-gray-500'}
              `}>
                {step.name}
              </div>
            </div>
            
            {/* Connector Line (except after last step) */}
            {index < steps.length - 1 && (
              <hr className={`
                h-[1.5px] flex-1 
                ${completedSteps.includes(step.id + 1) ? 'bg-green-500' : 
                   activeStep > step.id ? 'bg-brand' : 
                   'bg-gray-300'}
              `} />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  )
}