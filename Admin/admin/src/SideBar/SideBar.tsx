import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, PackagePlus } from "lucide-react";
import capeLogo from "../assets/CApe caffe.png";

const Sidebar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="bg-gray-900 text-white p-5 flex flex-col fixed left-0 top-0 min-h-screen min-w-[220px] max-w-[280px]">
      {/* Logo */}
      <div className="mb-8 flex items-center gap-3">
        <img
          src={capeLogo}
          alt="Cape caffe Logo"
          className="w-2 h-2 object-contain rounded"
          width={"50"}
          height={"50"}
        />
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>

      {/* Navigation */}
      <nav className="flex flex-col gap-2 flex-1">
        <Link
          to="/admin/orders"
          className={`flex items-center gap-2 p-3 rounded-lg transition-all ${
            isActive("/admin/orders")
              ? "bg-blue-600 text-white"
              : "text-gray-300 hover:bg-gray-800"
          }`}
        >
          <ShoppingCart className="w-5 h-5" />
          Orders
        </Link>

        <Link
          to="/admin/add-product"
          className={`flex items-center gap-2 p-3 rounded-lg transition-all ${
            isActive("/admin/add-product")
              ? "bg-blue-600 text-white"
              : "text-gray-300 hover:bg-gray-800"
          }`}
        >
          <PackagePlus className="w-5 h-5" />
          Add Product
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
