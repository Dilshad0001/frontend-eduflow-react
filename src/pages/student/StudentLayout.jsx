import React from "react";
import { Outlet } from "react-router-dom";
import StudentNavbar from "./StudentNavbar";
import StudentFooter from "./StudentFooter";

const StudentLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <StudentNavbar />
      
      <div className="p-4">
        <Outlet /> 
      </div>
      <StudentFooter/>
    </div>
  );
};

export default StudentLayout;
