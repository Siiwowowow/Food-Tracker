import React, { Suspense } from 'react';
import useAuth from '../Hooks/useAuth';
import MyFoodList from './MyFoodList';
import { foodsApiPromise } from '../Api/FoodsApi';

const MyItems = () => {

  const {user}=useAuth()
  if (!user || !user.email) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <Suspense>
        <MyFoodList foodsApiPromise={foodsApiPromise(user.email)}>

        </MyFoodList>
      </Suspense>
    </div>
  );
};

export default MyItems;