const { useAuth } = require("@/contexts/AuthContexts");
const { useInstructorCourses } = require("@/services/useUserCourses");
const { ChevronRight, ChevronLeft } = require("lucide-react");
import Link from "next/link";
const { LoadingSpinner, EmptyState, ErrorMessage } = require("./UtilityComponents");
const { CourseRow } = require("./CourseRow");

export const CoursesTable = () => {
  const { user } = useAuth();
  const { data, isLoading, error } = useInstructorCourses(user);

  console.log('Courses data:', data); // Debug log to check fetched data

  if (isLoading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error.message} />;
  if (!data || data.count === 0) {
    return (
      <EmptyState
        title="No courses found"
        description="You haven't created any courses yet."
        actionText="Create Your First Course"
        actionHref="/instructor/courses/create"
      />
    );
  }

  return (
    <div className="bg-white rounded-lg shadow border border-gray-300">
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-semibold text-gray-900">Most Selling Courses</h3>
        <Link href="/instructor/courses" className="text-sm font-medium text-brand hover:text-brand-dark">
          View all
        </Link>
      </div>

      <div className="p-6">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Course Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Selling</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.courses.map((course) => (
                <CourseRow key={course._id} course={course} />
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6">
          <p className="text-sm text-gray-700 mb-4 sm:mb-0">
            Showing 1 to {data.count} of {data.count} entries
          </p>
          <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px">
            <button
              disabled
              className="relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <ChevronLeft className="h-3 w-3" />
            </button>
            <button className="relative inline-flex items-center px-3 py-2 border border-gray-300 bg-blue-50 text-sm font-medium text-brand hover:bg-blue-100">
              1
            </button>
            <button
              disabled
              className="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
            >
              <ChevronRight className="h-3 w-3" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
};