import React, { useState, useEffect, use } from 'react';
import { FiBox } from 'react-icons/fi';
import { useLoaderData } from 'react-router';
import { FaRegCalendar } from "react-icons/fa";
import { AuthContext } from '../../Context/AuthContext';
import NotesSection from '../NoteSection';


const CardDetails = () => {
    const { foodTitle, foodImage, description, category, quantity, expiryDate, addedDate, addedBy } = useLoaderData();
    const { currentUser } = use(AuthContext);
    const [notes, setNotes] = useState([]);
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
        const timer = setInterval(calculateTimeLeft, 60000);

        return () => clearInterval(timer);
    }, [expiryDate]);

    // Fetch existing notes
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

            {/* Use the NotesSection component */}
            <NotesSection 
                notes={notes} 
                setNotes={setNotes} 
                isOwner={isOwner} 
                currentUser={currentUser} 
            />
        </div>
    );
};

export default CardDetails;