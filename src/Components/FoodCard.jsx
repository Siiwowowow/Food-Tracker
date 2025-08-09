import React from 'react';
import { BsBox } from 'react-icons/bs';
import { Link } from 'react-router';
import { motion } from "framer-motion";

const FoodCard = ({ food }) => {
  const { foodImage, foodTitle, description, category, quantity, expiryDate } = food;
  
  // Calculate expiry status
  const today = new Date();
  const expiry = new Date(expiryDate);
  const isExpired = expiry < today;
  const isExpiringSoon = (expiry - today) < (3 * 24 * 60 * 60 * 1000);

  return (
    <div className="group w-full h-96 mx-auto [perspective:1000px] cursor-pointer">
      <div className="relative w-full h-full transition-transform duration-500 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">
        {/* Front Side */}
        <div className="absolute w-full h-full [backface-visibility:hidden] rounded-md bg-white border border-gray-200 overflow-hidden">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="h-full flex flex-col"
          >
            {/* Expiry Badges */}
            {isExpired && (
              <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                ⚠️ Expired
              </div>
            )}
            {!isExpired && isExpiringSoon && (
              <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full z-10">
                ⏳ Expires Soon
              </div>
            )}

            {/* Food Image */}
            <img 
              src={foodImage} 
              alt={foodTitle} 
              className="w-full h-full object-cover"
            />

            {/* Food Details */}
           
          </motion.div>
        </div>

        {/* Back Side */}
        <div className="absolute w-full h-full [backface-visibility:hidden] flex flex-col items-center justify-center rounded-md bg-[#88D66C] text-white [transform:rotateY(180deg)] p-4">
          <h3 className="text-xl font-bold mb-2">{foodTitle}</h3>
          <p className="text-sm mb-4 text-center">{description}</p>
          
           <div className="p-4 flex-grow">
              <h2 className="text-lg font-semibold mb-2">{foodTitle}</h2>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <span>Category: </span>
                  <span className="ml-1 text-blue-600 font-medium">{category}</span>
                </div>
                
                <div className="flex items-center text-sm text-gray-600">
                  <BsBox className="mr-1" />
                  <span>Quantity: </span>
                  <span className="ml-1 text-blue-600 font-medium">{quantity}</span>
                </div>
                
                <div className="text-sm text-gray-600">
                  📅 Expires: {expiry.toLocaleDateString()}
                </div>
              </div>
            </div>

          <Link 
            to={`/foods/${food._id}`} 
            className="w-full mt-auto"
          >
            <button className="w-full bg-[#255c3b] text-white cursor-pointer py-2 rounded-lg font-medium transition-colors">
              See Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;