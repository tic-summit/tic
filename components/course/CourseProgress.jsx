"use client";
import React from 'react';
import { Progress } from '@/components/ui/progress';
import { CheckCircle, Clock, BookOpen } from 'lucide-react';

export default function CourseProgress({ 
  course, 
  enrollment, 
  currentModule = null, 
  currentTopic = null 
}) {
  if (!course || !enrollment) return null;

  const modules = course.modules || [];
  const totalTopics = modules.reduce((acc, module) => acc + (module.topics?.length || 0), 0);
  
  // Calculate progress (this would come from the backend in a real implementation)
  const completedTopics = enrollment.progress?.completedTopics || 0;
  const progressPercentage = totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0;

  const getModuleProgress = (module) => {
    const moduleTopics = module.topics || [];
    const completedInModule = enrollment.progress?.moduleProgress?.[module._id]?.completedTopics || 0;
    return moduleTopics.length > 0 ? (completedInModule / moduleTopics.length) * 100 : 0;
  };

  const isModuleCompleted = (module) => {
    return getModuleProgress(module) === 100;
  };

  const isTopicCompleted = (topic) => {
    return enrollment.progress?.completedTopics?.includes(topic._id) || false;
  };

  return (
    <div className="bg-white rounded-lg border p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Course Progress</h3>
        <div className="flex items-center text-sm text-gray-600">
          <BookOpen className="w-4 h-4 mr-1" />
          {completedTopics} of {totalTopics} topics completed
        </div>
      </div>

      {/* Overall Progress */}
      <div className="mb-6">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>Overall Progress</span>
          <span>{Math.round(progressPercentage)}%</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>

      {/* Modules Progress */}
      <div className="space-y-4">
        <h4 className="font-medium text-gray-900">Modules</h4>
        {modules.map((module, index) => (
          <div key={module._id} className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center mr-3 ${
                  isModuleCompleted(module) 
                    ? 'bg-green-100 text-green-600' 
                    : currentModule?._id === module._id
                    ? 'bg-blue-100 text-blue-600'
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  {isModuleCompleted(module) ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <span className="text-xs font-medium">{index + 1}</span>
                  )}
                </div>
                <h5 className="font-medium text-gray-900">{module.title}</h5>
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <Clock className="w-4 h-4 mr-1" />
                {module.topics?.length || 0} topics
              </div>
            </div>
            
            <div className="ml-9">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Module Progress</span>
                <span>{Math.round(getModuleProgress(module))}%</span>
              </div>
              <Progress value={getModuleProgress(module)} className="h-1" />
              
              {/* Topics List */}
              <div className="mt-3 space-y-2">
                {module.topics?.map((topic) => (
                  <div key={topic._id} className="flex items-center text-sm">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center mr-2 ${
                      isTopicCompleted(topic)
                        ? 'bg-green-100 text-green-600'
                        : currentTopic?._id === topic._id
                        ? 'bg-blue-100 text-blue-600'
                        : 'bg-gray-100 text-gray-400'
                    }`}>
                      {isTopicCompleted(topic) ? (
                        <CheckCircle className="w-3 h-3" />
                      ) : (
                        <div className="w-2 h-2 rounded-full bg-current" />
                      )}
                    </div>
                    <span className={`${
                      isTopicCompleted(topic) 
                        ? 'text-green-700 line-through' 
                        : currentTopic?._id === topic._id
                        ? 'text-blue-700 font-medium'
                        : 'text-gray-600'
                    }`}>
                      {topic.title}
                    </span>
                    {topic.duration && (
                      <span className="ml-auto text-xs text-gray-500">
                        {topic.duration}
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Enrollment Info */}
      <div className="mt-6 pt-4 border-t">
        <div className="flex justify-between text-sm text-gray-600">
          <span>Enrolled on</span>
          <span>{new Date(enrollment.createdAt).toLocaleDateString()}</span>
        </div>
        {enrollment.lastAccessed && (
          <div className="flex justify-between text-sm text-gray-600 mt-1">
            <span>Last accessed</span>
            <span>{new Date(enrollment.lastAccessed).toLocaleDateString()}</span>
          </div>
        )}
      </div>
    </div>
  );
}
