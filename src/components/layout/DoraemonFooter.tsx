import React from 'react';
import { Link } from 'react-router-dom';
import { Pocket, Shield, Info, MessageSquare } from 'lucide-react'; // Example icons, can be themed

const DoraemonFooter: React.FC = () => {
  console.log('DoraemonFooter loaded');

  const footerLinks = [
    { name: 'About Us', path: '/about', icon: <Info className="w-4 h-4 mr-1" /> },
    { name: 'Contact', path: '/contact', icon: <MessageSquare className="w-4 h-4 mr-1" /> },
    { name: 'Terms of Service', path: '/terms', icon: <Shield className="w-4 h-4 mr-1" /> },
    { name: 'Privacy Policy', path: '/privacy', icon: <Pocket className="w-4 h-4 mr-1" /> }, // Using Pocket as a Doraemon-esque icon
  ];

  return (
    <footer className="bg-blue-500 text-white py-8 px-4 sm:px-6 lg:px-8 border-t-4 border-red-500">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Column 1: Branding/Logo Placeholder */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-2xl font-bold mb-2 flex items-center">
              <img src="https://placehold.co/40x40/FFDD57/333?text=D" alt="Doraemon Icon" className="mr-2 rounded-full" /> {/* Placeholder Doraemon-esque icon */}
              Doraemon's Restaurant
            </h3>
            <p className="text-sm text-blue-100 text-center md:text-left">
              Your magical food adventure starts here!
            </p>
            {/* Placeholder for subtle character graphic or pattern */}
            {/* Example: <img src="/path/to/doraemon-footer-graphic.png" alt="Doraemon decoration" className="mt-4 h-12" /> */}
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-3 text-yellow-300">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="hover:text-yellow-300 transition-colors duration-200 flex items-center text-blue-50"
                  >
                    {link.icon}
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact/Social Placeholder */}
          <div>
            <h4 className="text-lg font-semibold mb-3 text-yellow-300">Connect With Us</h4>
            <p className="text-sm text-blue-100 mb-2">
              123 Anywhere Street, Future City
            </p>
            <p className="text-sm text-blue-100 mb-4">
              Email: order@doraemonrestaurant.magic
            </p>
            {/* Placeholder for social media icons */}
            <div className="flex space-x-3">
              {/* Example: <a href="#" className="hover:text-yellow-300"><Facebook className="w-6 h-6" /></a> */}
            </div>
          </div>
        </div>

        <div className="border-t border-blue-400 pt-6 text-center text-sm text-blue-200">
          <p>&copy; {new Date().getFullYear()} Doraemon's Magical Restaurant. All rights reserved.</p>
          <p className="mt-1">Inspired by the world of Doraemon!</p>
        </div>
      </div>
    </footer>
  );
};

export default DoraemonFooter;