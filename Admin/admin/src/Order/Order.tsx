import React from "react";
import "./Order.css"; // 👈 Import CSS

const Orders: React.FC = () => {
  return (
    <div className="orders-page">
      {/* Header */}
      <div className="orders-header">
        <h2>Orders Management</h2>
        <p>Here you can manage all customer orders and track order status.</p>
      </div>

      {/* Content */}
      <div className="orders-content">
        <div className="orders-toolbar">
          <h3>Recent Orders</h3>
          <div className="orders-actions">
            <button className="btn-filter">Filter</button>
            <button className="btn-export">Export</button>
          </div>
        </div>

        <div className="orders-table-container">
          <table className="orders-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Status</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#ORD-001</td>
                <td className="customer">John Doe</td>
                <td>
                  <span className="status status-completed">Completed</span>
                </td>
                <td>$99.99</td>
              </tr>
              <tr>
                <td>#ORD-002</td>
                <td className="customer">Jane Smith</td>
                <td>
                  <span className="status status-pending">Pending</span>
                </td>
                <td>$149.99</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;
