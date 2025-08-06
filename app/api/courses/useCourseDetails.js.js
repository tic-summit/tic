import { useState, useEffect, useMemo } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';
import { useQuery } from '@tanstack/react-query';



const fetchCourseDetails = async(courseId) =>{
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/${courseId}`
        );

        if (!response.data.success) {
          throw new Error('Failed to fetch course details');
        } 
        return response.data.data;
}


const useCourseDetails = (courseId) => {
  const query = useQuery({
    queryKey: ['courseDetails', courseId],
    queryFn: () =>  fetchCourseDetails(courseId),
    enabled: !!courseId,
    onError: (error) => {
         console.error('Error fetching course details:', error);
    },
    staleTime: 5 * 60 * 1000, // 5 minutes
    cacheTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
    retry: 1,
  })
    const getCourseInfo = useMemo( () => {
    if (!query.data) return null;

    return {
      id: query?.data?._id,
      title: query?.data?.title,
      description: query?.data?.description,
      category: query?.data?.category,
      thumbnail: query?.data?.thumbnail,
      duration: query?.data?.duration,
      pace: query?.data?.pace,
      price: query?.data?.price,
      level: query?.data?.level,
      features: query?.data?.features,
      rating: query?.data?.rating,
      studentsEnrolled: query?.data?.studentsEnrolled,
      createdAt: query?.data?.createdAt,
      videoUrl: query?.data?.videoUrl,
      documentPath: query?.data?.documentPath,
    };
  }, [query?.data]);

  const getInstructorInfo = useMemo(() => {
    if (!query?.data) return null;
    
    return {
      id: query?.data?.instructor._id,
      name: query?.data?.instructor.fullName,
      email: query?.data?.instructor.email,
      role: query?.data?.instructor.role,
      joinDate: query?.data?.instructor.createdAt,
    };
  }, [query?.data]);

  const getCurriculum = useMemo(() => {
    if (!query?.data) return null;
    
    return query?.data?.modules.map(module => ({
      id: module._id,
      title: module.title,
      resources: {
        videoUrl: module.videoUrl,
        pdfUrl: module.pdfUrl,
        textContent: module.textContent,
      },
      summaries: module.summaries.map(summary => ({
        id: summary._id,
        title: summary.title,
        content: summary.content,
      })),
      quizzes: module.quizzes.map(quiz => ({
        id: quiz._id,
        title: quiz.title,
        questionCount: quiz.questionCount,
        questions: quiz.questions.map(q => ({
          question: q.question,
          options: q.options,
          correctAnswer: q.answer,
        })),
      })),
    }));
  }, [query?.data]);

  return{
    ...query,
   getCourseInfo, 
   getInstructorInfo,
   getCurriculum,
  }
}

export default useCourseDetails;