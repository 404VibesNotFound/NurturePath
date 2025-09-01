import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Mail } from 'lucide-react';
const Footer: React.FC = () => {
  return <footer className="bg-[#4c146c] dark:bg-gray-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="col-span-1 md:col-span-1">
            <Link to="/" className="text-2xl font-bold">
              HealthSync
            </Link>
            <p className="mt-4 text-gray-300">
              Improving healthcare coordination and vaccine management for
              better patient outcomes.
            </p>
          </div>
          {/* Quick links */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/dashboard" className="text-gray-300 hover:text-white transition-colors">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/help" className="text-gray-300 hover:text-white transition-colors">
                  Help & Support
                </Link>
              </li>
              <li>
                <Link to="/settings" className="text-gray-300 hover:text-white transition-colors">
                  Settings
                </Link>
              </li>
            </ul>
          </div>
          {/* Social links */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="hover:text-[#b083f7] transition-colors">
                <Facebook />
              </a>
              <a href="#" aria-label="Twitter" className="hover:text-[#b083f7] transition-colors">
                <Twitter />
              </a>
              <a href="#" aria-label="Instagram" className="hover:text-[#b083f7] transition-colors">
                <Instagram />
              </a>
              <a href="#" aria-label="Email" className="hover:text-[#b083f7] transition-colors">
                <Mail />
              </a>
            </div>
          </div>
          {/* Newsletter */}
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-lg font-semibold mb-4">Newsletter</h3>
            <p className="mb-4 text-gray-300">
              Stay updated with our latest features and news
            </p>
            <form className="flex">
              <input type="email" placeholder="Your email" className="px-4 py-2 rounded-l-md w-full focus:outline-none text-gray-800 dark:text-white dark:bg-gray-700" aria-label="Email for newsletter" />
              <button type="submit" className="bg-[#b083f7] px-4 py-2 rounded-r-md hover:bg-opacity-90 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300">
            © {new Date().getFullYear()} HealthSync. All rights reserved.
          </p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="text-gray-300 hover:text-white transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;