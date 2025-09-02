import React, { useState } from 'react';
import './Dashboard.css'; // Reuse the same CSS for consistency
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const [sidePanelBtn,setSidePanelBtn]=useState("dashboard")
  const location = useLocation();
    const navigate=useNavigate()
    const handleAdminBtn=(value)=>{
        if(value=="list"){
            setSidePanelBtn("list")
            navigate("/adminList")
        }
        else if(value=="orders"){
            setSidePanelBtn("orders")
            navigate("/adminOrders")
        }
        else{
            navigate("/dashboard")
        }
    }
  return (
    <aside className="adminSidebar">
      <ul>
        <li onClick={()=>handleAdminBtn("dashboard")} style={{color:location.pathname=="/dashboard"?"red":""}}>Dashboard</li>
        <li onClick={()=>handleAdminBtn("list")} style={{color:location.pathname=="/adminList"?"red":""}}>List</li>
        <li onClick={()=>handleAdminBtn("orders")} style={{color:location.pathname=="/adminOrders"?"red":""}}>Orders</li>
      </ul>
    </aside>
  );
};

export default Sidebar;
