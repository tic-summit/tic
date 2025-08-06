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
      icon: <Icon icon="game-icons:archive-register" className="text-brand" width="64" height="64" />,
      title: "Register",
      desc: "Choose your tech domain"
    },
    {
      icon: <Icon icon="emojione-v1:closed-book" width="64" height="64" />,
      title: "Learn",
      desc: "Access courses"
    },
    {
      icon: <Icon icon="ic:outline-build-circle" className="text-brand" width="64" height="64" />,
      title: "Build",
      desc: "Work on hands-on projects"
    },
    {
      icon: <Icon icon="streamline-ultimate-color:award-trophy-1" className="text-brand" width="64" height="64" />,
      title: "Compete",
      desc: "Join hackathons"
    },

  ];

  return (
    <section className="py-24 px-4">
      <div className="max-w-[1320px] mx-auto px-2 text-center">
        <h1 className="font-bold text-xl  md:text-4xl">Tic Learning Path</h1>
        <div className="text-sm text-gray-500 mt-4">Class odio natoque sociosqu etiam tempor orci. Sem et tortor consequat id.<br/> Fermentum egestas tellus. Nunc eu hendrerit turpis. Fusce non lectus sem In pellentesque nunc.</div>
        <div
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 md:gap-4 mt-8 w-full"

        >
          {steps.map((step, index) => (
            <div
              key={index}
              className="w-full  group"

            >
              <div className="relative w-full  p-6 rounded-lg border border-gray-200 text-center group-group-hover:rounded-b-xl group-hover:border-brand group-hover:border-b-8 transition-all duration-300">
                <div className="mx-auto w-full  py-3 text-gray-900 flex items-center justify-center mb-2">
                {step.icon}
              </div>
              <h3 className="font-bold text-xl">{step.title}</h3>
              <p className="text-lg text-gray-500 mt-1 mb-10">{step.desc}</p>
              <div className="absolute -bottom-9 left-1/2 transform  -translate-x-1/2 duration-200 ease-in-out bg-brand p-6 w-fit rounded-full text-white">
                <ArrowRight className="-rotate-45 group-hover:rotate-0 duration-300" />
              </div>
              </div>
            </div>

          ))}
        </div>
      </div>
    </section>
  );
}
