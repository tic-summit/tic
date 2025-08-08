  "use client"
  import { useCourses } from '@/app/courses/api/courses';
  import CourseCard from '@/components/course/CourseCard';
  import { Icon } from '@iconify/react';
  import { BookOpen, Heart, Star } from 'lucide-react';
  import Link from 'next/link';
  import React from 'react';
 import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

   const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          arrows: false,
        },
      },
      {
         breakpoint: 768,
          settings: {
            slidesToShow: 2
          }
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          arrows: false,
        },
      },
    ],
  };


  const HomeCourses = () => {
    const {data:courses, isLoading, isError, error} = useCourses();


    if (isError) return <div>Error: {error.message}</div>;
    
      

    return (
      <div className=''>
          <div className="max-w-[1500px] mx-auto px-4 py-8 ">
          <div className="container mx-auto px-4 py-8">
        <div 
          className="flex flex-row justify-between items-start md:items-center mb-6"
        >
          <div className="s mb-4 md:mb-0">
            <h2 className="text-lg md:text-2xl font-bold mt-2 text-left">
              Featured Courses
            </h2>
          </div>
          
          <div className="all-btn all-category">
            <Link
              href="/courses" 
              className="bg-brand text-nowrap text-sm rounded-full  text-secondary font-semibold px-6 py-3  transition-colors duration-300 inline-block"
            >
              All Courses
            </Link>
          </div>
        </div>

        <div 
          className="section-text max-w-2xl mb-8"
          data-aos="fade-up"
        >
          <p className="text-gray-600">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Eget aenean accumsan bibendum gravida maecenas augue elementum et neque. Suspendisse imperdiet.
          </p>
        </div>
      </div>
      {
        isLoading ? (
          <div className='h-[10vh] flex justify-center items-center'>
            <Icon icon="svg-spinners:90-ring-with-bg" width="24" height="24" />
          </div>
        ) : (
          <Slider {...settings} className="course-slider">
            {courses?.slice(0, 8).map((course, index) => (
             <div className="px-2" key={course.id}>
              <CourseCard key={course.id} course={course} index={index} />
             </div>
            ))}
          </Slider>
        )
      }
      </div>
      </div>
    
    );
  };

  export default HomeCourses;