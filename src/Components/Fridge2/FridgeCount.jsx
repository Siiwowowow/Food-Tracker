import React from 'react';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';

const FridgeCount = ({ foods }) => {
  const today = new Date();

  const expiredCount = foods.filter(food => new Date(food.expiryDate) < today).length;
  
  const nearlyExpiredCount = foods.filter(food => {
    const expiry = new Date(food.expiryDate);
    const daysLeft = (expiry - today) / (1000 * 60 * 60 * 24);
    return daysLeft >= 0 && daysLeft <= 5;
  }).length;

  const totalItems = foods.length;
  const safeItems = totalItems - expiredCount - nearlyExpiredCount;

  // Animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-4xl mx-auto">
      {/* Expired Items Card */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-br from-red-50 to-red-100 border-l-4 border-red-500 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-red-600">Expired</p>
            <h2 className="text-3xl font-bold text-red-700">
              <CountUp end={expiredCount} duration={2} />
            </h2>
          </div>
          <div className="bg-red-100 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
        </div>
        <p className="text-xs mt-2 text-red-500">Items past expiry date</p>
      </motion.div>

      {/* Expiring Soon Card */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="bg-gradient-to-br from-amber-50 to-amber-100 border-l-4 border-amber-500 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-amber-600">Expiring Soon</p>
            <h2 className="text-3xl font-bold text-amber-700">
              <CountUp end={nearlyExpiredCount} duration={2} />
            </h2>
          </div>
          <div className="bg-amber-100 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <p className="text-xs mt-2 text-amber-500">Items expiring in 5 days</p>
      </motion.div>

      {/* Safe Items Card */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={cardVariants}
        transition={{ duration: 0.5, delay: 0.4 }}
        className="bg-gradient-to-br from-green-50 to-green-100 border-l-4 border-green-500 rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow"
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-green-600">Safe Items</p>
            <h2 className="text-3xl font-bold text-green-700">
              <CountUp end={safeItems} duration={2} />
            </h2>
          </div>
          <div className="bg-green-100 p-3 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
        </div>
        <p className="text-xs mt-2 text-green-500">Items with no expiry soon</p>
      </motion.div>
    </div>
  );
};

export default FridgeCount;