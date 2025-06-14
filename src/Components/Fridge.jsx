import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router';
import FoodCard2 from './FoodCard2';
import Pagination from './Pagination/Pagisnation';
import FridgeCount from './Fridge2/FridgeCount';

const Fridge = () => {
    const allFoods = useLoaderData();
    const [search, setSearch] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [filteredFoods, setFilteredFoods] = useState(allFoods);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        filterFoods();
    }, [allFoods, selectedCategory]);

    useEffect(() => {
        setCurrentPage(1); // Reset to page 1 on new results
    }, [filteredFoods]);

    const filterFoods = () => {
        let result = [...allFoods];

        // Apply category filter
        if (selectedCategory) {
            result = result.filter(food =>
                food.category?.toLowerCase() === selectedCategory.toLowerCase()
            );
        }

        // Apply search filter
        if (search.trim()) {
            result = result.filter(food =>
                food.foodTitle?.toLowerCase().includes(search.toLowerCase()) ||
                food.category?.toLowerCase().includes(search.toLowerCase())
            );
        }

        setFilteredFoods(result);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        filterFoods();
        setSearch('');
    };

    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Pagination logic
    const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    console.log(filteredFoods)
    const currentFoods = filteredFoods.slice(startIndex, startIndex + itemsPerPage);


    return (
        <div className="min-h-screen">
            <h1 className='text-center text-4xl font-bold'>🥬Your Virtual Fridge</h1>
            <p className='text-center'>Browse and manage all your food items. Use search and filters to quickly find what you're looking for.</p>

            <div className='flex flex-col md:flex-row justify-between items-center p-4 gap-4'>
                {/* Search form */}
                <form onSubmit={handleSearchSubmit}>
                    <label className="input">
                        <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <div>
                        <input
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                            type="search"
                            placeholder="Search"
                        />
                        <button type='submit' className='btn btn-primary'>Search</button>
                        </div>
                    </label>
                    
                </form>
                
                <FridgeCount foods={filteredFoods}></FridgeCount>

                {/* Category filter */}
                <div>
                    <label className="select">
                        <span className="label">Filter</span>
                        <select onChange={handleCategoryChange} value={selectedCategory}>
                            <option value="">All</option>
                            <option value="Dairy">Dairy</option>
                            <option value="Meat">Meat</option>
                            <option value="Vegetables">Vegetables</option>
                            <option value="Fruits">Fruits</option>
                            <option value="Grains">Grains</option>
                            <option value="Snacks">Snacks</option>
                            <option value="Beverages">Beverages</option>
                            <option value="Other">Other</option>
                        </select>
                    </label>
                </div>
            </div>

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
