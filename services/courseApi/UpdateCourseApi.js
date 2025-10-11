import { useState } from 'react';
import axios from 'axios';
import { baseURL } from '../baseUrl.jsx';

export const useUpdateCourseStep1 = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateCourseStep1 = async (courseId, courseData, token) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.put(`${baseURL}/courses/${courseId}/update-step-1`, courseData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data.courseId;
    } catch (error) {
      console.error('Error updating course step 1:', error);
      setError(error.response?.data?.message || 'Failed to update course step 1.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateCourseStep1, isLoading, error };
};

export const useUpdateCourseStep2 = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateCourseStep2 = async (courseId, formData, token) => {
    setIsLoading(true);
    setError(null);
    try {
      const payload = new FormData();
      const thumbnail = formData.get('thumbnail');
      const promoVideo = formData.get('promoVideo');
      if (thumbnail) payload.append('thumbnail', thumbnail);
      if (promoVideo) payload.append('promoVideo', promoVideo);

      console.log('Sending FormData with:');
      for (let [key, value] of payload.entries()) {
        console.log(key, value.name, value.size);
      }

      const response = await axios.put(`${baseURL}/courses/${courseId}/update-step-2`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error details:', {
        message: error.message,
        response: error.response?.data,
        request: error.request,
      });
      setError(error.response?.data?.message || 'Failed to update course media.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { updateCourseStep2, isLoading, error };
};

export const useFinalizeCourseCurriculum = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const finalizeCourseCurriculum = async (courseId, curriculumData, token) => {
    setIsLoading(true);
    setError(null);
    try {
      const transformedData = {
        modules: curriculumData.map((module, moduleIndex) => ({
          title: module.title,
          order: moduleIndex + 1,
          topics: module.lessons.map((lesson, lessonIndex) => {
            const baseTopic = {
              title: lesson.title,
              order: lessonIndex + 1,
              type: lesson.type,
              description: lesson.description || '',
            };
            let content = {};
            switch (lesson.type) {
              case 'video':
                content = { videoUrl: lesson.videoLink || '' };
                break;
              case 'pdf':
                content = { fileUrl: '' };
                break;
              case 'quiz':
                content = {
                  questions: lesson.questions || [],
                  passingScore: lesson.passingScore || 80,
                };
                break;
              default:
                content = { textContent: lesson.textContent || '' };
            }
            return { ...baseTopic, content };
          }),
        })),
      };

      const response = await axios.put(`${baseURL}/courses/${courseId}/update-step-3`, transformedData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      return response.data;
    } catch (error) {
      console.error('Error finalizing course curriculum:', error);
      setError(error.response?.data?.message || 'Failed to update course curriculum.');
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return { finalizeCourseCurriculum, isLoading, error };
};