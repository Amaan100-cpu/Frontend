import Product from "./components/Product.jsx"
import {useEffect,useContext} from "react"
import {toastSuccess} from "./Utils.jsx"
import { useNavigate, useLocation } from 'react-router-dom';
import { ToastContainer,toast } from "react-toastify"
import Navbar2 from "./components/Navbar2.jsx";
import HeroSection from "./components/HeroSection.jsx"
import Mycontext from './Mycontext.jsx';
import "./App.css"


function App() {
  const redirect=useNavigate()
  const location = useLocation();
  const {authOpen,setAuthOpen} =useContext(Mycontext)
 

  useEffect(() => {
    if (location.state?.toastMessage && !toast.isActive("alreadyShow")) {
      toastSuccess(location.state.toastMessage,{toastId:"alreadyShow"});
      redirect(location.pathname, {state:{}})
    }
  }, [location]);

  return (
    <>
    <Navbar2/>
    <HeroSection/>
    <Product/>
    </>
  )
}

export default App
