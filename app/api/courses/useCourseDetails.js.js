import { useState, useEffect, useMemo } from 'react';
import { useQuery } from '@tanstack/react-query';
import api from '@/services/api';

const fetchCourseDetails = async(courseId) =>{
        const response = await api.get(`/courses/${courseId}`);

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
      _id: module._id,
      title: module.title,
      description: module.description,
      order: module.order,
      content: module.content, // Keep the original content structure
      topics: module.topics?.map(topic => ({
        _id: topic._id,
        title: topic.title,
        description: topic.description,
        type: topic.type,
        order: topic.order,
        isPublished: topic.isPublished,
        content: topic.content, // Keep the original content structure
      })) || [],
    }));
  }, [query?.data]);

  return{
    ...query,
    course: query?.data,
    curriculum: getCurriculum,
    getCourseInfo, 
    getInstructorInfo,
    getCurriculum,
  }
}

export default useCourseDetails;