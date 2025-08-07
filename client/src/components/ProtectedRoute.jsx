import React from 'react'
import { useAuth } from '../context/AuthContext'
import { Navigate } from 'react-router-dom';
import Spinner from './Spinner';

export default function ProtectedRoute({children,role}) {

    const {loading,user}=useAuth();

    if(loading) return <Spinner/>;

    if(!user) return <Navigate to={"/login"}/>

    if(role && user.role !== role) return <Navigate to={"/"}/>
  
    return children; 
}
