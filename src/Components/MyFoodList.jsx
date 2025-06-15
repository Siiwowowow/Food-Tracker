import React, { useState, useEffect } from 'react';
import { FaDeleteLeft } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import Swal from 'sweetalert2';
import UpdateFoodModal from './UpdateFood/UpdateFood';

import { toast } from 'react-hot-toast';


const MyFoodList = () => {
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFoodId, setSelectedFoodId] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);


  useEffect(() => {
    const fetchFoods = async () => {
      try {
        const response = await fetch('https://a11-food-tracker-crud-server.vercel.app/foods', {
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch foods');
        }

        const data = await response.json();
        setFoods(data);
      } catch (error) {
        console.error('Error fetching foods:', error);
        toast.error('Failed to load food items');
      } finally {
        setLoading(false);
      }
    };

    fetchFoods();
  }, []);

  const getStatus = (expiryDate) => {
    const today = new Date();
    const exp = new Date(expiryDate);
    return exp < today ? 'Expired' : 'Active';
  };

  const handleDelete = async (_id) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!"
  });

  if (result.isConfirmed) {
    try {
      const response = await fetch(`https://a11-food-tracker-crud-server.vercel.app/foods/${_id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to delete food item');
      }

      setFoods(prev => prev.filter(food => food._id !== _id));
      
      await Swal.fire({
        title: "Deleted!",
        text: "Your food item has been deleted.",
        icon: "success"
      });
    } catch (error) {
      console.error('Error deleting food:', error);
      await Swal.fire({
        title: "Error!",
        text: "Failed to delete food item",
        icon: "error"
      });
    }
  }
};

  const handleUpdateClick = (foodId) => {
    setSelectedFoodId(foodId);
    setShowUpdateModal(true);
  };

  const handleModalClose = () => {
    setShowUpdateModal(false);
    setSelectedFoodId(null);
  };

  const refreshFoodList = async () => {
    try {
      const response = await fetch('https://a11-food-tracker-crud-server.vercel.app/foods', {
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to refresh food list');
      }

      const data = await response.json();
      setFoods(data);
    } catch (error) {
      console.error('Error refreshing food list:', error);
      toast.error('Failed to refresh food list');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  if (foods.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="text-xl font-semibold">No food items found</h3>
        <p className="text-gray-500">Add some food items to get started</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-base-100 rounded-lg shadow">
      <table className="table w-full text-sm">
        <thead>
          <tr className="bg-base-100 border border-gray-50 text-base-400 uppercase text-xs hidden md:table-row">
            <th>#</th>
            <th>Food Item</th>
            <th>Category</th>
            <th>Quantity</th>
            <th>Expiry</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {foods.map((food, index) => (
            <tr key={food._id} className="hover:bg-base-200 border-b border-gray-100 block md:table-row">
              <td className="py-2 px-4 md:table-cell block font-bold">{index + 1}</td>

              <td className="py-2 px-4 flex md:table-cell gap-3 items-center">
                <div className="avatar hidden md:inline-block">
                  <div className="mask mask-squircle w-12 h-12">
                    <img src={food.foodImage} alt={food.foodTitle} />
                  </div>
                </div>
                <div>
                  <p className="font-semibold">{food.foodTitle}</p>
                  <p className="text-xs text-base-400">{food.description}</p>
                </div>
              </td>

              <td className="py-2 px-4 capitalize md:table-cell block">
                <span className="badge badge-outline">{food.category}</span>
              </td>

              <td className="py-2 px-4 md:table-cell block">{food.quantity}</td>

              <td className="py-2 px-4 md:table-cell block">
                {new Date(food.expiryDate).toLocaleDateString()}
              </td>

              <td className="py-2 px-4 md:table-cell block">
                <span className={`badge ${getStatus(food.expiryDate) === 'Expired'
                  ? 'bg-red-100 text-red-500'
                  : 'bg-green-100 text-green-500'
                  }`}>
                  {getStatus(food.expiryDate)}
                </span>
              </td>

              <td className="py-2 px-4 flex gap-2 flex-wrap md:table-cell block">
                <button 
                  onClick={() => handleUpdateClick(food._id)}
                  className="btn btn-sm bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-1"
                >
                  <FiEdit /> Update
                </button>
                <button
                  onClick={() => handleDelete(food._id)}
                  className="btn btn-sm bg-red-500 text-white hover:bg-red-600 flex items-center gap-1"
                >
                  Delete <FaDeleteLeft />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showUpdateModal && (
        <UpdateFoodModal 
          id={selectedFoodId} 
          onClose={handleModalClose}
          onUpdateSuccess={refreshFoodList}
        />
      )}
    </div>
  );
};

export default MyFoodList;