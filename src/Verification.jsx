import React, { useEffect, useState,useContext } from 'react'
import Mycontext from './Mycontext.jsx';
import { toastError, toastSuccess } from "./Utils.jsx"
import { ToastContainer,toast } from "react-toastify"
import { useNavigate, useLocation, redirect } from "react-router-dom"
import OTPInput from "otp-input-react"

const Verification = () => {
  const [otp, updateOtp] = useState("")
  const navigate = useNavigate()
  const location = useLocation()
  const {user,setUser,red,setRed,setShowVerfication} =useContext(Mycontext)
  const [time,setTime]=useState(60)
useEffect(()=>{
    let timer
    if(time>0){
      timer=setTimeout(()=>{
        setTime(time-1)
      },1000)
    }
    return ()=>clearTimeout(timer)
  },[time])


  useEffect(() => {
    if (location.state?.toastMessage && !toast.isActive("alreadyShow")) {
      toastSuccess(location.state.toastMessage,{toastId:"alreadyShow"})
    }
  }, [location])

  const otpSend = async (e) => {
    e.preventDefault()
    const res = await fetch(`${import.meta.env.VITE_NODEJS_URL}/emailVerification`, {
      method: "POST",
      body: JSON.stringify({ otp }),
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })

    const data = await res.json()
    const route=localStorage.getItem("route")
    if (!data.success && !toast.isActive("alreadyShow")) {
      toastError(data.message,{toastId:"alreadyShow"})
    } 
    
    else if(route && data.success){
      setShowVerfication(false)
      setRed(true)
      //navigate(route,{state:{toastMessage:data.message}})
      if(!toast.isActive("login")){
        toastSuccess(data.message,{toastId:"login"})
      }
      navigate(route)
    }
    else if(data.success){
      setRed(true)
      //navigate("/",{state:{toastMessage:data.message}})
      toastSuccess(data.message)
      navigate("/")
    }
  }

  const resend = async () => {
    const res = await fetch(`${import.meta.env.VITE_NODEJS_URL}/resendOtp`, {
      credentials: "include",
    })

    const data = await res.json()

    if (!data.success && !toast.isActive("alreadyShow")) {
      toastError(data.message,{toastId:"alreadyShow"})
    } else if(data.success && !toast.isActive("alreadyShow")) {
      toastSuccess(data.message,{toastId:"alreadyShow"})
    }
  }

  const clear = () => {
    updateOtp("")
  }

  return (
    <div className='verification'>
      <form onSubmit={otpSend}>
        <h2>Verify OTP</h2>
        <p>OTP is sent to your Mobile Email Id</p>
        <p>{localStorage.getItem("email") || "amaan@gmail.com"}</p>

        <OTPInput
          className="otpcolumn"
          value={otp}
          onChange={updateOtp}
          autoFocus
          OTPLength={6}
          otpType="number"
          disabled={false}
        />

        <div className='otpbtn'>
          <button type="submit">Verify</button>
          <button type="button" onClick={clear}>Clear</button>
        </div>

        <h3 className='otpTime'>0:{time<10?"0":""}{time}</h3>
        <p style={{fontSize:"14.5px"}}>
          Didn’t receive OTP?{" "}
          <button type="button" className={`otpResBtn ${time>0?"lightReqBtn":""}`} onClick={()=>{setTime(60);resend()}} disabled={time>0}>
            Request again
          </button>
        </p>
      </form>
    </div>
  )
}

export default Verification
