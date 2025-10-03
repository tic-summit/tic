"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { CheckCircle, XCircle, ArrowRight, ArrowLeft } from 'lucide-react';

export default function QuizViewer({ quiz, onComplete, onCancel }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = quiz.questions?.[currentQuestionIndex];
  const totalQuestions = quiz.questions?.length || 0;
  const isLastQuestion = currentQuestionIndex === totalQuestions - 1;

  const handleAnswerSelect = (questionId, answer) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: answer
    }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      calculateScore();
      setShowResults(true);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const calculateScore = () => {
    let correctAnswers = 0;
    quiz.questions?.forEach(question => {
      const selectedAnswer = selectedAnswers[question._id];
      if (selectedAnswer === question.answer) {
        correctAnswers++;
      }
    });
    setScore(correctAnswers);
  };

  const handleRestart = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers({});
    setShowResults(false);
    setScore(0);
  };

  const handleFinish = () => {
    onComplete(score, score >= totalQuestions * 0.7); // 70% pass rate
  };

  if (showResults) {
    const percentage = Math.round((score / totalQuestions) * 100);
    const passed = percentage >= 70;

    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
            passed ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {passed ? (
              <CheckCircle className="w-8 h-8 text-green-600" />
            ) : (
              <XCircle className="w-8 h-8 text-red-600" />
            )}
          </div>
          
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            {passed ? 'Congratulations!' : 'Keep Learning!'}
          </h2>
          
          <p className="text-gray-600 mb-4">
            You scored {score} out of {totalQuestions} questions ({percentage}%)
          </p>
          
          <div className="flex gap-4 justify-center">
            <Button onClick={handleRestart} variant="outline">
              Retake Quiz
            </Button>
            <Button onClick={handleFinish} className="bg-brand hover:bg-brand-dark">
              {passed ? 'Continue' : 'Review Material'}
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (!currentQuestion) {
    return (
      <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg text-center">
        <p className="text-gray-500">No questions available for this quiz.</p>
        <Button onClick={onCancel} className="mt-4">
          Go Back
        </Button>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">{quiz.title}</h2>
          <span className="text-sm text-gray-500">
            Question {currentQuestionIndex + 1} of {totalQuestions}
          </span>
        </div>
        
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-brand h-2 rounded-full transition-all duration-300"
            style={{ width: `${((currentQuestionIndex + 1) / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-medium text-gray-800 mb-4">
          {currentQuestion.question}
        </h3>
        
        <div className="space-y-3">
          {Object.entries(currentQuestion.options || {}).map(([key, value]) => (
            <label
              key={key}
              className={`flex items-center p-3 border rounded-lg cursor-pointer transition-colors ${
                selectedAnswers[currentQuestion._id] === key
                  ? 'border-brand bg-brand/5'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name={`question-${currentQuestion._id}`}
                value={key}
                checked={selectedAnswers[currentQuestion._id] === key}
                onChange={() => handleAnswerSelect(currentQuestion._id, key)}
                className="sr-only"
              />
              <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                selectedAnswers[currentQuestion._id] === key
                  ? 'border-brand bg-brand'
                  : 'border-gray-300'
              }`}>
                {selectedAnswers[currentQuestion._id] === key && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
              <span className="text-gray-700">{value}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-between">
        <Button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          variant="outline"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        
        <Button
          onClick={handleNext}
          disabled={!selectedAnswers[currentQuestion._id]}
          className="bg-brand hover:bg-brand-dark"
        >
          {isLastQuestion ? 'Finish Quiz' : 'Next'}
          {!isLastQuestion && <ArrowRight className="w-4 h-4 ml-2" />}
        </Button>
      </div>
    </div>
  );
}

