// File: src/components/ValueCard.js
import React from 'react';
import { motion } from 'framer-motion';

const ValueCard = ({ value, index, darkMode }) => {
  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6, 
        delay: index * 0.2,
        ease: [0.6, 0.05, 0.01, 0.99]
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0 },
    visible: { 
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        delay: index * 0.2 + 0.3
      }
    },
    hover: {
      scale: 1.1,
      rotate: 5,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      className={`h-full rounded-xl p-8 ${
        darkMode ? 'bg-neutral-700/50' : 'bg-white'
      } shadow-lg`}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <motion.div
        className="mb-6"
        variants={iconVariants}
        whileHover="hover"
      >
        <div 
          className={`w-16 h-16 rounded-full flex items-center justify-center`}
          style={{ backgroundColor: value.color }}
        >
          <motion.div 
            className="w-8 h-8 bg-white rounded-full"
            whileHover={{ scale: 1.2 }}
            transition={{ duration: 0.2 }}
          />
        </div>
      </motion.div>
      
      <h3 className={`text-xl font-serif font-bold mb-4 ${darkMode ? 'text-white' : 'text-[#2E1503]'}`}>
        {value.title}
      </h3>
      
      <p className={`${darkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>
        {value.description}
      </p>
    </motion.div>
  );
};

export default ValueCard;