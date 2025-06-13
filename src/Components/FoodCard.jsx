import React from 'react';
import { BsBox } from 'react-icons/bs';
import { Link } from 'react-router';
import { motion } from "motion/react"
const FoodCard = ({ food }) => {
  const { foodImage, foodTitle, category, quantity, expiryDate } = food;
  
  // Calculate expiry status
  const today = new Date();
  const expiry = new Date(expiryDate);
  const isExpired = expiry < today;
  const isExpiringSoon = (expiry - today) < (3 * 24 * 60 * 60 * 1000);

  return (
    <motion.div
     whileHover={{ scale: 1.05 }}
  whileTap={{ scale: 0.95 }}
  onHoverStart={() => console.log('hover started!')}
     className="relative bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow">
      {/* Expiry Badges */}
      {isExpired && (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          ⚠️ Expired
        </div>
      )}
      {!isExpired && isExpiringSoon && (
        <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          ⏳ Expires Soon
        </div>
      )}

      {/* Food Image */}
      <img 
        src={foodImage} 
        alt={foodTitle} 
        className="w-full h-48 object-cover"
      />

      {/* Food Details */}
      <div className="p-4">
        <h2 className="text-lg font-semibold mb-2">{foodTitle}</h2>
        
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-700">
            <span>Category: </span>
            <span className="ml-1 text-blue-600 font-medium">{category}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-700">
            <BsBox className="mr-1" />
            <span>Quantity: </span>
            <span className="ml-1 text-blue-600 font-medium">{quantity}</span>
          </div>
          
          <div className="text-sm text-gray-700">
            📅 Expires: {expiry.toLocaleDateString()}
          </div>
        </div>

        <Link to={`/foods/${food._id}`}>
        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition-colors">
          See Details
        </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default FoodCard;