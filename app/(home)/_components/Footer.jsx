"use client"

import { Icon } from "@iconify/react";
import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { name: "Courses", href: "/courses" },
    { name: "Internships", href: "/internships" },
    { name: "Hackathons", href: "/hackathons" },
    { name: "Community", href: "/community" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" }
  ];

  const socialLinks = [
    { name: "Facebook", icon: "solar:facebook-outline", href: "#" },
    { name: "Twitter", icon: "solar:twitter-outline", href: "#" },
    { name: "Instagram", icon: "solar:instagram-outline", href: "#" },
    { name: "LinkedIn", icon: "solar:linkedin-outline", href: "#" }
  ];

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-4 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-brand p-2 rounded-lg">
                <Icon icon="solar:flash-outline" className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold">TicSummit</span>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Empowering the next generation of tech talent through comprehensive learning and real-world projects.
            </p>
            <div className="flex items-center space-x-3 text-sm text-gray-600">
              <Icon icon="solar:letter-unread-outline" className="w-4 h-4 text-brand" />
              <span>hello@ticsummit.com</span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <div className="grid grid-cols-2 gap-2">
              {footerLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="text-gray-600 hover:text-brand text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-gray-600 hover:text-brand"
                  aria-label={social.name}
                >
                  <Icon icon={social.icon} className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-200 pt-6">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-2 md:space-y-0">
            <p className="text-sm text-gray-500">
              &copy; {currentYear} TicSummit. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 text-sm">
              <Link href="/privacy" className="text-gray-500 hover:text-brand">
                Privacy
              </Link>
              <Link href="/terms" className="text-gray-500 hover:text-brand">
                Terms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}