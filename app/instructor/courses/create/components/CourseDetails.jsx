import React, { useState } from 'react';

export default function BasicInformationForm() {
  const [learningItems, setLearningItems] = useState(["Become a UX designer"]);
  const [requirementItems, setRequirementItems] = useState([""]);
  const [isFeatured, setIsFeatured] = useState(true);

  const addLearningItem = () => {
    setLearningItems([...learningItems, ""]);
  };

  const removeLearningItem = (index) => {
    const newItems = [...learningItems];
    newItems.splice(index, 1);
    setLearningItems(newItems);
  };

  const addRequirementItem = () => {
    setRequirementItems([...requirementItems, ""]);
  };

  const removeRequirementItem = (index) => {
    const newItems = [...requirementItems];
    newItems.splice(index, 1);
    setRequirementItems(newItems);
  };

  return (
    <div className="container mx-auto lg:px-6 py-6">
      <div className="title mb-6">
        <h5 className="text-xl font-semibold">Basic Information</h5>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* Course Title */}
        <div className="md:col-span-12">
          <div className="input-block mb-4">
            <label className="form-label block text-sm font-medium text-gray-700 mb-1">
              Course Title<span className="text-danger ms-1 text-red-500">*</span>
            </label>
            <input type="text" className="form-control w-full px-3 py-2 border border-gray-300 rounded-md  focus:outline-none focus:ring-brand focus:border-brand" />
          </div>
        </div>

        {/* Course Category */}
        <div className="md:col-span-4">
          <div className="input-block mb-4">
            <label className="form-label block text-sm font-medium text-gray-700 mb-1">
              Course Category<span className="text-danger ms-1 text-red-500">*</span>
            </label>
            <select className="form-control w-full px-3 py-2 border border-gray-300 rounded-md  focus:outline-none focus:ring-brand focus:border-brand">
              <option>Select</option>
              <option>Management</option>
              <option>IT & Softwares</option>
              <option>Marketing</option>
              <option>Finance</option>
              <option>Productivity</option>
            </select>
          </div>
        </div>

        {/* Course Level */}
        <div className="md:col-span-4">
          <div className="input-block mb-4">
            <label className="form-label block text-sm font-medium text-gray-700 mb-1">
              Course Level<span className="text-danger ms-1 text-red-500">*</span>
            </label>
            <select className="form-control w-full px-3 py-2 border border-gray-300 rounded-md  focus:outline-none focus:ring-brand focus:border-brand">
              <option>Select</option>
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
              <option>Expert</option>
            </select>
          </div>
        </div>

        {/* Language */}
        <div className="md:col-span-4">
          <div className="input-block mb-4">
            <label className="form-label block text-sm font-medium text-gray-700 mb-1">
              Language<span className="text-danger ms-1 text-red-500">*</span>
            </label>
            <select className="form-control w-full px-3 py-2 border border-gray-300 rounded-md  focus:outline-none focus:ring-brand focus:border-brand">
              <option>Select</option>
              <option>French</option>
              <option>German</option>
              <option>Arabic</option>
            </select>
          </div>
        </div>

        {/* Max Students */}
        <div className="md:col-span-6">
          <div className="input-block mb-4">
            <label className="form-label block text-sm font-medium text-gray-700 mb-1">
              Max Number of Students<span className="text-danger ms-1 text-red-500">*</span>
            </label>
            <input type="text" className="form-control w-full px-3 py-2 border border-gray-300 rounded-md  focus:outline-none focus:ring-brand focus:border-brand student-count" />
          </div>
        </div>

        {/* Public/Private */}
        <div className="md:col-span-6">
          <div className="input-block mb-4">
            <label className="form-label block text-sm font-medium text-gray-700 mb-1">
              Public / Private Course<span className="text-danger ms-1 text-red-500">*</span>
            </label>
            <select className="form-control w-full px-3 py-2 border border-gray-300 rounded-md  focus:outline-none focus:ring-brand focus:border-brand">
              <option>Select</option>
              <option>Private</option>
              <option>Public</option>
            </select>
          </div>
        </div>

        {/* Short Description */}
        <div className="md:col-span-12">
          <div className="input-block mb-4">
            <label className="form-label block text-sm font-medium text-gray-700 mb-1">
              Short Description<span className="text-danger ms-1 text-red-500">*</span>
            </label>
            <input type="text" className="form-control w-full px-3 py-2 border border-gray-300 rounded-md  focus:outline-none focus:ring-brand focus:border-brand" />
          </div>
        </div>

        {/* Course Description */}
        <div className="md:col-span-12">
          <div className="input-block mb-4">
            <label className="form-label block text-sm font-medium text-gray-700 mb-1">
              Course Description<span className="text-danger ms-1 text-red-500">*</span>
            </label>
            <textarea 
              className="form-control w-full px-3 py-2 border border-gray-300 rounded-md  focus:outline-none focus:ring-brand focus:border-brand min-h-[160px]" 
              placeholder="Enter detailed course description..."
            ></textarea>
          </div>
        </div>

        {/* What students will learn */}
        <div className="md:col-span-6">
          <div className="bg-light border p-4 rounded-lg mb-4">
            <h6 className="font-medium mb-2">What will students learn in your course?</h6>
            <div className="input-block space-y-2">
              {learningItems.map((item, index) => (
                <div key={index} className="d-flex align-items-center add-new-input flex items-center gap-2">
                  <input 
                    type="text" 
                    className="form-control flex-1 px-3 py-2 border border-gray-300 rounded-md  focus:outline-none focus:ring-brand focus:border-brand" 
                    value={item}
                    onChange={(e) => {
                      const newItems = [...learningItems];
                      newItems[index] = e.target.value;
                      setLearningItems(newItems);
                    }}
                  />
                  <button 
                    onClick={() => removeLearningItem(index)}
                    className="link-trash text-red-500 hover:text-red-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            <div className="d-flex align-items-center justify-content-end flex items-center justify-end">
              <button 
                onClick={addLearningItem}
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

        {/* Requirements */}
        <div className="md:col-span-6">
          <div className="bg-light border p-4 rounded-lg mb-4">
            <h6 className="font-medium mb-2">Requirements</h6>
            <div className="input-block space-y-2">
              {requirementItems.map((item, index) => (
                <div key={index} className="d-flex align-items-center add-new-input flex items-center gap-2">
                  <input 
                    type="text" 
                    className="form-control flex-1 px-3 py-2 border border-gray-300 rounded-md  focus:outline-none focus:ring-brand focus:border-brand" 
                    value={item}
                    onChange={(e) => {
                      const newItems = [...requirementItems];
                      newItems[index] = e.target.value;
                      setRequirementItems(newItems);
                    }}
                  />
                  <button 
                    onClick={() => removeRequirementItem(index)}
                    className="link-trash text-red-500 hover:text-red-700"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            <div className="d-flex align-items-center justify-content-end flex items-center justify-end">
              <button 
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

        {/* Featured Course Toggle */}
        <div className="md:col-span-6">
          <div className="form-check form-switch flex items-center mb-4">
            <input 
              className="form-check-input h-5 w-10 rounded-full checked:bg-green-500 focus:outline-none transition duration-200 mr-2" 
              type="checkbox" 
              id="checkFeature" 
              checked={isFeatured}
              onChange={() => setIsFeatured(!isFeatured)}
            />
            <label className="form-check-label text-sm font-medium text-gray-700" htmlFor="checkFeature">
              Check this for featured course
            </label>
          </div>
        </div>
      </div>

      
    </div>
  );
}