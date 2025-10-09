"use client"

import { 
  Facebook, 
  Twitter, 
  Instagram, 
  Linkedin, 
  Youtube, 
  Mail, 
  Phone, 
  MapPin,
  ArrowRight,
  Heart,
  Code,
  BookOpen,
  Trophy,
  Briefcase,
  Users,
  Shield,
  Zap
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    platform: [
      { name: "Courses", href: "/courses" },
      { name: "Learning Paths", href: "/learning-paths" },
      { name: "Certifications", href: "/certifications" },
      { name: "Live Classes", href: "/live-classes" },
      { name: "Practice Labs", href: "/labs" }
    ],
    opportunities: [
      { name: "Internships", href: "/internships" },
      { name: "Hackathons", href: "/hackathons" },
      { name: "Job Board", href: "/jobs" },
      { name: "Mentorship", href: "/mentor" },
      { name: "Career Guidance", href: "/career-guidance" }
    ],
    community: [
      { name: "Forums", href: "/community" },
      { name: "Study Groups", href: "/study-groups" },
      { name: "Events", href: "/events" },
      { name: "Blog", href: "/blog" },
      { name: "Success Stories", href: "/success-stories" }
    ],
    support: [
      { name: "Help Center", href: "/help" },
      { name: "Contact Us", href: "/contact" },
      { name: "FAQ", href: "/faq" },
      { name: "System Status", href: "/status" },
      { name: "Report Issue", href: "/report" }
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Our Team", href: "/team" },
      { name: "Careers", href: "/careers" },
      { name: "Press", href: "/press" },
      { name: "Partners", href: "/partners" }
    ]
  };

  const socialLinks = [
    { name: "Facebook", icon: Facebook, href: "#", color: "hover:text-blue-600" },
    { name: "Twitter", icon: Twitter, href: "#", color: "hover:text-blue-400" },
    { name: "Instagram", icon: Instagram, href: "#", color: "hover:text-pink-500" },
    { name: "LinkedIn", icon: Linkedin, href: "#", color: "hover:text-blue-700" },
    { name: "YouTube", icon: Youtube, href: "#", color: "hover:text-red-600" }
  ];

  const features = [
    { icon: Code, text: "Hands-on Coding" },
    { icon: BookOpen, text: "Expert Content" },
    { icon: Trophy, text: "Achievements" },
    { icon: Briefcase, text: "Career Ready" },
    { icon: Users, text: "Community" },
    { icon: Shield, text: "Secure Learning" }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-2 mb-6">
                <div className="bg-brand p-2 rounded-lg">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <span className="text-2xl font-bold">TicSummit</span>
              </div>
              
              <p className="text-gray-300 mb-6 leading-relaxed">
                Empowering the next generation of tech talent through comprehensive learning, 
                real-world projects, and industry connections.
              </p>

              {/* Features */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-center space-x-2 text-sm text-gray-300">
                    <feature.icon className="w-4 h-4 text-brand" />
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>

              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-300">
                  <Mail className="w-4 h-4 text-brand" />
                  <span>hello@ticsummit.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <Phone className="w-4 h-4 text-brand" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-300">
                  <MapPin className="w-4 h-4 text-brand" />
                  <span>San Francisco, CA</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Platform Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-6">Platform</h3>
              <ul className="space-y-3">
                {footerLinks.platform.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-brand transition-colors duration-300 flex items-center group"
                    >
                      <span>{link.name}</span>
                      <ArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Opportunities Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-6">Opportunities</h3>
              <ul className="space-y-3">
                {footerLinks.opportunities.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-brand transition-colors duration-300 flex items-center group"
                    >
                      <span>{link.name}</span>
                      <ArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Community Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-6">Community</h3>
              <ul className="space-y-3">
                {footerLinks.community.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-brand transition-colors duration-300 flex items-center group"
                    >
                      <span>{link.name}</span>
                      <ArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Support & Company Links */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
            >
              <h3 className="text-lg font-semibold mb-6">Support</h3>
              <ul className="space-y-3 mb-8">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-brand transition-colors duration-300 flex items-center group"
                    >
                      <span>{link.name}</span>
                      <ArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>

              <h3 className="text-lg font-semibold mb-6">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <Link 
                      href={link.href}
                      className="text-gray-300 hover:text-brand transition-colors duration-300 flex items-center group"
                    >
                      <span>{link.name}</span>
                      <ArrowRight className="w-3 h-3 ml-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0"
          >
            <div className="text-center md:text-left">
              <h3 className="text-xl font-semibold mb-2">Stay Updated</h3>
              <p className="text-gray-300">Get the latest updates on courses and opportunities</p>
            </div>
            <div className="flex w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 md:w-80 px-4 py-3 bg-gray-800 border border-gray-700 rounded-l-lg focus:ring-2 focus:ring-brand focus:border-transparent outline-none text-white placeholder-gray-400"
              />
              <button className="bg-brand text-white px-6 py-3 rounded-r-lg hover:bg-brand/90 transition-colors duration-300 flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>Subscribe</span>
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-6 text-sm text-gray-400">
              <p>&copy; {currentYear} TicSummit. All rights reserved.</p>
              <div className="flex items-center space-x-4">
                <Link href="/privacy" className="hover:text-white transition-colors duration-300">
                  Privacy Policy
                </Link>
                <Link href="/terms" className="hover:text-white transition-colors duration-300">
                  Terms of Service
                </Link>
                <Link href="/cookies" className="hover:text-white transition-colors duration-300">
                  Cookie Policy
                </Link>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex items-center space-x-4">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={index}
                  href={social.href}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className={`text-gray-400 ${social.color} transition-colors duration-300`}
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Made with love */}
          <div className="text-center mt-4">
            <p className="text-sm text-gray-500 flex items-center justify-center space-x-1">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span>for the tech community</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

