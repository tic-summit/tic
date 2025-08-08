"use client"

import { useAuth } from '@/contexts/AuthContexts';

import Link from 'next/link';
import QuizRow from './QuizRow';
import useQuizzes from '@/services/useQuizzes';
import { EmptyState, ErrorMessage, LoadingSpinner } from './UtilityComponents';

const QuizzesTable = () => {
  const { user } = useAuth();
  const { data, isLoading, error } = useQuizzes(user);

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!data || data.count === 0) {
    return (
      <EmptyState
        title="No quizzes found"
        description="You haven't created any quizzes yet."
        actionText="Create Your First Quiz"
        actionHref="/instructor/quizzes/create"
      />
    );
  }

  return (
    <div className="bg-white rounded-lg shadow border border-gray-300">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Your Quizzes</h3>
        <Link href="/instructor/quizzes/create" className="text-sm font-medium text-brand hover:text-brand-dark">
          Create New Quiz
        </Link>
      </div>

      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quiz Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Questions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.quizzes.map((quiz) => (
                <QuizRow key={quiz._id} quiz={quiz} />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default QuizzesTable;