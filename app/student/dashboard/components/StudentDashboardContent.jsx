import { useAuth } from "@/contexts/AuthContexts";
import { useEnrolledCourses } from "@/app/api/student/useStudentCourses";
import { StatCard } from "./StatCard";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Star, Award, TrendingUp } from "lucide-react";
import Link from "next/link";

export const StudentDashboardContent = () => {
  const { user } = useAuth();
  const { data: enrolledData, isLoading } = useEnrolledCourses(user?.id, user?.token);
  const courses = enrolledData?.courses || [];

  // Calculate statistics
  const totalCourses = courses.length;
  const completedCourses = courses.filter(course => course.progress === 100).length;
  const inProgressCourses = courses.filter(course => course.progress > 0 && course.progress < 100).length;
  const totalProgress = courses.reduce((sum, course) => sum + (course.progress || 0), 0);
  const averageProgress = totalCourses > 0 ? Math.round(totalProgress / totalCourses) : 0;

  const stats = [
    {
      icon: <BookOpen className="h-8 w-8 text-blue-500" />,
      value: totalCourses,
      label: "Enrolled Courses",
      bgColor: "bg-blue-50"
    },
    {
      icon: <Award className="h-8 w-8 text-green-500" />,
      value: completedCourses,
      label: "Completed Courses",
      bgColor: "bg-green-50"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-purple-500" />,
      value: `${averageProgress}%`,
      label: "Average Progress",
      bgColor: "bg-purple-50"
    }
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
      </div>
    );
  }

  return (
    <>
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-brand to-blue-600 rounded-lg p-6 text-white mb-6">
        <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.fullName?.split(' ')[0]}!</h2>
        <p className="text-blue-100">Continue your learning journey and achieve your goals.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Progress Overview */}
      <div className="bg-white rounded-lg shadow border border-gray-300 mb-6">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Learning Progress</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Overall Progress</span>
              <span className="text-sm text-gray-500">{averageProgress}%</span>
            </div>
            <Progress value={averageProgress} className="h-2" />
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span>Completed: {completedCourses}</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-2"></div>
                <span>In Progress: {inProgressCourses}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white rounded-lg shadow border border-gray-300">
        <div className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {courses.slice(0, 3).map((course) => (
              <div key={course._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center">
                  <BookOpen className="h-5 w-5 text-gray-500 mr-3" />
                  <div>
                    <p className="font-medium text-gray-900">{course.title}</p>
                    <p className="text-sm text-gray-500">{course.progress || 0}% complete</p>
                  </div>
                </div>
                <Link 
                  href={`/courses/${course._id}`}
                  className="text-brand hover:text-brand-dark text-sm font-medium"
                >
                  Continue
                </Link>
              </div>
            ))}
            {courses.length === 0 && (
              <p className="text-gray-500 text-center py-8">No courses enrolled yet. Start your learning journey!</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
