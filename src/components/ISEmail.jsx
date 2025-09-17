import React, {useEffect, useState,useContext} from 'react'
import { useNavigate } from 'react-router-dom';
import Mycontext from '../Mycontext.jsx';

const ISEmail = ({Page}) => {
  const {showVerfication,setShowVerfication} =useContext(Mycontext)
  const navigate=useNavigate()
  useEffect(()=>{
    if(!showVerfication){
      navigate("/")
    }
    else{
      navigate("/verification")
    }
  },[])
  return(
    showVerfication&&<Page/>
  )
}

export default ISEmail