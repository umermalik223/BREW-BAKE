// File: src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import MenuPage from './pages/MenuPage';
import AboutUsPage from './pages/AboutUsPage';
import ContactPage from './pages/ContactPage';
import OrderPage from './pages/OrderPage';
import ThemeToggle from './components/ThemeToggle';
import ScrollToTop from './components/ScrollToTop';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  
  // Check user preference for dark mode
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      setDarkMode(true);
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <div className={`min-h-screen flex flex-col ${darkMode ? 'dark bg-neutral-900' : 'bg-[#FCFBFA]'}`}>
        <Navbar darkMode={darkMode} />
        <ThemeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<HomePage darkMode={darkMode} />} />
              <Route path="/menu" element={<MenuPage darkMode={darkMode} />} />
              <Route path="/about" element={<AboutUsPage darkMode={darkMode} />} />
              <Route path="/contact" element={<ContactPage darkMode={darkMode} />} />
              <Route path="/order" element={<OrderPage darkMode={darkMode} />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer darkMode={darkMode} />
        <ScrollToTop />
      </div>
    </Router>
  );
}

export default App;