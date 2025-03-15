// File: src/components/Navbar.js
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MenuIcon, X } from 'lucide-react';

const Navbar = ({ darkMode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navbarClasses = `
    fixed top-0 left-0 w-full z-50 transition-all duration-300
    ${scrolled 
      ? `${darkMode ? 'bg-neutral-900/95 shadow-lg shadow-neutral-800/30' : 'bg-white/95 shadow-lg shadow-neutral-200/30'}` 
      : `${darkMode ? 'bg-transparent' : 'bg-transparent'}`}
  `;

  const linkClasses = `
    relative text-lg font-medium transition-colors duration-300
    ${darkMode ? 'text-neutral-200 hover:text-white' : 'text-neutral-700 hover:text-[#8B5A2B]'}
  `;

  const activeLink = `
    after:content-[''] after:absolute after:bottom-0 after:left-0 after:h-0.5 after:rounded
    ${darkMode 
      ? 'text-white after:bg-white after:w-full' 
      : 'text-[#8B5A2B] after:bg-[#8B5A2B] after:w-full'}
  `;

  // Animation variants
  const navVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0 }
  };

  const logoVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  // Navigation links
  const navLinks = [
    { path: '/', label: 'HOME' },
    { path: '/menu', label: 'MENU' },
    { path: '/about', label: 'ABOUT' },
    { path: '/contact', label: 'CONTACT' }
  ];

  return (
    <motion.nav 
      className={navbarClasses}
      initial="hidden"
      animate="visible"
      variants={navVariants}
    >
      <div className="container mx-auto px-4 md:px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <motion.div variants={logoVariants}>
          <Link to="/" className="flex items-center">
            <h1 className={`text-2xl md:text-3xl font-serif font-bold ${darkMode ? 'text-white' : 'text-[#8B5A2B]'}`}>
              BREW & BAKE
            </h1>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex space-x-8">
          {navLinks.map((link) => (
            <motion.div key={link.path} variants={itemVariants}>
              <Link 
                to={link.path} 
                className={`${linkClasses} ${location.pathname === link.path ? activeLink : ''}`}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
          <motion.div variants={itemVariants}>
            <Link 
              to="/order" 
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300
                ${darkMode 
                  ? 'bg-[#C87941] text-white hover:bg-[#96694F]' 
                  : 'bg-[#8B5A2B] text-white hover:bg-[#6a4522]'}`}
            >
              ORDER NOW
            </Link>
          </motion.div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button 
            onClick={() => setIsOpen(!isOpen)}
            className={`p-2 rounded-md ${darkMode ? 'text-white' : 'text-[#8B5A2B]'}`}
            aria-label="Toggle menu"
          >
            {isOpen ? (
              <X size={28} className="transition-all duration-300 ease-in-out" />
            ) : (
              <MenuIcon size={28} className="transition-all duration-300 ease-in-out" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          className={`md:hidden ${darkMode ? 'bg-neutral-800' : 'bg-white'} shadow-lg`}
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`${linkClasses} py-2 block text-center ${location.pathname === link.path ? activeLink : ''}`}
              >
                {link.label}
              </Link>
            ))}
            <Link 
              to="/order" 
              className={`px-6 py-3 rounded-full font-medium text-center
                ${darkMode 
                  ? 'bg-[#C87941] text-white' 
                  : 'bg-[#8B5A2B] text-white'}`}
            >
              ORDER NOW
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;