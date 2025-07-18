import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <AdminSidebar/>      
      <div className="p-4">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
