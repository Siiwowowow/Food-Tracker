import React from 'react';
// CountUp লাইব্রেরি ইম্পোর্ট করা হচ্ছে যা সংখ্যাকে অ্যানিমেটেডভাবে কাউন্ট করে দেখায়
import CountUp from 'react-countup';

// FridgeCount কম্পোনেন্ট, এটি foods প্রপস হিসেবে রিসিভ করে
const FridgeCount = ({ foods }) => {
  // আজকের তারিখ সংগ্রহ করা হচ্ছে
  const today = new Date();

  // মেয়াদ উত্তীর্ণ (expired) ফুড আইটেম গুনে বের করা হচ্ছে
  const expiredCount = foods.filter(food => new Date(food.expiryDate) < today).length;

  // যেসব আইটেম ৫ দিনের মধ্যে মেয়াদ শেষ হবে তাদের সংখ্যা বের করা হচ্ছে
  const nearlyExpiredCount = foods.filter(food => {
    const expiry = new Date(food.expiryDate); // একেকটি ফুডের এক্সপায়ারি তারিখ নেওয়া হচ্ছে
    const daysLeft = (expiry - today) / (1000 * 60 * 60 * 24); // কতদিন বাকি আছে তা দিন হিসেবে হিসেব করা হচ্ছে
    return daysLeft >= 0 && daysLeft <= 5; // ০ থেকে ৫ দিনের মধ্যে যেসব এক্সপায়ার হবে তা ফিল্টার করা
  }).length;

  // UI রেন্ডার অংশ
  return (
    // দুইটি কাউন্ট বক্স দেখানোর জন্য ফ্লেক্স লেআউট
    <div className="flex flex-col md:flex-row justify-center gap-8 p-4 text-center">
      
      {/* মেয়াদ উত্তীর্ণ আইটেম কাউন্ট বক্স */}
      <div className="bg-red-100 border border-red-300 rounded-xl p-4 shadow">
        <p className="text-lg font-semibold text-red-600">Expired Items</p>
        <h2 className="text-xl font-bold text-red-700">
          {/* কাউন্টআপ লাইব্রেরি ব্যবহার করে অ্যানিমেটেড সংখ্যা দেখানো হচ্ছে */}
          <CountUp end={expiredCount} duration={2} />
        </h2>
      </div>

      {/* শীঘ্রই মেয়াদ শেষ হতে যাওয়া আইটেম কাউন্ট বক্স */}
      <div className="bg-green-100 border border-green-300 rounded-xl p-2 shadow">
        <p className="text-lg font-semibold text-green-600">Expiring Soon (5 days)</p>
        <h2 className="text-xl font-bold text-green-500">
          {/* ৫ দিনের মধ্যে যেগুলো এক্সপায়ার হবে সেগুলোর সংখ্যা */}
          <CountUp end={nearlyExpiredCount} duration={2} />
        </h2>
      </div>
    </div>
  );
};

// কম্পোনেন্ট এক্সপোর্ট করা যাতে অন্য জায়গায় ব্যবহার করা যায়
export default FridgeCount;
