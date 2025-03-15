// File: src/components/BestsellersSection.js
import React from 'react';
import { motion } from 'framer-motion';
//import { ShoppingCart } from 'lucide-react';
import ProductCard from './ProductCard';

const BestsellersSection = ({ darkMode }) => {
  // Animation variants
  const sectionVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const headingVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: [0.6, 0.05, 0.01, 0.99] }
    }
  };

  // Bestselling products data
  const bestsellers = [
    {
      id: 1,
      name: 'Classic Cappuccino',
      description: 'Rich espresso with velvety foam',
      price: 4.50,
      image: 'cappuccino',
      color: '#8B5A2B'
    },
    {
      id: 2,
      name: 'Almond Croissant',
      description: 'Buttery, flaky with almond filling',
      price: 5.25,
      image: 'croissant',
      color: '#D2B48C'
    },
    {
      id: 3,
      name: 'Cinnamon Roll',
      description: 'Soft dough with cinnamon swirls',
      price: 4.75,
      image: 'cinnamon',
      color: '#C87941'
    },
    {
      id: 4,
      name: 'Caramel Latte',
      description: 'Espresso with caramel and steamed milk',
      price: 5.50,
      image: 'latte',
      color: '#96694F'
    }
  ];

  return (
    <motion.section 
      className={`py-20 ${darkMode ? 'bg-neutral-900' : 'bg-white'}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={sectionVariants}
    >
      <div className="container mx-auto px-4 md:px-6">
        <motion.div 
          className="flex flex-col items-start mb-12"
          variants={headingVariants}
        >
          <h2 className={`text-3xl md:text-4xl font-serif font-bold relative pb-2 ${darkMode ? 'text-white' : 'text-[#8B5A2B]'}`}>
            Our Bestsellers
            <span className="absolute bottom-0 left-0 w-16 h-1 bg-[#D2B48C]"></span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {bestsellers.map(product => (
            <ProductCard 
              key={product.id}
              product={product}
              darkMode={darkMode}
            />
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default BestsellersSection;

