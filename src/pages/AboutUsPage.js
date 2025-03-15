// File: src/pages/AboutUsPage.js
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Timeline from '../components/Timeline';
import ValueCard from '../components/ValueCard';

const AboutUsPage = ({ darkMode }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });
  
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.6, 1, 1, 0.6]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.8, 1, 1, 0.8]);
  
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

  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  const paragraphVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, delay: 0.2 }
    }
  };

  const valuesData = [
    {
      id: 1,
      title: 'Quality',
      description: 'We never compromise on ingredients or processes, ensuring every cup and bite is perfect.',
      color: '#8B5A2B'
    },
    {
      id: 2,
      title: 'Sustainability',
      description: 'From composting to eco-friendly packaging, we prioritize the planet in everything we do.',
      color: '#C87941'
    },
    {
      id: 3,
      title: 'Community',
      description: 'We support local farmers and artisans, and give back through community initiatives.',
      color: '#D2B48C'
    }
  ];

  // Timeline Events
  const timelineEvents = [
    {
      year: 2015,
      title: 'Humble Beginnings',
      description: 'Started as a small cart at the local farmers market with a passion for quality coffee and pastries.',
      image: 'beginnings'
    },
    {
      year: 2017,
      title: 'First Pop-Up Shop',
      description: 'After gaining a loyal following, we opened our first temporary pop-up in the downtown area.',
      image: 'popup'
    },
    {
      year: 2018,
      title: 'Brick & Mortar',
      description: 'Opened our first permanent location on Coffee Lane, with a full bakery and coffee bar.',
      image: 'storefront'
    },
    {
      year: 2021,
      title: 'Community Hub',
      description: 'Expanded to include event space for workshops, tastings, and community gatherings.',
      image: 'community'
    },
    {
      year: 2023,
      title: 'Sustainability Award',
      description: 'Received recognition for our commitment to sustainable practices and ethical sourcing.',
      image: 'award'
    },
    {
      year: 2025,
      title: 'Looking Ahead',
      description: 'Continuing to grow and innovate while staying true to our core values and mission.',
      image: 'future'
    }
  ];

  return (
    <motion.div
      className="pt-24 pb-20"
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* Hero Section */}
      <motion.div 
        className={`relative min-h-[60vh] flex items-center justify-center overflow-hidden ${
          darkMode ? 'bg-neutral-800' : 'bg-[#E6E0D4]/20'
        }`}
        style={{ opacity, scale }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="absolute w-96 h-96 rounded-full bg-[#D2B48C]/30 blur-3xl"></div>
          <div className="absolute w-80 h-80 rounded-full bg-[#8B5A2B]/20 blur-3xl -translate-x-20 translate-y-20"></div>
          <div className="absolute w-72 h-72 rounded-full bg-[#C87941]/20 blur-3xl translate-x-32 -translate-y-16"></div>
        </div>
        
        <div className="container mx-auto px-4 md:px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.h1 
              className={`text-4xl md:text-5xl font-serif font-bold mb-6 ${darkMode ? 'text-white' : 'text-[#8B5A2B]'}`}
              variants={headingVariants}
              initial="hidden"
              animate="visible"
            >
              Our Story
            </motion.h1>
            
            <motion.p 
              className={`text-lg md:text-xl leading-relaxed ${darkMode ? 'text-neutral-300' : 'text-neutral-700'}`}
              variants={paragraphVariants}
              initial="hidden"
              animate="visible"
            >
              Founded in 2015 by two friends with a passion for quality coffee and freshly baked goods, 
              Brew & Bake started as a small cart at the local farmers market. Our commitment to using only 
              the finest organic ingredients and ethically sourced coffee beans quickly earned us a loyal following, 
              allowing us to open our first brick-and-mortar location in 2018.
            </motion.p>
          </div>
        </div>
      </motion.div>

      {/* Timeline Section */}
      <section className={`py-20 ${darkMode ? 'bg-neutral-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-5xl mx-auto">
            <motion.div 
              className="text-center mb-16"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
            >
              <h2 className={`text-3xl md:text-4xl font-serif font-bold mb-4 ${darkMode ? 'text-white' : 'text-[#8B5A2B]'}`}>
                Our Journey
              </h2>
              <div className="w-32 h-1 bg-[#D2B48C] mx-auto mb-6"></div>
              <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>
                From a humble cart to a community gathering place, here's how our story unfolded.
              </p>
            </motion.div>

            <Timeline events={timelineEvents} darkMode={darkMode} />
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className={`py-20 ${darkMode ? 'bg-neutral-800' : 'bg-[#E6E0D4]/30'}`}>
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={`text-3xl md:text-4xl font-serif font-bold mb-4 ${darkMode ? 'text-white' : 'text-[#8B5A2B]'}`}>
              Our Values
            </h2>
            <div className="w-32 h-1 bg-[#D2B48C] mx-auto mb-6"></div>
            <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>
              These core principles guide every decision we make and every cup we brew.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {valuesData.map((value, index) => (
              <ValueCard 
                key={value.id}
                value={value}
                index={index}
                darkMode={darkMode}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className={`py-20 ${darkMode ? 'bg-neutral-900' : 'bg-white'}`}>
        <div className="container mx-auto px-4 md:px-6">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className={`text-3xl md:text-4xl font-serif font-bold mb-4 ${darkMode ? 'text-white' : 'text-[#8B5A2B]'}`}>
              Meet Our Team
            </h2>
            <div className="w-32 h-1 bg-[#D2B48C] mx-auto mb-6"></div>
            <p className={`text-lg max-w-2xl mx-auto ${darkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>
              The passionate people behind your favorite brews and bakes.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {/* Team members would go here */}
            <motion.div 
              className={`rounded-xl overflow-hidden text-center ${darkMode ? 'bg-neutral-800' : 'bg-white'} shadow-md`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              whileHover={{ y: -10 }}
            >
              <div className="h-60 bg-[#8B5A2B]/20"></div>
              <div className="p-6">
                <h3 className={`text-xl font-serif font-bold mb-1 ${darkMode ? 'text-white' : 'text-[#2E1503]'}`}>
                  Emma Johnson
                </h3>
                <p className={`text-sm mb-4 ${darkMode ? 'text-[#C87941]' : 'text-[#8B5A2B]'}`}>
                  Co-Founder & Head Baker
                </p>
                <p className={`text-sm ${darkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>
                  Passionate about creating the perfect pastry and sourcing the finest ingredients.
                </p>
              </div>
            </motion.div>

            <motion.div 
              className={`rounded-xl overflow-hidden text-center ${darkMode ? 'bg-neutral-800' : 'bg-white'} shadow-md`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              whileHover={{ y: -10 }}
            >
              <div className="h-60 bg-[#D2B48C]/30"></div>
              <div className="p-6">
                <h3 className={`text-xl font-serif font-bold mb-1 ${darkMode ? 'text-white' : 'text-[#2E1503]'}`}>
                  Daniel Garcia
                </h3>
                <p className={`text-sm mb-4 ${darkMode ? 'text-[#C87941]' : 'text-[#8B5A2B]'}`}>
                  Co-Founder & Master Barista
                </p>
                <p className={`text-sm ${darkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>
                  Coffee enthusiast with expertise in brewing techniques and bean selection.
                </p>
              </div>
            </motion.div>

            <motion.div 
              className={`rounded-xl overflow-hidden text-center ${darkMode ? 'bg-neutral-800' : 'bg-white'} shadow-md`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              whileHover={{ y: -10 }}
            >
              <div className="h-60 bg-[#C87941]/30"></div>
              <div className="p-6">
                <h3 className={`text-xl font-serif font-bold mb-1 ${darkMode ? 'text-white' : 'text-[#2E1503]'}`}>
                  Sophia Chen
                </h3>
                <p className={`text-sm mb-4 ${darkMode ? 'text-[#C87941]' : 'text-[#8B5A2B]'}`}>
                  Pastry Chef
                </p>
                <p className={`text-sm ${darkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>
                  Trained in Paris, brings artisanal European techniques to our bakery.
                </p>
              </div>
            </motion.div>

            <motion.div 
              className={`rounded-xl overflow-hidden text-center ${darkMode ? 'bg-neutral-800' : 'bg-white'} shadow-md`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ y: -10 }}
            >
              <div className="h-60 bg-[#96694F]/30"></div>
              <div className="p-6">
                <h3 className={`text-xl font-serif font-bold mb-1 ${darkMode ? 'text-white' : 'text-[#2E1503]'}`}>
                  Marcus Williams
                </h3>
                <p className={`text-sm mb-4 ${darkMode ? 'text-[#C87941]' : 'text-[#8B5A2B]'}`}>
                  Community Manager
                </p>
                <p className={`text-sm ${darkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>
                  Coordinates events and ensures every customer feels like family.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default AboutUsPage;