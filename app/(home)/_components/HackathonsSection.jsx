"use client"

import { Trophy, Calendar, Users, DollarSign, Clock, Award, Code, Zap } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function HackathonsSection() {
  const hackathons = [
    {
      id: 1,
      title: "AI Innovation Challenge",
      description: "Build innovative AI solutions for real-world problems",
      date: "2024-02-15",
      duration: "48 hours",
      participants: 500,
      prize: "$10,000",
      status: "upcoming",
      difficulty: "Advanced",
      skills: ["Machine Learning", "Python", "TensorFlow", "Data Science"],
      organizer: "TechCorp AI",
      location: "Virtual",
      featured: true
    },
    {
      id: 2,
      title: "Web3 Development Sprint",
      description: "Create decentralized applications on blockchain",
      date: "2024-02-20",
      duration: "72 hours",
      participants: 300,
      prize: "$7,500",
      status: "upcoming",
      difficulty: "Intermediate",
      skills: ["Solidity", "Web3.js", "React", "Ethereum"],
      organizer: "Blockchain Hub",
      location: "San Francisco, CA",
      featured: true
    },
    {
      id: 3,
      title: "Mobile App Hackathon",
      description: "Develop mobile applications for social impact",
      date: "2024-01-28",
      duration: "24 hours",
      participants: 200,
      prize: "$5,000",
      status: "completed",
      difficulty: "Beginner",
      skills: ["React Native", "Flutter", "iOS", "Android"],
      organizer: "Mobile Masters",
      location: "New York, NY",
      featured: false
    },
    {
      id: 4,
      title: "Cybersecurity Defense",
      description: "Test your security skills in simulated environments",
      date: "2024-03-10",
      duration: "36 hours",
      participants: 150,
      prize: "$8,000",
      status: "upcoming",
      difficulty: "Advanced",
      skills: ["Penetration Testing", "Network Security", "Cryptography"],
      organizer: "SecureTech",
      location: "Virtual",
      featured: false
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'bg-green-100 text-green-800';
      case 'ongoing': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-brand/5 to-secondary/10">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Hackathons & Competitions
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Test your skills, build amazing projects, and win prizes in our exciting hackathons
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {hackathons.map((hackathon, index) => (
            <motion.div
              key={hackathon.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative bg-white rounded-2xl p-6 border-2 ${
                hackathon.featured ? 'border-brand' : 'border-gray-100'
              } hover:border-brand/50`}
            >
              {hackathon.featured && (
                <div className="absolute -top-3 left-6 bg-brand text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center space-x-1">
                  <Trophy className="w-4 h-4" />
                  <span>Featured</span>
                </div>
              )}

              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{hackathon.title}</h3>
                  <p className="text-gray-600 mb-3">{hackathon.description}</p>
                  <p className="text-sm text-brand font-semibold">{hackathon.organizer}</p>
                </div>
                <div className="flex flex-col space-y-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(hackathon.status)}`}>
                    {hackathon.status.charAt(0).toUpperCase() + hackathon.status.slice(1)}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(hackathon.difficulty)}`}>
                    {hackathon.difficulty}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{new Date(hackathon.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{hackathon.duration}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Users className="w-4 h-4" />
                  <span>{hackathon.participants} participants</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <DollarSign className="w-4 h-4" />
                  <span className="font-semibold text-green-600">{hackathon.prize}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {hackathon.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="bg-brand/10 text-brand px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <Code className="w-4 h-4" />
                  <span>{hackathon.location}</span>
                </div>
                {hackathon.status === 'upcoming' ? (
                  <Link
                    href={`/hackathons/${hackathon.id}`}
                    className="bg-brand text-white px-6 py-2 rounded-full font-semibold hover:bg-brand/90 transition-colors duration-300 flex items-center space-x-2"
                  >
                    <Zap className="w-4 h-4" />
                    <span>Join Now</span>
                  </Link>
                ) : (
                  <button
                    disabled
                    className="bg-gray-300 text-gray-500 px-6 py-2 rounded-full font-semibold cursor-not-allowed"
                  >
                    {hackathon.status === 'completed' ? 'Completed' : 'In Progress'}
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/hackathons"
            className="inline-flex items-center space-x-2 bg-white text-brand px-8 py-3 rounded-full font-semibold hover:bg-gray-50 transition-colors duration-300 border-2 border-brand"
          >
            <Trophy className="w-5 h-5" />
            <span>View All Hackathons</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
