import { ChevronRight } from 'lucide-react'
import React from 'react'

export default function CallToAction() {
    return (
        // <div className='px-4 h-[70vh] flex '>
        //     <div className='flex-1 h-full border border-red-600 relative bg-yellow-100' >
        //         <div className='flex  flex-col justify-center h-full w-xl absolute right-20'>
        //             <h2 className='font-semibold  w-[300px] sm:text-2xl text-gray-700'>What are you waiting for?</h2>
        //             <h3 className='text-gray-600 text-lg sm:text-xl'>Everyone wants to propel to the next level.</h3>
        //             <div className="space-y-3 mt-8">
        //                 <div className="p-4 flex items-center justify-between bg-brand/10">
        //                     <p className='text-gray-700 text-lg sm:text-xl'>Find a course</p>
        //                     <ChevronRight className='text-gray-700' />
        //                 </div>
        //                 <div className="p-4 flex items-center justify-between bg-brand/10 ">
        //                     <p className='text-gray-700 text-lg sm:text-xl'>Learn, Build and Grow with us</p>
        //                     <ChevronRight className='text-gray-700' />
        //                 </div>
        //                 <div className="p-4 flex items-center justify-between bg-brand/10 ">
        //                     <p className='text-gray-700 text-lg sm:text-xl'>Get certified</p>
        //                     <ChevronRight className='text-gray-700' />
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        //     <div className='flex-1 bg-white h-[70vh] overflow-hidden py-10'>
        //         <img src="/hero.png" alt="" className='object-cover  border rounded-full' />
        //     </div>
        // </div>
        <>
            <div className='flex  flex-nowrap items-center h-[320px] mt-20 lg:h-[720px] w-full sm:h-full'>
                <div className="h-[720px] max-[900px]:w-full min-[900px]:w-[50%] bg-brand/5  flex flex-col justify-center  items-end">
                    <div className=' my-auto px-4 lg:pr-20 w-full min-[1112px]:w-[90%] min-[1660px]:w-[68%] '>
                        <h2 className='font-semibold text-xl  sm:text-2xl text-gray-700'>What are you waiting for?</h2>
                        <h3 className='text-gray-600 text-lg sm:text-xl'>Everyone wants to propel to the next level.</h3>
                        <ul className='space-y-4 mt-8'>
                            <li className="p-4 flex items-center justify-between bg-brand/10">
                                <p className='text-gray-700 text-lg sm:text-xl'>Find a course</p>
                                <ChevronRight className='text-gray-700' />
                            </li>
                            <li className="p-4 flex items-center justify-between bg-brand/10 ">
                                <p className='text-gray-700 text-lg sm:text-xl'>Learn, Build and Grow with us</p>
                                <ChevronRight className='text-gray-700' />
                            </li>
                            <li className="p-4 flex items-center justify-between bg-brand/10 ">
                                <p className='text-gray-700 text-lg sm:text-xl'>Get certified</p>
                                <ChevronRight className='text-gray-700' />
                            </li>
                        </ul>
                    </div>
                </div>
                <div className='hidden min-[900px]:block w-[700px]'>  
                     <img src="images/cta.jpg" alt="" className=' object-center object-contain w-full h-[700px] ml-12 border rounded-full' />
                </div>
            </div>
        </>
    )
}
