import React from 'react'
import { Navigate,Outlet } from 'react-router-dom'

const Protected=()=>{

    const auth = localStorage.getItem('user');
    var a = "Please Login to access this content"

    return auth?<Outlet/>:<Navigate to = "/"/> 
}

export default Protected;
