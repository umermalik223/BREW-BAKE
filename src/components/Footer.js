// File: src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer = ({ darkMode }) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const socialVariants = {
    hidden: { scale: 0 },
    visible: { 
      scale: 1,
      transition: { 
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    },
    hover: { 
      scale: 1.2,
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.9 }
  };

  return (
    <motion.footer
      className={`mt-auto ${darkMode ? 'bg-neutral-800' : 'bg-[#E6E0D4]'}`}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
    >
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Logo and Description */}
          <motion.div variants={itemVariants}>
            <Link to="/" className="inline-block mb-4">
              <h2 className={`text-2xl font-serif font-bold ${darkMode ? 'text-white' : 'text-[#8B5A2B]'}`}>
                BREW & BAKE
              </h2>
            </Link>
            <p className={`mb-6 max-w-md ${darkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>
              Handcrafted coffee and freshly baked goods made with quality ingredients and passion.
            </p>
            
            <div className="flex space-x-4">
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  darkMode ? 'bg-neutral-700 text-white hover:bg-[#C87941]' : 'bg-white text-[#8B5A2B] hover:bg-[#8B5A2B] hover:text-white'
                } transition-colors duration-300`}
                variants={socialVariants}
                whileHover="hover"
                whileTap="tap"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </motion.a>
              
              <motion.a
                href="https://facebook.com"
                target="_blank"
                rel="noreferrer"
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  darkMode ? 'bg-neutral-700 text-white hover:bg-[#C87941]' : 'bg-white text-[#8B5A2B] hover:bg-[#8B5A2B] hover:text-white'
                } transition-colors duration-300`}
                variants={socialVariants}
                whileHover="hover"
                whileTap="tap"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </motion.a>
              
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  darkMode ? 'bg-neutral-700 text-white hover:bg-[#C87941]' : 'bg-white text-[#8B5A2B] hover:bg-[#8B5A2B] hover:text-white'
                } transition-colors duration-300`}
                variants={socialVariants}
                whileHover="hover"
                whileTap="tap"
                aria-label="Twitter"
              >
                <Twitter size={18} />
              </motion.a>
            </div>
          </motion.div>
          
          {/* Quick Links */}
          <motion.div variants={itemVariants}>
            <h3 className={`text-lg font-bold mb-6 ${darkMode ? 'text-white' : 'text-[#2E1503]'}`}>
              Quick Links
            </h3>
            <ul className="space-y-3">
              {['Home', 'Menu', 'About Us', 'Contact'].map((item, index) => (
                <motion.li 
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link 
                    to={item === 'Home' ? '/' : `/${item.toLowerCase().replace(' ', '-')}`}
                    className={`${darkMode ? 'text-neutral-300 hover:text-white' : 'text-neutral-600 hover:text-[#8B5A2B]'} transition-colors duration-300`}
                  >
                    {item}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>
          
          {/* Contact Info */}
          <motion.div variants={itemVariants}>
            <h3 className={`text-lg font-bold mb-6 ${darkMode ? 'text-white' : 'text-[#2E1503]'}`}>
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex">
                <MapPin className={`mr-3 mt-1 ${darkMode ? 'text-[#C87941]' : 'text-[#8B5A2B]'}`} size={18} />
                <span className={darkMode ? 'text-neutral-300' : 'text-neutral-600'}>
                  123 Coffee Lane, Bakery District<br />
                  City, State 12345
                </span>
              </li>
              <li className="flex">
                <Phone className={`mr-3 mt-1 ${darkMode ? 'text-[#C87941]' : 'text-[#8B5A2B]'}`} size={18} />
                <span className={darkMode ? 'text-neutral-300' : 'text-neutral-600'}>
                  (123) 456-7890
                </span>
              </li>
              <li className="flex">
                <Mail className={`mr-3 mt-1 ${darkMode ? 'text-[#C87941]' : 'text-[#8B5A2B]'}`} size={18} />
                <span className={darkMode ? 'text-neutral-300' : 'text-neutral-600'}>
                  hello@brewandbake.com
                </span>
              </li>
            </ul>
          </motion.div>
          
          {/* Hours */}
          <motion.div variants={itemVariants}>
            <h3 className={`text-lg font-bold mb-6 ${darkMode ? 'text-white' : 'text-[#2E1503]'}`}>
              Opening Hours
            </h3>
            <ul className="space-y-4">
              <li className="flex">
                <Clock className={`mr-3 mt-1 ${darkMode ? 'text-[#C87941]' : 'text-[#8B5A2B]'}`} size={18} />
                <div className={darkMode ? 'text-neutral-300' : 'text-neutral-600'}>
                  <p><span className="font-medium">Monday - Friday:</span> 7:00 AM - 8:00 PM</p>
                  <p><span className="font-medium">Saturday - Sunday:</span> 8:00 AM - 9:00 PM</p>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>
        
        <motion.div 
          className={`mt-12 pt-6 border-t ${darkMode ? 'border-neutral-700 text-neutral-400' : 'border-neutral-300 text-neutral-500'} text-center`}
          variants={itemVariants}
        >
          <p>© {new Date().getFullYear()} Brew & Bake. All Rights Reserved.</p>
        </motion.div>
      </div>
    </motion.footer>
  );
};

export default Footer;