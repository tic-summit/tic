import { useInstructorCourses } from "@/services/useUserCourses";
import { StatCard } from "./StardCard";
import { useAuth } from "@/contexts/AuthContexts";

const { Tv } = require("lucide-react");
const { FaUserGraduate, FaGem } = require("react-icons/fa");
const { CoursesTable } = require("./CourseTable");

export const DashboardContent = () => {
    const { user } = useAuth();
    const { data } = useInstructorCourses(user);

  const stats = [
    {
      icon: <Tv className="h-8 w-8 text-yellow-500" />,
      value: data?.count || "0",
      label: "Total Courses",
      bgColor: "bg-yellow-50"
    },
    {
      icon: <FaUserGraduate className="h-8 w-8 text-purple-500" />,
      value: "25K+",
      label: "Total Students",
      bgColor: "bg-purple-50"
    },
    {
      icon: <FaGem className="h-8 w-8 text-blue-500" />,
      value: "12K",
      label: "Enrolled Students",
      bgColor: "bg-blue-50"
    }
  ];

  return (
    <>
      {/* Counter boxes */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 mt-2">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Earnings Chart */}
      <div className="bg-white rounded-lg shadow border border-gray-300 mb-6">
        <div className="p-6">
          <div className="bg-gray-100 rounded h-80 flex items-center justify-center">
            <p className="text-gray-500">Earnings Chart</p>
          </div>
        </div>
      </div>

      {/* Courses Table */}
      <CoursesTable />
    </>
  );
};