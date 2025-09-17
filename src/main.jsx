import { StrictMode, useState,useContext } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import AddProduct from './components/AddProduct.jsx'
import UpdateProduct from './components/UpdateProduct.jsx'
import MyProduct from './components/MyProduct.jsx'
import About from './components/About.jsx'
import Verification from './Verification.jsx'
import ContextProvider from './ContextProvider.jsx'
import Product from './components/Product.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Checkout from './components/Checkout.jsx'
import Cart from './components/Cart.jsx'
import ProtectedRout from './components/ProtectedRout.jsx'
import AdminProtectedRout from './components/AdminProtectedRout.jsx'
import SignupLoginProtect from './components/SignupLoginProtect.jsx'
import Orders from "./components/Ordes.jsx"
import "./index.css"
import {ToastContainer} from "react-toastify"
import SingleProduct from './components/SingleProduct.jsx'
import ResetPassword from './components/ResetPassword.jsx'
import ISEmail from './components/ISEmail.jsx'
import Dashboard from "./components/Dashboard.jsx"
import AdminList from './components/AdminList.jsx'
import AdminOrders from './components/AdminOrders.jsx'
import AdminLogin from './components/AdminLogin.jsx'
import WrongRoute from './components/WrongRout.jsx'
createRoot(document.getElementById('root')).render(
   <StrictMode>
    <BrowserRouter>
      <ContextProvider>
        <Navbar/>
        <Routes>
          <Route path='*' element={<WrongRoute/>} />
          <Route path='/' element={<App />} />
          <Route path='/singleProduct' element={<SingleProduct/>} />
          <Route path='/signup' element={<SignupLoginProtect Page={Signup}/>}/>
          <Route path='/login' element={<SignupLoginProtect Page={Login}/>} />
          <Route path='/orders' element={<ProtectedRout Page={Orders}/>} />
          <Route path='/addProduct' element={<ProtectedRout Page={AddProduct}/>} />
          <Route path='/updateProduct' element={<ProtectedRout Page={UpdateProduct}/>} />
          <Route path='/myProduct' element={<ProtectedRout Page={MyProduct} />} />
          <Route path='/about' element={<About/>} />
          <Route path='/cart' element={<ProtectedRout Page={Cart}/>} />
          <Route path='/verification' element={<ISEmail Page={Verification}/>} />
          <Route path='/checkout' element={<Checkout />} />
          <Route path='/product' element={<Product />} />
          <Route path='/resetPassword' element={<ResetPassword/>} />
          <Route path='/dashboard' element={<AdminProtectedRout Page={Dashboard}/>} />
          <Route path='/adminList' element={<AdminProtectedRout Page={AdminList}/>} />
          <Route path='/adminOrders' element={<AdminProtectedRout Page={AdminOrders}/>} />
          <Route path='/adminLogin' element={<AdminLogin/>} />
        </Routes>
        <Footer/>
        <ToastContainer/>
      </ContextProvider>
    </BrowserRouter>
    </StrictMode> 
)
