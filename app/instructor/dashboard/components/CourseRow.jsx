import { Edit, X } from "lucide-react";
import Link from "next/link";

export const CourseRow = ({ course }) => (
  <tr key={course._id}>
    <td className="px-6 py-4">
      <div className="flex items-center">
        <div className="flex-shrink-0 w-16 h-12 relative">
          <img
            className="w-16 h-12 rounded object-cover"
            src={course.thumbnail}
            alt={course.title}
          
          />
        </div>
        <div className="ml-4">
          <h6 className="text-sm font-medium text-gray-900">
            <Link href={`/courses/${course._id}`}>{course.title}</Link>
          </h6>
        </div>
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      {course.studentsEnrolled || 0}
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
      {course.price === 'Free' ? 'Free' : `$${course.price}`}
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <span className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full">
        {course.duration || 'N/A'}
      </span>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-sm">
      <Link
        href={`/instructor/courses/${course._id}/edit`}
        className="p-1 text-green-600 hover:text-green-800 mr-2"
      >
        <Edit className="h-4 w-4" />
      </Link>
      <button className="p-1 text-red-600 hover:text-red-800">
        <X className="h-4 w-4" />
      </button>
    </td>
  </tr>
);