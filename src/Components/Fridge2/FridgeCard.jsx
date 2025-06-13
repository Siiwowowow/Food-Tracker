import React from 'react';
import { BsBox } from 'react-icons/bs';
import { Link } from 'react-router';


const FridgeCard = ({ food }) => {
  const { foodImage, foodTitle, _id, category, quantity, expiryDate } = food;

  // Calculate expiry status
  const today = new Date();
  const expiry = new Date(expiryDate);
  const isExpired = expiry < today;
  const expiresSoon = !isExpired && (expiry - today) < (3 * 24 * 60 * 60 * 1000);

  return (
    <div>

      <div className="relative bg-white rounded-lg shadow border border-gray-200 hover:shadow-md transition-all">
        {/* Expiry badge */}
        {isExpired ? (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            ⚠️ Expired
          </div>
        ) : expiresSoon ? (
          <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            ⏳ Expires Soon
          </div>
        ) : null}

        {/* Food image */}
        <img
          src={foodImage}
          alt={foodTitle}
          className="w-full h-40 object-cover"
        />

        {/* Card content */}
        <div className="p-4">
          <h2 className="text-lg font-bold mb-2">{foodTitle}</h2>

          <div className="space-y-2 mb-3">
            <p className="text-sm">
              <span className="font-medium">Category:</span> {category}
            </p>

            <p className="text-sm flex items-center">
              <BsBox className="mr-1" />
              <span className="font-medium">Quantity:</span> {quantity}
            </p>

            <p className="text-sm">
              <span className="font-medium">Expires:</span> {expiry.toLocaleDateString()}
            </p>
          </div>

          <Link to={`/foods/${_id}`}>
            <button className="w-full bg-teal-600 hover:bg-teal-700 text-white py-2 rounded font-medium">
              See Details
            </button>
          </Link>
        </div>

      </div>
      
    </div>

  );
};

export default FridgeCard;