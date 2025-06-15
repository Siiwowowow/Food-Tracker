import React, { useEffect, useState, useRef } from 'react';
import { toast } from 'react-hot-toast';

const UpdateFoodModal = ({ id, onClose, onUpdateSuccess }) => {
  const dialogRef = useRef(null);
  const [formData, setFormData] = useState({
    foodImage: '',
    foodTitle: '',
    category: '',
    quantity: '',
    expiryDate: '',
    description: '',
    userEmail: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchFoodData = async () => {
      try {
        const response = await fetch(
          `https://a11-food-tracker-crud-server.vercel.app/foods/${id}`,
          {
            credentials: 'include',
          }
        );
        
        if (!response.ok) {
          throw new Error('Failed to fetch food item');
        }
        
        const data = await response.json();
        setFormData({
          foodImage: data.foodImage || '',
          foodTitle: data.foodTitle || '',
          category: data.category || '',
          quantity: data.quantity || '',
          expiryDate: data.expiryDate.split('T')[0] || '',
          description: data.description || '',
          userEmail: data.userEmail || ''
        });
      } catch (err) {
        console.error('Error fetching food:', err);
        toast.error('Failed to fetch food item.');
        onClose();
      }
    };

    if (id) {
      fetchFoodData();
    }
  }, [id, onClose]);

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(
        `https://a11-food-tracker-crud-server.vercel.app/foods/${id}`,
        {
          method: 'PUT',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...formData,
            expiryDate: new Date(formData.expiryDate).toISOString()
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to update food item');
      }

      toast.success('Food item updated successfully!');
      onUpdateSuccess();
      onClose();
    } catch (error) {
      console.error('Error updating food:', error);
      toast.error(error.message || 'Failed to update food item.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <dialog 
      ref={dialogRef} 
      className="modal modal-open"
      onClose={onClose}
    >
      <form onSubmit={handleSubmit} className="modal-box max-w-2xl space-y-6">
        <button 
          type="button"
          onClick={onClose} 
          className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
          aria-label="Close"
          disabled={isSubmitting}
        >
          ✕
        </button>
        
        <h3 className="text-3xl font-extrabold text-base-700 text-center mb-4">
          Update Food Item
        </h3>

        <div>
          <label htmlFor="foodImage" className="block text-sm font-medium text-base-400 mb-1">
            Food Image URL
          </label>
          <input
            type="url"
            id="foodImage"
            name="foodImage"
            value={formData.foodImage}
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-md p-2"
            placeholder="https://example.com/image.jpg"
            required
            disabled={isSubmitting}
          />
          {formData.foodImage && (
            <div className="mt-4 border border-gray-300 bg-base-100 rounded-md p-4 flex justify-center">
              <img src={formData.foodImage} alt="Food Preview" className="h-32 w-32 object-cover rounded-md" />
            </div>
          )}
        </div>

        <div>
          <label htmlFor="foodTitle" className="block text-sm font-medium text-base-400">
            Food Title
          </label>
          <input
            type="text"
            id="foodTitle"
            name="foodTitle"
            value={formData.foodTitle}
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-md p-2"
            required
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-medium text-base-400">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="block w-full py-2 px-3 border border-gray-300 rounded-md bg-base-100 text-base-400 focus:outline-none focus:ring-2 focus:ring-[#129990] focus:border-transparent"
            required
            disabled={isSubmitting}
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

        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-base-400">
            Quantity
          </label>
          <input
            type="text"
            id="quantity"
            name="quantity"
            value={formData.quantity}
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-md p-2"
            placeholder="e.g., 6 pieces, 1 kg, 500g"
            required
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="expiryDate" className="block text-sm font-medium text-base-400">
            Expiry Date
          </label>
          <input
            type="date"
            id="expiryDate"
            name="expiryDate"
            value={formData.expiryDate}
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-md p-2"
            required
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium text-base-400">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            className="block w-full border border-gray-300 rounded-md p-2"
            placeholder="Update food item description..."
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label htmlFor="userEmail" className="block text-sm font-medium text-base-400">
            User Email
          </label>
          <input
            type="email"
            id="userEmail"
            name="userEmail"
            value={formData.userEmail}
            readOnly
            className="block w-full border border-gray-300 bg-base-100 text-base-400 rounded-md p-2"
          />
        </div>

        <div className="modal-action flex justify-between">
          <button 
            type="submit" 
            className="btn btn-primary"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="loading loading-spinner"></span>
                Updating...
              </>
            ) : 'Update Food Item'}
          </button>
          <button
            type="button"
            className="btn btn-ghost"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </button>
        </div>
      </form>
    </dialog>
  );
};

export default UpdateFoodModal;