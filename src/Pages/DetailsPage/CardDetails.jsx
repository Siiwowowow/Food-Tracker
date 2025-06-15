import React, { useState, useEffect } from 'react';
import { useLoaderData, useNavigate } from 'react-router';
import { FiBox, FiEdit2, FiTrash2 } from 'react-icons/fi';
import { FaRegCalendar } from "react-icons/fa";
import toast from 'react-hot-toast';
import axios from 'axios';
import useAuth from '../../Hooks/useAuth';
import { Helmet } from 'react-helmet-async';

const FoodDetails = () => {
  const {
    _id, foodTitle, foodImage, description, category,
    quantity, expiryDate, addedDate, userEmail
  } = useLoaderData();
  
  const { user } = useAuth();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState('');
  const [notes, setNotes] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [canAddNote, setCanAddNote] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (user && user.email === userEmail) {
      setCanAddNote(true);
    }
  }, [user, userEmail]);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const expiry = new Date(expiryDate);
      const difference = expiry - now;

      if (difference <= 0) {
        setTimeLeft('Expired');
        return;
      }
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      setTimeLeft(`${days}d ${hours}h ${minutes}m`);
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 60000);
    return () => clearInterval(timer);
  }, [expiryDate]);

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        const response = await axios.get(`https://a11-food-tracker-crud-server.vercel.app/review?foodItem=${encodeURIComponent(foodTitle)}`);
        setNotes(response.data);
      } catch (error) {
        console.error('Error fetching notes:', error);
        toast.error('Failed to load notes.');
      }
    };
    fetchNotes();
  }, [foodTitle]);

  const handleNoteSubmit = async (e) => {
    e.preventDefault();
    if (!canAddNote) return;

    const form = e.target;
    const noteContent = form.review.value.trim();

    if (!noteContent) {
      toast.error('Note cannot be empty.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const response = await axios.post('https://a11-food-tracker-crud-server.vercel.app/review', { 
        review: noteContent,
        foodItem: foodTitle,
        foodId: _id
      }, {
        withCredentials: true
      });
      
      if (response.data.insertedId) {
        toast.success('Note added successfully!');
        setNotes(prev => [
          ...prev, 
          {
            _id: response.data.insertedId,
            review: noteContent,
            foodItem: foodTitle,
            postedDate: new Date().toISOString(),
            userEmail: user.email
          }
        ]);
        form.reset();
      }
    } catch (error) {
      console.error('Error adding note:', error);
      if (error.response?.status === 403) {
        toast.error("You can only add notes to items you've added");
      } else {
        toast.error('Failed to add note.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this food item?')) return;
    
    setIsDeleting(true);
    try {
      await axios.delete(`https://a11-food-tracker-crud-server.vercel.app/foods/${_id}`, {
        withCredentials: true
      });
      toast.success('Food item deleted successfully');
      navigate('/');
    } catch (error) {
      console.error('Error deleting food:', error);
      toast.error('Failed to delete food item');
    } finally {
      setIsDeleting(false);
    }
  };

  const handleEdit = () => navigate(`/update-food/${_id}`);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString(undefined, {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="container mx-auto p-4 max-w-6xl">
      <Helmet>
        <title>{foodTitle} - FreshTracker</title>
        <meta name="description" content={`Details about ${foodTitle}. Learn more about its expiry, category, and notes.`} />
      </Helmet>

      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-6">
        <h1 className="text-3xl font-bold">{foodTitle}</h1>
        {user?.email === userEmail && (
          <div className="flex gap-2">
            <button onClick={handleEdit} className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
              <FiEdit2 className="inline mr-1" /> Edit
            </button>
            <button 
              onClick={handleDelete}
              disabled={isDeleting}
              className={`px-3 py-1 rounded transition ${isDeleting ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600 text-white'}`}
            >
              <FiTrash2 className="inline mr-1" /> {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        )}
      </div>

      {/* Image and Info Section */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="lg:w-1/2">
          <img src={foodImage} alt={foodTitle} className="rounded-lg w-full max-h-[400px] object-cover shadow-md" />
        </div>

        <div className="lg:w-1/2 space-y-4 border border-gray-200 p-2 rounded-lg shadow-sm bg-base-100">
          <div className="bg-base-100 p-4 rounded-lg shadow-sm">
            <h2 className="text-xl font-semibold mb-2">Description</h2>
            <p className="text-base-400">{description}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-base-100 border border-gray-200 p-2 rounded-lg shadow-sm ">
              <p className="flex items-center gap-2 font-medium">
                <FiBox className="text-blue-500" /> Category: 
                <span className="font-mono text-emerald-600 bg-emerald-100 rounded-full px-2 py-1">{category}</span>
              </p>
            </div>
            <div className="border-gray-200 border p-2 rounded-lg shadow-sm bg-base-100 ">
              <p className="flex items-center gap-2">
                <FiBox className="text-green-500" /> Quantity: 
                <span className="font-mono text-emerald-600">{quantity}</span>
              </p>
            </div>
            <div className="border-gray-200 border p-2 rounded-lg shadow-sm bg-base-100">
              <p className="flex items-center gap-2">
                <FaRegCalendar className="text-red-400" /> Expiry: 
                <span className="font-mono text-emerald-600">{new Date(expiryDate).toLocaleDateString()}</span>
              </p>
            </div>
            <div className="border-gray-200 border p-2 rounded-lg shadow-sm bg-base-100">
              <p className="flex items-center gap-2">
                <FaRegCalendar /> Added: 
                <span className="font-mono text-emerald-600">{new Date(addedDate).toLocaleDateString()}</span>
              </p>
            </div>
          </div>

          <div className={`p-4 rounded-lg shadow-sm ${timeLeft === 'Expired' ? 'bg-red-100' : 'bg-yellow-100'}`}>
            <p className="font-bold text-accent ">⏳ Time Left:</p>
            <p className={`font-mono text-lg ${timeLeft === 'Expired' ? 'text-red-600' : 'text-amber-700'}`}>{timeLeft}</p>
          </div>
        </div>
      </div>

      {/* Notes Section */}
      <div className="mt-10 border-t pt-6">
        <div className="flex justify-between items-center mb-4 flex-col sm:flex-row">
          <h2 className="text-2xl font-bold">📝 Notes</h2>
          {canAddNote && (
            <p className="text-sm text-gray-500">You can add notes because you added this item</p>
          )}
        </div>

        <form onSubmit={handleNoteSubmit} className="mb-6">
          <textarea
            name="review"
            rows={4}
            className={`w-full px-4 py-3 border ${canAddNote ? 'border-gray-300' : 'bg-base-100 border-gray-200'} rounded-lg focus:outline-none resize-none`}
            placeholder={canAddNote ? "Write a note..." : "Only the creator can add notes"}
            disabled={!canAddNote || isSubmitting}
          />
          <button
            type="submit"
            disabled={!canAddNote || isSubmitting}
            className={`mt-3 px-4 py-2 rounded text-base-100 ${canAddNote ? (isSubmitting ? 'bg-gray-400' : 'bg-emerald-500 hover:bg-emerald-600') : 'bg-gray-400 cursor-not-allowed'} transition`}
          >
            {canAddNote ? (isSubmitting ? 'Adding...' : 'Add Note') : 'Not Allowed'}
          </button>
        </form>

        {/* Notes Display */}
        {notes.length > 0 ? (
          <div className="space-y-4">
            {notes.map(note => (
              <div key={note._id} className="bg-base-100 p-4 rounded-lg shadow border border-gray-100">
                <p className="text-base-400 mb-2">{note.review}</p>
                <div className="flex justify-between items-center text-sm text-base-400">
                  <span>Posted: {formatDate(note.postedDate || new Date())}</span>
                  {note.userEmail === user?.email && (
                    <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">Your Note</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bg-gray-50 p-6 rounded-lg text-center">
            <p className="text-gray-500 italic">No notes yet. Be the first to add one!</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FoodDetails;
