import React, { useEffect, useState } from 'react'
import axiosInstance from '../../AxioInstance';
import { useNavigate } from 'react-router-dom';

function Lanndingpage() {
    const [checkingAuth, setCheckingAuth] = useState(true); 
    const navigate=useNavigate()
      useEffect(() => {
    const checkLogin = async () => {
      try {
        const res=await axiosInstance.get("/account/self/");
        setCheckingAuth(false); // User is logged in
        console.log(res.data.is_admin);
        if (res.data.is_admin){
            navigate('/admin')
        }
        else{
            navigate('/student')
        }   
        
        
      } catch (error) {
        if (error.response?.status === 401) {
          // Not logged in
          navigate("/login");
        } else {
          console.error("Login check failed:", error);
        }
      }
    };

    checkLogin();
  }, [navigate]);



  

  if (checkingAuth) {
    return <div>Loading...</div>; // Optional loader
  }


  return (
    <div>
      
    </div>
  )
}

export default Lanndingpage
