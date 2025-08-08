"use client"

import Link from 'next/link';
import { Edit, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';

const QuizDetail = ({ quiz }) => {
  const router = useRouter();

  return (
    <div className="bg-white rounded-lg shadow border border-gray-300 p-6">
      <button
        onClick={() => router.back()}
        className="flex items-center text-sm text-gray-600 hover:text-gray-900 mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-1" />
        Back to quizzes
      </button>

      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{quiz.title}</h2>
          <p className="text-gray-600 mt-1">{quiz.description}</p>
        </div>
        <Link
          href={`/instructor/quizzes/${quiz._id}/edit`}
          className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-brand hover:bg-brand-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand"
        >
          <Edit className="h-4 w-4 mr-1" />
          Edit Quiz
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Quiz Details</h3>
          <div className="space-y-2">
            <p><span className="font-medium">Course:</span> {quiz.course?.title || 'Not assigned'}</p>
            <p><span className="font-medium">Duration:</span> {quiz.duration} minutes</p>
            <p><span className="font-medium">Passing Score:</span> {quiz.passingScore}%</p>
            <p>
              <span className="font-medium">Status:</span> 
              <span className={`ml-2 px-2 py-1 text-xs rounded-full ${quiz.isPublished ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                {quiz.isPublished ? 'Published' : 'Draft'}
              </span>
            </p>
          </div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Questions</h3>
          {quiz.questions?.length > 0 ? (
            <ul className="space-y-2">
              {quiz.questions.map((question, index) => (
                <li key={question._id}>
                  <Link 
                    href={`/instructor/quizzes/${quiz._id}/questions/${question._id}`}
                    className="text-brand hover:text-brand-dark"
                  >
                    {index + 1}. {question.text}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No questions added yet</p>
          )}
          <Link
            href={`/instructor/quizzes/${quiz._id}/questions/new`}
            className="inline-block mt-4 text-sm text-brand hover:text-brand-dark"
          >
            + Add Question
          </Link>
        </div>
      </div>
    </div>
  );
};

export default QuizDetail;