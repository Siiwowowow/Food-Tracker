import React from 'react';
import CountUp from 'react-countup';

const FridgeCount = ({ foods }) => {
  const today = new Date();

  // Count expired and nearly expired items
  const expiredCount = foods.filter(food => new Date(food.expiryDate) < today).length;
  const nearlyExpiredCount = foods.filter(food => {
    const expiry = new Date(food.expiryDate);
    const daysLeft = (expiry - today) / (1000 * 60 * 60 * 24);
    return daysLeft >= 0 && daysLeft <= 5;
  }).length;

  return (
    <div className="flex flex-col md:flex-row justify-center gap-8 p-4 text-center">
      <div className="bg-red-100 border border-red-300 rounded-xl p-4 shadow">
        <p className="text-lg font-semibold text-red-600">Expired Items</p>
        <h2 className="text-xl font-bold text-red-700">
          <CountUp end={expiredCount} duration={2} />
        </h2>
      </div>
      <div className="bg-green-100 border border-green-300 rounded-xl p-2 shadow">
        <p className="text-lg font-semibold text-green-600">Expiring Soon (5 days)</p>
        <h2 className="text-xl font-bold text-green-500">
          <CountUp end={nearlyExpiredCount} duration={2} />
        </h2>
      </div>
    </div>
  );
};

export default FridgeCount;
