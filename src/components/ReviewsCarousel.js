// File: src/components/ReviewsCarousel.js
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const ReviewsCarousel = ({ darkMode }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(null);
  const [isPaused, setIsPaused] = useState(false);

  // Reviews data
  const reviews = [
    {
      id: 1,
      name: 'Sarah M.',
      rating: 5,
      text: 'The almond croissants are absolutely divine! Best coffee shop in town with a warm, inviting atmosphere.'
    },
    {
      id: 2,
      name: 'James K.',
      rating: 5,
      text: 'As a coffee connoisseur, I can confirm their beans are ethically sourced and perfectly roasted. A daily must-visit!'
    },
    {
      id: 3,
      name: 'Emma R.',
      rating: 4,
      text: 'Their cinnamon rolls are my weekend treat. Fresh, gooey, and perfect with their signature house blend coffee.'
    },
    {
      id: 4,
      name: 'Michael T.',
      rating: 5,
      text: 'The atmosphere is as delightful as their pastries. I love working remotely from here – great WiFi and even better coffee!'
    },
    {
      id: 5,
      name: 'Olivia P.',
      rating: 5,
      text: 'Their seasonal specials never disappoint. The pumpkin spice latte and maple pecan danish combo is heavenly.'
    }
  ];

  // Auto-advance carousel every 5 seconds
  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        nextSlide();
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [currentIndex, isPaused]);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex(prevIndex => (prevIndex === reviews.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex(prevIndex => (prevIndex === 0 ? reviews.length - 1 : prevIndex - 1));
  };

  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const slideVariants = {
    enter: (direction) => {
      return {
        x: direction > 0 ? 1000 : -1000,
        opacity: 0
      };
    },
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring', stiffness: 300, damping: 30 },
        opacity: { duration: 0.5 }
      }
    },
    exit: (direction) => {
      return {
        zIndex: 0,
        x: direction < 0 ? 1000 : -1000,
        opacity: 0,
        transition: {
          x: { type: 'spring', stiffness: 300, damping: 30 },
          opacity: { duration: 0.5 }
        }
      };
    }
  };

  const dotVariants = {
    inactive: { scale: 1 },
    active: { scale: 1.5 }
  };

  return (
    <motion.section 
      className={`py-20 ${darkMode ? 'bg-neutral-800' : 'bg-[#E6E0D4]/30'}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col items-center mb-12 text-center">
          <h2 className={`text-3xl md:text-4xl font-serif font-bold mb-4 ${darkMode ? 'text-white' : 'text-[#8B5A2B]'}`}>
            What Our Customers Say
          </h2>
          <div className="w-32 h-1 bg-[#D2B48C] mb-6"></div>
          <p className={`max-w-xl text-lg ${darkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>
            Don't just take our word for it - hear from our community of coffee lovers and pastry enthusiasts.
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Carousel Container */}
          <div className="overflow-hidden h-80 md:h-64 rounded-2xl relative">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className={`absolute inset-0 flex items-center justify-center p-6 md:p-12 ${darkMode ? 'bg-neutral-700/50' : 'bg-white/90'} backdrop-blur-sm rounded-2xl`}
              >
                <div className="flex flex-col items-center text-center max-w-2xl">
                  <div className={`w-16 h-16 rounded-full mb-6 flex items-center justify-center ${darkMode ? 'bg-[#C87941]/50' : 'bg-[#8B5A2B]/30'}`}>
                    <span className={`text-2xl font-serif font-bold ${darkMode ? 'text-white' : 'text-[#8B5A2B]'}`}>
                      {reviews[currentIndex].name.charAt(0)}
                    </span>
                  </div>
                  
                  <div className="flex mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={i < reviews[currentIndex].rating ? 'text-[#D2B48C] fill-[#D2B48C]' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  
                  <p className={`text-lg md:text-xl mb-6 italic ${darkMode ? 'text-white' : 'text-neutral-700'}`}>
                    "{reviews[currentIndex].text}"
                  </p>
                  
                  <p className={`font-semibold ${darkMode ? 'text-[#C87941]' : 'text-[#8B5A2B]'}`}>
                    {reviews[currentIndex].name}
                  </p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={prevSlide}
            className={`absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 md:-translate-x-6 w-12 h-12 rounded-full flex items-center justify-center z-10 ${
              darkMode ? 'bg-neutral-700 text-white hover:bg-neutral-600' : 'bg-white text-[#8B5A2B] hover:bg-gray-100'
            } shadow-lg transition-colors duration-300`}
            aria-label="Previous review"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={nextSlide}
            className={`absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 md:translate-x-6 w-12 h-12 rounded-full flex items-center justify-center z-10 ${
              darkMode ? 'bg-neutral-700 text-white hover:bg-neutral-600' : 'bg-white text-[#8B5A2B] hover:bg-gray-100'
            } shadow-lg transition-colors duration-300`}
            aria-label="Next review"
          >
            <ChevronRight size={24} />
          </button>

          {/* Carousel Dots */}
          <div className="flex justify-center space-x-2 mt-6">
            {reviews.map((_, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`w-2 h-2 rounded-full ${
                  currentIndex === index 
                    ? (darkMode ? 'bg-[#C87941]' : 'bg-[#8B5A2B]') 
                    : (darkMode ? 'bg-neutral-600' : 'bg-neutral-300')
                }`}
                variants={dotVariants}
                animate={currentIndex === index ? 'active' : 'inactive'}
                transition={{ duration: 0.3 }}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default ReviewsCarousel;