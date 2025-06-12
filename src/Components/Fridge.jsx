import React, { useState } from 'react';
import { useLoaderData } from 'react-router';
import FoodCard2 from './FoodCard2';
import Pagination from './Pagination/Pagisnation';


const Fridge = () => {
    const allFoods = useLoaderData();
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6; // You can adjust this number
    
    // Calculate pagination
    const totalPages = Math.ceil(allFoods.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentFoods = allFoods.slice(startIndex, startIndex + itemsPerPage);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="min-h-screen">
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4'>
                {currentFoods.map(food => (
                    <FoodCard2 key={food._id} food={food} />
                ))}
            </div>
            
            {totalPages > 1 && (
                <div className='flex justify-center my-6'>
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

export default Fridge;