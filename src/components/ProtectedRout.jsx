import React, { useState } from 'react'
import { useEffect,useContext } from 'react';
import Mycontext from '../Mycontext.jsx';
import {Navigate, useNavigate,useLocation} from "react-router-dom"
import { toastError, toastSuccess } from '../Utils.jsx';


const ProtectedRout = ({Page}) => {  
  const redirect=useNavigate()  
  const location=useLocation()
  const {user,setUser,red,setRed} =useContext(Mycontext)
  const route=localStorage.getItem("route")
 
  useEffect(()=>{
    if(route && red){
      redirect(route)
      setTimeout(()=>{
        localStorage.removeItem("route")
        setRed(false)
      },100)
    }
  },[location.pathname])
  if(user.success==undefined){
    return <h3 style={{height:"70vh"}}>Loading...</h3>
  }

  return (
    user.success?<Page/>:<Navigate to="/login"/>
  )
}

export default ProtectedRout
