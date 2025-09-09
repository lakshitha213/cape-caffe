import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./Home/Home";
import Orders from "./Order/Order";
import AddProduct from "./AddProduct/AddProduct";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Redirect root to admin */}
        <Route path="/" element={<Navigate to="/admin" replace />} />
        
        <Route path="/admin" element={<AdminLayout />}>
          {/* Default admin route */}
          <Route index element={<Navigate to="orders" replace />} />
          <Route path="orders" element={<Orders />} />
          <Route path="add-product" element={<AddProduct />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;