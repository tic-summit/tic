"use client"

import { Icon } from "@iconify/react";
import { 
  BookOpen, 
  Code, 
  Users, 
  Trophy, 
  Briefcase, 
  Headphones, 
  Clock, 
  Shield,
  Zap,
  Target,
  Globe,
  Award
} from "lucide-react";
import { motion } from "framer-motion";

export default function FeaturesSection() {
  const features = [
    {
      icon: <BookOpen className="w-8 h-8 text-brand" />,
      title: "Comprehensive Courses",
      description: "Learn from industry experts with our extensive library of courses covering all major technologies and frameworks.",
      color: "from-blue-500 to-blue-600"
    },
    {
      icon: <Code className="w-8 h-8 text-brand" />,
      title: "Hands-on Projects",
      description: "Build real-world projects and portfolios that showcase your skills to potential employers.",
      color: "from-green-500 to-green-600"
    },
    {
      icon: <Users className="w-8 h-8 text-brand" />,
      title: "Expert Mentorship",
      description: "Get personalized guidance from industry professionals who have walked the path you're on.",
      color: "from-purple-500 to-purple-600"
    },
    {
      icon: <Trophy className="w-8 h-8 text-brand" />,
      title: "Hackathons & Competitions",
      description: "Participate in coding competitions and hackathons to test your skills and win prizes.",
      color: "from-yellow-500 to-yellow-600"
    },
    {
      icon: <Briefcase className="w-8 h-8 text-brand" />,
      title: "Career Placement",
      description: "Connect with top companies through our job placement program and internship opportunities.",
      color: "from-red-500 to-red-600"
    },
    {
      icon: <Headphones className="w-8 h-8 text-brand" />,
      title: "24/7 Support",
      description: "Get help whenever you need it with our round-the-clock support team and community forums.",
      color: "from-indigo-500 to-indigo-600"
    },
    {
      icon: <Clock className="w-8 h-8 text-brand" />,
      title: "Flexible Learning",
      description: "Learn at your own pace with flexible schedules that fit your lifestyle and commitments.",
      color: "from-pink-500 to-pink-600"
    },
    {
      icon: <Shield className="w-8 h-8 text-brand" />,
      title: "Industry Certifications",
      description: "Earn recognized certifications that validate your skills and boost your career prospects.",
      color: "from-teal-500 to-teal-600"
    },
    {
      icon: <Zap className="w-8 h-8 text-brand" />,
      title: "Fast Track Programs",
      description: "Accelerate your learning with intensive bootcamps designed for quick skill acquisition.",
      color: "from-orange-500 to-orange-600"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Why Choose Our Platform?
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We provide everything you need to succeed in your tech career journey, from learning to landing your dream job.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-brand/20"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              
              <div className="relative z-10">
                <div className="bg-gradient-to-br from-brand/10 to-brand/5 p-4 rounded-xl w-fit mb-6 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-brand transition-colors duration-300">
                  {feature.title}
                </h3>
                
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-brand to-secondary rounded-2xl p-8 text-white"
          >
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-lg mb-6 opacity-90">
              Join thousands of successful learners and transform your career today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-brand px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition-colors duration-300">
                Start Learning Now
              </button>
              <button className="border-2 border-white text-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-brand transition-colors duration-300">
                Explore Courses
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
