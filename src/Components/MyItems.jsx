import React, { Suspense } from 'react';
import useAuth from '../Hooks/useAuth';
import MyFoodList from './MyFoodList';
import { foodsApiPromise } from '../Api/FoodsApi';
import { Helmet } from 'react-helmet-async';

const MyItems = () => {
  const { user } = useAuth();

  if (!user || !user.email) {
    return <div className="text-center py-10 text-xl font-semibold">Loading...</div>;
  }

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-12 py-6">
      <Helmet>
        <title>FreshTracker | My Items</title>
        <meta name="description" content="View and manage your food items in FreshTracker." />
      </Helmet>
      <h1 className="text-2xl md:text-3xl font-bold text-center mb-6">📦 My Food Items</h1>
      <Suspense fallback={<p className="text-center">Loading your foods...</p>}>
        <MyFoodList foodsApiPromise={foodsApiPromise(user.email)} />
      </Suspense>
    </div>
  );
};

export default MyItems;
