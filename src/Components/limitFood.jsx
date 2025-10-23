import React from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { motion } from 'framer-motion';

const LimitFood = () => {
  // Use TanStack Query to fetch limited foods
  const { data: foods, isLoading, isError, error, refetch } = useQuery({
    queryKey: ['limitedFoods'],
    queryFn: async () => {
      const response = await axios.get('https://a11-food-tracker-crud-server.vercel.app/foods/limit');
      return response.data;
    },
    staleTime: 5 * 60 * 1000, // 5 minutes cache
    retry: 2, // Retry twice on failure
  });

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary mb-4"></div>
          <p className="text-gray-600 text-lg">Loading fresh foods...</p>
          <p className="text-gray-400 text-sm mt-2">Finding the best items for you</p>
        </div>
      </div>
    );
  }

  // Error state
  if (isError) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <div className="text-center max-w-md mx-auto p-6">
          <div className="text-6xl mb-4">😔</div>
          <h2 className="text-2xl font-bold text-red-600 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">
            {error?.message || 'Failed to load featured foods. Please try again.'}
          </p>
          <button
            onClick={refetch}
            className="btn btn-primary gap-2"
          >
            🔄 Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 py-12">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            🍎 Fresh Picks
          </h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Discover foods that need your attention soon. Perfect for your next meal planning!
          </p>
          <div className="flex justify-center gap-4 mt-6">
            <button
              onClick={refetch}
              className="btn btn-outline btn-sm gap-2"
            >
              🔄 Refresh
            </button>
            <div className="badge badge-primary badge-lg">
              {foods?.length || 0} items
            </div>
          </div>
        </motion.div>

        {/* Foods Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 justify-items-center"
        >
          {foods?.map((food, index) => (
            <motion.div
              key={food._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              className="w-full max-w-sm"
            >
              <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 hover:shadow-xl transition-all duration-300">
                {/* Food Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={food.foodImage || '/default-food.jpg'}
                    alt={food.foodTitle}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                    onError={(e) => {
                      e.target.src = '/default-food.jpg';
                    }}
                  />
                  {/* Expiry Badge */}
                  <div className="absolute top-3 right-3">
                    {new Date(food.expiryDate) < new Date() ? (
                      <span className="badge badge-error text-white">Expired</span>
                    ) : (
                      <span className="badge badge-success text-white">Fresh</span>
                    )}
                  </div>
                </div>

                {/* Food Details */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-1">
                    {food.foodTitle}
                  </h3>
                  
                  {food.description && (
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {food.description}
                    </p>
                  )}

                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Category:</span>
                      <span className="font-semibold text-blue-600 capitalize">
                        {food.category}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Quantity:</span>
                      <span className="font-semibold text-green-600">
                        {food.quantity}
                      </span>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-gray-500">Expires:</span>
                      <span className="font-semibold text-orange-600">
                        {new Date(food.expiryDate).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <button className="btn btn-primary w-full mt-4">
                    View Details
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Empty State */}
        {(!foods || foods.length === 0) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-8xl mb-6">🥑</div>
            <h3 className="text-2xl font-semibold text-gray-700 mb-3">
              No Featured Foods Available
            </h3>
            <p className="text-gray-500 max-w-md mx-auto mb-6">
              All current food items are either fresh for a while or have been recently featured. 
              Check back later for new recommendations!
            </p>
            <button
              onClick={refetch}
              className="btn btn-primary gap-2"
            >
              🔄 Check Again
            </button>
          </motion.div>
        )}

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center mt-12 text-gray-500 text-sm"
        >
          <p>Showing {foods?.length || 0} fresh food items</p>
          <p className="mt-1">Data updates automatically every 5 minutes</p>
        </motion.div>
      </div>
    </div>
  );
};

export default LimitFood;