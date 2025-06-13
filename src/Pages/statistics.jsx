import React from 'react';
import { FaChartLine, FaShieldAlt, FaClock } from 'react-icons/fa';

const Statistics = () => {
  return (
    <div className="py-16 bg-white">
      <div  className="max-w-6xl mx-auto text-center px-4">
        <h2 className="text-3xl font-extrabold text-gray-800 mb-2">📊 Impact Statistics</h2>
        <p className="text-gray-600 mb-12">
          See how FreshTracker is helping reduce food waste globally
        </p>

        <div data-aos="fade-down"
     data-aos-easing="linear"
     data-aos-duration="1500" className="grid  grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1 */}
          <div  className="bg-white border border-gray-200 rounded-lg shadow-md p-8 sm:p-10 text-center">
            <div className="flex justify-center mb-4">
              <FaChartLine className="text-green-500 text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">30%</h3>
            <p className="text-gray-600 text-sm mt-2">Reduction in food waste for our users</p>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-8 sm:p-10 text-center">
            <div className="flex justify-center mb-4">
              <FaShieldAlt className="text-blue-500 text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">10K+</h3>
            <p className="text-gray-600 text-sm mt-2">Families using FreshTracker</p>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-gray-200 rounded-lg shadow-md p-8 sm:p-10 text-center">
            <div className="flex justify-center mb-4">
              <FaClock className="text-orange-400 text-3xl" />
            </div>
            <h3 className="text-2xl font-bold text-gray-800">5 Days</h3>
            <p className="text-gray-600 text-sm mt-2">Average early warning before expiry</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Statistics;
