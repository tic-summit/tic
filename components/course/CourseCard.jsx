import { Heart, Star } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default function CourseCard({course, index}) {
  return (
    <Link
    href={`/courses/${course.id}`}
    key={course.id}
    className="course-box"
    data-aos="fade-up"
    data-aos-delay={index * 100}
  >
    <div className=" rounded-lg overflow-hidden border border-gray-300">
      <div className="relative">
        <a href={course.url}>
          <img 
            src={course.image} 
            alt={course.title} 
            className="w-full h-48 object-cover"
            loading="lazy"
          />
        </a>
        <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded">
          {course.originalPrice ? (
            <h3 className="text-sm font-semibold">
              <span className="text-primary">{course.price}</span> 
              <span className="text-gray-500 line-through ml-2">{course.originalPrice}</span>
            </h3>
          ) : (
            <h3 className="text-green-500 text-sm font-semibold">{course.price}</h3>
          )}
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-2 text-[15px]">
          <div className="flex items-center text-gray-600">
            Programming | self-paced
          </div>
          <button className="text-gray-400 hover:text-red-500">
            <Heart className="w-4 h-4" />
          </button>
        </div>

        <h3 className="text-lg font-semibold mb-3 hover:text-primary">
          <a href={course.url}>{course.title}</a>
        </h3>

        <div className="flex items-center text-sm text-gray-600 mb-4">
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
              <span>{course.duration}</span>
            </div>
          )}
        </div>
       
        <div className="flex justify-between items-center">
          <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
              <Star 
                key={i} 
                className={`w-4 h-4 ${i < Math.floor(course.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
              />
            ))}
            {course.reviews > 0 && (
              <span className="text-sm text-gray-600 ml-1">
                ({course.reviews})
              </span>
            )}
          </div>
       
        </div>
      </div>
    </div>
  </Link>
  )
}
