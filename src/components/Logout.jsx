import {NavLink, replace} from "react-router-dom"
import Mycontext from "../Mycontext.jsx"
import {useContext} from "react"
import { toastError, toastSuccess } from "../Utils.jsx"
import {useNavigate} from "react-router-dom"
import { toast } from "react-toastify"

const Logout = ({setOpen}) => {
const {fetchUser} =useContext(Mycontext)  
const navigate=useNavigate()
const logout=async()=>{
  console.log("999")
    try{
      await fetch(`${import.meta.env.VITE_NODEJS_URL}/logout`,{
        credentials:"include"
    })
    fetchUser()
    if(!toast.isActive("logout")){
        toastSuccess("logout successfully",{toastId:"logout"})
<<<<<<< HEAD
        window.location.replace("/")
=======
        window.location.replace("/");
>>>>>>> 7627c7d25d2af7fc6c64b6fe6978715920ab5e29
      }

    }
    catch{
      console.log("server error")
    }
}     
  return (
    <h4 onClick={()=>{logout();setOpen(false)}} className="Logout">Logout</h4>
  )
}

export default Logout
