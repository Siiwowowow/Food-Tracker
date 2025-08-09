import React, {  use } from 'react';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import { AuthContext } from '../Context/AuthContext';

const FoodForm = () => {
  const { user } = use(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);
    const newFood = Object.fromEntries(formData.entries());

    newFood.addedDate = new Date().toISOString();
    newFood.userEmail = user?.email;
    newFood.likedBy = []

    fetch('https://a11-food-tracker-crud-server.vercel.app/foods', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newFood),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.insertedId || data.success) {
          toast.success('Food item added successfully!');
          setTimeout(() => navigate('/my-items'), 800);
          form.reset(); // Reset the form fields
        } else {
          toast.error('Something went wrong. Try again.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error('Failed to add food item.');
      });
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <Helmet>
        <title>Add New Food Item - FreshTracker</title>
      </Helmet>
      <div className="bg-base-100 p-8 rounded-lg shadow-xl w-full max-w-2xl">
        <h2 className="text-3xl font-extrabold text-base-500 text-center mb-8">Add New Food Item</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Food Image URL */}
          <div>
            <label htmlFor="foodImage" className="block text-sm font-medium text-base-400 mb-2">
              Food Image URL
            </label>
            <input
              type="url"
              name="foodImage"
              id="foodImage"
              className="shadow-sm block w-full sm:text-sm border border-gray-300 rounded-md p-2"
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>

          {/* Food Title */}
          <div>
            <label htmlFor="foodTitle" className="block text-sm font-medium text-base-400">
              Food Title
            </label>
            <input
              type="text"
              name="foodTitle"
              id="foodTitle"
              className="shadow-sm block w-full sm:text-sm border border-gray-300 rounded-md p-2"
              placeholder="e.g., Organic Bananas"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-base-400">
              Category
            </label>
            <select
              name="category"
              id="category"
              className="block w-full py-2 px-3 border border-gray-300 rounded-md bg-base-100 text-base-400 focus:outline-none focus:ring-2 focus:ring-[#129990] focus:border-transparent"
              required
            >
              <option value="">Select a category</option>
              <option value="Dairy">Dairy</option>
              <option value="Meat">Meat</option>
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
              <option value="Grains">Grains</option>
              <option value="Snacks">Snacks</option>
              <option value="Beverages">Beverages</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Quantity */}
          <div>
            <label htmlFor="quantity" className="block text-sm font-medium text-base-400">
              Quantity
            </label>
            <input
              type="text"
              name="quantity"
              id="quantity"
              className="shadow-sm block w-full sm:text-sm border border-gray-300 rounded-md p-2"
              placeholder="e.g., 6 pieces, 1 kg, 500g"
              required
            />
          </div>

          {/* Expiry Date */}
          <div>
            <label htmlFor="expiryDate" className="block text-sm font-medium text-base-400">
              Expiry Date
            </label>
            <input
              type="date"
              name="expiryDate"
              id="expiryDate"
              className="shadow-sm block w-full sm:text-sm border border-gray-300 rounded-md p-2"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-base-400">
              Description
            </label>
            <textarea
              name="description"
              id="description"
              rows="3"
              className="shadow-sm block w-full sm:text-sm border border-gray-300 rounded-md p-2"
              placeholder="Brief description of the food item..."
            />
          </div>

          {/* User Email (disabled display only) */}
          <div>
            <label htmlFor="userEmail" className="block text-sm font-medium text-base-400">
              User Email
            </label>
            <input
              type="email"
              name="userEmailDisplay"
              id="userEmail"
              value={user?.email || ''}
              className="shadow-sm bg-base-100 cursor-not-allowed block w-full sm:text-sm border border-gray-300 rounded-md p-2"
              readOnly
              disabled
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-2 px-4 text-white bg-[#129990] hover:bg-[#399b94] rounded-md shadow-sm text-sm font-medium transition-colors duration-200"
            >
              Add Food Item
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FoodForm;
