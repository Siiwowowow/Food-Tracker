import React, { Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import FoodCardExpired from './FoodCardExpired';

const Foodcard3 = () => {
    // Use TanStack Query with Axios for Suspense
    const foodPromise = useQuery({
        queryKey: ['expiredFoods'],
        queryFn: async () => {
            const response = await axios.get('http://localhost:3000/foods/expired');
            return response.data;
        },
        suspense: true, // This enables Suspense mode
    });

    // The data is available because Suspense handles the loading state
    const expiredFoods = foodPromise.data;

    return (
        <div>
            <Suspense fallback={<div className='text-center text-2xl font-bold'>Loading expired items...</div>}>
                <FoodCardExpired foodPromise={Promise.resolve(expiredFoods)} />
            </Suspense>
        </div>
    );
};

export default Foodcard3;