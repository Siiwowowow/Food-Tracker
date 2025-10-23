import React, { useState, useContext, useEffect } from 'react';
import { FaRegTrashAlt } from "react-icons/fa";
import { FiShare, FiEdit } from "react-icons/fi";
import { Link } from 'react-router';
import Swal from 'sweetalert2';
import { AuthContext } from '../Context/AuthContext';
import toast from 'react-hot-toast';

const MyFoodList = ({ foodsApiPromise }) => {
  const { user } = useContext(AuthContext);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState(null);

  // Load foods from promise or fetch directly
  useEffect(() => {
    const loadFoods = async () => {
      try {
        setLoading(true);
        if (foodsApiPromise) {
          const initialFoods = await foodsApiPromise;
          setFoods(initialFoods);
        } else {
          // Fallback: fetch foods directly
          const response = await fetch('https://a11-food-tracker-crud-server.vercel.app/foods?email=' + user?.email, {
            credentials: 'include'
          });
          if (response.ok) {
            const data = await response.json();
            setFoods(data);
          }
        }
      } catch (error) {
        console.error('Error loading foods:', error);
        toast.error('Failed to load food items');
      } finally {
        setLoading(false);
      }
    };

    loadFoods();
  }, [foodsApiPromise, user]);

  const getStatus = (expiryDate) => {
    const today = new Date();
    const exp = new Date(expiryDate);
    const diffTime = exp - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { status: 'Expired', color: 'badge-error', days: 'Expired' };
    if (diffDays <= 3) return { status: 'Expiring Soon', color: 'badge-warning', days: `${diffDays} day${diffDays !== 1 ? 's' : ''} left` };
    return { status: 'Active', color: 'badge-success', days: `${diffDays} day${diffDays !== 1 ? 's' : ''} left` };
  };

  const handleDelete = async (_id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This food item will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
      reverseButtons: true
    });

    if (result.isConfirmed) {
      setDeletingId(_id);
      
      try {
        const response = await fetch(`https://a11-food-tracker-crud-server.vercel.app/foods/${_id}`, {
          method: 'DELETE',
          credentials: 'include',
        });

        const data = await response.json();

        if (response.ok && data.deletedCount > 0) {
          setFoods(prev => prev.filter(food => food._id !== _id));
          Swal.fire("Deleted!", "Your food item has been deleted.", "success");
          toast.success('Food item deleted successfully');
        } else {
          throw new Error(data.message || 'Failed to delete');
        }
      } catch (error) {
        console.error('Delete error:', error);
        Swal.fire("Error!", "There was a problem deleting your food item.", "error");
        toast.error('Failed to delete food item');
      } finally {
        setDeletingId(null);
      }
    }
  };

 

  const refreshFoods = async () => {
    try {
      setLoading(true);
      const response = await fetch('https://a11-food-tracker-crud-server.vercel.app/foods?email=' + user?.email, {
        credentials: 'include'
      });
      if (response.ok) {
        const data = await response.json();
        setFoods(data);
        toast.success('Food list refreshed');
      }
    } catch (error) {
      console.error('Refresh error:', error);
      toast.error('Failed to refresh');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="loading loading-spinner loading-lg text-[#279991]"></div>
        <span className="ml-4 text-gray-600">Loading your food items...</span>
      </div>
    );
  }

  return (
    <div className="bg-base-100 rounded-lg shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-center p-6 border-b border-gray-200">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">My Food Items</h2>
          <p className="text-gray-600 mt-1">
            {foods.length} item{foods.length !== 1 ? 's' : ''} in your inventory
          </p>
        </div>
        <button
          onClick={refreshFoods}
          className="btn btn-outline btn-sm flex items-center gap-2"
          disabled={loading}
        >
          {loading ? (
            <div className="loading loading-spinner loading-xs"></div>
          ) : (
            '🔄 Refresh'
          )}
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="table w-full">
          {/* Desktop Table Head */}
          <thead className="bg-gray-50">
            <tr className="text-xs uppercase text-gray-500">
              <th className="py-4 px-6 font-semibold hidden md:table-cell">#</th>
              <th className="py-4 px-6 font-semibold">Food Item</th>
              
              <th className="py-4 px-6 font-semibold hidden md:table-cell">Quantity</th>
              <th className="py-4 px-6 font-semibold hidden md:table-cell">Expiry Date</th>
              <th className="py-4 px-6 font-semibold">Status</th>
              <th className="py-4 px-6 font-semibold text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {foods.length === 0 ? (
              <tr>
                <td colSpan="7" className="text-center py-12">
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <div className="text-6xl mb-4">🍽️</div>
                    <p className="text-lg font-medium mb-2">No food items found</p>
                    <p className="text-sm mb-4">Start by adding some food items to track</p>
                    <Link to="/add-food" className="btn btn-primary">
                      Add Your First Food Item
                    </Link>
                  </div>
                </td>
              </tr>
            ) : (
              foods.map((food, index) => {
                const statusInfo = getStatus(food.expiryDate);
                return (
                  <tr 
                    key={food._id} 
                    className="hover:bg-gray-50 border-b border-gray-100 transition-colors duration-200"
                  >
                    {/* Index - Hidden on mobile */}
                    <td className="py-4 px-6 font-semibold text-gray-700 hidden md:table-cell">
                      {index + 1}
                    </td>

                    {/* Food Details */}
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-4">
                        <div className="avatar">
                          <div className="mask mask-squircle w-12 h-12">
                            <img 
                              src={food.foodImage || '/default-food.png'} 
                              alt={food.foodTitle}
                              onError={(e) => {
                                e.target.src = '/default-food.png';
                              }}
                            />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-gray-800 text-lg mb-1">
                            {food.foodTitle}
                          </p>
                          {food.description && (
                            <p className="text-sm text-gray-600 line-clamp-2 hidden md:block">
                              {food.description}
                            </p>
                          )}
                          {/* Mobile-only details */}
                          <div className="md:hidden space-y-1 mt-2">
                            <div className="flex items-center gap-2 text-sm">
                              <span className="font-medium">Quantity:</span>
                              <span>{food.quantity}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm">
                              <span className="font-medium">Expires:</span>
                              <span>{new Date(food.expiryDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Category - Always visible */}
                    

                    {/* Quantity - Hidden on mobile */}
                    <td className="py-4 px-6 font-medium hidden md:table-cell">
                      {food.quantity}
                    </td>

                    {/* Expiry Date - Hidden on mobile */}
                    <td className="py-4 px-6 hidden md:table-cell">
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {new Date(food.expiryDate).toLocaleDateString()}
                        </span>
                        <span className="text-xs text-gray-500">
                          {statusInfo.days}
                        </span>
                      </div>
                    </td>

                    {/* Status - Always visible */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col gap-1">
                        <span className={`badge ${statusInfo.color}`}>
                          {statusInfo.status}
                        </span>
                        <span className="text-xs text-gray-500 hidden md:block">
                          {statusInfo.days}
                        </span>
                      </div>
                    </td>

                    {/* Actions - Always visible */}
                    <td className="py-4 px-6">
                      <div className="flex flex-col md:flex-row gap-2 justify-center">
                        <Link to={`/update-food/${food._id}`}>
                          <button 
                            className="btn btn-sm btn-outline btn-primary flex items-center gap-2 w-full md:w-auto"
                            title="Edit food item"
                          >
                            <FiEdit className="text-sm" />
                            <span className="hidden sm:inline">Edit</span>
                          </button>
                        </Link>
                        
                       

                        <button
                          onClick={() => handleDelete(food._id)}
                          disabled={deletingId === food._id}
                          className="btn btn-sm btn-error text-white flex items-center gap-2 w-full md:w-auto"
                          title="Delete food item"
                        >
                          {deletingId === food._id ? (
                            <div className="loading loading-spinner loading-xs"></div>
                          ) : (
                            <FaRegTrashAlt className="text-sm" />
                          )}
                          <span className="hidden sm:inline">
                            {deletingId === food._id ? 'Deleting...' : 'Delete'}
                          </span>
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Summary Footer */}
      {foods.length > 0 && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <div className="flex flex-wrap gap-4 text-sm text-gray-600">
            <span>Total: {foods.length} items</span>
            <span>
              Expiring Soon: {foods.filter(food => getStatus(food.expiryDate).status === 'Expiring Soon').length}
            </span>
            <span>
              Expired: {foods.filter(food => getStatus(food.expiryDate).status === 'Expired').length}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyFoodList;