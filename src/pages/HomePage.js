// File: src/pages/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import BestsellersSection from '../components/BestsellersSection';
import ReviewsCarousel from '../components/ReviewsCarousel';
import NewsletterSignup from '../components/NewsletterSignup';

const HomePage = ({ darkMode }) => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.3,
        duration: 0.5
      }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.8, ease: [0.6, 0.05, 0.01, 0.99] }
    }
  };

  const textRevealVariants = {
    hidden: { opacity: 0, y: 75 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8, 
        ease: [0.6, 0.05, 0.01, 0.99],
      }
    }
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.8, 
        ease: [0.6, 0.05, 0.01, 0.99] 
      }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5, 
        delay: 1.2 
      }
    },
    hover: {
      scale: 1.05,
      backgroundColor: darkMode ? "#96694F" : "#6a4522",
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.95 }
  };

  return (
    <motion.div
      className="pt-24"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Hero Section */}
      <section className={`min-h-[80vh] flex items-center overflow-hidden ${darkMode ? 'bg-neutral-800' : 'bg-[#E6E0D4]/20'}`}>
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-20">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <motion.div
              className="flex flex-col space-y-6"
              variants={itemVariants}
            >
              <div className="overflow-hidden">
                <motion.h1 
                  className={`text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight ${darkMode ? 'text-white' : 'text-[#8B5A2B]'}`}
                  variants={textRevealVariants}
                >
                  Handcrafted
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1 
                  className={`text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight ${darkMode ? 'text-white' : 'text-[#8B5A2B]'}`}
                  variants={textRevealVariants}
                >
                  Coffee &
                </motion.h1>
              </div>
              <div className="overflow-hidden">
                <motion.h1 
                  className={`text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight ${darkMode ? 'text-white' : 'text-[#8B5A2B]'}`}
                  variants={textRevealVariants}
                >
                  Fresh Bakes
                </motion.h1>
              </div>
              
              <motion.p 
                className={`text-lg md:text-xl max-w-md ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}
                variants={itemVariants}
              >
                Where every cup and bite tells a story of passion, craftsmanship, and the finest ingredients.
              </motion.p>
              
              <motion.div variants={buttonVariants}>
                <Link 
                  to="/menu"
                  className={`inline-block px-8 py-4 rounded-full text-white font-medium text-lg transition-all
                    ${darkMode ? 'bg-[#C87941]' : 'bg-[#8B5A2B]'}`}
                >
                  EXPLORE MENU
                </Link>
              </motion.div>
            </motion.div>
            
            <motion.div
              className="relative hidden md:block h-[500px]"
              variants={imageVariants}
            >
              <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-[#D2B48C]/70"></div>
              <div className="absolute bottom-0 left-10 w-[350px] h-[350px] rounded-full bg-[#8B5A2B]/40"></div>
              <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] rounded-full border-2 border-[#96694F]/30"></div>
              
              <motion.div 
                className="absolute inset-0 flex items-center justify-center"
                initial={{ rotate: -5, y: 0 }}
                animate={{ 
                  rotate: 5, 
                  y: [0, -10, 0],
                  transition: { 
                    rotate: { duration: 6, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" },
                    y: { duration: 3, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }
                  }
                }}
              >
                <div className="w-[280px] h-[280px] rounded-full bg-[#8B5A2B]/80 flex items-center justify-center">
                  <div className="w-[260px] h-[260px] rounded-full bg-[#C87941] flex items-center justify-center">
                    <div className="w-[200px] h-[200px] rounded-full bg-[#E6E0D4] flex items-center justify-center">
                      <div className="font-serif font-bold text-2xl text-[#8B5A2B]">BREW & BAKE</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Bestsellers Section */}
      <BestsellersSection darkMode={darkMode} />

      {/* Reviews Carousel */}
      <ReviewsCarousel darkMode={darkMode} />

      {/* Newsletter Signup */}
      <NewsletterSignup darkMode={darkMode} />
    </motion.div>
  );
};

export default HomePage;