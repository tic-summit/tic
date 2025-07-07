import React, { useState } from 'react';

export default function CurriculumForm() {
  const [topics, setTopics] = useState([
    {
      id: 1,
      title: "Introduction of Digital Marketing",
      expanded: false,
      lessons: [
        { id: 1, title: "Describe SEO Engine" },
        { id: 2, title: "Know about all marketing" }
      ]
    },
    {
      id: 2,
      title: "Installing Development Software",
      expanded: true,
      lessons: [
        { id: 3, title: "Describe SEO Engine" },
        { id: 4, title: "Know about all marketing" }
      ]
    },
    {
      id: 3,
      title: "Hello World Project from GitHub",
      expanded: false,
      lessons: [
        { id: 5, title: "Describe SEO Engine" },
        { id: 6, title: "Know about all marketing" }
      ]
    }
  ]);

  const toggleTopic = (topicId) => {
    setTopics(topics.map(topic => ({
      ...topic,
      expanded: topic.id === topicId ? !topic.expanded : topic.expanded
    })));
  };

  const addNewTopic = () => {
    const newTopic = {
      id: topics.length + 1,
      title: `New Topic ${topics.length + 1}`,
      expanded: false,
      lessons: []
    };
    setTopics([...topics, newTopic]);
  };

  const addLesson = (topicId) => {
    setTopics(topics.map(topic => {
      if (topic.id === topicId) {
        const newLesson = {
          id: topic.lessons.length + 1,
          title: `New Lesson ${topic.lessons.length + 1}`
        };
        return {
          ...topic,
          lessons: [...topic.lessons, newLesson]
        };
      }
      return topic;
    }));
  };

  const deleteLesson = (topicId, lessonId) => {
    setTopics(topics.map(topic => {
      if (topic.id === topicId) {
        return {
          ...topic,
          lessons: topic.lessons.filter(lesson => lesson.id !== lessonId)
        };
      }
      return topic;
    }));
  };

  return (
    <div className="container mx-auto lg:px-6 py-6">
      {/* Title and Add New Topic Button */}
      <div className="title mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div>
            <h5 className="text-xl font-semibold mb-0">Curriculum</h5>
          </div>
          <div className="md:text-right">
            <button
              onClick={addNewTopic}
              className="btn add-edit-btn inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md  text-white bg-brand hover:bg-brand/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                  clipRule="evenodd"
                />
              </svg>
              Add New Topic
            </button>
          </div>
        </div>
      </div>

      {/* Accordion Topics */}
      <div className="space-y-4">
        {topics.map((topic) => (
          <div key={topic.id} className="accordion-item border border-gray-200 rounded-lg overflow-hidden">
            <h2 className="accordion-header">
              <button
                className={`accordion-button flex items-center justify-between w-full px-4 py-3 text-left font-medium transition-colors ${topic.expanded ? 'bg-gray-50' : 'bg-white'}`}
                onClick={() => toggleTopic(topic.id)}
              >
                <span className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2 text-gray-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  {topic.title}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-5 w-5 transform transition-transform ${topic.expanded ? 'rotate-180' : ''}`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </h2>
            {topic.expanded && (
              <div className="accordion-collapse">
                <div className="accordion-body p-4 bg-gray-50">
                  {topic.lessons.map((lesson) => (
                    <div
                      key={lesson.id}
                      className="flex items-center justify-between bg-white p-3 border rounded-lg mb-3"
                    >
                      <div className="flex items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-green-500 mr-2"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <p className="font-medium text-gray-700 mb-0">{lesson.title}</p>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button className="text-brand hover:text-indigo-800">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => deleteLesson(topic.id, lesson.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                  <div className="flex items-center justify-start">
                    <button
                      onClick={() => addLesson(topic.id)}
                      className="btn btn-primary inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md  text-white bg-brand hover:bg-brand/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Add Lesson
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
}