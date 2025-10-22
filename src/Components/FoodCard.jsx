import React from 'react';
import { BsBox, BsCalendar } from 'react-icons/bs';
import { FaUtensils } from 'react-icons/fa';
import { Link } from 'react-router';
import { motion } from "framer-motion";

const FoodCard = ({ food }) => {
  const { foodImage, foodTitle, description, category, quantity, expiryDate, _id } = food;
  
  // Calculate expiry status
  const today = new Date();
  const expiry = new Date(expiryDate);
  const isExpired = expiry < today;
  const isExpiringSoon = !isExpired && (expiry - today) < (3 * 24 * 60 * 60 * 1000);

  // Get status color and text
  const getStatusInfo = () => {
    if (isExpired) return { color: 'bg-gradient-to-r from-red-500 to-red-600', text: 'Expired', icon: '⚠️' };
    if (isExpiringSoon) return { color: 'bg-gradient-to-r from-orange-500 to-orange-600', text: 'Expiring Soon', icon: '⏳' };
    return { color: 'bg-gradient-to-r from-blue-500 to-blue-600', text: 'Fresh', icon: '✅' };
  };

  const statusInfo = getStatusInfo();

  return (
    <div className="group w-96 h-96 mx-auto [perspective:1000px] cursor-pointer">
      <div className="relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        
        {/* Front Side - Modern Card Design */}
        <div className="absolute w-full h-full [backface-visibility:hidden] rounded-2xl bg-white border border-gray-100 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="h-full flex flex-col"
          >
            {/* Status Badge */}
            <div className={`absolute top-4 right-4 ${statusInfo.color} text-white text-xs font-bold px-3 py-2 rounded-full z-10 shadow-lg flex items-center gap-1`}>
              <span>{statusInfo.icon}</span>
              <span>{statusInfo.text}</span>
            </div>

            {/* Food Image with Gradient Overlay */}
            <div className="relative h-48 overflow-hidden">
              <img 
                src={foodImage || '/default-food.jpg'} 
                alt={foodTitle} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                onError={(e) => {
                  e.target.src = '/default-food.jpg';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
            </div>

            {/* Food Details */}
            <div className="p-5 flex-grow flex flex-col">
              <h2 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">{foodTitle}</h2>
              
              {description && (
                <p className="text-sm text-gray-600 mb-4 line-clamp-2 flex-grow">
                  {description}
                </p>
              )}

              <div className="space-y-2 mt-auto">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <FaUtensils className="text-purple-500" />
                    <span className="font-medium">Category:</span>
                  </div>
                  <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs font-medium capitalize">
                    {category}
                  </span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <BsBox className="text-blue-500" />
                    <span className="font-medium">Quantity:</span>
                  </div>
                  <span className="text-gray-800 font-semibold">{quantity}</span>
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <BsCalendar className="text-green-500" />
                    <span className="font-medium">Expires:</span>
                  </div>
                  <span className={`font-semibold ${
                    isExpired ? 'text-red-600' : isExpiringSoon ? 'text-orange-600' : 'text-green-600'
                  }`}>
                    {expiry.toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Back Side - Detailed View */}
        <div className="absolute w-full h-full [backface-visibility:hidden] flex flex-col rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 text-white [transform:rotateY(180deg)] overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="w-full h-full bg-repeat" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>

          <div className="relative z-10 p-6 flex flex-col h-full">
            {/* Header */}
            <div className="text-center mb-4">
              <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                {foodTitle}
              </h3>
              <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold ${statusInfo.color}`}>
                <span>{statusInfo.icon}</span>
                <span>{statusInfo.text}</span>
              </div>
            </div>

            {/* Description */}
            {description && (
              <div className="mb-6 flex-grow">
                <p className="text-gray-300 text-sm leading-relaxed text-center">
                  {description}
                </p>
              </div>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-3 mb-6">
              <div className="bg-white/10 rounded-lg p-3 text-center backdrop-blur-sm">
                <FaUtensils className="mx-auto text-purple-400 mb-1" />
                <div className="text-xs text-gray-300">Category</div>
                <div className="text-sm font-semibold capitalize">{category}</div>
              </div>
              <div className="bg-white/10 rounded-lg p-3 text-center backdrop-blur-sm">
                <BsBox className="mx-auto text-blue-400 mb-1" />
                <div className="text-xs text-gray-300">Quantity</div>
                <div className="text-sm font-semibold">{quantity}</div>
              </div>
            </div>

            {/* Expiry Info */}
            <div className="bg-white/5 rounded-xl p-4 mb-6 backdrop-blur-sm border border-white/10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <BsCalendar className="text-green-400" />
                  <span className="text-sm font-medium">Expiry Date</span>
                </div>
                <span className={`font-bold ${
                  isExpired ? 'text-red-400' : isExpiringSoon ? 'text-orange-400' : 'text-green-400'
                }`}>
                  {expiry.toLocaleDateString()}
                </span>
              </div>
              {!isExpired && (
                <div className="text-xs text-gray-400 mt-2 text-center">
                  {Math.ceil((expiry - today) / (1000 * 60 * 60 * 24))} days remaining
                </div>
              )}
            </div>

            {/* Action Button */}
            <Link to={`/foods/${_id}`} className="mt-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-600 hover:to-blue-600 text-white font-semibold py-2 px-3 rounded-xl transition-all duration-300 shadow-lg hover:shadow-xl  flex items-center justify-center gap-2 -mt-6"
              >
                <span>View Full Details</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;