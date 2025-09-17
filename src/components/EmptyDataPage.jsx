import React from 'react'
import "./EmptyDataPage.css"
import {useNavigate} from "react-router-dom"
const EmptyDataPage = ({msg,btnMsg,path}) => {
const navigate=useNavigate()
const handleEmptyDataPage=()=>{
   navigate(path)
}

  return (
    <div className='emptyDataPageContainer'>
        <h2>{msg}</h2>
        <button onClick={handleEmptyDataPage}>{btnMsg}</button>
    </div>
  )
}

export default EmptyDataPage