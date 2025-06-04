import React, { use } from 'react';
import { AuthContext } from './AuthContext';
import { Navigate } from 'react-router';
import Loading from '../Pages/Loading';

const PrivateRoute = ({children}) => {
    const {user,loading}=use(AuthContext)
    if(loading){
        return <Loading></Loading>
    }
    if(user && user?.email){
       return children
    }
    else <Navigate to={'/sign-in'}></Navigate>
};

export default PrivateRoute;