"use client"

import { Briefcase, MapPin, Clock, DollarSign, Users, Star } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function InternshipsSection() {
  const internships = [
    {
      id: 1,
      title: "Software Engineering Intern",
      company: "TechCorp Solutions",
      location: "San Francisco, CA",
      type: "Remote",
      duration: "3 months",
      salary: "$3,000/month",
      applicants: 245,
      rating: 4.8,
      description: "Work on cutting-edge web applications using React and Node.js",
      skills: ["React", "Node.js", "JavaScript", "MongoDB"],
      logo: "https://via.placeholder.com/60x60/1e1a4d/ffffff?text=TC",
      featured: true
    },
    {
      id: 2,
      title: "Data Science Intern",
      company: "DataFlow Inc",
      location: "New York, NY",
      type: "Hybrid",
      duration: "6 months",
      salary: "$2,500/month",
      applicants: 189,
      rating: 4.6,
      description: "Analyze large datasets and build machine learning models",
      skills: ["Python", "Machine Learning", "SQL", "TensorFlow"],
      logo: "https://via.placeholder.com/60x60/162456/ffffff?text=DF",
      featured: false
    },
    {
      id: 3,
      title: "UX/UI Design Intern",
      company: "Creative Studio",
      location: "Austin, TX",
      type: "On-site",
      duration: "4 months",
      salary: "$2,200/month",
      applicants: 156,
      rating: 4.7,
      description: "Design user interfaces for mobile and web applications",
      skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
      logo: "https://via.placeholder.com/60x60/1e1a4d/ffffff?text=CS",
      featured: true
    },
    {
      id: 4,
      title: "DevOps Engineering Intern",
      company: "CloudTech Systems",
      location: "Seattle, WA",
      type: "Remote",
      duration: "5 months",
      salary: "$2,800/month",
      applicants: 98,
      rating: 4.9,
      description: "Manage cloud infrastructure and deployment pipelines",
      skills: ["AWS", "Docker", "Kubernetes", "CI/CD"],
      logo: "https://via.placeholder.com/60x60/162456/ffffff?text=CT",
      featured: false
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Internship Opportunities
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Gain real-world experience with top companies and build your professional network
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
          {internships.map((internship, index) => (
            <motion.div
              key={internship.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={`relative bg-white rounded-2xl p-6 border-2 ${
                internship.featured ? 'border-brand' : 'border-gray-100'
              } hover:border-brand/50`}
            >
              {internship.featured && (
                <div className="absolute -top-3 left-6 bg-brand text-white px-3 py-1 rounded-full text-sm font-semibold">
                  Featured
                </div>
              )}

              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-4">
                  <img
                    src={internship.logo}
                    alt={internship.company}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{internship.title}</h3>
                    <p className="text-brand font-semibold">{internship.company}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-1">
                  <Star className="w-4 h-4 text-yellow-400 fill-current" />
                  <span className="text-sm font-medium text-gray-600">{internship.rating}</span>
                </div>
              </div>

              <p className="text-gray-600 mb-4">{internship.description}</p>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <MapPin className="w-4 h-4" />
                  <span>{internship.location}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{internship.duration}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Briefcase className="w-4 h-4" />
                  <span>{internship.type}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <DollarSign className="w-4 h-4" />
                  <span>{internship.salary}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {internship.skills.map((skill, skillIndex) => (
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
                  <Users className="w-4 h-4" />
                  <span>{internship.applicants} applicants</span>
                </div>
                <Link
                  href={`/internships/${internship.id}`}
                  className="bg-brand text-white px-6 py-2 rounded-full font-semibold hover:bg-brand/90"
                >
                  Apply Now
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/internships"
            className="inline-flex items-center space-x-2 bg-gray-100 text-gray-900 px-8 py-3 rounded-full font-semibold hover:bg-gray-200"
          >
            <span>View All Internships</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
