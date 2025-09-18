import {  useEffect, useState} from "react";
import Mycontext from "./Mycontext.jsx";
import { useLocation } from "react-router-dom";
import { toastError } from "./Utils.jsx";

const ContextProvider=({children})=>{
  const [showVerfication,setShowVerfication]=useState(false)
  const location=useLocation()
  const [productsData,setProducts] =useState([])
  const [orderData,setOrderData] =useState([])
  const [singleOrderData,setSingleOrderData] =useState([])
  const [myProductsData,setMyProductsData] =useState([])
  const [user,setUser]=useState({})
  const [allUsers,setAllUsers]=useState([])
  const [red,setRed]=useState(false)
  const [authOpen,setAuthOpen]=useState(false)
  const [cartData,setCartData]=useState([])
  let getCartData=localStorage.getItem("cartData")
  
  
  useEffect(()=>{
    try{
      getCartData=JSON.parse(getCartData)
      setCartData(getCartData)

    }
    catch(err){
      setCartData([])
    }
  },[])
  
    const fetchProduct=async()=>{
    try{
      const data=await fetch(`${import.meta.env.VITE_NODEJS_URL}/product`,{
      credentials:"include"
    })
    .then((res)=>res.json())
    setProducts(data)
    }
    catch(err){
      console.log("server error")
    }
    }

    const fetchMyProduct=async()=>{
    try{
      const data=await fetch(`${import.meta.env.VITE_NODEJS_URL}/myProducts`,{
      credentials:"include"
    })
    .then((res)=>res.json())
    if(data.success){

      setMyProductsData(data.data)
    }
    }
    catch(err){
      console.log("server error")
    }
    }

    const fetchUser=async()=>{
    try{
    const data=await fetch(`${import.meta.env.VITE_NODEJS_URL}/isAuth`,{
    credentials:"include"  
    })
    .then((res)=>res.json())
      if(data.email!="amaanahmad8616@gmail.com"){
      setSingleOrderData(data.userOrderData)
      setUser(data)
      }
    }
    catch{
      console.log("server error")
    }
    }

    const fetchAdminData=async()=>{
    try{
    const data=await fetch(`${import.meta.env.VITE_NODEJS_URL}/adminIsAuth`,{
    credentials:"include"  
    })
    .then((res)=>res.json())
      if(data.email=="amaanahmad8616@gmail.com"){
      setOrderData(data.orderData)
      setSingleOrderData(data.userOrderData)
      setAllUsers(data.allUsers)
      setUser(data)
      }
    }
    catch{
      console.log("server error")
    }
    }

  useEffect(()=>{
    fetchProduct()
    fetchMyProduct()
    fetchUser()
    fetchAdminData()
    },[location.pathname])
    return(
        <Mycontext.Provider value={{productsData,setProducts,user,setUser,fetchUser,red,setRed,showVerfication,setShowVerfication,myProductsData,fetchMyProduct,cartData,setCartData,orderData,singleOrderData,authOpen,setAuthOpen,allUsers,fetchAdminData}}>
          {children}
        </Mycontext.Provider>
    )
}
export default ContextProvider