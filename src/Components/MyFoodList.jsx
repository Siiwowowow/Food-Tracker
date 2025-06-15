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
        const expDate = new Date(expiryDate);
        return expDate < today ? 'Expired' : 'Active';
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
                    credentials:'include'

                })
                .then(res => res.json())
                .then(data => {
                   if(data.deletedCount){
                       setFoods(prevFoods => prevFoods.filter(food => food._id !== _id));
                       
                       Swal.fire({
                           title: "Deleted!",
                           text: "Your food has been deleted.",
                           icon: "success"
                       });
                   }
                })
                .catch(error => {
                    console.error('Error deleting food:', error);
                    Swal.fire({
                        title: "Error!",
                        text: "There was a problem deleting your food.",
                        icon: "error"
                    });
                });
            }
        });
    };

    return (
        <div className="p-4">
            <div className="overflow-x-auto bg-white shadow rounded-lg">
                <table className="table w-full">
                    <thead>
                        <tr className="bg-gray-100 text-gray-600 text-sm uppercase">
                            <th>#</th>
                            <th>Food Item</th>
                            <th>Category</th>
                            <th>Quantity</th>
                            <th>Expiry Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {foods.map(({
                            _id,
                            foodImage,
                            foodTitle,
                            description,
                            category,
                            quantity,
                            expiryDate
                        }, index) => (
                            <tr key={_id} className="hover:bg-gray-50">
                                <td>{index + 1}</td>
                                <td>
                                    <div className="flex items-center gap-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={foodImage} alt={foodTitle} />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{foodTitle}</div>
                                            <div className="text-sm text-gray-500">{description}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span className="badge badge-light-blue capitalize">
                                        {category}
                                    </span>
                                </td>
                                <td>{quantity}</td>
                                <td>{new Date(expiryDate).toLocaleDateString()}</td>
                                <td>
                                    <span
                                        className={`badge ${getStatus(expiryDate) === 'Expired'
                                                ? 'bg-red-100 text-red-500'
                                                : 'bg-green-100 text-green-500'
                                            }`}
                                    >
                                        {getStatus(expiryDate)}
                                    </span>
                                </td>
                                <td className="space-x-2">
                                    <Link to={`/update-food/${_id}`}>
                                    <button className="btn btn-sm bg-blue-600 text-white hover:bg-blue-700">
                                        <FiShare /> Update
                                    </button>
                                    </Link>
                                    <button onClick={() => handleDelete(_id)} className="btn btn-sm bg-red-500 text-white hover:bg-red-600">
                                        Delete <FaDeleteLeft />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyFoodList;