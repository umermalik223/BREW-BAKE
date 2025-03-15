// File: src/components/NewsletterSignup.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send } from 'lucide-react';

const NewsletterSignup = ({ darkMode }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      // Here you would typically send this to your API
      console.log('Subscribing email:', email);
      setIsSubmitted(true);
      setEmail('');
      
      // Reset the submission status after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 3000);
    }
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.6,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const buttonVariants = {
    rest: { scale: 1 },
    hover: { 
      scale: 1.05,
      backgroundColor: darkMode ? "#96694F" : "#C87941",
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.95 }
  };

  const successVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        duration: 0.5,
        type: "spring", 
        stiffness: 200 
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.8,
      transition: { duration: 0.3 }
    }
  };

  return (
    <motion.section 
      className={`py-16 ${darkMode ? 'bg-[#8B5A2B]' : 'bg-[#8B5A2B]'}`}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      variants={containerVariants}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2 
            className="text-3xl md:text-4xl font-serif font-bold text-white text-center mb-4"
            variants={itemVariants}
          >
            Stay Updated
          </motion.h2>
          
          <motion.p 
            className="text-lg text-white/80 text-center mb-8"
            variants={itemVariants}
          >
            Subscribe to our newsletter for special offers, new menu items, and coffee brewing tips.
          </motion.p>
          
          <motion.form 
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto"
            variants={itemVariants}
          >
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              className={`flex-grow px-6 py-3 rounded-full text-[#2E1503] focus:outline-none ${
                darkMode ? 'bg-white/90 focus:bg-white' : 'bg-white focus:ring-2 focus:ring-[#C87941]'
              }`}
              required
            />
            
            <motion.button
              type="submit"
              className="px-8 py-3 rounded-full bg-[#C87941] text-white font-medium flex items-center justify-center space-x-2"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              disabled={isSubmitted}
            >
              <span>SUBSCRIBE</span>
              <Send size={18} />
            </motion.button>
          </motion.form>
          
          {isSubmitted && (
            <motion.div
              className="mt-6 text-center"
              variants={successVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <p className="text-white font-medium">
                ✓ Thank you for subscribing! We'll keep you posted on our latest offers.
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.section>
  );
};

export default NewsletterSignup;