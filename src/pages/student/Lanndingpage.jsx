import React, { useEffect, useState } from 'react';
import axiosInstance from '../../AxioInstance';
import { useNavigate } from 'react-router-dom';

function Lanndingpage() {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const res = await axiosInstance.get("/account/self/");
        setCheckingAuth(false);
        if (res.data.is_admin) {
          navigate('/admin');
        } else {
          navigate('/student');
        }
      } catch (error) {
        if (error.response?.status === 401) {
          navigate("/login");
        } else {
          console.error("Login check failed:", error);
        }
      }
    };

    checkLogin();
  }, [navigate]);

  if (checkingAuth) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return <div></div>;
}

export default Lanndingpage;
