"use client"

import { Icon } from "@iconify/react";
import { Users, BookOpen, Trophy, Briefcase, Star, Award } from "lucide-react";
import { motion } from "framer-motion";

export default function StatsSection() {
  const stats = [
    {
      icon: <Users className="w-8 h-8 text-brand" />,
      number: "10,000+",
      label: "Active Students",
      description: "Learning and growing with us"
    },
    {
      icon: <BookOpen className="w-8 h-8 text-brand" />,
      number: "500+",
      label: "Courses Available",
      description: "From beginner to expert level"
    },
    {
      icon: <Trophy className="w-8 h-8 text-brand" />,
      number: "200+",
      label: "Hackathons Won",
      description: "By our talented students"
    },
    {
      icon: <Briefcase className="w-8 h-8 text-brand" />,
      number: "1,500+",
      label: "Job Placements",
      description: "Successful career transitions"
    },
    {
      icon: <Star className="w-8 h-8 text-brand" />,
      number: "4.9/5",
      label: "Average Rating",
      description: "From student feedback"
    },
    {
      icon: <Award className="w-8 h-8 text-brand" />,
      number: "50+",
      label: "Industry Partners",
      description: "Trusted by top companies"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-brand/5 to-secondary/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Trusted by Thousands of Learners
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join our community of successful learners who have transformed their careers through our platform
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-xl p-6 border border-gray-100"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-brand/10 p-3 rounded-full">
                  {stat.icon}
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900">
                    {stat.number}
                  </div>
                  <div className="text-sm font-semibold text-brand">
                    {stat.label}
                  </div>
                </div>
              </div>
              <p className="text-gray-600 text-sm mt-3">
                {stat.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
