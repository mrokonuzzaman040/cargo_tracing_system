'use client';

import React, { useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';

interface Order {
  _id: string;
  orderId: string;
  status: string;
  orderNumber: string;
  createdAt: string;
  sender: {
    name: string;
  };
  receiver: {
    name: string;
    city: string;
    street: string;
    district: string;
  };
}

const queryClient = new QueryClient();

const fetchPendingOrders = async (page: number, ordersPerPage: number) => {
  const response = await axios.get('/api/admin/orders', {
    params: {
      status: 'pending',
      page,
      limit: ordersPerPage,
    },
    withCredentials: true, // Ensure cookies are sent with the request
  });
  return response.data;
};

const PendingOrders = () => {
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusUpdates, setStatusUpdates] = useState<{ [key: string]: string }>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const ordersPerPage = 10;
  const [loading, setLoading] = useState(false);

  const { data, error, isLoading } = useQuery(
    ['pendingOrders', currentPage],
    () => fetchPendingOrders(currentPage, ordersPerPage),
    { keepPreviousData: true }
  );

  const handleStatusChange = (orderId: string, status: string) => {
    setStatusUpdates((prev) => ({ ...prev, [orderId]: status }));
  };

  const handleUpdateClick = (order: Order) => {
    setSelectedOrder(order);
    setShowConfirmation(true);
  };

  const confirmStatusChange = async () => {
    if (!selectedOrder) return;
    setLoading(true);
    try {
      await axios.put(`/api/admin/orders/${selectedOrder._id}/status`, { status: statusUpdates[selectedOrder._id] }, { withCredentials: true });
      queryClient.invalidateQueries('pendingOrders');
      setShowConfirmation(false);
      setStatusUpdates((prev) => ({ ...prev, [selectedOrder._id]: '' }));
      setSelectedOrder(null);
    } catch (err) {
      console.error('Error updating order status:', err);
    } finally {
      setLoading(false);
    }
  };


  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching orders</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pending Orders</h1>
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Order ID</th>
            <th className="py-2 px-4 border-b">Created At</th>
            <th className="py-2 px-4 border-b">Sender</th>
            <th className="py-2 px-4 border-b">Receiver</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.orders.map((order: Order) => (
            <tr key={order._id}>
              <td className="py-2 px-4 border-b">{order.orderNumber}</td>
              <td className="py-2 px-4 border-b">{dayjs(order.createdAt).format('YYYY-MM-DD HH:mm')}</td>
              <td className="py-2 px-4 border-b">{order.sender.name}</td>
              <td className="py-2 px-4 border-b">
                {order.receiver.name}, {order.receiver.city}, {order.receiver.street}, {order.receiver.district}
              </td>
              <td className="py-2 px-4 border-b">
                <select
                  value={statusUpdates[order._id] || order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  className="block w-full p-2 border rounded"
                >
                  <option value="">Update Status</option>
                  <option value="pending">Pending</option>
                  <option value="pick-up">Pick Up</option>
                  <option value="on-the-way">On the Way</option>
                  <option value="delivered">Delivered</option>
                </select>
              </td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleUpdateClick(order)}
                  className="bg-blue-500 text-white py-1 px-2 rounded"
                  disabled={!statusUpdates[order._id]}
                >
                  Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
        >
          Previous
        </button>
        <span>
          Page {currentPage} of {Math.ceil(data.totalOrders / ordersPerPage)}
        </span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === Math.ceil(data.totalOrders / ordersPerPage)}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
        >
          Next
        </button>
      </div>

      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white shadow-md rounded p-4 max-w-lg w-full">
            <h2 className="text-xl font-semibold">Confirm Status Update</h2>
            <p>Are you sure you want to update the status of order <strong>{selectedOrder?.orderId}</strong> to <strong>{statusUpdates[selectedOrder!._id]}</strong>?</p>
            <div className="flex justify-end mt-4">
              <button
                onClick={() => setShowConfirmation(false)}
                className="mr-2 bg-gray-300 text-gray-700 py-2 px-4 rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmStatusChange}
                className="bg-blue-500 text-white py-2 px-4 rounded"
                disabled={loading}
              >
                {loading ? 'Updating...' : 'Confirm'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

const PendingOrdersPage = () => (
  <QueryClientProvider client={queryClient}>
    <PendingOrders />
  </QueryClientProvider>
);

export default PendingOrdersPage;
