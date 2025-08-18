import React, { use, useState } from 'react';
import FoodExpiredCard2 from './FoodExpiredCard2';
import Pagination from './Pagination/Pagisnation';
const FoodCardExpired = ({ foodPromise, itemsPerPage = 6 }) => {
    const foods = use(foodPromise);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(foods.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentFoods = foods.slice(indexOfFirstItem, indexOfLastItem);
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className='p-4'>
            <h1 className='text-center font-bold text-3xl p-2'>🚫 Expired Items</h1>
            <p className='text-center font-normal p-4'>
                These items have passed their expiry date. Remove them from your inventory to keep your fridge organized.
            </p>
            
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6 w-4xl mx-auto' >
                {currentFoods.map(food => (
                    <FoodExpiredCard2 key={food._id} food={food}></FoodExpiredCard2>
                ))}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center mt-8">
                    <Pagination 
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            )}
        </div>
    );
};

export default FoodCardExpired;