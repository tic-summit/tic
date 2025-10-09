"use client"

import { Mail, Send, CheckCircle, ArrowRight, Users } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate subscription
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 3000);
  };

  const benefits = [
    "Weekly tech industry insights",
    "Exclusive course discounts",
    "Job opportunities and internships",
    "Latest hackathon announcements",
    "Expert tips and tutorials"
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-brand to-secondary">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Stay Updated with Our Newsletter
            </h2>
            <p className="text-lg mb-8 opacity-90">
              Get the latest updates on courses, hackathons, internships, and industry insights delivered straight to your inbox.
            </p>

            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="flex items-center space-x-3"
                >
                  <CheckCircle className="w-5 h-5 text-green-300 flex-shrink-0" />
                  <span className="text-white/90">{benefit}</span>
                </motion.div>
              ))}
            </div>

            <div className="flex items-center space-x-4 text-sm opacity-75">
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4" />
                <span>50,000+ subscribers</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-4 h-4" />
                <span>Weekly updates</span>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Newsletter Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="bg-white rounded-2xl p-8 shadow-2xl"
          >
            <div className="text-center mb-6">
              <div className="bg-brand/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="w-8 h-8 text-brand" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Join Our Community
              </h3>
              <p className="text-gray-600">
                Never miss out on opportunities and updates
              </p>
            </div>

            {isSubscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  Successfully Subscribed!
                </h4>
                <p className="text-gray-600">
                  Thank you for joining our newsletter. Check your email for confirmation.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all duration-300"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label htmlFor="interests" className="block text-sm font-medium text-gray-700 mb-2">
                    Areas of Interest (Optional)
                  </label>
                  <select
                    id="interests"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all duration-300"
                  >
                    <option value="">Select your interests</option>
                    <option value="web-development">Web Development</option>
                    <option value="data-science">Data Science</option>
                    <option value="mobile-development">Mobile Development</option>
                    <option value="cybersecurity">Cybersecurity</option>
                    <option value="ai-ml">AI & Machine Learning</option>
                    <option value="devops">DevOps</option>
                    <option value="all">All Areas</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="w-full bg-brand text-white py-3 px-6 rounded-lg font-semibold hover:bg-brand/90 transition-colors duration-300 flex items-center justify-center space-x-2"
                >
                  <Send className="w-5 h-5" />
                  <span>Subscribe Now</span>
                </button>

                <p className="text-xs text-gray-500 text-center">
                  By subscribing, you agree to our privacy policy. You can unsubscribe at any time.
                </p>
              </form>
            )}

            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>No spam</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Easy unsubscribe</span>
                </div>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Weekly updates</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
