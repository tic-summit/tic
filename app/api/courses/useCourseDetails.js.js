import { useState, useEffect } from 'react';
import axios, { AxiosError, AxiosResponse } from 'axios';



const useCourseDetails = (courseId) => {
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/${courseId}`
        );
        console.log(response);

        if (response.data.success) {
          setCourse(response.data.data);
        } else {
          setError('Failed to fetch course details');
        }
      } catch (err) {
        const axiosError = err;
        setError(
          axiosError.response?.data?.message ||
          axiosError.message ||
          'An error occurred while fetching course details'
        );
      } finally {
        setLoading(false);
      }
    };

    if (courseId) {
      fetchCourseDetails();
    }
  }, [courseId]);

  // Helper functions to extract specific data
  const getCourseInfo = () => {
    if (!course) return null;
    
    return {
      id: course._id,
      title: course.title,
      description: course.description,
      category: course.category,
      thumbnail: course.thumbnail,
      duration: course.duration,
      pace: course.pace,
      price: course.price,
      level: course.level,
      features: course.features,
      rating: course.rating,
      studentsEnrolled: course.studentsEnrolled,
      createdAt: course.createdAt,
      videoUrl: course.videoUrl,
      documentPath: course.documentPath,
    };
  };

  const getInstructorInfo = () => {
    if (!course) return null;
    
    return {
      id: course.instructor._id,
      name: course.instructor.fullName,
      email: course.instructor.email,
      role: course.instructor.role,
      joinDate: course.instructor.createdAt,
    };
  };

  const getCurriculum = () => {
    if (!course) return null;
    
    return course.modules.map(module => ({
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
  };

  return {
    course,
    loading,
    error,
    courseInfo: getCourseInfo(),
    instructor: getInstructorInfo(),
    curriculum: getCurriculum(),
  };
};

export default useCourseDetails;