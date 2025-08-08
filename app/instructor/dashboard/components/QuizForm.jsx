"use client"

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useAuth } from '@/contexts/AuthContexts';
import { baseURL } from '@/services/baseUrl';

const QuizForm = ({ initialData, courses }) => {
  const { user } = useAuth();
  const router = useRouter();
  const [quiz, setQuiz] = useState(initialData || {
    title: '',
    description: '',
    course: '',
    duration: 30,
    passingScore: 70,
    isPublished: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setQuiz(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      if (initialData) {
        // Update existing quiz
        await axios.put(`${baseURL}/quizzes/${initialData._id}`, quiz, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
      } else {
        // Create new quiz
        await axios.post(`${baseURL}/quizzes`, quiz, {
          headers: {
            Authorization: `Bearer ${user.token}`
          }
        });
      }
      router.push('/instructor/quizzes');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-300 p-6">
      <h2 className="text-xl font-semibold mb-4">
        {initialData ? 'Edit Quiz' : 'Create New Quiz'}
      </h2>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg mb-4">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={quiz.title}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand focus:border-brand"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            value={quiz.description}
            onChange={handleChange}
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand focus:border-brand"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Course</label>
            <select
              name="course"
              value={quiz.course}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand focus:border-brand"
              required
            >
              <option value="">Select a course</option>
              {courses.map(course => (
                <option key={course._id} value={course._id}>{course.title}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
            <input
              type="number"
              name="duration"
              value={quiz.duration}
              onChange={handleChange}
              min="1"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand focus:border-brand"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Passing Score (%)</label>
            <input
              type="number"
              name="passingScore"
              value={quiz.passingScore}
              onChange={handleChange}
              min="1"
              max="100"
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-brand focus:border-brand"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isPublished"
              name="isPublished"
              checked={quiz.isPublished}
              onChange={handleChange}
              className="h-4 w-4 text-brand focus:ring-brand border-gray-300 rounded"
            />
            <label htmlFor="isPublished" className="ml-2 block text-sm text-gray-700">
              Publish this quiz
            </label>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={() => router.push('/instructor/quizzes')}
            className="mr-3 px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-brand hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
          >
            {isSubmitting ? 'Saving...' : (initialData ? 'Update Quiz' : 'Create Quiz')}
          </button>
        </div>
      </form>
    </div>
  );
};

export default QuizForm;