"use client"

import { Icon } from "@iconify/react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function MentorsSection() {
  const mentors = [
    {
      id: 1,
      name: "Dr. Sarah Chen",
      title: "Senior Software Engineer",
      company: "Google",
      experience: "8 years",
      rating: 4.9,
      students: 1200,
      specialties: ["Machine Learning", "Python", "Data Science"],
      image: "https://randomuser.me/api/portraits/women/1.jpg",
      bio: "Expert in AI and machine learning with 8+ years at Google. Passionate about teaching and helping students build real-world applications.",
      verified: true
    },
    {
      id: 2,
      name: "Michael Rodriguez",
      title: "Lead Frontend Developer",
      company: "Meta",
      experience: "6 years",
      rating: 4.8,
      students: 950,
      specialties: ["React", "JavaScript", "TypeScript"],
      image: "https://randomuser.me/api/portraits/men/2.jpg",
      bio: "Frontend specialist with extensive experience in React ecosystem. Loves mentoring developers and sharing best practices.",
      verified: true
    },
    {
      id: 3,
      name: "Emily Johnson",
      title: "DevOps Engineer",
      company: "Amazon Web Services",
      experience: "7 years",
      rating: 4.9,
      students: 800,
      specialties: ["AWS", "Docker", "Kubernetes"],
      image: "https://randomuser.me/api/portraits/women/3.jpg",
      bio: "Cloud infrastructure expert helping students master modern DevOps practices and cloud technologies.",
      verified: true
    },
    {
      id: 4,
      name: "David Kim",
      title: "Product Manager",
      company: "Microsoft",
      experience: "5 years",
      rating: 4.7,
      students: 650,
      specialties: ["Product Strategy", "User Research", "Agile"],
      image: "https://randomuser.me/api/portraits/men/4.jpg",
      bio: "Product management expert with a focus on user-centered design and data-driven decision making.",
      verified: true
    },
    {
      id: 5,
      name: "Lisa Wang",
      title: "Cybersecurity Analyst",
      company: "IBM Security",
      experience: "9 years",
      rating: 4.8,
      students: 720,
      specialties: ["Security", "Penetration Testing", "Risk Assessment"],
      image: "https://randomuser.me/api/portraits/women/5.jpg",
      bio: "Cybersecurity professional dedicated to teaching students how to protect systems and data in the digital age.",
      verified: true
    },
    {
      id: 6,
      name: "James Wilson",
      title: "Full Stack Developer",
      company: "Netflix",
      experience: "6 years",
      rating: 4.9,
      students: 1100,
      specialties: ["Node.js", "React", "Microservices"],
      image: "https://randomuser.me/api/portraits/men/6.jpg",
      bio: "Full-stack developer with expertise in scalable web applications and modern development practices.",
      verified: true
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Learn from Industry Experts
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get mentored by professionals from top tech companies who are passionate about sharing their knowledge
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {mentors.map((mentor, index) => (
            <motion.div
              key={mentor.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-brand/20"
            >
              <div className="text-center mb-6">
                <div className="relative inline-block">
                  <img
                    src={mentor.image}
                    alt={mentor.name}
                    className="w-20 h-20 rounded-full object-cover mx-auto mb-4 border-4 border-brand/20"
                  />
                  {mentor.verified && (
                    <div className="absolute -top-2 -right-2 bg-brand text-white rounded-full p-1">
                      <Icon icon="solar:verified-check-outline" className="w-4 h-4" />
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-1">{mentor.name}</h3>
                <p className="text-brand font-semibold mb-1">{mentor.title}</p>
                <p className="text-sm text-gray-600">{mentor.company}</p>
              </div>

              <p className="text-gray-600 text-sm mb-4 text-center">{mentor.bio}</p>

              <div className="flex items-center justify-center space-x-4 mb-4">
                <div className="flex items-center space-x-1">
                  <Icon icon="solar:star-outline" className="w-4 h-4 text-yellow-400" />
                  <span className="text-sm font-medium text-gray-600">{mentor.rating}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon icon="solar:users-group-rounded-outline" className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{mentor.students} students</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Icon icon="solar:suitcase-outline" className="w-4 h-4 text-gray-400" />
                  <span className="text-sm text-gray-600">{mentor.experience}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-6 justify-center">
                {mentor.specialties.map((specialty, specialtyIndex) => (
                  <span
                    key={specialtyIndex}
                    className="bg-brand/10 text-brand px-3 py-1 rounded-full text-xs font-medium"
                  >
                    {specialty}
                  </span>
                ))}
              </div>

              <div className="flex space-x-2">
                <button className="flex-1 bg-brand text-white py-2 px-4 rounded-full font-semibold hover:bg-brand/90 text-sm">
                  Book Session
                </button>
                <button className="flex-1 border border-brand text-brand py-2 px-4 rounded-full font-semibold hover:bg-brand/10 text-sm flex items-center justify-center space-x-1">
                  <Icon icon="solar:chat-round-outline" className="w-4 h-4" />
                  <span>Message</span>
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/mentor"
            className="inline-flex items-center space-x-2 bg-gray-100 text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-200"
          >
            <Icon icon="solar:users-group-rounded-outline" className="w-5 h-5" />
            <span>View All Mentors</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

