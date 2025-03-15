// File: src/components/ProductCard.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart } from 'lucide-react';

const ProductCard = ({ product, darkMode }) => {
  const [isHovered, setIsHovered] = useState(false);

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.6, 0.05, 0.01, 0.99] }
    },
    hover: { 
      y: -10,
      boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      transition: { duration: 0.3 }
    }
  };

  const imageVariants = {
    hover: { 
      scale: 1.1,
      transition: { duration: 0.3 }
    }
  };

  const buttonVariants = {
    hidden: { opacity: 0, y: 20 },
    hover: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      className={`rounded-xl overflow-hidden h-full ${darkMode ? 'bg-neutral-800' : 'bg-white'} shadow-md hover:shadow-xl transition-shadow duration-300`}
      variants={cardVariants}
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="relative h-60 overflow-hidden">
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          variants={imageVariants}
        >
          <div 
            className="w-40 h-40 rounded-full"
            style={{ background: product.color + '33' }} // Lighter version of the color
          >
            <div 
              className="w-full h-full rounded-full flex items-center justify-center"
              style={{ background: product.color + '66' }} // Semi-transparent version
            />
          </div>
        </motion.div>
        
        {/* Product Info Overlay - Visible on Hover */}
        <motion.div 
          className="absolute inset-0 flex flex-col items-center justify-center p-4 bg-black/30"
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.button
            className={`mt-4 px-6 py-2 rounded-full text-white font-medium flex items-center justify-center space-x-2 
              ${darkMode ? 'bg-[#C87941] hover:bg-[#96694F]' : 'bg-[#8B5A2B] hover:bg-[#6a4522]'} 
              transition-colors duration-300`}
            variants={buttonVariants}
            whileTap={{ scale: 0.95 }}
          >
            <ShoppingCart size={18} />
            <span>Add to Cart</span>
          </motion.button>
        </motion.div>
      </div>
      
      <div className="p-6">
        <h3 className={`text-xl font-serif font-bold mb-2 ${darkMode ? 'text-white' : 'text-[#2E1503]'}`}>
          {product.name}
        </h3>
        <p className={`mb-4 ${darkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>
          {product.description}
        </p>
        <p className={`text-lg font-semibold ${darkMode ? 'text-[#C87941]' : 'text-[#8B5A2B]'}`}>
          ${product.price.toFixed(2)}
        </p>
      </div>
    </motion.div>
  );
};

export default ProductCard;