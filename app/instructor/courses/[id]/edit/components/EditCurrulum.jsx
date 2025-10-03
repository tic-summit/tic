import useCourseDetails from '@/app/api/courses/useCourseDetails.js';
import { useAuth } from '@/contexts/AuthContexts';
import { useFinalizeCourseCurriculum } from '@/services/courseApi/UpdateCourseApi';
import { useParams, useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

export default function EditCurriculumForm({ onComplete }) {
  const { user } = useAuth();
  const { id: courseId } = useParams();
  const { getCurriculum, isLoading: courseLoading } = useCourseDetails(courseId);
  const { finalizeCourseCurriculum, isLoading: isSubmitting, error: submitError } = useFinalizeCourseCurriculum();
  const [topics, setTopics] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showTopicModal, setShowTopicModal] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);
  const [editingTopic, setEditingTopic] = useState(null);
  const [currentTopicId, setCurrentTopicId] = useState(null);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [topicName, setTopicName] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    videoLink: '',
    videoFile: null,
    pdfFile: null,
    quizFile: null,
    lessonType: 'video',
    isPremium: false,
  });

  // Populate topics from useCourseDetails
  useEffect(() => {
    if (getCurriculum && !courseLoading) {
      const mappedTopics = getCurriculum.map(module => ({
        id: module.id,
        title: module.title,
        expanded: false,
        lessons: [
          ...module.resources.videoUrl ? [{
            id: Date.now() + Math.random(),
            title: module.title,
            description: '',
            videoLink: module.resources.videoUrl,
            type: 'video',
            isPremium: false,
          }] : [],
          ...module.resources.pdfUrl ? [{
            id: Date.now() + Math.random(),
            title: module.title,
            description: '',
            videoLink: module.resources.pdfUrl,
            type: 'pdf',
            isPremium: false,
          }] : [],
          ...module.quizzes.map(quiz => ({
            id: quiz.id,
            title: quiz.title,
            description: '',
            type: 'quiz',
            isPremium: false,
            questions: quiz.questions,
            questionCount: quiz.questionCount,
          })),
        ],
      }));
      setTopics(mappedTopics);
    }
  }, [getCurriculum, courseLoading]);

  const toggleTopic = (topicId) => {
    setTopics(topics.map(topic => ({
      ...topic,
      expanded: topic.id === topicId ? !topic.expanded : topic.expanded,
    })));
  };

  const handleFinalizeCurriculum = async () => {
    try {
      if (topics.length === 0 || topics.every(t => t.lessons.length === 0)) {
        setError('Please add at least one topic with lessons before finalizing');
        toast.error('Please add at least one topic with lessons before finalizing');
        return;
      }

      const curriculumWithQuizData = topics.map(topic => ({
        ...topic,
        lessons: topic.lessons.map(lesson => {
          if (lesson.type === 'quiz' && !lesson.questions) {
            return {
              ...lesson,
              questions: [],
              passingScore: 80,
            };
          }
          return lesson;
        }),
      }));

      await finalizeCourseCurriculum(courseId, curriculumWithQuizData, user.token);
      toast.success('Curriculum updated successfully!');
      onComplete();
      router.push('/instructor/dashboard    ');
    } catch (error) {
      setError(submitError || 'Failed to finalize curriculum');
      toast.error(submitError || 'Failed to finalize curriculum');
    }
  };

  const openTopicModal = (topic = null) => {
    setEditingTopic(topic);
    setTopicName(topic ? topic.title : '');
    setShowTopicModal(true);
  };

  const handleTopicSubmit = () => {
    if (!topicName.trim()) {
      setError('Topic name is required');
      toast.error('Topic name is required');
      return;
    }

    if (editingTopic) {
      setTopics(topics.map(topic =>
        topic.id === editingTopic.id
          ? { ...topic, title: topicName.trim() }
          : topic
      ));
      toast.success('Topic updated successfully!');
    } else {
      const newTopic = {
        id: Date.now(),
        title: topicName.trim(),
        expanded: false,
        lessons: [],
      };
      setTopics([...topics, newTopic]);
      toast.success('Topic added successfully!');
    }

    setShowTopicModal(false);
    setEditingTopic(null);
    setTopicName('');
    setError(null);
  };

  const deleteTopic = (topicId) => {
    setTopics(topics.filter(topic => topic.id !== topicId));
    toast.success('Topic deleted successfully!');
  };

  const openLessonModal = (topicId, lesson = null) => {
    setCurrentTopicId(topicId);
    setEditingLesson(lesson);
    if (lesson) {
      setFormData({
        title: lesson.title,
        description: lesson.description || '',
        videoLink: lesson.videoLink || '',
        videoFile: null,
        pdfFile: null,
        quizFile: null,
        lessonType: lesson.type || 'video',
        isPremium: lesson.isPremium || false,
      });
    } else {
      setFormData({
        title: '',
        description: '',
        videoLink: '',
        videoFile: null,
        pdfFile: null,
        quizFile: null,
        lessonType: 'video',
        isPremium: false,
      });
    }
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' || type === 'radio' ? (name === 'isPremium' ? checked : value) : value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files[0],
    }));
  };

  const handleSubmit = (e) => {
    if (e) e.preventDefault();

    if (!formData.title.trim()) {
      setError('Lesson title is required');
      toast.error('Lesson title is required');
      return;
    }

    if (editingLesson) {
      setTopics(topics.map(topic => {
        if (topic.id === currentTopicId) {
          return {
            ...topic,
            lessons: topic.lessons.map(lesson =>
              lesson.id === editingLesson.id
                ? { ...lesson, ...formData, type: formData.lessonType }
                : lesson
            ),
          };
        }
        return topic;
      }));
      toast.success('Lesson updated successfully!');
    } else {
      setTopics(topics.map(topic => {
        if (topic.id === currentTopicId) {
          const newLesson = {
            id: Date.now(),
            title: formData.title,
            description: formData.description,
            videoLink: formData.videoLink,
            type: formData.lessonType,
            isPremium: formData.isPremium,
          };
          return {
            ...topic,
            lessons: [...topic.lessons, newLesson],
          };
        }
        return topic;
      }));
      toast.success('Lesson added successfully!');
    }

    setShowModal(false);
    setEditingLesson(null);
    setCurrentTopicId(null);
    setError(null);
  };

  const deleteLesson = (topicId, lessonId) => {
    setTopics(topics.map(topic => {
      if (topic.id === topicId) {
        return {
          ...topic,
          lessons: topic.lessons.filter(lesson => lesson.id !== lessonId),
        };
      }
      return topic;
    }));
    toast.success('Lesson deleted successfully!');
  };

  const getIconForLessonType = (type) => {
    switch (type) {
      case 'video':
        return (
          <svg className="h-6 w-6 text-brand" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
          </svg>
        );
      case 'pdf':
        return (
          <svg className="h-6 w-6 text-red-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
          </svg>
        );
      case 'quiz':
        return (
          <svg className="h-6 w-6 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
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
      {/* Title and Add New Topic Button */}
      <div className="title mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div>
            <h5 className="text-xl font-semibold mb-0">Update Curriculum</h5>
          </div>
          <div className="md:text-right">
            <button
              onClick={() => openTopicModal()}
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-brand hover:bg-brand focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
            >
              <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
              Add New Topic
            </button>
          </div>
        </div>
      </div>

      {/* Error Message */}
      {(submitError || error) && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {submitError || error}
        </div>
      )}

      {/* Accordion Topics */}
      <div className="space-y-4">
        {topics.length > 0 ? (
          topics.map((topic) => (
            <div key={topic.id} className="border border-gray-200 rounded-lg overflow-hidden">
              <h2>
                <button
                  className={`flex items-center justify-between w-full px-4 py-3 text-left font-medium transition-colors ${topic.expanded ? 'bg-gray-50' : 'bg-white'}`}
                  onClick={() => toggleTopic(topic.id)}
                >
                  <span className="flex items-center">
                    <svg className="h-5 w-5 mr-2 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
                    {topic.title}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        openTopicModal(topic);
                      }}
                      className="text-blue-600 hover:text-blue-800 p-1 cursor-pointer"
                      title="Edit Topic"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                      </svg>
                    </span>
                    <span
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteTopic(topic.id);
                      }}
                      className="text-red-600 hover:text-red-800 p-1 cursor-pointer"
                      title="Delete Topic"
                    >
                      <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <svg
                      className={`h-5 w-5 transform transition-transform ${topic.expanded ? 'rotate-180' : ''}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </div>
                </button>
              </h2>
              {topic.expanded && (
                <div className="p-4 bg-gray-50">
                  {topic.lessons.length > 0 ? (
                    topic.lessons.map((lesson) => (
                      <div key={lesson.id} className="flex items-center justify-between bg-white p-3 border rounded-lg mb-3">
                        <div className="flex items-center">
                          {getIconForLessonType(lesson.type)}
                          <div className="ml-3">
                            <p className="font-medium text-gray-700 mb-0">{lesson.title}</p>
                            <div className="flex items-center mt-1">
                              <span className={`text-xs px-2 py-1 rounded-full ${lesson.isPremium ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'}`}>
                                {lesson.isPremium ? 'Premium' : 'Free'}
                              </span>
                              <span className="text-xs text-gray-500 ml-2 capitalize">{lesson.type}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => openLessonModal(topic.id, lesson)}
                            className="text-brand hover:text-brand/90"
                          >
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => deleteLesson(topic.id, lesson.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">No lessons added yet</p>
                  )}
                  <div className="flex items-center justify-end">
                    <button
                      onClick={() => openLessonModal(topic.id)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-brand hover:bg-brand focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
                    >
                      <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                      </svg>
                      Add Lesson
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center py-10">
            <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No topics</h3>
            <p className="mt-1 text-sm text-gray-500">Get started by adding your first topic.</p>
            <div className="mt-6">
              <button
                onClick={() => openTopicModal()}
                className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-brand hover:bg-brand focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
              >
                <svg className="-ml-1 mr-2 h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
                </svg>
                Add Topic
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 flex justify-end">
        <button
          onClick={handleFinalizeCurriculum}
          className="px-6 py-3 bg-brand hover:bg-brand text-white rounded-md"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="flex items-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Updating Course...
            </span>
          ) : (
            'Update'
          )}
        </button>
      </div>

      {/* Topic Modal */}
      {showTopicModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md mx-4">
            <div className="flex items-center justify-between p-4 border-b">
              <h5 className="text-lg font-semibold">
                {editingTopic ? 'Edit Topic' : 'Add New Topic'}
              </h5>
              <button
                onClick={() => setShowTopicModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Topic Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={topicName}
                  onChange={(e) => setTopicName(e.target.value)}
                  placeholder="Enter topic name..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand"
                  autoFocus
                />
              </div>

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={() => setShowTopicModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleTopicSubmit}
                  disabled={!topicName.trim()}
                  className="px-4 py-2 bg-brand text-white rounded-md hover:bg-brand focus:outline-none focus:ring-2 focus:ring-brand disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {editingTopic ? 'Update Topic' : 'Add Topic'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Lesson Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h5 className="text-lg font-semibold">
                {editingLesson ? 'Edit Lesson' : 'New Lesson'}
              </h5>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>

            <div className="p-6">
              <div className="space-y-4">
                {/* Lesson Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Lesson Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand"
                    required
                  />
                </div>

                {/* Lesson Type */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Lesson Type</label>
                  <select
                    name="lessonType"
                    value={formData.lessonType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand"
                  >
                    <option value="video">Video</option>
                    <option value="pdf">PDF Document</option>
                    <option value="quiz">Quiz</option>
                  </select>
                </div>

                {/* Video Section */}
                {formData.lessonType === 'video' && (
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Video Link</label>
                      <input
                        type="url"
                        name="videoLink"
                        value={formData.videoLink}
                        onChange={handleInputChange}
                        placeholder="https://youtube.com/watch?v=..."
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand"
                      />
                    </div>
                    <div className="text-center text-gray-500">OR</div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Upload Video File</label>
                      <input
                        type="file"
                        name="videoFile"
                        accept="video/*"
                        onChange={handleFileChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand"
                      />
                    </div>
                  </div>
                )}

                {/* PDF Section */}
                {formData.lessonType === 'pdf' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Upload PDF Document <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      name="pdfFile"
                      accept=".pdf"
                      onChange={handleFileChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand"
                      required={formData.lessonType === 'pdf'}
                    />
                  </div>
                )}

                {/* Quiz Section */}
                {formData.lessonType === 'quiz' && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Upload Quiz File <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="file"
                      name="quizFile"
                      accept=".json,.xlsx,.csv"
                      onChange={handleFileChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand"
                      required={formData.lessonType === 'quiz'}
                    />
                    <p className="text-sm text-gray-500 mt-1">
                      Supported formats: JSON, Excel (.xlsx), CSV
                    </p>
                  </div>
                )}

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brand"
                    placeholder="Enter lesson description..."
                  />
                </div>

                {/* Premium/Free */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Access Type</label>
                  <div className="flex items-center space-x-6">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="isPremium"
                        value={false}
                        checked={!formData.isPremium}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      Free
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="isPremium"
                        value={true}
                        checked={formData.isPremium}
                        onChange={handleInputChange}
                        className="mr-2"
                      />
                      Premium
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-4 py-2 bg-brand text-white rounded-md hover:bg-brand focus:outline-none focus:ring-2 focus:ring-brand"
                >
                  {editingLesson ? 'Update Lesson' : 'Add Lesson'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}