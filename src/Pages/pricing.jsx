import React from 'react';
import { Fade } from 'react-awesome-reveal';

const Pricing = () => {
    return (
        <div className="flex flex-wrap items-center justify-center gap-6">

            <Fade direction="up" triggerOnce>
                <div className="w-72 bg-white text-center text-gray-800/80 border border-gray-500/30 p-6 pb-16 rounded-lg">
                    <p className="font-semibold">Basic</p>
                    <h1 className="text-3xl font-semibold">$5
                        <span className="text-gray-500 text-sm font-normal">/month</span>
                    </h1>
                    <ul className="list-none text-gray-500 text-sm mt-6 space-y-1">
                        {[
                            'Track up to 20 food items',
                            'Basic expiry notifications',
                            'Manual food entry',
                            'Basic analytics on food usage',
                            'Email support'
                        ].map((text, i) => (
                            <li key={i} className="flex items-center gap-2">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1" />
                                </svg>
                                <p>{text}</p>
                            </li>
                        ))}
                    </ul>
                    <button type="button" className="bg-indigo-500 text-sm w-full py-2 rounded text-white font-medium mt-7 hover:bg-indigo-600 transition-all">
                        Get Started
                    </button>
                </div>
            </Fade>

            <Fade direction="up" delay={100} triggerOnce>
                <div className="w-72 bg-indigo-500 relative text-center text-white border border-gray-500/30 p-6 pb-14 rounded-lg">
                    <p className="absolute px-3 text-sm -top-3.5 left-3.5 py-1 bg-[#8789FB] rounded-full">Most Popular</p>
                    <p className="font-semibold pt-2">Pro</p>
                    <h1 className="text-3xl font-semibold">$15
                        <span className="text-sm font-normal">/month</span>
                    </h1>
                    <ul className="list-none text-white text-sm mt-6 space-y-1">
                        {[
                            'Track up to 100 food items',
                            'Smart expiry alerts (push & email)',
                            'Barcode scanning for quick entry',
                            'Detailed food usage analytics',
                            'Custom reminders & notifications',
                            'Priority email & chat support'
                        ].map((text, i) => (
                            <li key={i} className="flex items-center gap-2">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="currentColor" />
                                </svg>
                                <p>{text}</p>
                            </li>
                        ))}
                    </ul>
                    <button type="button" className="bg-white text-sm w-full py-2 rounded text-indigo-500 font-medium mt-7 hover:bg-gray-200 transition-all">
                        Get Started
                    </button>
                </div>
            </Fade>

            <Fade direction="up" delay={200} triggerOnce>
                <div className="w-72 bg-white text-center text-gray-800/80 border border-gray-500/30 p-6 rounded-lg">
                    <p className="font-semibold">Enterprise</p>
                    <h1 className="text-3xl font-semibold">$49
                        <span className="text-gray-500 text-sm font-normal">/month</span>
                    </h1>
                    <ul className="list-none text-gray-500 text-sm mt-6 space-y-1">
                        {[
                            'Unlimited food item tracking',
                            'Dedicated account manager',
                            'Advanced analytics & reports',
                            'Weekly personalized coaching',
                            'Enterprise-level security & compliance',
                            '24/7 premium support'
                        ].map((text, i) => (
                            <li key={i} className="flex items-center gap-2">
                                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M7.162 13.5 2.887 9.225l1.07-1.069 3.205 3.207 6.882-6.882 1.069 1.07z" fill="#6366F1" />
                                </svg>
                                <p>{text}</p>
                            </li>
                        ))}
                    </ul>
                    <button type="button" className="bg-indigo-500 text-sm w-full py-2 rounded text-white font-medium mt-7 hover:bg-indigo-600 transition-all">
                        Get Started
                    </button>
                </div>
            </Fade>

        </div>
    );
};

export default Pricing;
