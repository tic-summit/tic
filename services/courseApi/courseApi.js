import axios from 'axios';
import api from '../api';
import { baseURL } from '../baseUrl';
import { useAuth } from '@/contexts/AuthContexts';




export const createCourseStep1 = async (courseData, token) => {
  try {
    const response = await axios.post(`${baseURL}/courses/step1`, courseData, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data.courseId;
  } catch (error) {
    console.error('Error creating course step 1:', error);
    throw error;
  }
};

export const updateCourseStep2 = async (courseId, formData, token) => {
  try {
    // Create a new FormData object to ensure contents are preserved
    const payload = new FormData();
    
    // Manually append all files from the original FormData
    const thumbnail = formData.get('thumbnail');
    const promoVideo = formData.get('promoVideo');
    
    if (thumbnail) payload.append('thumbnail', thumbnail);
    if (promoVideo) payload.append('promoVideo', promoVideo);

    console.log('Sending FormData with:');
    for (let [key, value] of payload.entries()) {
      console.log(key, value.name, value.size);
    }

    const response = await axios.post(
      `${baseURL}/courses/step2/${courseId}/`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          // Let axios set Content-Type automatically
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error details:', {
      message: error.message,
      response: error.response?.data,
      request: error.request,
    });
    throw error;
  }
};



export const finalizeCourseCurriculum = async (courseId, curriculumData, token) => {
  try {
    // Transform the data to match backend structure
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

          // Add content based on type
          let content = {};
          switch (lesson.type) {
            case 'video':
              content = { videoUrl: lesson.videoLink || '' };
              break;
            case 'pdf':
              content = { fileUrl: '' }; // You'll need to handle file uploads separately
              break;
            case 'quiz':
              content = {
                questions: lesson.questions || [],
                passingScore: lesson.passingScore || 80
              };
              break;
            default:
              content = { textContent: lesson.textContent || '' };
          }

          return {
            ...baseTopic,
            content
          };
        })
      }))
    };

    const response = await axios.post(
      `${baseURL}/courses/step3/${courseId}`,
      transformedData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error finalizing course curriculum:', error);
    throw error;
  }
};

  // export const finalizeCourseCurriculum = async (courseId, curriculumData, token) => {
  //   try {
  //     // Transform the data to match the new backend structure
    

  //     const response = await axios.post(
  //       `${baseURL}/modules/${courseId}/modules`,
  //       transformedData,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //           'Content-Type': 'application/json',
  //         }
  //       }
  //     );
  //     return response.data;
  //   } catch (error) {
  //     console.error('Error finalizing course curriculum:', error);
  //     throw error;
  //   }
  // };
