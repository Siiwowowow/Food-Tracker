import React, { useState, use } from 'react';
import { FaDeleteLeft } from "react-icons/fa6";
import { FiShare } from "react-icons/fi";
import { Link } from 'react-router';
import Swal from 'sweetalert2';

const MyFoodList = ({ foodsApiPromise }) => {
  const initialFoods = use(foodsApiPromise);
  const [foods, setFoods] = useState(initialFoods);

  const getStatus = (expiryDate) => {
    const today = new Date();
    const exp = new Date(expiryDate);
    return exp < today ? 'Expired' : 'Active';
  };

  const handleDelete = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        fetch(`https://a11-food-tracker-crud-server.vercel.app/foods/${_id}`, {
          method: 'DELETE',
          credentials: 'include',
        })
          .then(res => res.json())
          .then(data => {
            if (data.deletedCount) {
              setFoods(prev => prev.filter(food => food._id !== _id));
              Swal.fire("Deleted!", "Your food has been deleted.", "success");
            }
          })
          .catch(() => {
            Swal.fire("Error!", "There was a problem deleting your food.", "error");
          });
      }
    });
  };

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
              {/* Index */}
              <td className="py-2 px-4 md:table-cell block font-bold">{index + 1}</td>

              {/* Food Details */}
              <td className="py-2 px-4 flex md:table-cell gap-3 items-center">
                <div className="avatar hidden md:inline-block">
                  <div className="mask mask-squircle w-12 h-12">
                    <img src={food.foodImage} alt={food.foodTitle} />
                  </div>
                </div>
                <div>
                  <p className="font-semibold">{food.foodTitle}</p>
                  <p className="text-xs text-base-400 ">{food.description}</p>
                </div>
              </td>

              {/* Category */}
              <td className="py-2 px-4 capitalize md:table-cell block">
                <span className="badge badge-outline">{food.category}</span>
              </td>

              {/* Quantity */}
              <td className="py-2 px-4 md:table-cell block">{food.quantity}</td>

              {/* Expiry */}
              <td className="py-2 px-4 md:table-cell block">
                {new Date(food.expiryDate).toLocaleDateString()}
              </td>

              {/* Status */}
              <td className="py-2 px-4 md:table-cell block">
                <span className={`badge ${getStatus(food.expiryDate) === 'Expired'
                  ? 'bg-red-100 text-red-500'
                  : 'bg-green-100 text-green-500'
                  }`}>
                  {getStatus(food.expiryDate)}
                </span>
              </td>

              {/* Actions */}
              <td className="py-2 px-4 flex gap-2 flex-wrap md:table-cell block">
                <Link to={`/update-food/${food._id}`}>
                  <button className="btn btn-sm bg-blue-600 text-white hover:bg-blue-700 flex items-center gap-1">
                    <FiShare /> Update
                  </button>
                </Link>
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

      {/* Mobile empty state */}
      {foods.length === 0 && (
        <p className="text-center text-gray-500 p-4">No food items found.</p>
      )}
    </div>
  );
};

export default MyFoodList;
