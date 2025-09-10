import React, { useState } from 'react'
import { useEffect,useContext } from 'react';
import Mycontext from '../Mycontext.jsx';
import {Navigate, useNavigate,useLocation} from "react-router-dom"
import { toastError, toastSuccess } from '../Utils.jsx';


const AdminProtectedRoute = ({Page}) => {  
  const redirect=useNavigate()  
  const location=useLocation()
  const {user,setUser,red,setRed,orderData} =useContext(Mycontext)
  const route=localStorage.getItem("route")

  return (
    user.email=="amaanahmad8616@gmail.com"?<Page/>:<Navigate to="/login"/>
  )
}

export default AdminProtectedRoute