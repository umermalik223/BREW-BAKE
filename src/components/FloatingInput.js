// File: src/components/FloatingInput.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const FloatingInput = ({ 
  name, 
  label, 
  value, 
  onChange, 
  type = 'text', 
  required = false,
  darkMode
}) => {
  const [isFocused, setIsFocused] = useState(false);
  
  const labelVariants = {
    default: { 
      y: value || isFocused ? -20 : 0, 
      scale: value || isFocused ? 0.85 : 1,
      color: value || isFocused 
        ? (darkMode ? '#C87941' : '#8B5A2B')
        : (darkMode ? '#9CA3AF' : '#6B7280')
    },
    focus: { 
      y: -20, 
      scale: 0.85,
      color: darkMode ? '#C87941' : '#8B5A2B'
    }
  };

  return (
    <div className="relative">
      <input
        type={type}
        name={name}
        id={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className={`block w-full px-4 pt-6 pb-2 rounded-lg focus:outline-none focus:ring-2 peer ${
          darkMode 
            ? 'bg-neutral-700 text-white focus:ring-[#C87941]'
            : 'bg-[#E6E0D4]/30 text-neutral-800 focus:ring-[#8B5A2B]'
        }`}
        placeholder=" "
        required={required}
      />
      <motion.label
        htmlFor={name}
        className="absolute left-4 top-4 cursor-text"
        variants={labelVariants}
        animate={isFocused ? 'focus' : 'default'}
        transition={{ duration: 0.2 }}
      >
        {label}
      </motion.label>
    </div>
  );
};

export default FloatingInput;