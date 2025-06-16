'use client'

import { 
  UserCircle, 
  BookOpen, 
  Code, 
  Trophy,
  Briefcase
} from "lucide-react";

export default function LearningPath() {
  const steps = [
    {
      icon: <UserCircle className="w-10 h-10 text-white" />,
      title: "Register",
      desc: "Choose your tech domain and schedule"
    },
    {
      icon: <BookOpen className="w-10 h-10 text-white" />,
      title: "Learn",
      desc: "Access courses on our LMS platform"
    },
    {
      icon: <Code className="w-10 h-10 text-white" />,
      title: "Build",
      desc: "Work on hands-on projects"
    },
    {
      icon: <Trophy className="w-10 h-10 text-white" />,
      title: "Compete",
      desc: "Join hackathons"
    },

  ];

  return (
    <section className="py-12">
      <div className="max-w-7xl mx-auto px-2">
        <div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 mt-8 w-full"
   
        >
          {steps.map((step, index) => (
            <div 
              key={index}
              className="w-full  p-6 rounded-lg shadow-sm border border-gray-200 text-center"
         
            >
              <div className="mx-auto w-full  py-3 bg-brand rounded-full flex items-center justify-center mb-3">
                {step.icon}
              </div>
              <h3 className="font-medium ">{step.title}</h3>
              <p className="text-sm  mt-1">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
