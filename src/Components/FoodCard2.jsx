import React, { useEffect, useState, useContext } from 'react';
import { BsBox } from 'react-icons/bs';
import { Link } from 'react-router';
import { AiOutlineLike, AiFillLike } from 'react-icons/ai';
import { motion } from "framer-motion";
import { AuthContext } from '../Context/AuthContext';
import axios from 'axios';
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
    addedArea = "Not Specified" // Optional area/location field
  } = food || {};

  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(likedBy.length);

  useEffect(() => {
    if (user?.email) {
      setLiked(likedBy.includes(user.email));
    }
  }, [likedBy, user]);

 const handleLike = () => {
  // If user is logged in, prevent liking own item
  if (user?.email && user.email === userEmail) {
    return toast.error('Lojja lage na? Nijer item e like!');
  }

  // Prepare email to send - if user logged in send email, else send empty string or 'guest'
  const emailToSend = user?.email || 'guest';

  axios.patch(`https://a11-food-tracker-crud-server.vercel.app/like/${_id}`, {
    userEmail: emailToSend
  })
  .then(data => {
    const isLiked = data?.data?.liked;
    setLiked(isLiked);
    setLikeCount(prev => isLiked ? prev + 1 : prev - 1);
    toast.success(isLiked ? 'Liked!' : 'Disliked!');
  })
  .catch(err => {
    console.error(err);
    toast.error('Something went wrong');
  });
};


  const today = new Date();
  const expiry = new Date(expiryDate);
  const isExpired = expiry < today;
  const expiresSoon = !isExpired && (expiry - today) < (3 * 24 * 60 * 60 * 1000);

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="relative bg-white rounded-xl shadow-md border hover:shadow-lg transition-all duration-300 overflow-hidden"
    >
      {/* Expiry badge */}
      {isExpired ? (
        <div className="absolute top-2 right-2 bg-red-600 text-white text-xs px-3 py-1 rounded-full shadow-sm">
          ⚠️ Expired
        </div>
      ) : expiresSoon ? (
        <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs px-3 py-1 rounded-full shadow-sm">
          ⏳ Expires Soon
        </div>
      ) : null}

      {/* Image */}
      <img
        src={foodImage}
        alt={foodTitle}
        className="w-full h-48 object-cover rounded-t-xl"
      />

      {/* Content */}
      <div className="p-4">
        <h2 className="text-xl font-bold text-gray-800 mb-1">{foodTitle}</h2>
        <p className="text-sm text-gray-500 mb-2">📍 Area: <span className="font-medium">{addedArea}</span></p>

        <div className="space-y-1 mb-4 text-sm text-gray-600">
          <p><span className="font-medium">Category:</span> {category}</p>
          <p className="flex items-center gap-1"><BsBox /> <span className="font-medium">Quantity:</span> {quantity}</p>
          <p><span className="font-medium">Expires:</span> {expiry.toLocaleDateString()}</p>
        </div>

        {/* Actions */}
        <div className="flex justify-between items-center">
          <Link to={`/foods/${_id}`}>
            <button className="bg-teal-600 hover:bg-teal-700 text-white py-1.5 px-4 text-sm rounded-md font-medium transition">
              See Details
            </button>
          </Link>

          <div className="flex items-center gap-2">
            <button
  onClick={handleLike}
  className="flex items-center gap-1 px-2 py-1 text-sm border rounded-full hover:bg-gray-100 transition"
>
  
  <span className={`${liked ? 'text-blue-600 font-semibold' : 'text-gray-700'}`}>
    {liked ? <AiFillLike size={20} className="text-blue-500" /> : <AiOutlineLike size={20} className="text-gray-400" />}
  </span>
</button>

            <span className="text-xs text-gray-500">❤️ {likeCount}</span>
            <button className="bg-blue-500 hover:bg-blue-600 text-white text-sm px-3 py-1 rounded-md">Order</button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FoodCard2;
