import React from 'react';
import { FaBell, FaBarcode, FaUtensils, FaClipboardList, FaUsers, FaShoppingCart, FaChartLine, FaCalendarAlt, FaSyncAlt, FaUserCog, FaLanguage, FaHome } from 'react-icons/fa';

const Service = () => {
    const features = [
        {
            icon: <FaBell className="text-3xl text-green-500 mb-4" />,
            title: "Automated Expiry Alerts",
            description: "Get email, SMS, or push notifications before food items expire. Customize alert timing (1 day, 3 days, or 1 week before expiry)."
        },
        {
            icon: <FaBarcode className="text-3xl text-green-500 mb-4" />,
            title: "Barcode Scanning",
            description: "Quickly add items by scanning barcodes with pre-filled expiry information from our product database."
        },
        {
            icon: <FaUtensils className="text-3xl text-green-500 mb-4" />,
            title: "Recipe Suggestions",
            description: "Receive recipe recommendations based on food items nearing expiry to reduce waste."
        },
        {
            icon: <FaClipboardList className="text-3xl text-green-500 mb-4" />,
            title: "Food Inventory Management",
            description: "Categorize items (fruits, dairy, vegetables) with quantity tracking and expiry summaries."
        },
        {
            icon: <FaUsers className="text-3xl text-green-500 mb-4" />,
            title: "Sharing & Collaboration",
            description: "Share your food inventory with family or roommates and get coordinated alerts."
        },
        {
            icon: <FaShoppingCart className="text-3xl text-green-500 mb-4" />,
            title: "Shopping List Integration",
            description: "Automatically generate shopping lists based on expiring or low-quantity items."
        },
        {
            icon: <FaChartLine className="text-3xl text-green-500 mb-4" />,
            title: "Analytics & Reports",
            description: "Track your food waste reduction with insights on most wasted items and savings."
        },
        {
            icon: <FaCalendarAlt className="text-3xl text-green-500 mb-4" />,
            title: "Expiration Date Prediction",
            description: "For homemade food, we predict expiry based on storage conditions and food type."
        },
        {
            icon: <FaSyncAlt className="text-3xl text-green-500 mb-4" />,
            title: "Multi-Device Sync",
            description: "Cloud-synced data across all your devices with automatic backups."
        },
        {
            icon: <FaUserCog className="text-3xl text-green-500 mb-4" />,
            title: "User Profiles",
            description: "Set dietary preferences (vegan, gluten-free) for personalized suggestions."
        },
        {
            icon: <FaLanguage className="text-3xl text-green-500 mb-4" />,
            title: "Multi-Language Support",
            description: "Use the app in your preferred language with local date formats."
        },
        {
            icon: <FaHome className="text-3xl text-green-500 mb-4" />,
            title: "Smart Home Integration",
            description: "Works with smart refrigerators and voice assistants like Alexa/Google Home."
        }
    ];

    return (
        <div className="max-w-6xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
            <header className="text-center mb-12">
                <h1 className="text-4xl font-bold text-base-800 mb-2">Food Expiry Tracker System</h1>
                <p className="text-xl text-base-600">Minimize waste and maximize freshness with our comprehensive food management solution</p>
            </header>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {features.map((feature, index) => (
                    <div 
                        key={index} 
                        className="bg-base-100 rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 hover:-translate-y-1"
                    >
                        <div className="flex justify-center">{feature.icon}</div>
                        <h3 className="text-xl font-semibold text-base-400 mb-3 text-center">{feature.title}</h3>
                        <p className="text-base-400 text-center">{feature.description}</p>
                    </div>
                ))}
            </div>
            
        </div>
    );
};

export default Service;