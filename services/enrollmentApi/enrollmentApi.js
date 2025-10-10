import axios from 'axios';
import { baseURL } from '../baseUrl.jsx';

/**
 * Enroll a student in a course
 * @param {string} courseId - The ID of the course to enroll in
 * @param {string} token - Authentication token
 * @returns {Promise<EnrollmentResponse>} Enrollment response with student and course details
 */
export const enrollInCourse = async (courseId, token) => {
  try {
    const response = await axios.post(
      `${baseURL}/enrollments/${courseId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error enrolling in course:', error);
    throw error;
  }
};

/**
 * Get enrollments for courses created by the instructor
 * @param {string} token - Authentication token
 * @returns {Promise<EnrollmentsListResponse>} List of enrollments with statistics
 */
export const getInstructorEnrollments = async (token) => {
  try {
    const response = await axios.get(
      `${baseURL}/enrollments/my-courses/enrollments`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching instructor enrollments:', error);
    throw error;
  }
};

/**
 * Instructor manually enrolls a selected student in a course
 * @param {ManualEnrollmentRequest} enrollmentData - Student and course IDs
 * @param {string} token - Authentication token
 * @returns {Promise<EnrollmentResponse>} Enrollment response with student and course details
 */
export const manualEnrollStudent = async (
  enrollmentData, 
  token
) => {
  try {
    const response = await axios.post(
      `${baseURL}/enrollments/manual`,
      enrollmentData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error manually enrolling student:', error);
    throw error;
  }
};

/**
 * Get student's enrolled courses
 * @param {string} token - Authentication token
 * @returns {Promise<Enrollment[]>} List of student's enrollments
 */
export const getStudentEnrollments = async (token) => {
  try {
    const response = await axios.get(
      `${baseURL}/enrollments/student`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching student enrollments:', error);
    throw error;
  }
};

/**
 * Check if student is enrolled in a specific course
 * @param {string} courseId - The ID of the course to check
 * @param {string} token - Authentication token
 * @returns {Promise<boolean>} Whether the student is enrolled
 */
export const checkEnrollmentStatus = async (courseId, token) => {
  try {
    const response = await axios.get(
      `${baseURL}/enrollments/check/${courseId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      }
    );
    return response.data.isEnrolled;
  } catch (error) {
    console.error('Error checking enrollment status:', error);
    return false;
  }
};

/**
 * Update progress for a user in a course
 * @param {string} courseId - The ID of the course
 * @param {Object} progressData - Progress data to update
 * @param {string} token - Authentication token
 * @returns {Promise<Object>} Updated progress response
 */
export const updateCourseProgress = async (courseId, progressData, token) => {
  try {
    const response = await axios.post(
      `${baseURL}/progress/${courseId}/progress`,
      progressData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error updating course progress:', error);
    throw error;
  }
};