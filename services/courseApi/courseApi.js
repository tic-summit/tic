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

export const updateCourseStep2 = async (courseId, mediaData, token) => {
  try {
    const response = await axios.post(
      `${baseURL}/courses/${courseId}/step2`,
      mediaData, // Use the FormData directly
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error updating course step 2:', error);
    throw error;
  }
};

// src/services/courseService.js


// export const finalizeCourseCurriculum = async (courseId, curriculumData, token) => {
//   try {
//     // Transform the data to match backend structure
//     const transformedData = {
//       modules: curriculumData.map((module, moduleIndex) => ({
//         title: module.title,
//         order: moduleIndex + 1,
//         topics: module.lessons.map((lesson, lessonIndex) => {
//           const baseTopic = {
//             title: lesson.title,
//             order: lessonIndex + 1,
//             type: lesson.type,
//             description: lesson.description || '',
//           };

//           // Add content based on type
//           let content = {};
//           switch (lesson.type) {
//             case 'video':
//               content = { videoUrl: lesson.videoLink || '' };
//               break;
//             case 'pdf':
//               content = { fileUrl: '' }; // You'll need to handle file uploads separately
//               break;
//             case 'quiz':
//               content = {
//                 questions: lesson.questions || [],
//                 passingScore: lesson.passingScore || 80
//               };
//               break;
//             default:
//               content = { textContent: lesson.textContent || '' };
//           }

//           return {
//             ...baseTopic,
//             content
//           };
//         })
//       }))
//     };

//     const response = await axios.post(
//       `${baseURL}/courses/step3/${courseId}`,
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