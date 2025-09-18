import React, { useState,useContext } from 'react';
import Mycontext from '../Mycontext.jsx';
import './Orders.css';
import EmptyDataPage from "./EmptyDataPage.jsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquareXmark } from '@fortawesome/free-solid-svg-icons';


const Orders = () => {
const {singleOrderData } = useContext(Mycontext)
const [viewData,setViewData]=useState({})
const [statusColor,setStatusColor]=useState({})
const [openView,setView]=useState(false)

  const handleViewBtn=(data,color)=>{
    setStatusColor(color)
    setViewData(data)
    setView(true)
  }

              const date = new Date(viewData.createdAt);
              const day = date.getDate().toString().padStart(2, '0');
              const month = date.toLocaleString('default', { month: 'short' });
              const year = date.getFullYear();
              const formatted = `${day} ${month} ${year}`;

  return (
    <div className="orders-container1">
    {
      singleOrderData.length==0&&<EmptyDataPage msg="You have no orders yet." btnMsg="Add Order" path="/"/>
    }  
    {
      singleOrderData.length!=0&&
      <>
      {
       openView&& <>
      <div className='blkTransPage'></div> 
      <div className='viewDetailConatiner1'>
        <FontAwesomeIcon icon={faSquareXmark} onClick={()=>setView(false)} />
        <div className='viewDetailConatiner2'>
          <div className='viewDetailConatiner3'><p>Order ID</p><p style={{fontWeight:"200"}}>{viewData.orderId}</p></div>
          <div className='viewDetailConatiner3'><p>Order Date</p><p style={{fontWeight:"200"}}>{formatted}</p></div>
          <div className='viewDetailConatiner3'><p>Order Price</p><p style={{fontWeight:"200"}}>{viewData.orderPrice}</p></div>
          <div className='viewDetailConatiner3'><p>Order Method</p><p style={{fontWeight:"200"}}>{viewData.orderMethod}</p></div>
          <div className='viewDetailConatiner3'><p>Payment Status</p><p style={{fontWeight:"200"}}>{viewData.paymentStatus}</p></div>
          <div className='viewDetailConatiner3'><p>Order Status</p><p style={{fontWeight:"200",backgroundColor:statusColor}} className='orderStatus'>{viewData.orderStatus}</p></div>
        </div>
        <p style={{fontWeight:"600",fontSize:"14px",margin:"30px 0px 5px 0px"}}>Order Details</p>
        <div className='viewDetailConatiner4'>
        {
          viewData.orderDetails.map((obj)=>{
            return(
              <div className='viewDetailConatiner5'>
              <p><img src={`${obj?.img}`}/></p>  
              <p>{obj.productName}</p>
              <p>Size : {obj.size}</p>
              <p>Quantity : {obj.productQuantity}</p>
              <p>Price : {obj.cartTotal}</p>
        </div>
            )
          })
        }
        </div>
        <p style={{fontWeight:"600",fontSize:"14px",margin:"20px 0px 5px 0px"}}>Shipping info</p>
        <p className='detailAddress'>{viewData.street}, {viewData.city}, {viewData.state} - {viewData.postalCode}, {viewData.country}</p>
        </div> 
        </>
      }
      <div className="orders-container"> 
      <h2>Orders</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th >Status</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {singleOrderData.map((order, index) =>{
              const date = new Date(order.createdAt);
              const day = date.getDate().toString().padStart(2, '0');
              const month = date.toLocaleString('default', { month: 'short' });
              const year = date.getFullYear();
              const formatted = `${day} ${month} ${year}`;
              const conditionColor= order.orderStatus === "Delivered" ? "#28a745" :
                                    order.orderStatus === "Order Placed" ? "#2b2e3f":
                                    order.orderStatus === "Cancelled" ? "#dc3545" :
                                    order.orderStatus === "Shipped" ? "#17a2b8" :""
           return <tr key={index}>
              <td data-label="Order ID">{order.orderId}</td>
              <td data-label="Date">{formatted}</td>
              <td data-label="Status">
                <span className='orderStatus' style={{backgroundColor:conditionColor}}>
                  {order.orderStatus}
                </span>
              </td>
              <td data-label="Amount">{order.orderPrice}</td>
              <td data-label="Action">
                <button className="view-btn" onClick={()=>handleViewBtn(order,conditionColor)}>View Details</button>
              </td>
            </tr>
        })}
        </tbody>
      </table>
    </div>
    </>
    }
    </div>
  );
};

export default Orders;
