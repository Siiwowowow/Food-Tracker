import React from 'react';
import { FaAppleAlt, FaCalendarAlt } from 'react-icons/fa';

const Tips = () => {
    return (
        <div className="w-full px-4 py-10 bg-white">
            {/* Header */}
            <div className="text-center mb-10 max-w-3xl mx-auto">
                <div className="flex items-center justify-center gap-2 mb-2">
                    
                    <h1 className="text-3xl font-bold text-gray-800">Smart Food Management Tips</h1>
                </div>
                <p className="text-gray-600 text-lg">
                    Learn how to maximize freshness and minimize waste with these expert tips
                </p>
            </div>

            {/* Tips Flex Layout */}
            <div className="flex flex-wrap justify-center gap-6 max-w-6xl mx-auto">
                {/* Proper Storage Card */}
                <div className="w-full sm:w-[90%] md:w-[47%] lg:w-[45%] bg-green-50 rounded-lg p-6 border border-green-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                        <FaAppleAlt className="w-6 h-6 text-green-600" />
                        <h2 className="text-xl font-semibold text-gray-800">Proper Storage</h2>
                    </div>
                    <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start gap-2">
                            <span className="text-green-500 font-bold">•</span>
                            <span>Store fruits and vegetables separately</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-500 font-bold">•</span>
                            <span>Keep dairy products in the coldest part of your fridge</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-500 font-bold">•</span>
                            <span>Use airtight containers for opened items</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-green-500 font-bold">•</span>
                            <span>Don't wash produce until you're ready to eat it</span>
                        </li>
                    </ul>
                </div>

                {/* Organization Tips Card */}
                <div className="w-full sm:w-[90%] md:w-[47%] lg:w-[45%] bg-blue-50 rounded-lg p-6 border border-blue-100 shadow-sm">
                    <div className="flex items-center gap-2 mb-4">
                        <FaCalendarAlt className="w-6 h-6 text-blue-600" />
                        <h2 className="text-xl font-semibold text-gray-800">Organization Tips</h2>
                    </div>
                    <ul className="space-y-3 text-gray-700">
                        <li className="flex items-start gap-2">
                            <span className="text-blue-500 font-bold">•</span>
                            <span>Follow the "First In, First Out" rule</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-blue-500 font-bold">•</span>
                            <span>Label everything with dates</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-blue-500 font-bold">•</span>
                            <span>Keep a weekly meal plan</span>
                        </li>
                        <li className="flex items-start gap-2">
                            <span className="text-blue-500 font-bold">•</span>
                            <span>Check expiry dates before shopping</span>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Tips;
