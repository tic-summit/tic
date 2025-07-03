import React, { useState } from 'react';
import { ChevronDown, Play, Edit, X, Plus } from 'lucide-react';

export default function CurriculumComponent() {
  const [activeAccordion, setActiveAccordion] = useState('collapse-1');
  const [showAddLectureModal, setShowAddLectureModal] = useState(false);
  const [showAddTopicModal, setShowAddTopicModal] = useState(false);

  const toggleAccordion = (id) => {
    setActiveAccordion(activeAccordion === id ? '' : id);
  };

  const lectures = [
    {
      id: 'collapse-1',
      title: 'Introduction of Digital Marketing',
      topics: [
        { id: 1, title: 'Introduction' },
        { id: 2, title: 'What is Digital Marketing' }
      ]
    },
    {
      id: 'collapse-2',
      title: 'Customer Life cycle',
      topics: []
    },
    {
      id: 'collapse-3',
      title: 'How much should I offer the sellers?',
      topics: []
    }
  ];

  return (
    <div className="w-full">
      {/* Title */}
      <h4 className="text-xl font-semibold mb-4">Curriculum</h4>

      <hr className="border-gray-300 mb-6" />

      <div className="w-full">
        {/* Add lecture Modal button */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-3">
          <h5 className="text-lg font-medium mb-2 sm:mb-0">Upload Lecture</h5>
          <button 
            onClick={() => setShowAddLectureModal(true)}
            className="inline-flex items-center px-3 py-2 bg-blue-100 text-blue-700 text-sm font-medium rounded-md hover:bg-blue-200 transition-colors"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Lecture
          </button>
        </div>

        {/* Edit lecture START */}
        <div className="space-y-3">
          {lectures.map((lecture) => (
            <div key={lecture.id} className="bg-gray-50 border border-gray-200 rounded-lg mb-3">
              {/* Accordion Header */}
              <div className="border-b border-gray-200">
                <button
                  onClick={() => toggleAccordion(lecture.id)}
                  className="w-full flex items-center justify-between p-4 text-left font-semibold text-gray-900 hover:bg-gray-100 rounded-t-lg transition-colors"
                  type="button"
                >
                  <span>{lecture.title}</span>
                  <ChevronDown 
                    className={`w-5 h-5 transition-transform ${
                      activeAccordion === lecture.id ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>

              {/* Accordion Content */}
              {activeAccordion === lecture.id && (
                <div className="p-4">
                  {lecture.topics.length > 0 ? (
                    <div className="space-y-3">
                      {lecture.topics.map((topic, index) => (
                        <div key={topic.id}>
                          {/* Video item */}
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <button className="inline-flex items-center justify-center w-8 h-8 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors">
                                <Play className="w-4 h-4 ml-0.5" />
                              </button>
                              <span className="ml-2 text-base font-light text-gray-900">{topic.title}</span>
                            </div>
                            {/* Edit and cancel button */}
                            <div className="flex space-x-1">
                              <button className="inline-flex items-center justify-center w-8 h-8 bg-green-100 text-green-600 rounded-full hover:bg-green-200 transition-colors">
                                <Edit className="w-4 h-4" />
                              </button>
                              <button className="inline-flex items-center justify-center w-8 h-8 bg-red-100 text-red-600 rounded-full hover:bg-red-200 transition-colors">
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                          {/* Divider */}
                          {index < lecture.topics.length - 1 && (
                            <hr className="border-gray-200 my-3" />
                          )}
                        </div>
                      ))}
                      {/* Add topic button after topics */}
                      <div className="pt-3 border-t border-gray-200">
                        <button 
                          onClick={() => setShowAddTopicModal(true)}
                          className="inline-flex items-center px-3 py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors"
                        >
                          <Plus className="w-4 h-4 mr-2" />
                          Add topic
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Add topic button when no topics */
                    <button 
                      onClick={() => setShowAddTopicModal(true)}
                      className="inline-flex items-center px-3 py-2 bg-gray-900 text-white text-sm font-medium rounded-md hover:bg-gray-800 transition-colors"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add topic
                    </button>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
        {/* Edit lecture END */}

     
      </div>

      {/* Add Lecture Modal */}
      {showAddLectureModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add New Lecture</h3>
              <button 
                onClick={() => setShowAddLectureModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lecture Title</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter lecture title"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <button 
                  onClick={() => setShowAddLectureModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setShowAddLectureModal(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add Lecture
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Add Topic Modal */}
      {showAddTopicModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Add New Topic</h3>
              <button 
                onClick={() => setShowAddTopicModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Topic Title</label>
                <input 
                  type="text" 
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter topic title"
                />
              </div>
              <div className="flex justify-end space-x-2 pt-4">
                <button 
                  onClick={() => setShowAddTopicModal(false)}
                  className="px-4 py-2 text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => setShowAddTopicModal(false)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                >
                  Add Topic
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}