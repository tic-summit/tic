import axios from 'axios';
import api from '../api';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { baseURL } from '../baseUrl.jsx';
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

// Get all courses
export const getAllCourses = async () => {
  try {
    const response = await axios.get(`${baseURL}/courses`);
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
    throw error;
  }
};

// Get complete course details with modules, quizzes, and enrolled students
export const getCourseById = async (courseId) => {
  try {
    const response = await axios.get(`${baseURL}/courses/${courseId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching course details:', error);
    throw error;
  }
};

// Update course basic information (Step 1)
export const updateCourseStep1 = async (courseId, courseData, token) => {
  try {
    const response = await axios.put(
      `${baseURL}/courses/${courseId}/update-step-1`,
      courseData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating course step 1:', error);
    throw error;
  }
};

// Update course media (Step 2) - already exists as updateCourseStep2

// Update course modules and content (Step 3)
export const updateCourseStep3 = async (courseId, curriculumData, token) => {
  try {
    const response = await axios.put(
      `${baseURL}/courses/${courseId}/update-step-3`,
      curriculumData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating course step 3:', error);
    throw error;
  }
};

// Delete a course
export const deleteCourse = async (courseId, token) => {
  try {
    const response = await axios.delete(`${baseURL}/courses/${courseId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting course:', error);
    throw error;
  }
};

// Get courses by a specific instructor
export const getCoursesByInstructor = async (instructorId, token) => {
  try {
    const response = await axios.get(
      `${baseURL}/courses/instructors/${instructorId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching instructor courses:', error);
    throw error;
  }
};

// Get enrolled courses for authenticated student
export const getEnrolledCourses = async (studentId, token) => {
  try {
    const response = await axios.get(
      `${baseURL}/courses/enrolled/${studentId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching enrolled courses:', error);
    throw error;
  }
};

// Get all quizzes created by an instructor
export const getInstructorQuizzes = async (instructorId, token) => {
  try {
    const response = await axios.get(
      `${baseURL}/courses/instructors/${instructorId}/quizzes`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching instructor quizzes:', error);
    throw error;
  }
};

// Get all modules created by an instructor
export const getInstructorModules = async (instructorId, token) => {
  try {
    const response = await axios.get(
      `${baseURL}/courses/instructors/${instructorId}/modules`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching instructor modules:', error);
    throw error;
  }
};

// Get modules for a course the student is enrolled in
export const getStudentCourseModules = async (studentId, courseId, token) => {
  try {
    const response = await axios.get(
      `${baseURL}/courses/${studentId}/enrolled/${courseId}/modules`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching student course modules:', error);
    throw error;
  }
};

// Get quizzes for a course the student is enrolled in
export const getStudentCourseQuizzes = async (studentId, courseId, token) => {
  try {
    const response = await axios.get(
      `${baseURL}/courses/${studentId}/enrolled/${courseId}/quizzes`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching student course quizzes:', error);
    throw error;
  }
};
