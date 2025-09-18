import React,{useStat,useContext,useState} from 'react'
import Mycontext from '../Mycontext.jsx';
import "./AdminLogin.css"
import {toast} from "react-toastify"
import { toastError, toastSuccess } from '../Utils'
import { useNavigate } from 'react-router-dom'

const AdminLogin = () => {
   const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const {red,setRed,user,setUser,setShowVerfication} =useContext(Mycontext)
    const redirect=useNavigate()

    const handleAdminLogin = async (e) => {
try{
      e.preventDefault()
    const data = await fetch(`${import.meta.env.VITE_NODEJS_URL}/AdminLoginPost`, {
      method: "post",
      body: JSON.stringify({ email, password}),
      credentials: 'include',
      headers: { "content-type": "application/json" }
    }).then((x) => {
      return x.json()
    })

    if (!data.success && !toast.isActive("alreadyShow")) {
      toastError(data.message,{toastId:"alreadyShow"})
      console.log(data.message)
    }
    else if(data.success) {
      setShowVerfication(true)
      redirect('/verification',{state:{toastMessage:data.message,email:data.email}})
    }
}
catch(err){
    console.log(err.message)
  if(!toast.isActive("alreadyShow")){
    toastError("server error",{toastId:"alreadyShow"})
  }
  
}

  }
  return (
    <div className='adminLoginContainer'>
      <form className='adminLoginContainer2'> 
        <h2>Admin Login</h2>
        <input placeholder='Enter Email' name='email' onChange={(e) => { setEmail(e.target.value) }} />
        <input placeholder='Enter Password' name='password' onChange={(e) => { setPassword(e.target.value) }} />
        <button className='loginBtn' onClick={handleAdminLogin}>Login</button>
      </form>
    </div>
  )
}

export default AdminLogin