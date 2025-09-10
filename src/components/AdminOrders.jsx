import React,{useContext,useState} from "react";
import "./Dashboard.css"; // Correct CSS
import Sidebar from "./Sidebar"; // Your existing sidebar
import Mycontext from '../Mycontext.jsx';
import { toastError, toastSuccess } from "../Utils.jsx";

const AdminOrders = () => {
  const { orderData,fetchAdminData } = useContext(Mycontext)
  const cancelOrders=orderData.filter((obj)=>obj.orderStatus=="Cancelled")
  const successfullOrders=orderData.filter((obj)=>obj.orderStatus=="Delivered")
  const [status,setStatus]=useState("Order Placed")
  
  const handleOrderStatus=async(status,id)=>{
try{
    const data = await fetch(`${import.meta.env.VITE_NODEJS_URL}/manageStatus`, {
      method: "post",
      body: JSON.stringify({status,orderId:id}),
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
      fetchAdminData()
      toastSuccess(data.message)
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
    <div className="app-container">
      <Sidebar />
      <main className="dashboard-main-content">
        <div className="dashboard_header">
          <h1>Successfull Orders</h1>
          <div>Hello, Admin</div>
        </div>
         <>
        {successfullOrders.map((order) => {
              const date = new Date(order.createdAt);
              const day = date.getDate().toString().padStart(2, '0');
              const month = date.toLocaleString('default', { month: 'short' });
              const year = date.getFullYear();
              const formatted = `${day} ${month} ${year}`;
          return <div className="order-card1">
            <div className="order-icon">📦</div>
          
          <div className="order-card" key={order.id}>
            
            {
              order.orderDetails.map((obj)=>{
                return<div className='order-card2'>
                  <p className='cartImgContainer'><img src={`${obj?.img}`} /></p>
                  <div>
                  <p><strong>{obj.productName}</strong></p>
                  <p style={{display:"flex",gap:"20px",flexWrap:"wrap"}}><spam>Price : {obj.price}</spam> <spam>Quantity : {obj.productQuantity}</spam> <spam>Size : {obj.size}</spam></p>
                  </div>
                </div>
              })
            }
            <div className='order-card3'>
            <div className="order-details">
              <h4>Order Id: {order.orderId}</h4>
              <p><strong>Name:</strong> {order.firstName} {order.lastName}</p>
              <p><strong>Phone:</strong> {order.phoneNumber+" "}</p>
              <p><strong>Address:</strong> {order.street}, {order.city}, {order.state} - {order.postalCode}, {order.country}</p>
              <p>
                <strong>Total:</strong> {order.orderPrice} | 
                <strong> Method:</strong> {order.orderMethod} | 
                <strong> Date:</strong> {formatted}
              </p>
            </div>
            <div className="order-status">
              <select value={order.orderStatus} onChange={(e)=>handleOrderStatus(e.target.value,order._id)}>
                <option>Order Placed</option>
                <option>Shipped</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>
            </div>
            </div>
          </div>
          </div>
          
         })}
        </>
        <h1>Cancelled Orders</h1>
          {cancelOrders.map((order) => {
              const date = new Date(order.createdAt);
              const day = date.getDate().toString().padStart(2, '0');
              const month = date.toLocaleString('default', { month: 'short' });
              const year = date.getFullYear();
              const formatted = `${day} ${month} ${year}`;
          
          return <div className="order-card1">
            <div className="order-icon">📦</div>
          
          <div className="order-card" key={order.id}>
            
            {
              order.orderDetails.map((obj)=>{
                return<div className='order-card2'>
                  <p className='cartImgContainer'><img src={`${obj?.img}`} /></p>
                  <div>
                  <p><strong>{obj.productName}</strong></p>
                  <p style={{display:"flex",gap:"20px",flexWrap:"wrap"}}><spam>Price : {obj.price}</spam> <spam>Quantity : {obj.productQuantity}</spam> <spam>Size : {obj.size}</spam></p>
                  </div>
                </div>
              })
            }
            <div className='order-card3'>
            <div className="order-details">
              <h4>Order Id: {order.orderId}</h4>
              <p><strong>Name:</strong> {order.firstName} {order.lastName}</p>
              <p><strong>Phone:</strong> {order.phoneNumber+" "}</p>
              <p><strong>Address:</strong> {order.street}, {order.city}, {order.state} - {order.postalCode}, {order.country}</p>
              <p>
                <strong>Total:</strong> {order.orderPrice} | 
                <strong> Method:</strong> {order.orderMethod} | 
                <strong> Date:</strong> {formatted}
              </p>
            </div>
            <div className="order-status">
              <select value={order.orderStatus} onChange={(e)=>handleOrderStatus(e.target.value,order._id)}>
                <option>Order Placed</option>
                <option>Shipped</option>
                <option>Delivered</option>
                <option>Cancelled</option>
              </select>
            </div>
            </div>
          </div>
          </div>
          
       })}
      </main>
    </div>
  );
};

export default AdminOrders;
