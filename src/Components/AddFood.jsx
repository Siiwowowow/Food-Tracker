import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router';
import { AuthContext } from '../Context/AuthContext';

const FoodForm = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  // ✅ Auto switch backend based on environment
  const API_BASE_URL =
  import.meta.env.MODE === 'development'
    ? import.meta.env.VITE_API_LOCAL
    : import.meta.env.VITE_API_PROD;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      toast.error('Please login to add food');
      return;
    }

    const form = e.target;
    const formData = new FormData(form);
    const newFood = Object.fromEntries(formData.entries());

    // ✅ Prepare correct structure for backend
    const foodData = {
      foodImage: newFood.foodImage,
      foodTitle: newFood.foodTitle,
      foodCategory: newFood.category,
      quantity: newFood.quantity,
      expiryDate: newFood.expiryDate,
      description: newFood.description,
      userEmail: user.email,
      addedDate: new Date().toISOString(),
      likedBy: [],
      expiryNotificationSent: false,
      expiredNotificationSent: false,
    };

    console.log('📤 Sending food data:', foodData);

    fetch(`${API_BASE_URL}/foods`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  credentials: 'include',
  body: JSON.stringify(foodData),
})

      .then((res) => {
        console.log('📥 Response status:', res.status);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        console.log('✅ Success response:', data);
        if (data.insertedId || data.success) {
          toast.success('Food item added successfully!');
          form.reset();
          setTimeout(() => navigate('/my-items'), 800);
        } else {
          toast.error('Something went wrong. Try again.');
        }
      })
      .catch((error) => {
        console.error('❌ Error adding food:', error);
        toast.error('Failed to add food item. Please try again.');
      });
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <Helmet>
        <title>Add New Food Item - FreshTracker</title>
      </Helmet>

      <div className="bg-base-100 p-8 rounded-lg shadow-xl w-full max-w-2xl">
        <h2 className="text-3xl font-extrabold text-base-500 text-center mb-8">
          Add New Food Item
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Food Image */}
          <div>
            <label className="block text-sm font-medium mb-2">Food Image URL</label>
            <input
              type="url"
              name="foodImage"
              className="input input-bordered w-full"
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>

          {/* Title */}
          <div>
            <label className="block text-sm font-medium">Food Title *</label>
            <input
              type="text"
              name="foodTitle"
              className="input input-bordered w-full"
              placeholder="e.g., Organic Bananas"
              required
            />
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium">Category *</label>
            <select name="category" className="select select-bordered w-full" required>
              <option value="">Select a category</option>
              <option value="dairy">Dairy</option>
              <option value="meat">Meat</option>
              <option value="vegetables">Vegetables</option>
              <option value="fruits">Fruits</option>
              <option value="grains">Grains</option>
              <option value="snacks">Snacks</option>
              <option value="beverages">Beverages</option>
              <option value="other">Other</option>
            </select>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium">Quantity *</label>
            <input
              type="text"
              name="quantity"
              className="input input-bordered w-full"
              placeholder="e.g., 6 pieces, 1 kg"
              required
            />
          </div>

          {/* Expiry Date */}
          <div>
            <label className="block text-sm font-medium">Expiry Date *</label>
            <input
              type="date"
              name="expiryDate"
              min={today}
              className="input input-bordered w-full"
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              rows="3"
              className="textarea textarea-bordered w-full"
              placeholder="Brief description..."
            ></textarea>
          </div>

          {/* User Email */}
          <div>
            <label className="block text-sm font-medium">Your Email</label>
            <input
              type="email"
              value={user?.email || 'Not logged in'}
              className="input input-bordered w-full bg-gray-100 cursor-not-allowed"
              readOnly
              disabled
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 px-4 text-white bg-[#129990] hover:bg-[#399b94] rounded-md shadow-sm text-lg font-medium transition-colors duration-200"
          >
            Add Food Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default FoodForm;
