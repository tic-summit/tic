"use client";
import React from 'react';
import { 
  Clock, 
  CheckCircle, 
  PlayCircle, 
  BookOpen, 
  Target,
  Award,
  Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function QuizCard({ quiz, courseTitle, onStartQuiz }) {
  const formatTime = (minutes) => {
    if (!minutes) return 'No time limit';
    if (minutes < 60) return `${minutes} minutes`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours}h ${remainingMinutes}m` : `${hours}h`;
  };

  const getDifficultyColor = (score) => {
    if (score >= 80) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getStatusIcon = (isCompleted) => {
    return isCompleted ? (
      <CheckCircle className="w-5 h-5 text-green-600" />
    ) : (
      <PlayCircle className="w-5 h-5 text-blue-600" />
    );
  };

  const getStatusText = (isCompleted) => {
    return isCompleted ? 'Completed' : 'Start Quiz';
  };

  const getStatusColor = (isCompleted) => {
    return isCompleted 
      ? 'bg-green-100 text-green-800 border-green-200' 
      : 'bg-blue-100 text-blue-800 border-blue-200';
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      {/* Quiz Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
              {quiz.title}
            </h3>
            <p className="text-sm text-gray-600 mb-2">
              {courseTitle}
            </p>
            {quiz.module && (
              <div className="flex items-center text-sm text-gray-500 mb-2">
                <BookOpen className="w-4 h-4 mr-1" />
                <span>Module {quiz.module.order}: {quiz.module.title}</span>
              </div>
            )}
          </div>
          <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(quiz.isCompleted)}`}>
            {getStatusText(quiz.isCompleted)}
          </div>
        </div>

        {quiz.description && (
          <p className="text-sm text-gray-600 line-clamp-2">
            {quiz.description}
          </p>
        )}
      </div>

      {/* Quiz Stats */}
      <div className="p-6">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center">
            <Target className="w-4 h-4 text-gray-400 mr-2" />
            <div>
              <p className="text-xs text-gray-500">Questions</p>
              <p className="text-sm font-medium text-gray-900">{quiz.questionCount || 0}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Clock className="w-4 h-4 text-gray-400 mr-2" />
            <div>
              <p className="text-xs text-gray-500">Time Limit</p>
              <p className="text-sm font-medium text-gray-900">{formatTime(quiz.timeLimit)}</p>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Passing Score</span>
            <span className={`text-sm font-medium px-2 py-1 rounded ${getDifficultyColor(quiz.passingScore)}`}>
              {quiz.passingScore}%
            </span>
          </div>
        </div>

        {/* Action Button */}
        <div className="flex gap-2">
          {quiz.isCompleted ? (
            <Button
              onClick={() => onStartQuiz?.(quiz)}
              variant="outline"
              className="flex-1"
            >
              <Award className="w-4 h-4 mr-2" />
              Retake Quiz
            </Button>
          ) : (
            <Button
              onClick={() => onStartQuiz?.(quiz)}
              className="flex-1 bg-brand hover:bg-brand-dark text-white"
            >
              {getStatusIcon(quiz.isCompleted)}
              <span className="ml-2">{getStatusText(quiz.isCompleted)}</span>
            </Button>
          )}
          
          <Link 
            href={`/courses/${quiz.courseId}`}
            className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
          >
            View Course
          </Link>
        </div>
      </div>
    </div>
  );
}
