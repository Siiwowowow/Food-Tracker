import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { auth } from '../Firebase/Firebase.init'; // adjust the path if needed
import { Helmet } from 'react-helmet-async';

const FoodForm = () => {
  const [foodImage, setFoodImage] = useState('');
  const [foodTitle, setFoodTitle] = useState('');
  const [category, setCategory] = useState('');
  const [quantity, setQuantity] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [description, setDescription] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const user = auth.currentUser;
    setUserEmail(user?.email || '');
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      foodImage,
      foodTitle,
      category,
      quantity,
      expiryDate,
      description,
      addedDate: new Date().toISOString(),
      userEmail,
    };

    fetch('https://a11-food-tracker-crud-server.vercel.app/foods', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log('Server response:', data);
        if (data.insertId || data.insertedId || data.success) {
          toast.success('Food item added successfully!');
        } else {
          toast.error('Something went wrong. Try again.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
        toast.error('Failed to add food item.');
      });

    // Reset form
    setFoodImage('');
    setFoodTitle('');
    setCategory('');
    setQuantity('');
    setExpiryDate('');
    setDescription('');
  };

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <Helmet>
        <title>
          Add New Food Item - FreshTracker
        </title>
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
              id="foodImage"
              name="foodImage"
              value={foodImage}
              onChange={(e) => setFoodImage(e.target.value)}
              className="shadow-sm block w-full sm:text-sm border border-gray-300 rounded-md p-2"
              placeholder="https://example.com/image.jpg"
              required
            />
            {foodImage && (
              <div className="mt-4 border border-gray-300 bg-gray-100 rounded-md p-4 flex justify-center">
                <img src={foodImage} alt="Food Preview" className="h-32 w-32 object-cover rounded-md" />
              </div>
            )}
          </div>

          {/* Other Inputs */}
          {/* Food Title */}
          <div>
            <label htmlFor="foodTitle" className="block text-sm font-medium text-base-400">
              Food Title
            </label>
            <input
              type="text"
              id="foodTitle"
              value={foodTitle}
              onChange={(e) => setFoodTitle(e.target.value)}
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
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="block w-full py-2 px-3 border border-gray-300 rounded-md shadow-sm sm:text-sm"
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
              id="quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
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
              id="expiryDate"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
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
              id="description"
              rows="3"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="shadow-sm block w-full sm:text-sm border border-gray-300 rounded-md p-2"
              placeholder="Brief description of the food item..."
            />
          </div>

          {/* User Email (Read-only) */}
          <div>
            <label htmlFor="userEmail" className="block text-sm font-medium text-base-400">
              User Email
            </label>
            <input
              type="email"
              id="userEmail"
              value={userEmail}
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
