import React, { useEffect, useState,useContext } from 'react'
import { Link } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import { toastError, toastSuccess } from "../Utils.jsx"
import { useNavigate,useLocation } from "react-router-dom"
import "../App.css"
import githubImg from "../icons/github-img.png"
import googleImg from "../icons/google-img.webp"
import Mycontext from '../Mycontext.jsx';
import { githubProvider, googleProvider, auth } from "../Firebase.jsx"
import { signInWithPopup,signOut } from 'firebase/auth'


const Login = () => {
  const {red,setRed,user,setUser,setShowVerfication} =useContext(Mycontext)
  const redirect = useNavigate()
  const location=useLocation()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const signupPost = async (e) => {
try{
      e.preventDefault()
    const data = await fetch(`${import.meta.env.VITE_NODEJS_URL}/login/post`, {
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
      localStorage.setItem("email", data.email);
      redirect('/verification',{state:{toastMessage:data.message,email:data.email}})
    }
}
catch{
  if(!toast.isActive("alreadyShow")){
    toastError("server error",{toastId:"alreadyShow"})
  }
  
}

  }

const clickAuth = async (providerType) => {
    try {
      const provider = providerType === "github" ? githubProvider : googleProvider;
      await signOut(auth);
      provider.setCustomParameters({ prompt: "select_account" });
      const response = await signInWithPopup(auth, provider);
      const { email, emailVerified } = response.user;

      if (!emailVerified && !toast.isActive("alreadyShow")) {
        toastError(`${providerType} email is not verified`,{toastId:"alreadyShow"});
      } else {
        // console.log(email);
        const result=await fetch(`${import.meta.env.VITE_NODEJS_URL}/clickAuthLogin`,{
          method:"post",
          body:JSON.stringify({email,emailVerified,providerType}),
          headers:{"content-type":"application/json"},
          credentials:"include"
        }).then((v)=>v.json())
        
        if(!result.success && !toast.isActive("alreadyShow")){
          toastError(result.message,{toastId:"alreadyShow"})
        }
        else if(result.success){
          setRed(true)
          redirect('/', { state: { toastMessage: result.message } })
        }
      }
    } catch (error) {
      if(!toast.isActive("alreadyShow")){
        console.log(error)
      toastError("OAuth login failed",{toastId:"alreadyShow"})
  }
    }
  }

  return (
    <div className='authUi'>
      <form onSubmit={signupPost} className='authLog'>
        <h2>Login</h2>
        <input placeholder='Enter Email' name='email' onChange={(e) => { setEmail(e.target.value) }} />
        <input placeholder='Enter Password' name='password' onChange={(e) => { setPassword(e.target.value) }} />
        <Link to="/resetPassword">Forgot Password?</Link>
        <button className='loginBtn'>Login</button>
        <p>Don't have an account? <Link to="/signup">Sign up</Link></p>

        <div>
          <p onClick={() => clickAuth("github")}><img src={githubImg} height="20px" /> Login with Github</p>
        </div>
        <div>
          <p onClick={() => clickAuth("google")}><img src={googleImg} height="30px" />Login with Google</p>
        </div>
      </form>
    </div>
  )
}


export default Login
