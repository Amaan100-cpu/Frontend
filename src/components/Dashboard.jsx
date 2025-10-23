import React,{useContext, useState} from 'react';
import Mycontext from '../Mycontext.jsx';
import "../components/Dashboard.css";
import Sidebar from "./Sidebar"; // Sidebar component
import { toastError, toastSuccess } from '../Utils.jsx';

const orders = [
    {
      id: "001",
      items: [
        "Men Premium Cotton Tee x 1 'M'",
        "Men Premium Cotton Tee x 2 'L'",
        "Classic Men Casual T-Shirt x 1 'M'",
        "Classic Men Casual T-Shirt x 2 'XL'",
      ],
      total: "$85",
      method: "Stripe",
      payment: "Done",
      date: "12/15/2024",
      status: "Order Placed",
      address: "123 Main Street, Springfield, CA, USA, 12345",
    },
    {
      id: "002",
      items: [
        "Graphic Tee for Kids x 1 'L'",
        "Graphic Tee for Kids x 1 'XL'",
        "Stylish Women Basic Tee x 1 'L'",
      ],
      total: "$50",
      method: "COD",
      payment: "Pending",
      date: "12/14/2024",
      status: "Shipped",
      address: "123 Elm St, Springfield, CA, UK, 12345",
    },
    {
      id: "003",
      items: [
        "Elegant Cotton Round Neck Top x 1 'M'",
        "Men Premium Cotton Tee x 1 'L'",
        "Men Premium Cotton Tee x 2 'XL'",
      ],
      total: "$50",
      method: "Stripe",
      payment: "Done",
      date: "12/14/2024",
      status: "Delivered",
      address: "123 Elm St, Santa Monica, NY, USA, 12345",
    },
  ];

const Order = () => {
  const { orderData,allUsers,fetchAdminData } = useContext(Mycontext)
  const pendingOrders=orderData.filter((obj)=>obj.orderStatus!="Delivered" && obj.orderStatus!="Cancelled")
  const cancelOrders=orderData.filter((obj)=>obj.orderStatus=="Cancelled")
  const successfullOrders=orderData.filter((obj)=>obj.orderStatus=="Delivered")
  const revenue = successfullOrders.reduce((total, order) => total + Number(order.orderPrice), 0);
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
    
    }
    else if(data.success) {
      fetchAdminData()
      toastSuccess(data.message)
    }
}
catch(err){
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
          <h1>Admin Dashboard</h1>
          <div>Hello, Admin</div>
        </div>

        <div className="stats">
          <div className="stat-box"><h3>Total Users</h3><p>{allUsers?.length||0}</p></div>
          <div className="stat-box"><h3>Total Orders</h3><p>{orderData?.length||0}</p></div>
          <div className="stat-box"><h3>Pending Orders</h3><p>{pendingOrders?.length||0}</p></div>
          <div className="stat-box"><h3>Cancelled Orders</h3><p>{cancelOrders?.length||0}</p></div>
          <div className="stat-box"><h3>Successfull Orders</h3><p>{successfullOrders?.length||0}</p></div>
          <div className="stat-box"><h3>Revenue</h3><p>₹{revenue}</p></div>
        </div>

        <h1 style={{marginBottom:"20px"}}>Pending Orders</h1>
        {pendingOrders.map((order,i) => {
              const date = new Date(order.createdAt);
              const day = date.getDate().toString().padStart(2, '0');
              const month = date.toLocaleString('default', { month: 'short' });
              const year = date.getFullYear();
              const formatted = `${day} ${month} ${year}`;
              
          return <div className="order-card1" key={i}>
            <div className="order-icon">📦</div>
          
          <div className="order-card" key={order.id}>
            
            {
              order.orderDetails.map((obj,i)=>{
                return<div className='order-card2' key={i}>
                  <p className='cartImgContainer order-card9'><img src={`${obj?.img}`} /></p>

                  <div>
                  <p><strong>{obj.productName}</strong></p>
                  <p style={{display:"flex",gap:"20px",flexWrap:"wrap"}}><span>Price : {obj.price}</span> <span>Quantity : {obj.productQuantity}</span> <span>Size : {obj.size}</span></p>
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

export default Order;
