import React, { useState, useEffect } from 'react';
import { useLoaderData } from 'react-router';
import FoodCard2 from './FoodCard2';
import Pagination from './Pagination/Pagisnation';
import FridgeCount from './Fridge2/FridgeCount';
import { Helmet } from 'react-helmet-async';

const Fridge = () => {
    // লোড করা সমস্ত ফুড ডেটা সংগ্রহ
    const allFoods = useLoaderData();

    // সার্চ টার্ম স্টেট
    const [search, setSearch] = useState('');

    // সিলেক্ট করা ক্যাটাগরি স্টেট
    const [selectedCategory, setSelectedCategory] = useState('');

    // ফিল্টার করা ফুড ডেটা স্টোর করার জন্য
    const [filteredFoods, setFilteredFoods] = useState(allFoods);

    // কারেন্ট পেজ নাম্বার স্টেট
    const [currentPage, setCurrentPage] = useState(1);

    // প্রতি পেজে কতটি আইটেম দেখানো হবে
    const itemsPerPage = 6;

    // যখন allFoods বা ক্যাটাগরি পরিবর্তন হয় তখন ফিল্টার আপডেট হয়
    useEffect(() => {
        filterFoods();
    }, [allFoods, selectedCategory]);

    // নতুন ফিল্টার ফলাফলে প্রথম পেজে ফিরে যাওয়ার জন্য
    useEffect(() => {
        setCurrentPage(1);
    }, [filteredFoods]);

    // ফুড ফিল্টার করার লজিক
    const filterFoods = () => {
        let result = [...allFoods];

        // ক্যাটাগরি অনুসারে ফিল্টার
        if (selectedCategory) {
            result = result.filter(food =>
                food.category?.toLowerCase() === selectedCategory.toLowerCase()
            );
        }

        // সার্চ টার্ম অনুসারে ফিল্টার
        if (search.trim()) {
            result = result.filter(food =>
                food.foodTitle?.toLowerCase().includes(search.toLowerCase()) ||
                food.category?.toLowerCase().includes(search.toLowerCase())
            );
        }

        setFilteredFoods(result);
    };

    // সার্চ সাবমিট হ্যান্ডলার
    const handleSearchSubmit = (e) => {
        e.preventDefault();
        filterFoods();
        setSearch('');
    };

    // ক্যাটাগরি চেঞ্জ হ্যান্ডলার
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
    };

    // পেজ চেঞ্জ হ্যান্ডলার
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // মোট পেজ সংখ্যা বের করা
    const totalPages = Math.ceil(filteredFoods.length / itemsPerPage);

    // কারেন্ট পেজের শুরু ও শেষ ইনডেক্স বের করা
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentFoods = filteredFoods.slice(startIndex, startIndex + itemsPerPage);

    return (
        <div className="min-h-screen px-4 sm:px-6 lg:px-12 py-6">
            {/* পেজ টাইটেল */}
            <Helmet><title>Fridge - Your Virtual Food Tracker</title></Helmet>

            {/* হেডিং অংশ */}
            <h1 className="text-center text-3xl md:text-4xl font-bold mb-2">🥬 Your Virtual Fridge</h1>
            <p className="text-center mb-6 text-sm md:text-base text-gray-600">
                ব্রাউজ করুন এবং আপনার ফুড আইটেম ম্যানেজ করুন। সার্চ এবং ফিল্টার ব্যবহার করে দ্রুত খুঁজে পান।
            </p>

            {/* সার্চ + কাউন্ট + ফিল্টার অংশ */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 justify-between items-center mb-6">
                
                {/* সার্চ ফর্ম */}
                <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row items-center gap-2 w-full sm:w-auto">
                    <div className="flex items-center border rounded-lg px-2 py-1 w-full sm:w-64">
                        {/* সার্চ আইকন */}
                        <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <g strokeLinejoin="round" strokeLinecap="round" strokeWidth="2.5" fill="none" stroke="currentColor">
                                <circle cx="11" cy="11" r="8"></circle>
                                <path d="m21 21-4.3-4.3"></path>
                            </g>
                        </svg>
                        {/* সার্চ ইনপুট */}
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

                {/* ফ্রিজ কাউন্ট দেখানোর কম্পোনেন্ট */}
                <FridgeCount foods={filteredFoods} />

                {/* ক্যাটাগরি ফিল্টার সিলেক্ট */}
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

            {/* ফুড কার্ডগুলো দেখানোর জন্য */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentFoods.map(food => (
                    <FoodCard2 key={food._id} food={food} />
                ))}
            </div>

            {/* পেজিনেশন দেখানো */}
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
