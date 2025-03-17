import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { toast } from 'react-toastify'; // Import toast
import { FaUser } from 'react-icons/fa';

const Footer = ({ theme }) => {
  const handleHover = () => {
    toast.info('This feature is coming soon!');
  };

  return (
    <footer
      className={`body-font ${
        theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600'
      } py-6`}
    >
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex flex-col items-center gap-4">
          {/* Logo Section */}
          <div className="flex items-center gap-2 text-indigo-600 font-bold text-lg">
            <FontAwesomeIcon icon={faShoppingCart} className="text-xl" />
            <span>CampusCart</span>
          </div>

          {/* Footer Links */}
          <div className="flex flex-wrap justify-center gap-6 text-gray-600 text-sm">
            <Link href="/about" className="hover:text-indigo-600 transition-colors">
              About
            </Link>
            <Link href="/contact" className="hover:text-indigo-600 transition-colors">
              Contact
            </Link>
            <Link href="/help" className="hover:text-indigo-600 transition-colors">
              Help
            </Link>
            <Link href="/privacy" className="hover:text-indigo-600 transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-indigo-600 transition-colors">
              Terms
            </Link>
          </div>

          {/* Copyright */}
          <div className="text-gray-500 text-xs sm:text-sm text-center">
            © 2025 CampusCart. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
