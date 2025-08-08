"use client"

import Link from 'next/link';
import { Edit, Trash } from 'lucide-react';

const QuizRow = ({ quiz }) => (
  <tr key={quiz._id}>
    <td className="px-6 py-4">
      <div className="flex items-center">
        <div className="ml-4">
          <h6 className="text-sm font-medium text-gray-900">
            <Link href={`/instructor/quizzes/${quiz._id}`}>{quiz.title}</Link>
          </h6>
        </div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      {quiz.questions?.length || 0}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      {quiz.course?.title || 'No course'}
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
        {quiz.isPublished ? 'Published' : 'Draft'}
      </span>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm">
      <Link
        href={`/instructor/quizzes/${quiz._id}/edit`}
        className="p-1 text-green-600 hover:text-green-800 mr-2"
      >
        <Edit className="h-4 w-4" />
      </Link>
      <button className="p-1 text-red-600 hover:text-red-800">
        <Trash className="h-4 w-4" />
      </button>
    </td>
  </tr>
);

export default QuizRow;