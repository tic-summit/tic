import { useParams } from 'next/navigation';
import useCourseDetails from '@/app/api/courses/useCourseDetails.js';
import { useAuth } from '@/contexts/AuthContexts';
import React, { useState, useEffect } from 'react';
import { useUpdateCourseStep1 } from '@/services/courseApi/UpdateCourseApi';

export default function EditBasicInformationForm({ onComplete }) {
  const { user } = useAuth();
  const { id: courseId } = useParams();
  const { getCourseInfo, isLoading: courseLoading, data: course } = useCourseDetails(courseId);
  const { updateCourseStep1, isLoading: isSubmitting, error: submitError } = useUpdateCourseStep1();
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    level: '',
    language: '',
    shortDescription: '',
    description: '',
    whatYouLearn: [''],
    requirements: [''],
  });

  // Populate form data with course details
  useEffect(() => {
    if (course && !courseLoading) {
      setFormData({
        title: course.title || '',
        category: course.category || '',
        level: course.level || '',
        language: course.language || '',
        shortDescription: course.shortDescription || '',
        description: course.description || '',
        whatYouLearn: course.features?.length > 0 ? course.features : [''],
        requirements: course.requirements?.length > 0 ? course.requirements : [''],
      });
    }
  }, [course, courseLoading]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Learning Items Functions
  const removeLearningItem = (index) => {
    const newItems = [...formData.whatYouLearn];
    newItems.splice(index, 1);
    setFormData({
      ...formData,
      whatYouLearn: newItems,
    });
  };

  const handleLearningItemChange = (index, value) => {
    const newItems = [...formData.whatYouLearn];
    newItems[index] = value;
    setFormData({
      ...formData,
      whatYouLearn: newItems,
    });
  };

  // Requirements Functions
  const addRequirementItem = () => {
    setFormData({
      ...formData,
      requirements: [...formData.requirements, ''],
    });
  };

  const removeRequirementItem = (index) => {
    const newItems = [...formData.requirements];
    newItems.splice(index, 1);
    setFormData({
      ...formData,
      requirements: newItems,
    });
  };

  const handleRequirementItemChange = (index, value) => {
    const newItems = [...formData.requirements];
    newItems[index] = value;
    setFormData({
      ...formData,
      requirements: newItems,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        title: formData.title,
        category: formData.category,
        level: formData.level,
        language: formData.language,
        shortDescription: formData.shortDescription,
        description: formData.description,
        whatYouLearn: formData.whatYouLearn.filter(item => item.trim() !== '').join('|'),
        requirements: formData.requirements.filter(item => item.trim() !== '').join('|'),
      };

      await updateCourseStep1(courseId, payload, user.token);
      if (onComplete) onComplete();
    } catch (err) {
      // Error is handled by the hook
    }
  };

  if (courseLoading) {
    return (
      <div className="container mx-auto lg:px-6 py-6">
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-brand"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto lg:px-6 py-6">
      <div className="title mb-6">
        <h5 className="text-xl font-semibold">Update Basic Information</h5>
      </div>

      {submitError && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {submitError}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          {/* Course Title */}
          <div className="md:col-span-12">
            <div className="input-block mb-4">
              <label className="form-label block text-sm font-medium text-gray-700 mb-1">
                Course Title<span className="text-danger ms-1 text-red-500">*</span>
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                className="form-control w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand focus:border-brand"
                required
              />
            </div>
          </div>

          {/* Course Category */}
          <div className="md:col-span-4">
            <div className="input-block mb-4">
              <label className="form-label block text-sm font-medium text-gray-700 mb-1">
                Course Category<span className="text-danger ms-1 text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="form-control w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand focus:border-brand"
                required
              >
                <option value="">Select</option>
                <option value="Management">Management</option>
                <option value="IT & Softwares">IT & Softwares</option>
                <option value="Marketing">Marketing</option>
                <option value="Finance">Finance</option>
                <option value="Productivity">Productivity</option>
              </select>
            </div>
          </div>

          {/* Course Level */}
          <div className="md:col-span-4">
            <div className="input-block mb-4">
              <label className="form-label block text-sm font-medium text-gray-700 mb-1">
                Course Level<span className="text-danger ms-1 text-red-500">*</span>
              </label>
              <select
                name="level"
                value={formData.level}
                onChange={handleInputChange}
                className="form-control w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand focus:border-brand"
                required
              >
                <option value="">Select</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="Expert">Expert</option>
              </select>
            </div>
          </div>

          {/* Language */}
          <div className="md:col-span-4">
            <div className="input-block mb-4">
              <label className="form-label block text-sm font-medium text-gray-700 mb-1">
                Language
              </label>
              <select
                name="language"
                value={formData.language}
                onChange={handleInputChange}
                className="form-control w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand focus:border-brand"
              >
                <option value="">Select</option>
                <option value="French">French</option>
                <option value="German">German</option>
                <option value="Arabic">Arabic</option>
                <option value="English">English</option>
              </select>
            </div>
          </div>

          {/* Short Description */}
          <div className="md:col-span-12">
            <div className="input-block mb-4">
              <label className="form-label block text-sm font-medium text-gray-700 mb-1">
                Short Description<span className="text-danger ms-1 text-red-500">*</span>
              </label>
              <input
                type="text"
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleInputChange}
                className="form-control w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand focus:border-brand"
                required
              />
            </div>
          </div>

          {/* Course Description */}
          <div className="md:col-span-12">
            <div className="input-block mb-4">
              <label className="form-label block text-sm font-medium text-gray-700 mb-1">
                Course Description<span className="text-danger ms-1 text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="form-control w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand focus:border-brand min-h-[160px]"
                placeholder="Enter detailed course description..."
                required
              ></textarea>
            </div>
          </div>

          {/* What students will learn */}
          <div className="md:col-span-6">
            <div className="bg-light border p-4 rounded-lg mb-4">
              <h6 className="font-medium mb-2">What will students learn in your course?<span className="text-danger ms-1 text-red-500">*</span></h6>
              <div className="input-block space-y-2">
                {formData.whatYouLearn.map((item, index) => (
                  <div key={index} className="d-flex align-items-center add-new-input flex items-center gap-2">
                    <input
                      type="text"
                      className="form-control flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand focus:border-brand"
                      value={item}
                      onChange={(e) => handleLearningItemChange(index, e.target.value)}
                      required={index === 0}
                    />
                    {formData.whatYouLearn.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeLearningItem(index)}
                        className="link-trash text-red-500 hover:text-red-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Requirements */}
          <div className="md:col-span-6">
            <div className="bg-light border p-4 rounded-lg mb-4">
              <h6 className="font-medium mb-2">Requirements</h6>
              <div className="input-block space-y-2">
                {formData.requirements.map((item, index) => (
                  <div key={index} className="d-flex align-items-center add-new-input flex items-center gap-2">
                    <input
                      type="text"
                      className="form-control flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-brand focus:border-brand"
                      value={item}
                      onChange={(e) => handleRequirementItemChange(index, e.target.value)}
                    />
                    {formData.requirements.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeRequirementItem(index)}
                        className="link-trash text-red-500 hover:text-red-700"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                      </button>
                    )}
                  </div>
                ))}
              </div>
              <div className="d-flex align-items-center justify-content-end flex items-center justify-end">
                <button
                  type="button"
                  onClick={addRequirementItem}
                  className="d-flex align-items-center add-new-topic-btn flex items-center text-brand hover:text-indigo-800 text-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                  Add New Item
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-end w-full">
          <button
            type="submit"
            className="px-6 py-2 bg-brand text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Saving...' : 'Update & Continue'}
          </button>
        </div>
      </form>
    </div>
  );
}