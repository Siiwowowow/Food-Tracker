import React from 'react';
import Slider from '../Pages/Sliders/Slider';
import { useLoaderData } from 'react-router';
import FoodCard from './FoodCard';
import Foodcard3 from './Foodcard3';
import Statistics from '../Pages/statistics';
import Pricing from '../Pages/pricing';
import Tips from '../Pages/Tips';
import { Helmet } from 'react-helmet-async';
import NewsLetter from './NewsLetter/NewsLetter';

const Home = () => {
    const data = useLoaderData();
    
    // Ensure InitialFood is always an array
    const InitialFood = Array.isArray(data) ? data : [];

    console.log('InitialFood:', InitialFood);

    return (
        <div>
            <Helmet>
                <title>FreshTracker | Home</title>
            </Helmet>
            <Slider />
            

            <h1 className='text-3xl font-bold text-base-500 text-center my-8'>
                Nearly Expiring Items
            </h1>
            <p className='text-center text-base-600 mb-8'>
                These items will expire within the next 5 days. Prioritize using them to reduce food waste!
            </p>

            {/* Food Cards Section */}
            <div className='grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
                {InitialFood.length > 0 ? (
                    InitialFood.map(food => <FoodCard key={food._id} food={food} />)
                ) : (
                    <p className='col-span-full text-center text-gray-500'>
                        No items found.
                    </p>
                )}
            </div>

            <Foodcard3 />
            <Statistics />
            <Tips />

            <div className='p-8'>
                <h1 className="text-3xl text-center font-extrabold text-base-500 mb-2">
                    Choose Your Plan to Keep Food Fresh and Waste-Free
                </h1>
                <p className="text-base-500 text-xs mb-12 text-center">
                    Stay organized and reduce food waste with our tailored subscription plans. Whether you're a casual user or managing a large household, <br />
                    our Food Expiry Tracker helps you monitor expiry dates, get timely reminders, and optimize your grocery usage effortlessly.
                </p>
                <Pricing />
            </div>

            <div className='flex flex-col justify-center items-center mb-3 text-center'>
                <h1 className='text-3xl font-bold text-gray-800 mb-2'>Stay Updated</h1>
                <p className='text-gray-600 mb-4 max-w-lg'>
                    Subscribe to our newsletter to receive the latest updates, tips, and exclusive offers 
                    about food management and reducing waste.
                </p>
                <NewsLetter />
            </div>
        </div>
    );
};

export default Home;
