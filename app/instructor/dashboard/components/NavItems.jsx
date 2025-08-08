import { useAuth } from "@/contexts/AuthContexts";
import QuizzesTable from "./QuizTable";

const { FileText, LayoutDashboard, Diamond, Heart, Edit, Settings, Trash, LogOut, ShoppingCart } = require("lucide-react");
const { CoursesTable } = require("./CourseTable");
const { PlaceholderContent } = require("./PlaceHolderContainer");
const { DashboardContent } = require("./DashboardContent");



 export default[

    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: <LayoutDashboard className="h-5 w-5" />,
      component: <DashboardContent />
    },
    {
      id: 'courses',
      name: 'My Courses',
      icon: <ShoppingCart className="h-5 w-5" />,
      component: <CoursesTable />
    },
    {
      id: 'resume',
      name: 'Course Resume',
      icon: <FileText className="h-5 w-5" />,
      component: <PlaceholderContent title="Course Resume" />
    },
    {
      id: 'quiz',
      name: 'Quiz',
      icon: <Diamond className="h-5 w-5" />,
      component: <QuizzesTable />
    },
    {
      id: 'saved',
      name: 'Saved',
      icon: <Heart className="h-5 w-5" />,
      component: <PlaceholderContent title="Saved" />
    },
    {
      id: 'edit-profile',
      name: 'Edit Profile',
      icon: <Edit className="h-5 w-5" />,
      component: <PlaceholderContent title="Edit Profile" />
    },
    {
      id: 'settings',
      name: 'Settings',
      icon: <Settings className="h-5 w-5" />,
      component: <PlaceholderContent title="Settings" />
    },
    {
      id: 'delete-profile',
      name: 'Delete Profile',
      icon: <Trash className="h-5 w-5" />,
      component: <PlaceholderContent title="Delete Profile" />
    },
    {
      id: 'logout',
      name: 'Sign Out',
      icon: <LogOut className="h-5 w-5" />,
      action: () => {
        logout();
      }
    }
  ];
