import { Eye, Heart, Star } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button } from '../ui/button'

export default function CourseCard({ course, index }) {
  return (
    <div

      key={course.id}
      className="course-box max-w-full border border-brand rounded-lg"
      data-aos="fade-up"
      data-aos-delay={index * 100}
    >
      <div className=" rounded-lg overflow-hidden border border-gray-300">
        <div className="relative group overflow-hidden h-48">
          {/* Main content (image + price tag) */}
          <div className="relative h-full w-full z-10">
            <div href={course.url}>
              <img
                src={course.image}
                alt={course.title}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="absolute top-4 right-4 bg-rose-400  px-3 py-1 rounded-full z-30">
              {course.originalPrice ? (
                <h3 className="text-sm font-semibold">
                  <span className="text-primary">{course.price}</span>
                  <span className="text-gray-500 line-through ml-2">{course.originalPrice}</span>
                </h3>
              ) : (
                <h3 className="text-white text-xs font-semibold">{course.price}</h3>
              )}
            </div>
          </div>

          {/* Overlay (slides up on hover) */}
          <div className="
    absolute inset-x-0 bottom-0 h-0  /* Start with 0 height */
    bg-black/50 z-20 
    transition-all duration-600 ease-in-out
    group-hover:h-full
   
  ">

            <div className='bg-white w-fit p-2 rounded-full m-4 cursor-pointer'>
              <Link
                href={`/courses/${course.id}`}
                className="
        
         text-brand text-xs font-bold 
      "
              >
                <Eye className='h-4 w-4' />
              </Link>

            </div>
          </div>
        </div>

        <div className="p-4">
          <div className="flex justify-between items-start  text-[15px]">
            <div className="flex items-center text-gray-600">
              Programming | self-paced
            </div>
            <button className="text-gray-400 hover:text-red-500">
              <Heart className="w-4 h-4" />
            </button>
          </div>

          <h3 className="text-lg font-semibold  mb-1 hover:text-primary ">
            <div className='max-w-[240px]  truncate' href={course.url}>{course.title}</div>
          </h3>

          <div className="flex items-center text-[15px] text-gray-500 font-semibold mb-4 border-b-2 pb-4 border-brand border-dashed ">
            <div className="flex items-center mr-4">
              <img
                src="https://dreamslms-wp.dreamstechnologies.com/wp-content/themes/dreamslms/assets/images/icon-01.svg"
                alt="Lessons"
                className="w-4 h-4 mr-1"
              />
              <span>{course.lessons} Lesson{course.lessons !== 1 ? 's' : ''}</span>
            </div>
            {course.duration && (
              <div className="flex items-center">
                <img
                  src="https://dreamslms-wp.dreamstechnologies.com/wp-content/themes/dreamslms/assets/images/icon-02.svg"
                  alt="Duration"
                  className="w-4 h-4 mr-1"
                />
                <span className='text-xs text-gray-500'>{course.duration}</span>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2 ">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(course.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-400'}`}
                />
              ))}
              {course.reviews > 0 && (
                <span className="text-sm text-gray-600 ml-1">
                  ({course.reviews})
                </span>
              )}
            </div>
            <Button variant={"outline"} className={"shadow-none bg-brand text-white hover:text-white border-none  hover:bg-brand/90"}>
              <Link href={`/courses/${course.id}`} className="text-xs font-semibold">
                View Course
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
