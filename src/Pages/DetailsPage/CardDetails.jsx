import React, { useState, useEffect, use } from 'react';
import { FiBox } from 'react-icons/fi';
import { useLoaderData } from 'react-router';
import { FaRegCalendar } from "react-icons/fa";
import { AuthContext } from '../../Context/AuthContext';
 // Assuming you have an auth context

const CardDetails = () => {
    const { foodTitle, foodImage, description, category, quantity, expiryDate, addedDate, addedBy } = useLoaderData();
    const { currentUser } = use(AuthContext); // Get current user from your auth context
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState('');
    const [timeLeft, setTimeLeft] = useState('');
    const [isOwner, setIsOwner] = useState(false);

    // Check if current user is the owner
    useEffect(() => {
        if (currentUser && currentUser.uid === addedBy) {
            setIsOwner(true);
        }
    }, [currentUser, addedBy]);

    // Calculate time until expiration
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
        const timer = setInterval(calculateTimeLeft, 60000); // Update every minute

        return () => clearInterval(timer);
    }, [expiryDate]);

    // Fetch existing notes (you'll need to implement this API call)
    useEffect(() => {
        const fetchNotes = async () => {
            try {
                // Replace with your actual API call to fetch notes
                // const response = await getNotesForFood(foodId);
                // setNotes(response.data);
            } catch (error) {
                console.error('Error fetching notes:', error);
            }
        };

        fetchNotes();
    }, []);

    const handleAddNote = async () => {
        if (!newNote.trim()) return;

        try {
            setNotes([...notes, {
                text: newNote,
                postedDate: new Date().toISOString(),
                postedBy: currentUser.uid
            }]);
            
            setNewNote('');
        } catch (error) {
            console.error('Error adding note:', error);
        }
    };

    return (
        <div className='container mx-auto'>
            <div className='lg:flex justify-evenly'>
                <div className='grid grid-cols-1 p-1 lg:w-[600px]'>
                    <img className='rounded-l-2xl' src={foodImage} alt={foodTitle} />
                </div>
                <div className='space-y-4 p-4'>
                    <h1 className='font-bold text-3xl'>{foodTitle}</h1>
                    <p className='text-sm'>{description}</p>
                    <p className='flex items-center gap-2 font-medium'>
                        <FiBox className='text-blue-500' />
                        Category: <span className='font-mono text-emerald-600 bg-emerald-200 rounded-full p-1'>{category}</span>
                    </p>
                    <p className='flex items-center gap-2'>
                        <FiBox className='text-green-500' />
                        Quantity: <span className='font-mono text-emerald-600 p-1'>{quantity}</span>
                    </p>
                    <p className='flex items-center gap-2'>
                        <FaRegCalendar className='text-red-400' />
                        Expiry Date: <span className='font-mono text-emerald-600 p-1'>{expiryDate}</span>
                    </p>
                    <p className='flex items-center gap-2'>
                        <FaRegCalendar />
                        Added: <span className='font-mono text-emerald-600 p-1'>{addedDate}</span>
                    </p>
                    <div className='p-2 bg-yellow-100 rounded-lg'>
                        <p className='font-semibold'>Expiration Countdown:</p>
                        <p className={`font-mono ${timeLeft === 'Expired' ? 'text-red-600' : 'text-amber-700'}`}>
                            {timeLeft}
                        </p>
                    </div>
                </div>
            </div>

            {/* Notes Section */}
            <div className='mt-8 p-4 border-t'>
                <h2 className='text-2xl font-bold mb-4'>Notes</h2>
                
                {/* Display existing notes */}
                <div className='space-y-4 mb-6'>
                    {notes.map((note, index) => (
                        <div key={index} className='p-3 bg-gray-50 rounded-lg'>
                            <p className='text-gray-700'>{note.text}</p>
                            <p className='text-xs text-gray-500 mt-1'>
                                Posted on: {new Date(note.postedDate).toLocaleString()}
                            </p>
                        </div>
                    ))}
                </div>
                
                {/* Add Note Form */}
                <div className='bg-gray-100 p-4 rounded-lg'>
                    <h3 className='font-semibold mb-2'>Add a Note</h3>
                    <textarea
                        className='w-full p-2 border rounded mb-2'
                        rows='3'
                        placeholder='Write your note here...'
                        value={newNote}
                        onChange={(e) => setNewNote(e.target.value)}
                        
                    />
                    <div className='flex justify-between items-center'>
                        <span className='text-sm text-gray-500'>
                            {isOwner ? 'You can add notes to this item' : 'Only the owner can add notes'}
                        </span>
                        <button
                            onClick={handleAddNote}
                            
                            className={`px-4 py-2 rounded ${isOwner ? 'bg-blue-500 hover:bg-blue-600 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                        >
                            Add Note
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CardDetails;