'use client'

import { Icon } from "@iconify/react";
import {
  UserCircle,
  BookOpen,
  Code,
  Trophy,
  Briefcase,
  ArrowBigRight,
  ArrowRight
} from "lucide-react";

export default function LearningPath() {
  const steps = [
    {
      icon: <Icon icon="game-icons:archive-register" className="text-brand size-8 md:size-16" />,
      title: "Register",
      desc: "Choose your tech domain"
    },
    {
      icon: <Icon icon="dashicons:welcome-learn-more" className="text-brand size-8 md:size-16"/>,
      title: "Learn",
      desc: "Access courses"
    },
    {
      icon: <Icon icon="ic:outline-build-circle" className="text-brand size-8 md:size-16" />,
      title: "Build",
      desc: "Work on hands-on projects"
    },
    {
      icon: <Icon icon="game-icons:diamond-trophy" className="text-brand size-8 md:size-16" />,
      title: "Compete",
      desc: "Join hackathons"
    },

  ];

  return (
    <section className=" bg-[#1e1a4a]">
     <div className="bg-black/20 py-8 md:py-24 px-4">
       <div className="max-w-[1320px] mx-auto px-2 ">
        <h1 className="font-bold text-xl  md:text-4xl text-white">Tic Learning Path</h1>
        <div className="sm:text-lg text-white mt-4">Class odio natoque sociosqu etiam tempor orci. Sem et tortor consequat id.<br /> Fermentum egestas tellus. Nunc eu hendrerit turpis. Fusce non lectus sem In pellentesque nunc.</div>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-4 mt-8 w-full"

        >
          {steps.map((step, index) => (
            <div
              key={index}
              className="w-full  group "

            >
              <div className="relative w-full  p-4 rounded-lg border border-dashed  border-gray-200 group-group-hover:rounded-b-xl group-hover:border-white group-hover:border-b-8 transition-all duration-300">
                <div className="mx-auto py-1   text-start mb-2  w-full">
                  <div className="bg-white w-fit rounded-full">
                    {step.icon}
                    </div>
                </div>
                <h3 className="font-extrabold text-xl sm:text-2xl text-white tracking-wider">{step.title}</h3>
                <p className="sm:text-lg text-white mt-1 mb-10 font-semibold">{step.desc}</p>
                <div className="absolute -bottom-9 left-1/2 transform  -translate-x-1/2 duration-200 ease-in-out bg-brand p-6 w-fit rounded-full text-white">
                  <ArrowRight className="-rotate-45 group-hover:rotate-0 duration-300 size-4 md:size-6" />
                </div>
              </div>
            </div>

          ))}
        </div>
      </div>
     </div>
    </section>
  );
}
