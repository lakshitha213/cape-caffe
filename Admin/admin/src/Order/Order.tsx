import React from "react";

const Orders: React.FC = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Orders Management</h2>
        <p className="text-gray-600">Here you can manage all customer orders and track order status.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-gray-700">Recent Orders</h3>
          <div className="flex gap-3">
            <button className="px-10 py-6 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all">
              Filter
            </button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all">
              Export
            </button>
          </div>
        </div>

        <div className="border rounded-lg overflow-hidden">
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead className="bg-gray-100">
              <tr>
                <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>
                  Order ID
                </th>
                <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>
                  Customer
                </th>
                <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>
                  Status
                </th>
                <th style={{ padding: '12px 24px', textAlign: 'left', fontSize: '12px', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              <tr style={{ transition: 'background-color 0.2s' }} className="hover:bg-gray-50">
                <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: '500', color: '#111827' }}>
                  #ORD-001
                </td>
                <td style={{ padding: '16px 24px', fontSize: '14px', color: '#6b7280' }}>
                  John Doe
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <span style={{ padding: '4px 8px', fontSize: '12px', fontWeight: '500', backgroundColor: '#dcfce7', color: '#166534', borderRadius: '9999px' }}>
                    Completed
                  </span>
                </td>
                <td style={{ padding: '16px 24px', fontSize: '14px', color: '#111827' }}>
                  $99.99
                </td>
              </tr>
              <tr style={{ transition: 'background-color 0.2s' }} className="hover:bg-gray-50">
                <td style={{ padding: '16px 24px', fontSize: '14px', fontWeight: '500', color: '#111827' }}>
                  #ORD-002
                </td>
                <td style={{ padding: '16px 24px', fontSize: '14px', color: '#6b7280' }}>
                  Jane Smith
                </td>
                <td style={{ padding: '16px 24px' }}>
                  <span style={{ padding: '4px 8px', fontSize: '12px', fontWeight: '500', backgroundColor: '#fef3c7', color: '#92400e', borderRadius: '9999px' }}>
                    Pending
                  </span>
                </td>
                <td style={{ padding: '16px 24px', fontSize: '14px', color: '#111827' }}>
                  $149.99
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Orders;