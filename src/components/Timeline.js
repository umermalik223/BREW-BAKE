// File: src/components/Timeline.js
import React, { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import TimelineItem from './TimelineItem';

const Timeline = ({ events, darkMode }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  return (
    <div ref={ref} className="relative pb-12">
      {/* Timeline Line */}
      <div className={`absolute left-9 md:left-1/2 md:-ml-0.5 w-1 h-full ${darkMode ? 'bg-neutral-700' : 'bg-[#D2B48C]/40'}`}></div>
      
      {/* Progress Line - animated based on scroll */}
      <motion.div
        className={`absolute left-9 md:left-1/2 md:-ml-0.5 w-1 origin-top ${darkMode ? 'bg-[#C87941]' : 'bg-[#8B5A2B]'}`}
        style={{ scaleY: scrollYProgress }}
      ></motion.div>
      
      {/* Timeline Items */}
      <div className="relative">
        {events.map((event, index) => (
          <TimelineItem 
            key={event.year}
            event={event}
            index={index}
            darkMode={darkMode}
          />
        ))}
      </div>
    </div>
  );
};

export default Timeline;

