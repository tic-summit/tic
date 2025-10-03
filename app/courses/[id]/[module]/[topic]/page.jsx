"use client";
import { Button } from '@/components/ui/button';
import { ArrowLeft, PlayCircleIcon } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import CourseMenu from '../components/CourseMenu';
import useCourseDetails from '@/app/api/courses/useCourseDetails.js';
import ProtectedRoute from '@/components/ProtectedRoute';
import { useUpdateProgress } from '@/app/api/courses/useCourseProgress';
import { useUpdateCourseProgress } from '@/app/api/courses/useCourseProgressTracking';
import { useAuth } from '@/contexts/AuthContexts';
import QuizViewer from '@/components/quiz/QuizViewer';

export default function Page() {
  const router = useRouter();
  const { courseId, module: moduleId, topic: topicId } = useParams();
  const { user } = useAuth();
  const [contentView, setContentView] = useState('main'); // 'main', 'quiz', 'text'
  const { course, curriculum, loading, error } = useCourseDetails(courseId);
  const updateProgress = useUpdateProgress();
  const updateCourseProgress = useUpdateCourseProgress();

  // Find the current module and topic
  const currentModule = curriculum?.find(m => m._id === moduleId);
  const currentTopic = currentModule?.topics?.find(t => t._id === topicId);

  // Get next and previous topics for navigation
  const allTopics = curriculum?.flatMap(m => m.topics?.map(t => ({ ...t, moduleId: m._id })) || []);
  const currentIndex = allTopics?.findIndex(t => t._id === topicId);
  const nextTopic = currentIndex !== -1 && allTopics?.[currentIndex + 1];
  const prevTopic = currentIndex !== -1 && allTopics?.[currentIndex - 1];

  // Track progress when user accesses a topic
  useEffect(() => {
    if (currentTopic && user?.userType === 'student') {
      // Update progress when user views a topic
      updateProgress.mutate({
        courseId,
        moduleId,
        topicId
      });

      // Track last accessed topic for continue course functionality
      updateCourseProgress.mutate({
        courseId,
        topicId,
        moduleId: currentModule?.title || moduleId,
        isCompleted: false // This will be updated when they complete the topic
      });
    }
  }, [currentTopic, courseId, moduleId, topicId, user?.userType, updateProgress, updateCourseProgress, currentModule]);

  if (loading) return (
    <div className="flex items-center justify-center h-[calc(100vh-5rem)]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center h-[calc(100vh-5rem)]">
      <p className="text-red-500">{error.message || 'Unknown error occurred'}</p>
    </div>
  );

  if (!currentModule || !currentTopic) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-5rem)]">
        <p className="text-gray-500">Module or Topic not found</p>
      </div>
    );
  }

  return (
    <ProtectedRoute>
      <div className="flex h-[calc(100vh-5rem)] border">
        <CourseMenu />
        <div className="bg-gray-100 w-full border border-gray-800 flex h-[calc(100vh-5rem)] overflow-auto">
          <div className="max-w-[1500px] mx-auto w-full">
            <div className="py-4 px-4 max-w-4xl mx-auto">
              <div className="mb-10">
                <Button
                  onClick={() => router.back()}
                  variant="outline"
                  className="bg-transparent border-none cursor-pointer shadow-none text-brand text-sm flex items-center"
                >
                  <ArrowLeft className="h-6 w-6" /> Go Back
                </Button>
              </div>

              <div className="title">
                <h1 className="text-3xl md:text-4xl font-bold text-center text-gray-800 tracking-wide">
                  {currentTopic.title || 'Topic Not Found'}
                </h1>

                {/* Content Display Area */}
                <div className="flex justify-center mt-8 px-4">
                  <div className="border h-[50vh] max-w-4xl flex-1 relative rounded-lg overflow-hidden">
                    {contentView === 'quiz' && currentTopic.type === 'quiz' ? (
                      <div className="h-full w-full bg-white p-4 overflow-y-auto">
                        <QuizViewer 
                          quiz={currentModule?.content?.quiz?.[0] || { title: currentTopic.title, questions: [] }}
                          onComplete={(score, passed) => {
                            console.log('Quiz completed:', { score, passed });
                            setContentView('main');
                            // Mark topic as completed if passed
                            if (passed) {
                              updateCourseProgress.mutate({
                                courseId,
                                topicId,
                                moduleId,
                                completed: true
                              });
                            }
                          }}
                          onCancel={() => setContentView('main')}
                        />
                      </div>
                    ) : contentView === 'text' && (currentTopic?.content?.textContent || currentModule?.content?.text) ? (
                      <div className="h-full w-full bg-white p-6 overflow-y-auto">
                        <div className="prose max-w-none">
                          <h3 className="text-xl font-semibold mb-4">Text Content</h3>
                          <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                            {currentTopic?.content?.textContent || currentModule?.content?.text}
                          </div>
                        </div>
                      </div>
                    ) : (currentTopic?.content?.videoUrl || currentModule?.content?.videoUrl) ? (
                      <div className="thumbnail h-full w-full bg-black">
                        <video
                          className="w-full h-full object-cover"
                          controls
                          poster={currentTopic.thumbnailUrl || course.thumbnail}
                        >
                          <source src={currentTopic?.content?.videoUrl || currentModule?.content?.videoUrl} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      </div>
                    ) : currentTopic.type === 'quiz' ? (
                      <div className="h-full w-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="text-6xl mb-4">🧠</div>
                          <h3 className="text-2xl font-bold mb-2">Quiz: {currentTopic.title}</h3>
                          <p className="text-lg opacity-90">Test your knowledge</p>
                          <button 
                            onClick={() => setContentView('quiz')}
                            className="mt-4 px-6 py-2 bg-white text-purple-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                          >
                            Start Quiz
                          </button>
                        </div>
                      </div>
                    ) : (currentTopic?.content?.pdfUrl || currentModule?.content?.pdfUrl) ? (
                      <div className="h-full w-full bg-gradient-to-br from-red-500 to-pink-600 flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="text-6xl mb-4">📄</div>
                          <h3 className="text-2xl font-bold mb-2">PDF Document</h3>
                          <p className="text-lg opacity-90">Download and read</p>
                          <a 
                            href={currentTopic?.content?.pdfUrl || currentModule?.content?.pdfUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-4 inline-block px-6 py-2 bg-white text-red-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                          >
                            Download PDF
                          </a>
                        </div>
                      </div>
                    ) : (currentTopic?.content?.textContent || currentModule?.content?.text) ? (
                      <div className="h-full w-full bg-gradient-to-br from-green-500 to-teal-600 flex items-center justify-center">
                        <div className="text-center text-white">
                          <div className="text-6xl mb-4">📝</div>
                          <h3 className="text-2xl font-bold mb-2">Text Content</h3>
                          <p className="text-lg opacity-90">Read the lesson</p>
                          <button 
                            onClick={() => setContentView('text')}
                            className="mt-4 px-6 py-2 bg-white text-green-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
                          >
                            Read Content
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="h-full w-full flex items-center justify-center text-white bg-gray-800">
                        <div className="text-center">
                          <div className="text-6xl mb-4">📚</div>
                          <h3 className="text-2xl font-bold mb-2">Content Coming Soon</h3>
                          <p className="text-lg opacity-90">This topic is being prepared</p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                <div className="desc mt-6">
                  <p className="text-gray-600 text-lg md:text-xl max-w-4xl mx-auto px-4">
                    {currentTopic.description || 'No description available for this topic.'}
                  </p>
                </div>

                {/* Debug Section - Remove in production */}
                {process.env.NODE_ENV === 'development' && (
                  <div className="max-w-4xl mx-auto mt-4 px-4">
                    <details className="bg-gray-100 p-4 rounded-lg">
                      <summary className="cursor-pointer font-medium text-gray-700">Debug Info (Development Only)</summary>
                      <div className="mt-2 text-sm">
                        <p><strong>Current Topic:</strong> {JSON.stringify(currentTopic, null, 2)}</p>
                        <p><strong>Current Module:</strong> {JSON.stringify(currentModule, null, 2)}</p>
                        <p><strong>Content View:</strong> {contentView}</p>
                      </div>
                    </details>
                  </div>
                )}

                {/* Resources Section */}
                {(currentTopic?.content || currentModule?.content) && (
                  <div className="max-w-4xl mx-auto mt-8 px-4">
                    <h3 className="text-xl font-semibold text-gray-800 mb-4">Available Resources</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* Video Resource */}
                      {(currentTopic?.content?.videoUrl || currentModule?.content?.videoUrl) && (
                        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-lg">📹</span>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-800">Video Lesson</h4>
                              <p className="text-sm text-gray-600">Watch the tutorial</p>
                            </div>
                          </div>
                        </div>
                      )}

                      {/* PDF Resource */}
                      {(currentTopic?.content?.pdfUrl || currentModule?.content?.pdfUrl) && (
                        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-lg">📄</span>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-800">PDF Document</h4>
                              <p className="text-sm text-gray-600">Download and read</p>
                            </div>
                            <a 
                              href={currentTopic?.content?.pdfUrl || currentModule?.content?.pdfUrl} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="px-3 py-1 bg-red-500 text-white text-xs rounded-full hover:bg-red-600 transition-colors"
                            >
                              Download
                            </a>
                          </div>
                        </div>
                      )}

                      {/* Text Content */}
                      {(currentTopic?.content?.textContent || currentModule?.content?.text) && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-lg">📝</span>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-800">Text Content</h4>
                              <p className="text-sm text-gray-600">Read the lesson</p>
                            </div>
                            <button 
                              onClick={() => setContentView('text')}
                              className="px-3 py-1 bg-green-500 text-white text-xs rounded-full hover:bg-green-600 transition-colors"
                            >
                              Read
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Quiz */}
                      {currentTopic.type === 'quiz' && currentModule?.content?.quiz && (
                        <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-lg">🧠</span>
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-gray-800">Quiz</h4>
                              <p className="text-sm text-gray-600">Test your knowledge</p>
                            </div>
                            <button 
                              onClick={() => setContentView('quiz')}
                              className="px-3 py-1 bg-purple-500 text-white text-xs rounded-full hover:bg-purple-600 transition-colors"
                            >
                              Start Quiz
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div className="max-w-4xl mx-auto border rounded-lg bg-white mt-8">
                  <div className="p-6 bg-gray-100 rounded-t-lg">
                    <h2 className="font-bold text-gray-800">Course Content</h2>
                    <div className="flex gap-6 items-center mt-3">
                      <div className="text-sm text-gray-800 font-bold">0% Completed</div>
                      <div className="text-sm text-gray-700">0/{allTopics?.length} steps</div>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col gap-4">
                    {currentModule.topics?.map((topic) => (
                      <Link
                        key={topic._id}
                        href={`/courses/${courseId}/${currentModule._id}/${topic._id}`}
                        className={`flex items-center justify-between p-3 rounded ${topic._id === topicId ? 'bg-brand/10' : 'hover:bg-gray-50'}`}
                      >
                        <div className="flex items-center gap-3">
                          <PlayCircleIcon className={`h-6 w-6 ${topic._id === topicId ? 'fill-brand text-white' : 'text-gray-400'}`} />
                          <span className={`font-medium ${topic._id === topicId ? 'text-brand' : 'text-gray-800'}`}>
                            {topic.title}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-gray-600 text-sm">{topic.duration || 'N/A'}</span>
                          <div className={`w-4 h-4 rounded-full border ${topic._id === topicId ? 'bg-brand border-brand' : 'border-gray-300'}`}></div>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="mt-10 flex justify-between max-w-4xl mx-auto">
                  {prevTopic ? (
                    <Link
                      href={`/courses/${courseId}/${prevTopic.moduleId}/${prevTopic._id}`}
                      className="border border-gray-300 rounded-md px-4 py-2 text-sm text-brand font-semibold hover:bg-gray-100"
                    >
                      Previous
                    </Link>
                  ) : (
                    <div></div>
                  )}

                  {nextTopic ? (
                    <Link
                      href={`/courses/${courseId}/${nextTopic.moduleId}/${nextTopic._id}`}
                      className="border border-gray-300 rounded-md px-4 py-2 text-sm text-brand font-semibold hover:bg-gray-100"
                    >
                      Next
                    </Link>
                  ) : (
                    <Link
                      href={`/courses/${courseId}/enrolled`}
                      className="border border-gray-300 rounded-md px-4 py-2 text-sm text-brand font-semibold hover:bg-gray-100"
                    >
                      Finish Course
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
          </div>
        </ProtectedRoute>
    );
}