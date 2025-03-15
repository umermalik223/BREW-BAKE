// File: src/components/TimelineItem.js
import React from 'react';
import { motion } from 'framer-motion';

const TimelineItem = ({ event, index, darkMode }) => {
  const isEven = index % 2 === 0;
  
  // Set different animation directions based on even/odd
  const containerVariants = {
    hidden: { 
      opacity: 0, 
      x: isEven ? -50 : 50 
    },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { 
        duration: 0.6, 
        ease: "easeOut",
        delay: index * 0.2
      }
    }
  };

  const dateVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        duration: 0.5, 
        ease: "backOut",
        delay: index * 0.2 + 0.3
      }
    }
  };

  return (
    <div className={`mb-16 flex flex-col md:flex-row items-center md:gap-8 ${isEven ? 'md:flex-row-reverse' : ''}`}>
      {/* Year bubble */}
      <motion.div
        className={`z-10 flex items-center justify-center w-18 h-18 mb-4 md:mb-0 rounded-full text-lg font-bold ${
          darkMode ? 'bg-[#C87941] text-white' : 'bg-[#8B5A2B] text-white'
        } shadow-lg`}
        variants={dateVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        style={{ width: "4.5rem", height: "4.5rem" }}
      >
        {event.year}
      </motion.div>
      
      {/* Content */}
      <motion.div
        className={`md:w-5/12 p-6 rounded-xl ${
          darkMode ? 'bg-neutral-800 shadow-xl' : 'bg-white shadow-lg'
        }`}
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <div className={`p-1 mb-4 w-16 h-16 rounded-full ${darkMode ? 'bg-neutral-700' : 'bg-[#E6E0D4]'} flex items-center justify-center`}>
          <div className={`w-12 h-12 rounded-full ${darkMode ? 'bg-[#8B5A2B]/50' : 'bg-[#8B5A2B]/30'}`}></div>
        </div>
        
        <h3 className={`text-xl font-serif font-bold mb-2 ${darkMode ? 'text-white' : 'text-[#2E1503]'}`}>
          {event.title}
        </h3>
        
        <p className={`${darkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>
          {event.description}
        </p>
      </motion.div>
    </div>
  );
};

export default TimelineItem;