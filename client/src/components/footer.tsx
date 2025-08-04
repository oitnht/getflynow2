
import { Link } from "react-router-dom";
import { Plane, Mail, Globe, Heart } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center mb-4">
              <Plane className="h-8 w-8 text-blue-400 mr-3" />
              <span className="text-2xl font-bold">GetFlyNow</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              AI-powered travel planning that makes your dream trips accessible and affordable. 
              Generate personalized itineraries in seconds, completely free.
            </p>
            <div className="flex items-center space-x-4">
              <a 
                href="mailto:oitnht@gmail.com" 
                className="flex items-center text-gray-300 hover:text-blue-400 transition-colors"
              >
                <Mail className="h-4 w-4 mr-2" />
                oitnht@gmail.com
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-blue-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <a href="#how-it-works" className="text-gray-300 hover:text-blue-400 transition-colors">
                  How It Works
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/privacy-policy" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms-of-service" className="text-gray-300 hover:text-blue-400 transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center text-gray-300 mb-4 md:mb-0">
              <Globe className="h-4 w-4 mr-2" />
              <span>Serving travelers worldwide since 2024</span>
            </div>
            <div className="flex items-center text-gray-300">
              <span>Made with</span>
              <Heart className="h-4 w-4 mx-1 text-red-400" />
              <span>for travelers everywhere</span>
            </div>
          </div>
          <div className="text-center text-gray-400 text-sm mt-4">
            <p>&copy; 2024 GetFlyNow. All rights reserved. Free AI travel planning service.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
