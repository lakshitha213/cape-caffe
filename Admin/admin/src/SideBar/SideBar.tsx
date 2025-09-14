import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ShoppingCart, PackagePlus, Package } from "lucide-react";
import capeLogo from "../assets/CApe caffe.png";
import "./SideBar.css"; // 👈 Import CSS file

const Sidebar: React.FC = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="sidebar">
      {/* Logo */}
      <div className="sidebar-logo">
        <img src={capeLogo} alt="Cape caffe Logo" />
        <h1>Admin Panel</h1>
      </div>

      {/* Navigation */}
      <nav>
        <Link
          to="/admin/orders"
          className={`sidebar-link ${isActive("/admin/orders") ? "active" : ""}`}
        >
          <ShoppingCart className="w-5 h-5" />
          Orders
        </Link>

        <Link
          to="/admin/add-product"
          className={`sidebar-link ${
            isActive("/admin/add-product") ? "active" : ""
          }`}
        >
          <PackagePlus className="w-5 h-5" />
          Add Product
        </Link>

        <Link
          to="/admin/products"
          className={`sidebar-link ${
            isActive("/admin/products") ? "active" : ""
          }`}
        >
          <Package className="w-5 h-5" />
          Products
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
