import React, { Suspense } from 'react';
import useAuth from '../Hooks/useAuth';
import MyFoodList from './MyFoodList';
import { foodsApiPromise } from '../Api/FoodsApi';
import { Helmet } from 'react-helmet-async';

const MyItems = () => {

  const {user}=useAuth()
  if (!user || !user.email) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Helmet>
        <title>FreshTracker | My Items</title>
        <meta name="description" content="View and manage your food items in FreshTracker." />
      </Helmet>
      <Suspense>
        <MyFoodList foodsApiPromise={foodsApiPromise(user.email)}>

        </MyFoodList>
      </Suspense>
    </div>
  );
};

export default MyItems;