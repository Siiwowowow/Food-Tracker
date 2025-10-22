import React, { useEffect, useState, useContext } from 'react';
import { BsBox } from 'react-icons/bs';
import { Link } from 'react-router';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { motion } from "framer-motion";
import { AuthContext } from '../Context/AuthContext';

import toast from 'react-hot-toast';

const FoodCard2 = ({ food }) => {
  const { user } = useContext(AuthContext);
  const {
    foodImage,
    userEmail,
    foodTitle,
    _id,
    category,
    quantity,
    expiryDate,
    likedBy = [],
    description,
  } = food || {};

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likedBy.length);
  const [isLiking, setIsLiking] = useState(false);

  useEffect(() => {
    if (user?.email) {
      setLiked(likedBy.includes(user.email));
    }
    setLikeCount(likedBy.length);
  }, [likedBy, user]);

  const handleLike = async () => {
    if (!user) {
      toast.error('Please login to like food');
      return;
    }

    if (user?.email === userEmail) {
      return toast.error("You can't like your own food!");
    }

    if (isLiking) return;

    setIsLiking(true);

    try {
      const response = await fetch(`http://localhost:3000/like/${_id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // Important for authentication
      });

      const data = await response.json();

      if (response.ok && data.success) {
        console.log('✅ Like response:', data);
        
        // Update state based on response
        setLiked(data.liked);
        setLikeCount(data.likesCount);
        
        toast.success(data.message);
      } else {
        console.error('❌ Like failed:', data);
        toast.error(data.message || 'Failed to like food');
      }
    } catch (error) {
      console.error('❌ Network error:', error);
      toast.error('Network error. Please try again.');
    } finally {
      setIsLiking(false);
    }
  };

 
  const today = new Date();
  const expiry = new Date(expiryDate);
  const isExpired = expiry < today;
  const expiresSoon = !isExpired && (expiry - today) < (3 * 24 * 60 * 60 * 1000);

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="relative bg-base-100 rounded-xl shadow-md border hover:shadow-lg transition-all duration-300 overflow-hidden w-full flex flex-col justify-between"
    >
      {/* Expiry badge */}
      {isExpired ? (
        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-3 py-1 rounded-full shadow-sm z-10">
          ⚠️ Expired
        </div>
      ) : expiresSoon ? (
        <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-3 py-1 rounded-full shadow-sm z-10">
          ⏳ Expires Soon
        </div>
      ) : null}

      {/* Image */}
      <div className="relative">
        <img
          src={foodImage || '/default-food-image.jpg'}
          alt={foodTitle}
          className="w-full h-48 object-cover rounded-t-xl"
          onError={(e) => {
            e.target.src = '/default-food-image.jpg';
          }}
        />
        {/* Like button overlay on image */}
        
      </div>

      {/* Content */}
      <div className="p-4 flex-1 flex flex-col">
        <h2 className="text-xl font-bold text-base-400 mb-1 line-clamp-1">{foodTitle}</h2>

        {/* Description */}
        {description && (
          <p className="text-sm text-gray-600 mb-2 line-clamp-2 flex-1">
            {description}
          </p>
        )}

        <div className="space-y-1 mb-4 text-sm text-base-400">
          <p><span className="font-medium">Category:</span> {category}</p>
          <p className="flex items-center gap-1">
            <BsBox className="flex-shrink-0" /> 
            <span className="font-medium">Quantity:</span> {quantity}
          </p>
          <p><span className="font-medium">Expires:</span> {expiry.toLocaleDateString()}</p>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center mt-auto">
          <Link to={`/foods/${_id}`}>
            <button className="bg-teal-600 hover:bg-teal-700 text-white py-1.5 px-4 text-sm rounded-md font-medium transition">
              See Details
            </button>
          </Link>

          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 text-sm">
              
              <div className="relative p-2 flex justify-end">
          <button
            onClick={handleLike}
            disabled={isLiking || !user || user?.email === userEmail}
            className={`flex items-center gap-1 p-2 rounded-full transition-all duration-200 ${
              liked 
                ? 'bg-red-500 text-white shadow-lg' 
                : 'bg-white/90 text-gray-700 hover:bg-white'
            } ${isLiking ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'} ${
              !user || user?.email === userEmail ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            title={
              !user ? 'Login to like' : 
              user?.email === userEmail ? "Can't like your own food" : 
              liked ? 'Unlike' : 'Like'
            }
          >
            {isLiking ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
            ) : liked ? (
              <AiFillLike size={18} />
            ) : (
              <AiOutlineLike size={18} />
            )}
          </button>
        </div>
              <span className="text-gray-600 font-medium">{likeCount}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FoodCard2;