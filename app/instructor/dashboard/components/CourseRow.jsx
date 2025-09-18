import { Edit, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContexts";
import { toast } from "sonner";
import { useDeleteCourse } from "@/services/courseApi/useCourseDelete";

export const CourseRow = ({ course }) => {
  const { user } = useAuth();
  const { mutate: deleteCourse, isLoading } = useDeleteCourse();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = () => {
    deleteCourse(
      { courseId: course._id, token: user.token },
      {
        onSuccess: () => {
          setShowDeleteModal(false);
        },
        onError: (error) => {
          console.log("Delete error:", error);
          setShowDeleteModal(false);
        },
      }
    );
  };

  return (
    <>
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
          {course.studentsEnrolled?.length || 0}
        </td>
        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
          {course.priceType === 'Free' ? 'Free' : `$${course.price}`}
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
          <button
            onClick={() => setShowDeleteModal(true)}
            className="p-1 text-red-600 hover:text-red-800"
            disabled={isLoading}
          >
            <X className="h-4 w-4" />
          </button>
        </td>
      </tr>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md mx-4 p-6">
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-lg font-semibold text-gray-900">Delete Course</h5>
              <button
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="h-6 w-6" />
              </button>
            </div>
            <div className="mb-6">
              <p className="text-sm text-gray-600">
                Are you sure you want to delete the course "<strong>{course.title}</strong>"? This action
                cannot be undone.
              </p>
            </div>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoading}
              >
                {isLoading ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};