import React, { useState, useContext } from 'react'
import { Link } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import { toastError, toastSuccess } from "../Utils.jsx"
import { useNavigate } from "react-router-dom"
import "../App.css"
import githubImg from "../icons/github-img.png"
import googleImg from "../icons/google-img.webp"
import { githubProvider, googleProvider, auth } from "../Firebase.jsx"
import { signInWithPopup,signOut } from 'firebase/auth'
import Mycontext from '../Mycontext.jsx';
const Signup = () => {
  const redirect = useNavigate()
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const { red, setRed, fetchUser,setShowVerfication } = useContext(Mycontext)

  const signupPost = async (e) => {
    try {
      e.preventDefault()
      const data = await fetch(`${import.meta.env.VITE_NODEJS_URL}/register/post`, {
        method: "post",
        body: JSON.stringify({ name, email, password }),
        credentials: 'include',
        headers: { "content-type": "application/json" }
      }).then((x) => {
        return x.json()
      })

      if (!data.success && !toast.isActive("alreadyShow")) {
        toastError(data.message, { toastId: "alreadyShow" })
        console.log(data.message)
      }
      else if (data.success) {
        setShowVerfication(true)
        localStorage.setItem("email", data.email);
        redirect('/verification', { state: { toastMessage: data.message,email:data.email } })
      }
    }
    catch {
      if (!toast.isActive("alreadyShow")) {
        toastError("server error", { toastId: "alreadyShow" })
      }
    }

  }

  const clickAuth = async (providerType) => {
    try {
      const provider = providerType === "github" ? githubProvider : googleProvider;
      await signOut(auth);
      provider.setCustomParameters({ prompt: "select_account" });
      const response = await signInWithPopup(auth, provider);
      const { email, emailVerified,displayName } = response.user;
      
      if (!emailVerified) {
        toastError(`${providerType} email is not verified`);
      } else {
        // console.log(email);
        const result = await fetch(`${import.meta.env.VITE_NODEJS_URL}/clickAuthRegister`, {
          method: "post",
          body: JSON.stringify({ email, emailVerified, providerType,name:displayName }),
          headers: { "content-type": "application/json" },
          credentials: "include"
        }).then((v) => v.json())

        if (!result.success && !toast.isActive("alreadyShow")) {
          toastError(result.message, { toastId: "alreadyShow" })
        }
        else if (result.success) {
          setRed(true)
          redirect('/', { state: { toastMessage: result.message } })
        }
      }
    } catch (error) {
      console.log(error.message)
      if (!toast.isActive("alreadyShow")) {
        console.log(error.message)
        toastError("OAuth login failed", { toastId: "alreadyShow" })
      }
    }
  }

  return (
    <div className='authUi'>
      <form onSubmit={signupPost}>
        <h2>Signup</h2>
        <input placeholder='Name' name='name' onChange={(e) => { setName(e.target.value) }} />
        <input placeholder='Email' name='email' onChange={(e) => { setEmail(e.target.value) }} />
        <input placeholder='Password' name='password' onChange={(e) => { setPassword(e.target.value) }} />
        <button>Signup</button>
        <p>Already have an account? <Link to="/login">Log in</Link></p>
        <div>
          <p onClick={() => clickAuth("github")}><img src={githubImg} height="20px" /> Signup with Github</p>
        </div>
        <div>
          <p onClick={() => clickAuth("google")}><img src={googleImg} height="30px" />Signup with Google</p>
        </div>
      </form>
    </div>
  )
}

export default Signup
