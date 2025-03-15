// File: src/components/OrderItem.js
import React from 'react';
import { motion } from 'framer-motion';
import { MinusCircle, PlusCircle, Trash2 } from 'lucide-react';

const OrderItem = ({ item, darkMode, onIncrease, onDecrease }) => {
  const totalPrice = item.price * item.quantity;
  
  return (
    <motion.div 
      className={`flex items-center p-4 rounded-lg ${
        darkMode ? 'bg-neutral-700/50' : 'bg-[#E6E0D4]/20'
      }`}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
      layout
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
        <h3 className={`font-medium ${darkMode ? 'text-white' : 'text-[#2E1503]'}`}>
          {item.name}
        </h3>
        <p className={`text-sm ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
          ${item.price.toFixed(2)} each
        </p>
      </div>
      
      <div className="flex items-center space-x-3">
        <motion.button
          onClick={onDecrease}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {item.quantity === 1 ? (
            <Trash2 size={20} className={darkMode ? 'text-red-400' : 'text-red-500'} />
          ) : (
            <MinusCircle size={20} className={darkMode ? 'text-neutral-400' : 'text-neutral-500'} />
          )}
        </motion.button>
        
        <span className={`font-medium ${darkMode ? 'text-white' : 'text-[#2E1503]'}`}>
          {item.quantity}
        </span>
        
        <motion.button
          onClick={onIncrease}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <PlusCircle size={20} className={darkMode ? 'text-[#C87941]' : 'text-[#8B5A2B]'} />
        </motion.button>
      </div>
      
      <div className={`ml-6 font-medium ${darkMode ? 'text-[#C87941]' : 'text-[#8B5A2B]'}`}>
        ${totalPrice.toFixed(2)}
      </div>
    </motion.div>
  );
};

export default OrderItem;