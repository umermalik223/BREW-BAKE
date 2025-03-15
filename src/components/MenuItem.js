
// File: src/components/MenuItem.js
import React from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';

const MenuItem = ({ item, darkMode, variants }) => {
  return (
    <motion.div
      className={`rounded-xl overflow-hidden flex items-center p-4 ${
        darkMode ? 'bg-neutral-800 hover:bg-neutral-700' : 'bg-white hover:bg-neutral-50'
      } shadow-md hover:shadow-lg transition-all duration-300`}
      variants={variants}
      whileHover={{ y: -5 }}
    >
      <div className="mr-4">
        <div 
          className="w-16 h-16 rounded-full flex items-center justify-center"
          style={{ backgroundColor: item.color + '33' }}
        >
          <div 
            className="w-12 h-12 rounded-full"
            style={{ backgroundColor: item.color }}
          />
        </div>
      </div>
      
      <div className="flex-grow">
        <h3 className={`text-lg font-serif font-bold mb-1 ${darkMode ? 'text-white' : 'text-[#2E1503]'}`}>
          {item.name}
        </h3>
        <p className={`text-sm mb-1 ${darkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>
          {item.description}
        </p>
        <p className={`font-semibold ${darkMode ? 'text-[#C87941]' : 'text-[#8B5A2B]'}`}>
          ${item.price.toFixed(2)}
        </p>
      </div>
      
      <motion.button
        className={`w-10 h-10 rounded-full flex items-center justify-center ${
          darkMode ? 'bg-[#C87941] hover:bg-[#96694F]' : 'bg-[#8B5A2B] hover:bg-[#6a4522]'
        } text-white transition-colors duration-300`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Plus size={20} />
      </motion.button>
    </motion.div>
  );
};

export default MenuItem;