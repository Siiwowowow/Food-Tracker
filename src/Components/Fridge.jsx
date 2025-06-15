import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router';
import FoodCard2 from './FoodCard2';
import Pagination from './Pagination/Pagisnation';
import FridgeCount from './Fridge2/FridgeCount';
import { Helmet } from 'react-helmet-async';

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
        setCurrentPage(1);
    }, [filteredFoods]);

    const filterFoods = () => {
        let result = [...allFoods];

        if (selectedCategory) {
            result = result.filter(food =>
                food.category?.toLowerCase() === selectedCategory.toLowerCase()
            );
        }

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

    const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentFoods = filteredFoods.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="min-h-screen px-4 sm:px-6 lg:px-12 py-6">
            <Helmet><title>Fridge - Your Virtual Food Tracker</title></Helmet>
            
            <h1 className="text-center text-3xl md:text-4xl font-bold mb-2">🥬 Your Virtual Fridge</h1>
            <p className="text-center mb-6 text-sm md:text-base text-gray-600">
                Browse and manage all your food items. Use search and filters to quickly find what you're looking for.
            </p>

            {/* Top controls: search + count + filter */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-between items-center mb-6">
                
                {/* Search Form */}
                <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
                    <div className="flex items-center border rounded-lg px-2 py-1 w-full sm:w-64">
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        <input
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                            type="search"
                            placeholder="Search"
                            className="outline-none px-2 py-1 w-full"
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-full sm:w-auto">Search</button>
                </form>

                {/* Fridge Count */}
                <FridgeCount foods={filteredFoods} />

                {/* Category Filter */}
                <div className="flex flex-col w-full sm:w-auto">
                    <label htmlFor="category" className="text-sm font-semibold mb-1">Filter by Category</label>
                    <select
                        id="category"
                        onChange={handleCategoryChange}
                        value={selectedCategory}
                        className="select select-bordered w-full sm:w-48"
                    >
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
                </div>
            </div>

            {/* Food Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentFoods.map(food => (
                    <FoodCard2 key={food._id} food={food} />
                ))}
            </div>

            {/* Pagination */}
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

export default Fridge;
