import React from 'react';
import Slider from '../Pages/Sliders/Slider';
import { useLoaderData } from 'react-router';
import FoodCard from './FoodCard';
const Home = () => {
    const InitialFood=useLoaderData()
    console.log(InitialFood);
    return (
        <div>
            <Slider></Slider>
            <h1 className='text-3xl font-bold text-base-500 text-center my-8'>Nearly Expiring Items</h1>
            <p className='text-center text-base-600 mb-8'>These items will expire within the next 5 days. Prioritize using them to reduce food waste!</p>
            
            {/* Food Cards Section */}
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
                {
                  InitialFood.map(food=><FoodCard key={food._id} food={food}></FoodCard>)  
                }
            </div>
           
        </div>
       
    );
};

export default Home;