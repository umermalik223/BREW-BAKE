// File: src/pages/ContactPage.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import FloatingInput from '../components/FloatingInput';

const ContactPage = ({ darkMode }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setIsSubmitted(true);
    
    // Reset form after submission
    setTimeout(() => {
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      setIsSubmitted(false);
    }, 3000);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        duration: 0.5,
        when: "beforeChildren",
        staggerChildren: 0.2
      }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const mapVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { duration: 0.6, delay: 0.3 }
    }
  };

  const pinVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 10,
        delay: 0.8
      }
    },
    bounce: {
      y: [0, -15, 0],
      transition: {
        duration: 1,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        delay: 1
      }
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
        {/* Header */}
        <motion.div className="text-center mb-16" variants={childVariants}>
          <h1 className={`text-4xl md:text-5xl font-serif font-bold mb-4 ${darkMode ? 'text-white' : 'text-[#8B5A2B]'}`}>
            Get In Touch
          </h1>
          <div className="w-32 h-1 bg-[#D2B48C] mx-auto mb-6"></div>
          <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>
            Have questions or feedback? We'd love to hear from you. Visit us in person or reach out through the form below.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div variants={childVariants}>
            <div className={`rounded-xl p-8 ${darkMode ? 'bg-neutral-800' : 'bg-white'} shadow-lg`}>
              <h2 className={`text-2xl font-serif font-bold mb-6 ${darkMode ? 'text-white' : 'text-[#8B5A2B]'}`}>
                Send Us a Message
              </h2>
              
              <form onSubmit={handleSubmit}>
                <div className="space-y-6">
                  <FloatingInput
                    name="name"
                    label="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    darkMode={darkMode}
                  />
                  
                  <FloatingInput
                    name="email"
                    type="email"
                    label="Your Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    darkMode={darkMode}
                  />
                  
                  <FloatingInput
                    name="subject"
                    label="Subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    darkMode={darkMode}
                  />
                  
                  <div className="relative">
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows="5"
                      className={`block w-full px-4 py-3 rounded-lg resize-none focus:outline-none focus:ring-2 ${
                        darkMode 
                          ? 'bg-neutral-700 text-white focus:ring-[#C87941] placeholder-neutral-400'
                          : 'bg-[#E6E0D4]/30 text-neutral-800 focus:ring-[#8B5A2B] placeholder-neutral-500'
                      }`}
                      placeholder="Your Message"
                      required
                    />
                  </div>
                  
                  <motion.button
                    type="submit"
                    className={`px-8 py-3 rounded-full font-medium flex items-center justify-center space-x-2 ${
                      darkMode 
                        ? 'bg-[#C87941] text-white hover:bg-[#96694F]'
                        : 'bg-[#8B5A2B] text-white hover:bg-[#6a4522]'
                    } transition-colors duration-300`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    disabled={isSubmitted}
                  >
                    <span>SEND MESSAGE</span>
                    <Send size={18} />
                  </motion.button>
                  
                  {isSubmitted && (
                    <motion.div
                      className={`mt-4 p-4 rounded-lg text-center ${darkMode ? 'bg-green-900/30 text-green-300' : 'bg-green-100 text-green-800'}`}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                    >
                      Thank you! Your message has been sent successfully.
                    </motion.div>
                  )}
                </div>
              </form>
            </div>
          </motion.div>

          {/* Contact Info and Map */}
          <div className="space-y-8">
            <motion.div 
              className={`rounded-xl p-8 ${darkMode ? 'bg-neutral-800' : 'bg-white'} shadow-lg`}
              variants={childVariants}
            >
              <h2 className={`text-2xl font-serif font-bold mb-6 ${darkMode ? 'text-white' : 'text-[#8B5A2B]'}`}>
                Visit Our Shop
              </h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className={`mr-4 mt-1 ${darkMode ? 'text-[#C87941]' : 'text-[#8B5A2B]'}`} size={20} />
                  <div>
                    <p className={darkMode ? 'text-white' : 'text-neutral-800'}>
                      123 Coffee Lane, Bakery District<br />
                      City, State 12345
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className={`mr-4 mt-1 ${darkMode ? 'text-[#C87941]' : 'text-[#8B5A2B]'}`} size={20} />
                  <div>
                    <p className={darkMode ? 'text-white' : 'text-neutral-800'}>
                      (123) 456-7890
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className={`mr-4 mt-1 ${darkMode ? 'text-[#C87941]' : 'text-[#8B5A2B]'}`} size={20} />
                  <div>
                    <p className={darkMode ? 'text-white' : 'text-neutral-800'}>
                      hello@brewandbake.com
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className={`mr-4 mt-1 ${darkMode ? 'text-[#C87941]' : 'text-[#8B5A2B]'}`} size={20} />
                  <div>
                    <p className={darkMode ? 'text-white' : 'text-neutral-800'}>
                      <span className="font-medium">Monday - Friday:</span> 7:00 AM - 8:00 PM<br />
                      <span className="font-medium">Saturday - Sunday:</span> 8:00 AM - 9:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            {/* Map */}
            <motion.div 
              className={`relative rounded-xl h-80 overflow-hidden ${darkMode ? 'bg-neutral-700' : 'bg-[#E6E0D4]/30'} shadow-lg`}
              variants={mapVariants}
            >
              {/* This would be replaced with an actual Google Map */}
              <div className="absolute inset-0 bg-gradient-to-b from-[#8B5A2B]/10 to-[#8B5A2B]/30">
                <div className="grid grid-cols-12 grid-rows-6 h-full w-full">
                  {/* Grid lines for map */}
                  {Array.from({ length: 11 }).map((_, i) => (
                    <div key={`v-${i}`} className={`col-start-${i+1} col-span-1 row-span-full ${darkMode ? 'border-l border-white/10' : 'border-l border-black/10'}`}></div>
                  ))}
                  {Array.from({ length: 5 }).map((_, i) => (
                    <div key={`h-${i}`} className={`row-start-${i+1} row-span-1 col-span-full ${darkMode ? 'border-t border-white/10' : 'border-t border-black/10'}`}></div>
                  ))}
                </div>
              </div>
              
              {/* Map Pin */}
              <motion.div 
                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                variants={pinVariants}
                animate="bounce"
              >
                <div className="relative">
                  <MapPin className="text-red-500" size={40} />
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-6 h-6 bg-red-500 opacity-30 rounded-full animate-ping"></div>
                </div>
              </motion.div>
              
              <div className="absolute bottom-4 left-4 right-4">
                <div className={`w-full p-3 rounded-lg ${darkMode ? 'bg-neutral-800/90' : 'bg-white/90'} shadow-lg`}>
                  <p className={`text-sm ${darkMode ? 'text-white' : 'text-neutral-800'}`}>
                    <span className="font-medium">Brew & Bake Coffee Shop</span><br />
                    123 Coffee Lane, Bakery District
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactPage;

