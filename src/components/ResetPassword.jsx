import React, { useState,useContext } from 'react'
import {toastError, toastSuccess} from "../Utils.jsx"
import { useNavigate } from 'react-router-dom'
import "./ResetPassword.css"
import Mycontext from '../Mycontext.jsx'
import { toast } from 'react-toastify'
const ResetPassword = () => {
    const {setShowVerfication}=useContext(Mycontext)
    const [data,setData]=useState({email:"",currentPass:"",password:"",rePassword:""})
    const [loading, setLoading] = useState(false)
    const navigate=useNavigate()
    const handlesendData=async (e)=>{
        e.preventDefault()
        setLoading(true)
        try{
            let result=await fetch(`${import.meta.env.VITE_NODEJS_URL}/resetPassword`,{
                method:"post",
                headers: {"Content-Type": "application/json"},
                body:JSON.stringify(data),
                credentials:"include"
            })
            result=await result.json()
            if (!result.success && !toast.isActive("alreadyShow")) {
                  setLoading(false)
                  toastError(result.message,{toastId:"alreadyShow"})
                }
            else if(result.success){
                setLoading(false)
                setShowVerfication(true)
                if(!toast.isActive("verification")){
                    toastSuccess(result.message,{toastId:"verification"})
                    navigate("/verification")
                }
            }

        }
        catch(err){
            setLoading(false)
            console.log(err.message)
            toastError("server error")
        }
    } 

  return (
    <div className='resetContainer1'>
        <div className='resetContainer2'>
        <h3>Reset Password</h3>    
        <input placeholder='Email Address' onChange={(e)=>setData({...data,email:e.target.value})}/>
        <input placeholder='Current Password' onChange={(e)=>setData({...data,currentPass:e.target.value})}/>
        <input placeholder='New Password' onChange={(e)=>setData({...data,password:e.target.value})}/>
        <input placeholder='Confirm New Password' onChange={(e)=>setData({...data,rePassword:e.target.value})}/>
        <button onClick={handlesendData}>Submit</button>
        </div>
    </div>
  )
}

export default ResetPassword
