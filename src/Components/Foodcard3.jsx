import React, { Suspense } from 'react';
import FoodCardExpired from './FoodCardExpired';

const Foodcard3 = () => {
    const foodPromise=fetch('https://foodtracker-server-2.onrender.com/foods/expired')
 .then(res=>res.json())
    return (
        <div>
            
            <Suspense fallback={<div className='text-center text-2xl font-bold'>Loading...</div>}>
                <FoodCardExpired foodPromise={foodPromise} ></FoodCardExpired>
            </Suspense>
        </div>
    );
};

export default Foodcard3;