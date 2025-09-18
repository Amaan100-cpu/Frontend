import "./Navbar.css"
import { NavLink,redirect,useLocation } from 'react-router-dom';
import { useState,useContext } from 'react';
import Mycontext from '../Mycontext.jsx';
import Logout from "./Logout.jsx";
import { toastError, toastSuccess } from "../Utils.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBagShopping,faXmark,faCaretDown,faShoppingCart,faUser } from '@fortawesome/free-solid-svg-icons';
import { useRef } from "react";
import {ToastContainer,toast} from "react-toastify"



const Navbar = () => {
  const [open, setOpen] = useState(false)
  const {user,setUser,setRed,cartData,authOpen,setAuthOpen,allUsers} =useContext(Mycontext)
  const location=useLocation()
  const toastShown = useRef(false);
  
  
  const toggle = () => {
    setOpen(!open)
    }

  const notLoginMsg=(route)=>{
      if(!user.success && route && !toastShown.current && !toast.isActive("alreadyShow")){
        localStorage.setItem("route",route)
      
        if(route!="/"){
        setTimeout(() => {
      toastError("you are not logged in", { toastId: "alreadyShow" })  
    },100);
        }
  }
  
  else if(route){
    redirect(route)

  }
    
  }
  

    return (
      <div className='navbar'>
        <div className='nav1'>
          <span className="logo"><FontAwesomeIcon icon={faBagShopping} style={{marginRight:"10px",color:"#d4af37"}}/>Amacloth</span>
          <div className='nav2'>
            <div className={`navlinks ${open?'show':""}`}>
              <NavLink onClick={()=>{setOpen(false);setAuthOpen(false);notLoginMsg("/")}} to="/"><h4 className={"/"==location.pathname?"actives":""}>Home</h4></NavLink>
              <NavLink onClick={()=>{setOpen(false);setAuthOpen(false);notLoginMsg("/addProduct")}} to={"/addProduct"}><h4 className={"/addProduct"==location.pathname?"actives":""}>Add Products</h4></NavLink>
              <NavLink onClick={()=>{setOpen(false);setAuthOpen(false);notLoginMsg("/myProduct")}} to={"/myProduct"}><h4 className={"/myProduct"==location.pathname?"actives":""}>My products</h4></NavLink>
              <NavLink onClick={()=>{setOpen(false);setAuthOpen(false);notLoginMsg("/orders")}} to="/orders"><h4 className={"/orders"==location.pathname?"actives":""}>Orders</h4></NavLink>
              <NavLink onClick={()=>{setOpen(false);setAuthOpen(false)}} to={"/about"}><h4 className={"/about"==location.pathname?"actives":""}>Aboutus</h4></NavLink>
              <NavLink onClick={()=>{setOpen(false);setAuthOpen(false);notLoginMsg("/cart")}} to={"/cart"}><h4 className={"/cart"==location.pathname?"actives":""}><FontAwesomeIcon icon={faShoppingCart} style={{fontSize:"20px",marginRight:"6px"}}/>Cart{cartData.length>0&&<span className="cartQuantity">{cartData.length}</span>}</h4></NavLink>
              {user.success?
              <div className="aaa1">
              <h3 onClick={()=>{setAuthOpen(!authOpen)}} className="profileContainer"><FontAwesomeIcon icon={faUser}/></h3>
              <div className={authOpen?"nav3isLog":"closenav3"}>
              <h3 className="profileContainer2">{user?.data?.name[0]}</h3>
              <h4>{user?.data?.name}</h4>
              <h4>{user?.data?.email}</h4>
              {
              Array.isArray(allUsers) && allUsers.length == 0 && <NavLink onClick={()=>{setOpen(false);setAuthOpen(false)}} to={"/resetPassword"}><h4 className={"/about"==location.pathname?"actives":""}>Reset Password</h4></NavLink>
              }
              {
              Array.isArray(allUsers) && allUsers.length > 0 &&<NavLink onClick={()=>{setOpen(false);setAuthOpen(false);notLoginMsg("/cart")}} to={"/dashboard"}><h4 className={"/cart"==location.pathname?"actives":""}>Dashboard</h4></NavLink>
              }
              <Logout value={setOpen}/>
              </div>
              </div>:
              <>
              <h4 onClick={()=>{setAuthOpen(!authOpen)}}>Login<FontAwesomeIcon style={{marginLeft:"5px"}} icon={faCaretDown}/></h4>
              <div className={authOpen?"nav3":"closenav3"}>
              <NavLink className="displayLinks" onClick={()=>{setOpen(false);setAuthOpen(!authOpen)}} to="/signup"><h4 className={"/signup"==location.pathname?"actives":""} >Signup</h4></NavLink>
              <NavLink onClick={()=>{setOpen(false);setAuthOpen(!authOpen)}} to="/login"><h4 className={"/login"==location.pathname?"actives":""} >Login</h4></NavLink>
              <NavLink onClick={()=>{setOpen(false);setAuthOpen(!authOpen)}} to="/adminLogin"><h4 className={"/adminLogin"==location.pathname?"actives":""} >Admin Login</h4></NavLink>
              </div>
              </>
              }
            </div>
            <span className='menu' onClick={toggle} style={{display:open&&"none"}}> &#9776;</span>
            <FontAwesomeIcon icon={faXmark} style={{display:!open&&"none"}} onClick={toggle} className="cross"/>
          </div>
      </div>
      </div>

    )
  }

export default Navbar
