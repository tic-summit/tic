"use client";
import React, { useState, useEffect } from 'react';
import { 
  Clock, 
  CheckCircle, 
  XCircle, 
  ArrowLeft, 
  ArrowRight,
  Flag,
  AlertCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

export default function QuizTaking({ quiz, onComplete, onCancel }) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(quiz.timeLimit * 60); // Convert to seconds
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  // Mock questions - in real app, this would come from API
  const questions = [
    {
      id: 1,
      question: "What is the primary purpose of React?",
      options: [
        "To build user interfaces",
        "To manage databases",
        "To handle server requests",
        "To create mobile apps"
      ],
      correct: 0
    },
    {
      id: 2,
      question: "Which hook is used to manage state in functional components?",
      options: [
        "useEffect",
        "useState",
        "useContext",
        "useReducer"
      ],
      correct: 1
    },
    {
      id: 3,
      question: "What does JSX stand for?",
      options: [
        "JavaScript XML",
        "JavaScript Extension",
        "JavaScript Syntax",
        "JavaScript Expression"
      ],
      correct: 0
    }
  ];

  const currentQuestion = questions[currentQuestionIndex];

  // Timer effect
  useEffect(() => {
    if (timeLeft > 0 && !isSubmitted) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !isSubmitted) {
      handleSubmit();
    }
  }, [timeLeft, isSubmitted]);

  const handleAnswerSelect = (questionId, answerIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
    
    // Calculate score
    let correctAnswers = 0;
    questions.forEach(question => {
      if (answers[question.id] === question.correct) {
        correctAnswers++;
      }
    });
    
    const calculatedScore = Math.round((correctAnswers / questions.length) * 100);
    setScore(calculatedScore);
    setShowResults(true);
  };

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const getProgressPercentage = () => {
    return ((currentQuestionIndex + 1) / questions.length) * 100;
  };

  if (showResults) {
    const passed = score >= quiz.passingScore;
    
    return (
      <div className="max-w-2xl mx-auto p-6">
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className={`w-16 h-16 mx-auto mb-4 rounded-full flex items-center justify-center ${
            passed ? 'bg-green-100' : 'bg-red-100'
          }`}>
            {passed ? (
              <CheckCircle className="w-8 h-8 text-green-600" />
            ) : (
              <XCircle className="w-8 h-8 text-red-600" />
            )}
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">
            {passed ? 'Congratulations!' : 'Quiz Complete'}
          </h2>
          
          <p className="text-gray-600 mb-6">
            {passed 
              ? `You passed with a score of ${score}%!` 
              : `You scored ${score}%. You need ${quiz.passingScore}% to pass.`
            }
          </p>
          
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Your Score</p>
              <p className="text-2xl font-bold text-gray-900">{score}%</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600">Passing Score</p>
              <p className="text-2xl font-bold text-gray-900">{quiz.passingScore}%</p>
            </div>
          </div>
          
          <div className="flex gap-3 justify-center">
            <Button
              onClick={() => onComplete?.(score, passed)}
              className="bg-brand hover:bg-brand-dark text-white"
            >
              Continue
            </Button>
            <Button
              onClick={() => onCancel?.()}
              variant="outline"
            >
              Back to Quizzes
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Quiz Header */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900">{quiz.title}</h1>
          <div className="flex items-center text-red-600">
            <Clock className="w-5 h-5 mr-2" />
            <span className="font-mono text-lg">{formatTime(timeLeft)}</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Question {currentQuestionIndex + 1} of {questions.length}</span>
          <span>{quiz.questionCount} questions</span>
        </div>
        
        <div className="mt-4">
          <Progress value={getProgressPercentage()} className="h-2" />
        </div>
      </div>

      {/* Question */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">
          {currentQuestion.question}
        </h2>
        
        <div className="space-y-3">
          {currentQuestion.options.map((option, index) => (
            <label
              key={index}
              className={`flex items-center p-4 border rounded-lg cursor-pointer transition-colors ${
                answers[currentQuestion.id] === index
                  ? 'border-brand bg-blue-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <input
                type="radio"
                name={`question-${currentQuestion.id}`}
                checked={answers[currentQuestion.id] === index}
                onChange={() => handleAnswerSelect(currentQuestion.id, index)}
                className="sr-only"
              />
              <div className={`w-4 h-4 rounded-full border-2 mr-3 flex items-center justify-center ${
                answers[currentQuestion.id] === index
                  ? 'border-brand bg-brand'
                  : 'border-gray-300'
              }`}>
                {answers[currentQuestion.id] === index && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </div>
              <span className="text-gray-900">{option}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between mt-6">
        <Button
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
          variant="outline"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Previous
        </Button>
        
        <div className="flex gap-2">
          {currentQuestionIndex < questions.length - 1 ? (
            <Button
              onClick={handleNext}
              className="bg-brand hover:bg-brand-dark text-white"
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Flag className="w-4 h-4 mr-2" />
              Submit Quiz
            </Button>
          )}
        </div>
      </div>

      {/* Time Warning */}
      {timeLeft < 300 && timeLeft > 0 && (
        <div className="fixed bottom-4 right-4 bg-red-600 text-white p-4 rounded-lg shadow-lg flex items-center">
          <AlertCircle className="w-5 h-5 mr-2" />
          <span>Time running out! {formatTime(timeLeft)} remaining</span>
        </div>
      )}
    </div>
  );
}
