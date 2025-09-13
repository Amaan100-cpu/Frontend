// checkout.jsx
import React, { useContext, useEffect, useState } from 'react';
import Mycontext from '../Mycontext.jsx';
import './Checkout.css';
import {toast} from "react-toastify"
import { toastError, toastSuccess } from '../Utils.jsx';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
    const [disableBtn,setDisableBtn]=useState(false)
    const navigate=useNavigate()
    const [address,setAddress]=useState({firstName:"",lastName:"",email:"",street:"",city:"",state:"",postalCode:"",country:"",phoneNumber:""})
    const [paymentMethod,setPaymentMethod]=useState("razorpay")
    const { cartData, setCartData,orderData } = useContext(Mycontext)
    const subTotal = cartData && cartData[0]?.cartTotal
  ? cartData.reduce((sum, obj) => sum + Number(obj.cartTotal||0),0)
  : 0;
  const tax=Math.round(subTotal*10/100)

const handlePlaceOrder = async () => {
  try {
    if (paymentMethod === "razorpay") {
      const response = await fetch(`${import.meta.env.VITE_NODEJS_URL}/payment`, {
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            ...address,
            orderId: "xyz",
            method: paymentMethod,
            orderPrice: subTotal + tax + 50,
            orderDetails: cartData
          })
      });

      const order = await response.json();
      console.log(order);

      if (!order.success && !toast.isActive("alreadyShow")) {
          console.log(order.perr)
        return toastError(order.message, { toastId: "alreadyShow" });
      }

      if (order.success) {
        const options = {
          key: import.meta.env.VITE_KEY_ID,
          amount: ((subTotal + tax + 50)*100),
          currency: 'INR',
          name: 'Amacloth',
          description: 'Test Transaction',
          order_id: order.id,
          prefill: {
            name: 'Gaurav Kumar',
            email: 'gaurav.kumar@example.com',
            contact: '9999999999'
          },
          theme: {
            color: 'black'
          },
          handler: async function (res) {
            try {
              
              const checkApi = await fetch(`${import.meta.env.VITE_NODEJS_URL}/payment-success`, {
                method: "POST",
                credentials:"include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                  ...res,...address,
            orderId: order.id,
            method: paymentMethod,
            orderPrice: subTotal + tax + 50,
            orderDetails: cartData})
              });

              const checkApiResult = await checkApi.json();

              if (!checkApiResult.success && !toast.isActive("alreadyShow")) {
                  console.log(checkApiResult.err)
                toastError(checkApiResult.message, { toastId: "alreadyShow" });
              } else if (checkApiResult.success) {
                toastSuccess(checkApiResult.message);
                setCartData([])
                localStorage.setItem("cartData",JSON.stringify([]))
                navigate("/orders")
              }
            } catch (err) {
              if (!toast.isActive("alreadyShow")) {
                console.log(err);
                toastError("Payment failed", { toastId: "alreadyShow" });
              }
            }
          }
        };

        const rzp = new Razorpay(options);
        rzp.open();
      }
    } else if (paymentMethod === "Cash on Delivery") {
      try {
        setDisableBtn(true)
        const orderOnDelivery = await fetch(`${import.meta.env.VITE_NODEJS_URL}/payment`, {
          method: "POST",
          credentials:"include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            ...address,
            orderId: `order_cd${Date.now()}`,
            method: "cash on delivery",
            orderPrice: subTotal + tax + 50,
            orderDetails: cartData
          })
        });

        const result = await orderOnDelivery.json();

        if (!result.success && !toast.isActive("alreadyShow")) {
          toastError(result.message, { toastId: "alreadyShow" });
        } else if (result.success) {
          toastSuccess(result.message);
          setCartData([])
          localStorage.setItem("cartData",JSON.stringify([]))
          navigate("/orders")
        }
      } catch (err) {
        if (!toast.isActive("alreadyShow")) {
          toastError("Order failed", { toastId: "alreadyShow" });
        }
      }
    }
  } catch (err) {
    if (!toast.isActive("alreadyShow")) {
      toastError("Payment failed", { toastId: "alreadyShow" });
    }
  }
};


    return (
        <div className="checkout-container">
            {/* LEFT: Delivery Form */}
            <div className="checkout-left">
                <h2 className="section-title">Delivery <span>Information</span></h2>

                <div className="form-row">
                    <input type="text" placeholder="First Name" onChange={(e)=>setAddress({...address,firstName:e.target.value})} />
                    <input type="text" placeholder="Last Name" onChange={(e)=>setAddress({...address,lastName:e.target.value})} />
                </div>
                <input type="email" placeholder="Email Address" onChange={(e)=>setAddress({...address,email:e.target.value})} />
                <input type="text" placeholder="Street Address" onChange={(e)=>setAddress({...address,street:e.target.value})} />

                <div className="form-row">
                    <input type="text" placeholder="City" onChange={(e)=>setAddress({...address,city:e.target.value})} />
                    <input type="text" placeholder="State" onChange={(e)=>setAddress({...address,state:e.target.value})} />
                </div>

                <div className="form-row">
                    <input type="text" placeholder="Postal Code" onChange={(e)=>setAddress({...address,postalCode:e.target.value})} />
                    <input type="text" placeholder="Country" onChange={(e)=>setAddress({...address,country:e.target.value})} />
                </div>

                <input type="text" placeholder="Phone Number" onChange={(e)=>setAddress({...address,phoneNumber:e.target.value})} />
            </div>

            {/* RIGHT: Product + Totals */}
            <div className="checkout-right">
                {/* Product Details */}
                <div className="product-details">
                    <h2 className="section-title">Product <span>Details</span></h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Qty</th>
                                <th>Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                cartData.map((obj,i) => {
                                    return (
                                        <tr key={i}>
                                            <td className='checkoutImg'><img src={`${obj?.img}`} />{obj.productName}</td>
                                            <td>{obj.productQuantity}</td>
                                            <td>{obj.cartTotal}</td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div>

                {/* Cart Totals + Payment */}
                <div className="checkout-summary">
                    <h2 className="section-title">Cart <span>Totals</span></h2>
                    <div className="totals">
                        <div><span>Subtotal</span><span>{subTotal}</span></div>
                        <div><span>Tax</span><span>{tax}</span></div>
                        <div><span>Shipping Fee</span><span>50</span></div>
                        <div className="total"><strong>Total</strong><strong>{subTotal+tax+50}</strong></div>
                    </div>

                    <h2 className="section-title">Payment <span>Method</span></h2>
                    <div className="checkout-payment-methods">
                        <button onClick={()=>setPaymentMethod("razorpay")}><input onChange={() => setPaymentMethod("razorpay")} type='radio' name='paymentMethod' checked={paymentMethod=="razorpay"}/><span>Razorpay</span></button>
                        <button onClick={()=>setPaymentMethod("Cash on Delivery")}><input onChange={() => setPaymentMethod("Cash on Delivery")} type='radio' name='paymentMethod' checked={paymentMethod=="Cash on Delivery"}/><span>Cash on Delivery</span></button>
                    </div>

                    <button className="place-order" onClick={handlePlaceOrder} disabled={disableBtn==true}>Place Order</button>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
