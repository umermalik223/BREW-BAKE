// File: src/pages/OrderPage.js
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MinusCircle, PlusCircle, ShoppingCart, ChevronRight, Clock, CreditCard, Truck, Home } from 'lucide-react';
import OrderItem from '../components/OrderItem';

const OrderPage = ({ darkMode }) => {
  const [step, setStep] = useState(1);
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Classic Cappuccino',
      price: 4.50,
      quantity: 2,
      image: 'cappuccino',
      color: '#8B5A2B'
    },
    {
      id: 7,
      name: 'Almond Croissant',
      price: 5.25,
      quantity: 1,
      image: 'croissant',
      color: '#D2B48C'
    },
    {
      id: 8,
      name: 'Cinnamon Roll',
      price: 4.75,
      quantity: 1,
      image: 'roll',
      color: '#C87941'
    }
  ]);
  
  const [deliveryMethod, setDeliveryMethod] = useState('pickup');
  const [paymentMethod, setPaymentMethod] = useState('card');
  
  // Calculate totals
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08; // 8% tax
  const deliveryFee = deliveryMethod === 'delivery' ? 3.99 : 0;
  const total = subtotal + tax + deliveryFee;
  
  // Handle quantity changes
  const updateQuantity = (id, change) => {
    setCartItems(prevItems => 
      prevItems.map(item => {
        if (item.id === id) {
          const newQuantity = Math.max(0, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter(item => item.quantity > 0) // Remove items with 0 quantity
    );
  };
  
  // Move to next step
  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };
  
  // Move to previous step
  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };
  
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
  
  const stepVariants = {
    hidden: (direction) => {
      return {
        x: direction > 0 ? '100%' : '-100%',
        opacity: 0
      };
    },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeInOut" }
    },
    exit: (direction) => {
      return {
        x: direction > 0 ? '-100%' : '100%',
        opacity: 0,
        transition: { duration: 0.5, ease: "easeInOut" }
      };
    }
  };
  
  const slideVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      backgroundColor: darkMode ? "#96694F" : "#6a4522",
      transition: { duration: 0.3 }
    },
    tap: { scale: 0.95 }
  };

  // Step indicators
  const steps = [
    { number: 1, title: 'Cart' },
    { number: 2, title: 'Delivery' },
    { number: 3, title: 'Payment' }
  ];

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
        <div className="text-center mb-12">
          <h1 className={`text-4xl md:text-5xl font-serif font-bold mb-6 ${darkMode ? 'text-white' : 'text-[#8B5A2B]'}`}>
            Your Order
          </h1>
          
          {/* Step Indicators */}
          <div className="flex justify-center items-center max-w-xl mx-auto mb-12">
            {steps.map((s, i) => (
              <React.Fragment key={s.number}>
                {/* Step Circle */}
                <motion.div 
                  className={`relative z-10 flex items-center justify-center w-10 h-10 rounded-full font-medium ${
                    step >= s.number
                      ? (darkMode ? 'bg-[#C87941] text-white' : 'bg-[#8B5A2B] text-white')
                      : (darkMode ? 'bg-neutral-700 text-neutral-400' : 'bg-[#E6E0D4] text-neutral-500')
                  }`}
                  whileHover={step < s.number ? {} : { scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                  onClick={() => step > s.number && setStep(s.number)}
                  style={{ cursor: step > s.number ? 'pointer' : 'default' }}
                >
                  {s.number}
                  <div className={`absolute -bottom-6 whitespace-nowrap text-sm ${
                    step >= s.number
                      ? (darkMode ? 'text-[#C87941]' : 'text-[#8B5A2B]')
                      : (darkMode ? 'text-neutral-400' : 'text-neutral-500')
                  }`}>
                    {s.title}
                  </div>
                </motion.div>
                
                {/* Connector Line */}
                {i < steps.length - 1 && (
                  <div className="flex-grow mx-2 h-1 rounded">
                    <div className={`h-full ${darkMode ? 'bg-neutral-700' : 'bg-[#E6E0D4]'}`}></div>
                    <motion.div 
                      className={`h-full -mt-1 rounded ${darkMode ? 'bg-[#C87941]' : 'bg-[#8B5A2B]'}`}
                      initial={{ width: step > s.number ? '100%' : '0%' }}
                      animate={{ width: step > s.number ? '100%' : '0%' }}
                      transition={{ duration: 0.5 }}
                    ></motion.div>
                  </div>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>
        
        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait" custom={step}>
              {/* Step 1: Cart Items */}
              {step === 1 && (
                <motion.div
                  key="cart"
                  custom={1}
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="w-full"
                >
                  <div className={`rounded-xl p-6 ${darkMode ? 'bg-neutral-800' : 'bg-white'} shadow-lg`}>
                    <h2 className={`text-2xl font-serif font-bold mb-6 flex items-center ${darkMode ? 'text-white' : 'text-[#2E1503]'}`}>
                      <ShoppingCart className="mr-2" size={24} />
                      Your Cart
                    </h2>
                    
                    {cartItems.length === 0 ? (
                      <motion.div 
                        className="text-center py-12"
                        variants={slideVariants}
                      >
                        <p className={`text-xl mb-6 ${darkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>
                          Your cart is empty
                        </p>
                        <motion.button
                          onClick={() => window.location.href = '/menu'}
                          className={`px-6 py-3 rounded-full font-medium ${
                            darkMode ? 'bg-[#C87941] text-white hover:bg-[#96694F]' : 'bg-[#8B5A2B] text-white hover:bg-[#6a4522]'
                          } transition-colors duration-300`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Browse Menu
                        </motion.button>
                      </motion.div>
                    ) : (
                      <motion.div className="space-y-6" variants={slideVariants}>
                        {cartItems.map(item => (
                          <OrderItem 
                            key={item.id}
                            item={item}
                            darkMode={darkMode}
                            onIncrease={() => updateQuantity(item.id, 1)}
                            onDecrease={() => updateQuantity(item.id, -1)}
                          />
                        ))}
                      </motion.div>
                    )}
                  </div>
                  
                  {cartItems.length > 0 && (
                    <div className="mt-8 text-right">
                      <motion.button
                        onClick={nextStep}
                        className={`px-8 py-3 rounded-full font-medium flex items-center ml-auto ${
                          darkMode ? 'bg-[#C87941] text-white' : 'bg-[#8B5A2B] text-white'
                        }`}
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                      >
                        <span>Continue to Delivery</span>
                        <ChevronRight size={20} className="ml-2" />
                      </motion.button>
                    </div>
                  )}
                </motion.div>
              )}
              
              {/* Step 2: Delivery Options */}
              {step === 2 && (
                <motion.div
                  key="delivery"
                  custom={1}
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="w-full"
                >
                  <div className={`rounded-xl p-6 ${darkMode ? 'bg-neutral-800' : 'bg-white'} shadow-lg`}>
                    <h2 className={`text-2xl font-serif font-bold mb-6 ${darkMode ? 'text-white' : 'text-[#2E1503]'}`}>
                      Delivery Options
                    </h2>
                    
                    <div className="space-y-4">
                      <motion.div
                        className={`p-6 rounded-xl border-2 cursor-pointer ${
                          deliveryMethod === 'pickup'
                            ? (darkMode ? 'border-[#C87941] bg-[#C87941]/10' : 'border-[#8B5A2B] bg-[#8B5A2B]/5')
                            : (darkMode ? 'border-neutral-700' : 'border-neutral-200')
                        }`}
                        onClick={() => setDeliveryMethod('pickup')}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-start">
                          <Clock size={24} className={darkMode ? 'text-[#C87941]' : 'text-[#8B5A2B]'} />
                          <div className="ml-4">
                            <h3 className={`text-lg font-medium mb-1 ${darkMode ? 'text-white' : 'text-[#2E1503]'}`}>
                              Pickup (No Fee)
                            </h3>
                            <p className={darkMode ? 'text-neutral-300' : 'text-neutral-600'}>
                              Ready in 15-20 minutes<br />
                              123 Coffee Lane, Bakery District
                            </p>
                          </div>
                        </div>
                      </motion.div>
                      
                      <motion.div
                        className={`p-6 rounded-xl border-2 cursor-pointer ${
                          deliveryMethod === 'delivery'
                            ? (darkMode ? 'border-[#C87941] bg-[#C87941]/10' : 'border-[#8B5A2B] bg-[#8B5A2B]/5')
                            : (darkMode ? 'border-neutral-700' : 'border-neutral-200')
                        }`}
                        onClick={() => setDeliveryMethod('delivery')}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-start">
                          <Truck size={24} className={darkMode ? 'text-[#C87941]' : 'text-[#8B5A2B]'} />
                          <div className="ml-4">
                            <h3 className={`text-lg font-medium mb-1 ${darkMode ? 'text-white' : 'text-[#2E1503]'}`}>
                              Delivery ($3.99 Fee)
                            </h3>
                            <p className={darkMode ? 'text-neutral-300' : 'text-neutral-600'}>
                              Delivered in 30-45 minutes<br />
                              Within 5 miles of our store
                            </p>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                    
                    {deliveryMethod === 'delivery' && (
                      <motion.div
                        className="mt-6"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <label className={`block mb-2 font-medium ${darkMode ? 'text-white' : 'text-[#2E1503]'}`}>
                          Delivery Address
                        </label>
                        <input
                          type="text"
                          className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${
                            darkMode 
                              ? 'bg-neutral-700 text-white focus:ring-[#C87941]'
                              : 'bg-[#E6E0D4]/30 text-neutral-800 focus:ring-[#8B5A2B]'
                          }`}
                          placeholder="Enter your full address"
                        />
                      </motion.div>
                    )}
                  </div>
                  
                  <div className="mt-8 flex justify-between">
                    <motion.button
                      onClick={prevStep}
                      className={`px-6 py-2 rounded-full font-medium ${
                        darkMode 
                          ? 'bg-neutral-700 text-white hover:bg-neutral-600'
                          : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
                      } transition-colors duration-300`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Back to Cart
                    </motion.button>
                    
                    <motion.button
                      onClick={nextStep}
                      className={`px-8 py-3 rounded-full font-medium flex items-center ${
                        darkMode ? 'bg-[#C87941] text-white' : 'bg-[#8B5A2B] text-white'
                      }`}
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <span>Continue to Payment</span>
                      <ChevronRight size={20} className="ml-2" />
                    </motion.button>
                  </div>
                </motion.div>
              )}
              
              {/* Step 3: Payment */}
              {step === 3 && (
                <motion.div
                  key="payment"
                  custom={1}
                  variants={stepVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="w-full"
                >
                  <div className={`rounded-xl p-6 ${darkMode ? 'bg-neutral-800' : 'bg-white'} shadow-lg`}>
                    <h2 className={`text-2xl font-serif font-bold mb-6 ${darkMode ? 'text-white' : 'text-[#2E1503]'}`}>
                      Payment Method
                    </h2>
                    
                    <div className="space-y-4">
                      <motion.div
                        className={`p-6 rounded-xl border-2 cursor-pointer ${
                          paymentMethod === 'card'
                            ? (darkMode ? 'border-[#C87941] bg-[#C87941]/10' : 'border-[#8B5A2B] bg-[#8B5A2B]/5')
                            : (darkMode ? 'border-neutral-700' : 'border-neutral-200')
                        }`}
                        onClick={() => setPaymentMethod('card')}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-center">
                          <CreditCard size={24} className={darkMode ? 'text-[#C87941]' : 'text-[#8B5A2B]'} />
                          <h3 className={`text-lg font-medium ml-4 ${darkMode ? 'text-white' : 'text-[#2E1503]'}`}>
                            Credit/Debit Card
                          </h3>
                        </div>
                      </motion.div>
                      
                      <motion.div
                        className={`p-6 rounded-xl border-2 cursor-pointer ${
                          paymentMethod === 'cash'
                            ? (darkMode ? 'border-[#C87941] bg-[#C87941]/10' : 'border-[#8B5A2B] bg-[#8B5A2B]/5')
                            : (darkMode ? 'border-neutral-700' : 'border-neutral-200')
                        }`}
                        onClick={() => setPaymentMethod('cash')}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="flex items-center">
                          <Home size={24} className={darkMode ? 'text-[#C87941]' : 'text-[#8B5A2B]'} />
                          <h3 className={`text-lg font-medium ml-4 ${darkMode ? 'text-white' : 'text-[#2E1503]'}`}>
                            Pay at Pickup
                          </h3>
                        </div>
                      </motion.div>
                    </div>
                    
                    {paymentMethod === 'card' && (
                      <motion.div
                        className="mt-6 space-y-4"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div>
                          <label className={`block mb-2 font-medium ${darkMode ? 'text-white' : 'text-[#2E1503]'}`}>
                            Card Number
                          </label>
                          <input
                            type="text"
                            className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${
                              darkMode 
                                ? 'bg-neutral-700 text-white focus:ring-[#C87941]'
                                : 'bg-[#E6E0D4]/30 text-neutral-800 focus:ring-[#8B5A2B]'
                            }`}
                            placeholder="1234 5678 9012 3456"
                          />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className={`block mb-2 font-medium ${darkMode ? 'text-white' : 'text-[#2E1503]'}`}>
                              Expiry Date
                            </label>
                            <input
                              type="text"
                              className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${
                                darkMode 
                                  ? 'bg-neutral-700 text-white focus:ring-[#C87941]'
                                  : 'bg-[#E6E0D4]/30 text-neutral-800 focus:ring-[#8B5A2B]'
                              }`}
                              placeholder="MM/YY"
                            />
                          </div>
                          
                          <div>
                            <label className={`block mb-2 font-medium ${darkMode ? 'text-white' : 'text-[#2E1503]'}`}>
                              CVC
                            </label>
                            <input
                              type="text"
                              className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${
                                darkMode 
                                  ? 'bg-neutral-700 text-white focus:ring-[#C87941]'
                                  : 'bg-[#E6E0D4]/30 text-neutral-800 focus:ring-[#8B5A2B]'
                              }`}
                              placeholder="123"
                            />
                          </div>
                        </div>
                        
                        <div>
                          <label className={`block mb-2 font-medium ${darkMode ? 'text-white' : 'text-[#2E1503]'}`}>
                            Name on Card
                          </label>
                          <input
                            type="text"
                            className={`w-full px-4 py-3 rounded-lg focus:outline-none focus:ring-2 ${
                              darkMode 
                                ? 'bg-neutral-700 text-white focus:ring-[#C87941]'
                                : 'bg-[#E6E0D4]/30 text-neutral-800 focus:ring-[#8B5A2B]'
                            }`}
                            placeholder="John Smith"
                          />
                        </div>
                      </motion.div>
                    )}
                  </div>
                  
                  <div className="mt-8 flex justify-between">
                    <motion.button
                      onClick={prevStep}
                      className={`px-6 py-2 rounded-full font-medium ${
                        darkMode 
                          ? 'bg-neutral-700 text-white hover:bg-neutral-600'
                          : 'bg-neutral-200 text-neutral-700 hover:bg-neutral-300'
                      } transition-colors duration-300`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Back to Delivery
                    </motion.button>
                    
                    <motion.button
                      className={`px-8 py-3 rounded-full font-medium ${
                        darkMode ? 'bg-[#C87941] text-white' : 'bg-[#8B5A2B] text-white'
                      }`}
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                    >
                      <span>Place Order</span>
                    </motion.button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          
          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              className={`rounded-xl p-6 sticky top-24 ${darkMode ? 'bg-neutral-800' : 'bg-white'} shadow-lg`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className={`text-2xl font-serif font-bold mb-6 ${darkMode ? 'text-white' : 'text-[#2E1503]'}`}>
                Order Summary
              </h2>
              
              <div className={`space-y-4 mb-6 ${darkMode ? 'text-neutral-300' : 'text-neutral-600'}`}>
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                
                {deliveryMethod === 'delivery' && (
                  <div className="flex justify-between">
                    <span>Delivery Fee</span>
                    <span>${deliveryFee.toFixed(2)}</span>
                  </div>
                )}
                
                <div className="pt-4 border-t border-dashed dark:border-neutral-700 border-neutral-200">
                  <div className={`flex justify-between font-bold text-lg ${darkMode ? 'text-white' : 'text-[#2E1503]'}`}>
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
              
              <div className={`text-sm ${darkMode ? 'text-neutral-400' : 'text-neutral-500'}`}>
                <p className="mb-4">
                  {step === 1 && 'Proceed to select your delivery method.'}
                  {step === 2 && 'Choose how you would like to receive your order.'}
                  {step === 3 && 'Complete your payment details to place your order.'}
                </p>
                
                <div className="flex items-center">
                  <Clock size={16} className="mr-2" />
                  <span>
                    {deliveryMethod === 'pickup' 
                      ? 'Estimated pickup time: 15-20 minutes' 
                      : 'Estimated delivery time: 30-45 minutes'}
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default OrderPage;

