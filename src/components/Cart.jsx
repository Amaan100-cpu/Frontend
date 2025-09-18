import React,{useContext, useState} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import Mycontext from '../Mycontext.jsx';
import "./Cart.css"
import EmptyDataPage from "./EmptyDataPage.jsx";
import { useNavigate } from 'react-router-dom';



const Cart = () => {
  const Navigate=useNavigate()
  const {cartData,setCartData} =useContext(Mycontext)
  localStorage.setItem("cartData",JSON.stringify(cartData))
  const subTotal = cartData && cartData[0]?.cartTotal
  ? cartData.reduce((sum, obj) => sum + Number(obj.cartTotal||0),0)
  : 0;
  const tax=Math.round(subTotal*10/100)


  

const handleRemoveCart=(id)=>{
  const removeData=cartData.filter((obj)=>obj._id!=id)
  setCartData(removeData)
  localStorage.setItem("cartData",JSON.stringify(removeData))
}
const increase=(data)=>{
  const increaseData=cartData.map(obj =>
    obj._id === data._id
      ? { ...obj, productQuantity: obj.productQuantity==20?20:obj.productQuantity + 1,cartTotal:(obj.productQuantity+1)*(obj.price-obj.discount)}
      : obj
  )
  setCartData(increaseData)
}

const decrease=(data)=>{

  if(data.price-data.discount!=data.cartTotal){
  setCartData(  cartData.map(obj =>
    obj._id === data._id
      ? { ...obj, productQuantity: obj.productQuantity==1?1:obj.productQuantity - 1,cartTotal:(obj.productQuantity-1)*(obj.price-obj.discount)}
      : obj
  ))
}
}

if(cartData.length==0){
  return(
    <EmptyDataPage msg="Your cart is empty." btnMsg="Add to Cart" path="/"/>
  )
}
  return (
    <div className='cartContainer1'>
      <div className='cartProductsContainer'>
     {
      cartData.map((obj,i)=>{
        return(
          <div className='singleCartContainer' key={i}>
            <div className='uuu'>
           <div className='cartImgContainer1'>
            <div className='cartImgContainer'>
            <img src={`${obj?.img}`} />
           </div>
           </div>
           <div className='singleCartData1'>
            <h3 style={{fontSize:"17px",}}>{obj.productName}</h3>
            <h3 style={{ fontSize: "14px", color: "#888", fontWeight: "200"}} className='cartProductDetail'>{obj.description}</h3>
            <div className='singleCartData2'>
            <button onClick={()=>decrease(obj)}>-</button>
            <input type="text" value={obj.productQuantity} style={{height:"30px",width:"45px"}} readOnly/>
            <button style={{marginRight:"20px"}} onClick={()=>increase(obj)}>+</button>
            <span onClick={()=>handleRemoveCart(obj._id)} ><FontAwesomeIcon icon={faTrash}/> Remove</span>
           </div>
           </div>
           </div>
           <div className='singleCartData3'>
            <h3 style={{fontSize:"19px",fontWeight:"700"}}>{`₹${obj.price-obj.discount}`}</h3>
            <h3 style={{fontSize:"17px",textDecoration:"line-through",color:"#888",fontWeight:"200"}}>₹{obj.price}</h3>
            <h3 style={{fontSize:"15px",color:"#108981",fontWeight:"700"}}>{Math.round(((obj.discount/obj.price)*100))}%OF</h3>
           </div>
          </div>        
          )
      })
     }
     </div>
     <div className='CartOrderSummary'>
      <h4>Order Summary</h4>
      <div><h3 style={{color:"#888",fontWeight:"300"}}>Subtotal (3 items)</h3><h3 style={{fontWeight:"100"}}>{subTotal}</h3></div>
      <div><h3 style={{color:"#888",fontWeight:"300"}}>Shipping</h3><h3 style={{fontWeight:"100"}}>50</h3></div>
      <div><h3 style={{color:"#888",fontWeight:"300"}}>Tax</h3><h3 style={{fontWeight:"100"}}>{tax}</h3></div>
      <div><h3>Total</h3><h3>{subTotal+tax+50}</h3></div>
      <button onClick={()=>Navigate("/checkout")}>Proceed to Checkout</button>
     </div>
    </div>
  )
}

export default Cart