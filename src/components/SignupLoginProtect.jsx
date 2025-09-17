import React, { useState } from 'react'
import { useEffect,useContext } from 'react';
import Mycontext from '../Mycontext.jsx';
import App from '../App.jsx';


const SignupLoginProtect = ({Page}) => {  
  const {user,setUser} =useContext(Mycontext)

  return (
    !user.success?<Page/>:<App/>
  )
}

export default SignupLoginProtect