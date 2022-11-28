import React, { useEffect } from 'react'
import {useNavigate } from 'react-router-dom';
const ProtectedRoute = ({children}) => {
    const navigate = useNavigate();
    let id = JSON.parse(localStorage.getItem("user"))?.details;

    useEffect(()=>{
      if(id?._id==null){
       navigate("/login");
      }else{
        children
      }
    },[])

  return (
  <div>
    {children}
  </div>
  )
}

export default ProtectedRoute