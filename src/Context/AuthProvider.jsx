import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../Firebase/Firebase.init';
import { GoogleAuthProvider } from 'firebase/auth';
import axios from 'axios';

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);
    // Function to create a new user with email and password
    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);

    }
    // Function to sign in an existing user with email and password
    const signInUser=(email, password)=>{
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    } 
    //sign out user
    const signOutUser = () => {
        setLoading(true);
        return signOut(auth);
    }
    const upDateUser= (updatedData) => {
        setLoading(true);
        return updateProfile(auth.currentUser, updatedData);
    }
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        return signInWithPopup(auth, provider);
      };
    //AuthContext value to be provided to children components
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser);
            setLoading(false);
            if(currentUser?.email){
                axios.post('http://localhost:3000/jwt',{email:currentUser.email},{withCredentials:true})
                .then(res=>console.log(res.data))
                .catch(error=>console.log(error))
            }
            console.log('user in the auth',currentUser)
        })
        return () => {
            unsubscribe();
        }
        
    }, []);  

    const authContextValue = {
        createUser,
        signInUser,
        signOutUser,
        upDateUser,
        setUser,
        signInWithGoogle,
        user,
        loading,
        
    }
    return (
        <AuthContext value={authContextValue}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;