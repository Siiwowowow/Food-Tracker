import React from 'react';

const Pricing = () => {
    return (
        <div class="flex flex-wrap items-center justify-center gap-6">
  
    <div class="w-72 bg-white text-center text-gray-800/80 border border-gray-500/30 p-6 pb-16 rounded-lg">
        <p class="font-semibold">Basic</p>
        <h1 class="text-3xl font-semibold">$5<span class="text-gray-500 text-sm font-normal">/month</span></h1>
        <ul class="list-none text-gray-500 text-sm mt-6 space-y-1">
            <li class="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                </svg>
                <p>Track up to 20 food items</p>
            </li>
            <li class="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                </svg>
                <p>Basic expiry notifications</p>
            </li>
            <li class="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                </svg>
                <p>Manual food entry</p>
            </li>
            <li class="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                </svg>
                <p>Basic analytics on food usage</p>
            </li>
            <li class="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                </svg>
                <p>Email support</p>
            </li>
        </ul>
        <button type="button" class="bg-indigo-500 text-sm w-full py-2 rounded text-white font-medium mt-7 hover:bg-indigo-600 transition-all">
            Get Started
        </button>
    </div>

   
    <div class="w-72 bg-indigo-500 relative text-center text-white border border-gray-500/30 p-6 pb-14 rounded-lg">
        <p class="absolute px-3 text-sm -top-3.5 left-3.5 py-1 bg-[#8789FB] rounded-full">Most Popular</p>
        <p class="font-semibold pt-2">Pro</p>
        <h1 class="text-3xl font-semibold">$15<span class="text-sm font-normal">/month</span></h1>
        <ul class="list-none text-white text-sm mt-6 space-y-1">
            <li class="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="currentColor"/>
                </svg>
                <p>Track up to 100 food items</p>
            </li>
            <li class="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="currentColor"/>
                </svg>
                <p>Smart expiry alerts (push & email)</p>
            </li>
            <li class="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="currentColor"/>
                </svg>
                <p>Barcode scanning for quick entry</p>
            </li>
            <li class="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="currentColor"/>
                </svg>
                <p>Detailed food usage analytics</p>
            </li>
            <li class="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="currentColor"/>
                </svg>
                <p>Custom reminders & notifications</p>
            </li>
            <li class="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="currentColor"/>
                </svg>
                <p>Priority email & chat support</p>
            </li>
        </ul>
        <button type="button" class="bg-white text-sm w-full py-2 rounded text-indigo-500 font-medium mt-7 hover:bg-gray-200 transition-all">
            Get Started
        </button>
    </div>

   
    <div class="w-72 bg-white text-center text-gray-800/80 border border-gray-500/30 p-6 rounded-lg">
        <p class="font-semibold">Enterprise</p>
        <h1 class="text-3xl font-semibold">$49<span class="text-gray-500 text-sm font-normal">/month</span></h1>
        <ul class="list-none text-gray-500 text-sm mt-6 space-y-1">
            <li class="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                </svg>
                <p>Unlimited food item tracking</p>
            </li>
            <li class="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                </svg>
                <p>Dedicated account manager</p>
            </li>
            <li class="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                </svg>
                <p>Advanced analytics & reports</p>
            </li>
            <li class="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                </svg>
                <p>Weekly personalized coaching</p>
            </li>
            <li class="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                </svg>
                <p>Enterprise-level security & compliance</p>
            </li>
            <li class="flex items-center gap-2">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1"/>
                </svg>
                <p>24/7 premium support</p>
            </li>
        </ul>
        <button type="button" class="bg-indigo-500 text-sm w-full py-2 rounded text-white font-medium mt-7 hover:bg-indigo-600 transition-all">
            Get Started
        </button>
    </div>
</div>

    );
};

export default Pricing;