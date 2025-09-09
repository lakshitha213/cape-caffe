import React from "react";
import Sidebar from "../SideBar/SideBar";
import { Outlet } from "react-router-dom";

const AdminLayout: React.FC = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <main className="flex-1 ml-64 p-6">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;