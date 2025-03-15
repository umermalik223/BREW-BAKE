// File: src/pages/MenuPage.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';
import MenuItem from '../components/MenuItem';

const MenuPage = ({ darkMode }) => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Menu categories
  const categories = [
    { id: 'all', name: 'ALL' },
    { id: 'coffee', name: 'COFFEE' },
    { id: 'pastry', name: 'PASTRY' },
    { id: 'breakfast', name: 'BREAKFAST' },
    { id: 'lunch', name: 'LUNCH' }
  ];

  // Menu items data
  const menuItems = [
    // Coffee items
    {
      id: 1,
      name: 'Espresso',
      description: 'Double shot of intense coffee',
      price: 3.50,
      category: 'coffee',
      color: '#8B5A2B'
    },
    {
      id: 2,
      name: 'Cappuccino',
      description: 'Espresso with steamed milk and foam',
      price: 4.50,
      category: 'coffee',
      color: '#8B5A2B'
    },
    {
      id: 3,
      name: 'Latte',
      description: 'Espresso with plenty of steamed milk',
      price: 4.75,
      category: 'coffee',
      color: '#8B5A2B'
    },
    {
      id: 4,
      name: 'Mocha',
      description: 'Espresso with chocolate and milk',
      price: 5.25,
      category: 'coffee',
      color: '#C87941'
    },
    {
      id: 5,
      name: 'Caramel Macchiato',
      description: 'Vanilla, milk, espresso, caramel drizzle',
      price: 5.50,
      category: 'coffee',
      color: '#D2B48C'
    },
    {
      id: 6,
      name: 'Cold Brew',
      description: '24-hour steeped coffee, served cold',
      price: 5.00,
      category: 'coffee',
      color: '#96694F'
    },
    
    // Pastry items
    {
      id: 7,
      name: 'Almond Croissant',
      description: 'Buttery, flaky with almond filling',
      price: 5.25,
      category: 'pastry',
      color: '#D2B48C'
    },
    {
      id: 8,
      name: 'Cinnamon Roll',
      description: 'Soft dough with cinnamon swirls',
      price: 4.75,
      category: 'pastry',
      color: '#C87941'
    },
    {
      id: 9,
      name: 'Pain au Chocolat',
      description: 'Flaky pastry with chocolate filling',
      price: 4.50,
      category: 'pastry',
      color: '#8B5A2B'
    },
    {
      id: 10,
      name: 'Blueberry Muffin',
      description: 'Moist muffin loaded with blueberries',
      price: 4.25,
      category: 'pastry',
      color: '#96694F'
    },
    
    // Breakfast items
    {
      id: 11,
      name: 'Avocado Toast',
      description: 'Sourdough bread with smashed avocado',
      price: 8.50,
      category: 'breakfast',
      color: '#96694F'
    },
    {
      id: 12,
      name: 'Breakfast Sandwich',
      description: 'Egg, cheese and bacon on artisan roll',
      price: 7.75,
      category: 'breakfast',
      color: '#D2B48C'
    },
    {
      id: 13,
      name: 'Greek Yogurt Bowl',
      description: 'With honey, granola and fresh berries',
      price: 6.50,
      category: 'breakfast',
      color: '#C87941'
    },
    
    // Lunch items
    {
      id: 14,
      name: 'Chicken Pesto Panini',
      description: 'Grilled chicken with pesto and mozzarella',
      price: 9.75,
      category: 'lunch',
      color: '#8B5A2B'
    },
    {
      id: 15,
      name: 'Caprese Salad',
      description: 'Fresh tomatoes, mozzarella and basil',
      price: 8.50,
      category: 'lunch',
      color: '#D2B48C'
    },
    {
      id: 16,
      name: 'Soup of the Day',
      description: 'Freshly made soup with artisan bread',
      price: 6.75,
      category: 'lunch',
      color: '#C87941'
    }
  ];

  // Filter menu items based on category and search query
  const filteredItems = menuItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.5 }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const categoriesVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const staggerContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
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
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.div
      className="pt-24 pb-20"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <div className="container mx-auto px-4 md:px-6">
        {/* Menu Header */}
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-serif font-bold mb-4 ${darkMode ? 'text-white' : 'text-[#8B5A2B]'}`}>
            Our Menu
          </h1>
          <div className="w-32 h-1 bg-[#D2B48C] mx-auto mb-6"></div>
          <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>
            Explore our selection of handcrafted coffee beverages and freshly baked pastries, made with quality ingredients.
          </p>
        </div>

        {/* Categories and Search Bar */}
        <motion.div 
          className={`flex flex-col md:flex-row justify-between items-center gap-6 mb-10 p-4 rounded-full ${
            darkMode ? 'bg-neutral-800/50' : 'bg-[#E6E0D4]/50'
          }`}
          variants={categoriesVariants}
        >
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map(category => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-5 py-2 rounded-full font-medium transition-all duration-300 ${
                  activeCategory === category.id
                    ? (darkMode ? 'bg-[#8B5A2B] text-white' : 'bg-[#8B5A2B] text-white')
                    : (darkMode ? 'bg-transparent text-white hover:bg-neutral-700' : 'bg-white text-[#8B5A2B] hover:bg-neutral-100')
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          <div className="relative w-full md:w-auto">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search menu..."
              className={`w-full md:w-64 pl-12 pr-4 py-3 rounded-full focus:outline-none ${
                darkMode ? 'bg-neutral-700 text-white placeholder:text-neutral-400' : 'bg-white text-neutral-800'
              }`}
            />
            <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 ${darkMode ? 'text-neutral-400' : 'text-[#C87941]'}`} size={20} />
          </div>
        </motion.div>

        {/* Menu Items */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory + searchQuery}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
            variants={staggerContainerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {filteredItems.length > 0 ? (
              filteredItems.map(item => (
                <MenuItem 
                  key={item.id} 
                  item={item} 
                  darkMode={darkMode}
                  variants={itemVariants}
                />
              ))
            ) : (
              <motion.div 
                className={`col-span-full text-center py-12 ${darkMode ? 'text-neutral-300' : 'text-neutral-600'}`}
                variants={itemVariants}
              >
                <p className="text-xl">No items found matching your search.</p>
                <p className="mt-2">Try adjusting your filters or search terms.</p>
              </motion.div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default MenuPage;
