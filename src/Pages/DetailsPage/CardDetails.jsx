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

  // Check if current user can add notes or edit/delete
  useEffect(() => {
    if (user && user.email === userEmail) {
      setCanAddNote(true);
    }
  }, [user, userEmail]);

  // Calculate time left until expiry
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

  // Fetch notes for this specific food item
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

  const handleEdit = () => {
    navigate(`/update-food/${_id}`);
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className='container mx-auto p-4 max-w-6xl'>
      <Helmet>
        <title>{foodTitle} - FreshTracker</title>
        <meta name="description" content={`Details about ${foodTitle}. Learn more about its expiry, category, and notes.`} />
      </Helmet>
      <div className='flex justify-between items-center mb-6'>
        <h1 className='text-3xl font-bold'>{foodTitle}</h1>
        {user?.email === userEmail && (
          <div className='flex gap-2'>
            <button 
              onClick={handleEdit}
              className='px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition'
            >
              <FiEdit2 className='inline mr-1' /> Edit
            </button>
            <button 
              onClick={handleDelete}
              disabled={isDeleting}
              className={`px-3 py-1 rounded transition ${isDeleting ? 'bg-gray-400' : 'bg-red-500 hover:bg-red-600 text-white'}`}
            >
              <FiTrash2 className='inline mr-1' /> {isDeleting ? 'Deleting...' : 'Delete'}
            </button>
          </div>
        )}
      </div>

      <div className='lg:flex gap-8'>
        <div className='lg:w-1/2 mb-6 lg:mb-0'>
          <img 
            className='rounded-lg w-full h-auto max-h-96 object-cover shadow-md' 
            src={foodImage} 
            alt={foodTitle} 
          />
        </div>
        
        <div className='lg:w-1/2 space-y-4'>
          <div className='bg-white p-4 rounded-lg shadow-sm'>
            <h2 className='text-xl font-semibold mb-2'>Description</h2>
            <p className='text-gray-700'>{description}</p>
          </div>
          
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='bg-white p-4 rounded-lg shadow-sm'>
              <p className='flex items-center gap-2 font-medium'>
                <FiBox className='text-blue-500' /> 
                <span>Category:</span>
                <span className='font-mono text-emerald-600 bg-emerald-100 rounded-full px-2 py-1'>
                  {category}
                </span>
              </p>
            </div>
            
            <div className='bg-white p-4 rounded-lg shadow-sm'>
              <p className='flex items-center gap-2'>
                <FiBox className='text-green-500' /> 
                <span>Quantity:</span>
                <span className='font-mono text-emerald-600'>
                  {quantity}
                </span>
              </p>
            </div>
            
            <div className='bg-white p-4 rounded-lg shadow-sm'>
              <p className='flex items-center gap-2'>
                <FaRegCalendar className='text-red-400' /> 
                <span>Expiry Date:</span>
                <span className='font-mono text-emerald-600'>
                  {new Date(expiryDate).toLocaleDateString()}
                </span>
              </p>
            </div>
            
            <div className='bg-white p-4 rounded-lg shadow-sm'>
              <p className='flex items-center gap-2'>
                <FaRegCalendar /> 
                <span>Added:</span>
                <span className='font-mono text-emerald-600'>
                  {new Date(addedDate).toLocaleDateString()}
                </span>
              </p>
            </div>
          </div>
          
          <div className={`p-4 rounded-lg shadow-sm ${timeLeft === 'Expired' ? 'bg-red-100' : 'bg-yellow-100'}`}>
            <p className='font-semibold'>Expiration Countdown:</p>
            <p className={`font-mono text-lg ${timeLeft === 'Expired' ? 'text-red-600' : 'text-amber-700'}`}>
              {timeLeft}
            </p>
          </div>
        </div>
      </div> 
      
      <div className='mt-8 border-t pt-6'>
        <div className='flex justify-between items-center mb-4'>
          <h1 className='text-3xl font-bold'>📝 Notes</h1>
          {canAddNote && (
            <p className='text-sm text-gray-500'>You can add notes because you added this item</p>
          )}
        </div>
        
        <form onSubmit={handleNoteSubmit} className='mb-8'>
          <textarea
            id="note"
            name='review'
            rows={4}
            className={`block w-full px-4 py-3 border ${canAddNote ? 'border-gray-300' : 'border-gray-200 bg-gray-100'} rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none`}
            placeholder={canAddNote ? "Share your thoughts about this food item..." : "Only the person who added this item can leave notes"}
            disabled={!canAddNote || isSubmitting}
          />
          <button 
            type="submit"
            className={`mt-3 px-4 py-2 rounded-md text-white ${!canAddNote ? 'bg-gray-400 cursor-not-allowed' : isSubmitting ? 'bg-gray-400' : 'bg-emerald-500 hover:bg-emerald-600'} transition-colors`}
            disabled={!canAddNote || isSubmitting}
          >
            {!canAddNote ? 'Add Note (Not Authorized)' : isSubmitting ? 'Adding...' : 'Add Note'}
          </button>
          {!canAddNote && user && (
            <p className="text-sm text-red-500 mt-1">
              You didn't add this item, so you can't leave notes.
            </p>
          )}
        </form>
        
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-4">📜 All Notes</h2>
          
          {notes.length > 0 ? (
            <div className="space-y-4">
              {notes.map((note) => (
                <div 
                  key={note._id} 
                  className="bg-white p-4 rounded-lg shadow-sm border border-gray-100"
                >
                  <p className="text-gray-800 mb-2">{note.review}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-gray-500">
                      Posted on: {formatDate(note.postedDate || new Date())}
                    </p>
                    {note.userEmail === user?.email && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                        Your note
                      </span>
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
    </div>
  );
};

export default FoodDetails;