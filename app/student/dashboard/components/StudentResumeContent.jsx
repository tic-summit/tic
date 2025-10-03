import { useAuth } from "@/contexts/AuthContexts";
import { useEnrolledCourses } from "@/app/api/student/useStudentCourses";
import { Progress } from "@/components/ui/progress";
import { BookOpen, Clock, Star, Award, Calendar, Download, Share2, Eye } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const StudentResumeContent = () => {
  const { user } = useAuth();
  const { data: enrolledData, isLoading } = useEnrolledCourses(user?.id, user?.token);
  const courses = enrolledData?.courses || [];

  // Calculate learning statistics
  const completedCourses = courses.filter(course => course.progress === 100);
  const inProgressCourses = courses.filter(course => course.progress > 0 && course.progress < 100);
  const totalLearningHours = courses.reduce((sum, course) => sum + (course.duration || 0), 0);
  const averageRating = courses.reduce((sum, course) => sum + (course.rating || 0), 0) / courses.length || 0;
  const totalProgress = courses.reduce((sum, course) => sum + (course.progress || 0), 0);
  const averageProgress = courses.length > 0 ? Math.round(totalProgress / courses.length) : 0;

  // Skills learned (mock data - in real app, this would come from course completion data)
  const skillsLearned = [
    "JavaScript Programming",
    "React Development",
    "Node.js Backend",
    "Database Design",
    "API Development",
    "UI/UX Design",
    "Project Management",
    "Data Analysis"
  ];

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Learning Resume</h2>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button variant="outline" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
          <Button size="sm">
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </div>

      {/* Profile Summary */}
      <div className="bg-white rounded-lg shadow border border-gray-300 p-6">
        <div className="flex items-start space-x-4">
          <div className="w-20 h-20 bg-gradient-to-br from-brand to-blue-600 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-white">
              {user?.fullName?.charAt(0) || 'U'}
            </span>
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold text-gray-900">{user?.fullName}</h3>
            <p className="text-gray-600">{user?.email}</p>
            <p className="text-sm text-gray-500 mt-1">Student • Learning since {new Date().getFullYear()}</p>
          </div>
        </div>
      </div>

      {/* Learning Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow border border-gray-300 p-4 text-center">
          <BookOpen className="h-8 w-8 text-blue-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{courses.length}</div>
          <div className="text-sm text-gray-600">Courses Enrolled</div>
        </div>
        <div className="bg-white rounded-lg shadow border border-gray-300 p-4 text-center">
          <Award className="h-8 w-8 text-green-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{completedCourses.length}</div>
          <div className="text-sm text-gray-600">Courses Completed</div>
        </div>
        <div className="bg-white rounded-lg shadow border border-gray-300 p-4 text-center">
          <Clock className="h-8 w-8 text-purple-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{totalLearningHours}h</div>
          <div className="text-sm text-gray-600">Learning Hours</div>
        </div>
        <div className="bg-white rounded-lg shadow border border-gray-300 p-4 text-center">
          <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
          <div className="text-2xl font-bold text-gray-900">{averageRating.toFixed(1)}</div>
          <div className="text-sm text-gray-600">Average Rating</div>
        </div>
      </div>

      {/* Learning Progress */}
      <div className="bg-white rounded-lg shadow border border-gray-300 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Overall Learning Progress</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Completion Rate</span>
            <span className="text-sm text-gray-500">{averageProgress}%</span>
          </div>
          <Progress value={averageProgress} className="h-3" />
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="text-center">
              <div className="text-lg font-semibold text-green-600">{completedCourses.length}</div>
              <div className="text-gray-600">Completed</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-yellow-600">{inProgressCourses.length}</div>
              <div className="text-gray-600">In Progress</div>
            </div>
            <div className="text-center">
              <div className="text-lg font-semibold text-gray-600">
                {courses.length - completedCourses.length - inProgressCourses.length}
              </div>
              <div className="text-gray-600">Not Started</div>
            </div>
          </div>
        </div>
      </div>

      {/* Skills Learned */}
      <div className="bg-white rounded-lg shadow border border-gray-300 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills Acquired</h3>
        <div className="flex flex-wrap gap-2">
          {skillsLearned.map((skill, index) => (
            <span
              key={index}
              className="px-3 py-1 bg-brand text-white rounded-full text-sm font-medium"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>

      {/* Course History */}
      <div className="bg-white rounded-lg shadow border border-gray-300 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Course History</h3>
        <div className="space-y-4">
          {courses.map((course) => (
            <div key={course._id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-brand to-blue-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{course.title}</h4>
                  <p className="text-sm text-gray-600">
                    {course.progress === 100 ? 'Completed' : course.progress > 0 ? 'In Progress' : 'Not Started'}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{course.progress || 0}%</div>
                  <div className="w-20">
                    <Progress value={course.progress || 0} className="h-1" />
                  </div>
                </div>
                <Link
                  href={`/courses/${course._id}`}
                  className="text-brand hover:text-brand-dark text-sm font-medium"
                >
                  View
                </Link>
              </div>
            </div>
          ))}
          {courses.length === 0 && (
            <p className="text-gray-500 text-center py-8">No courses enrolled yet.</p>
          )}
        </div>
      </div>

      {/* Achievements */}
      <div className="bg-white rounded-lg shadow border border-gray-300 p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Achievements</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {completedCourses.length > 0 && (
            <div className="flex items-center p-4 bg-green-50 rounded-lg">
              <Award className="h-8 w-8 text-green-600 mr-3" />
              <div>
                <div className="font-medium text-green-900">First Course Completed</div>
                <div className="text-sm text-green-700">Completed your first course!</div>
              </div>
            </div>
          )}
          {completedCourses.length >= 5 && (
            <div className="flex items-center p-4 bg-blue-50 rounded-lg">
              <Award className="h-8 w-8 text-blue-600 mr-3" />
              <div>
                <div className="font-medium text-blue-900">Learning Enthusiast</div>
                <div className="text-sm text-blue-700">Completed 5+ courses!</div>
              </div>
            </div>
          )}
          {averageProgress >= 80 && (
            <div className="flex items-center p-4 bg-purple-50 rounded-lg">
              <Award className="h-8 w-8 text-purple-600 mr-3" />
              <div>
                <div className="font-medium text-purple-900">High Achiever</div>
                <div className="text-sm text-purple-700">80%+ average progress!</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
