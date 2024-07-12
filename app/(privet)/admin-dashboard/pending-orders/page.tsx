'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import dayjs from 'dayjs';
import { FixedSizeList as List } from 'react-window';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';

interface Order {
  _id: string;
  status: string;
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
  const [status, setStatus] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 10;

  const { data, error, isLoading } = useQuery(
    ['pendingOrders', currentPage],
    () => fetchPendingOrders(currentPage, ordersPerPage),
    { keepPreviousData: true }
  );

  const handleViewDetails = (order: any) => {
    setSelectedOrder(order);
  };

  const handleStatusChange = async (orderId: string, newStatus: string) => {
    try {
      await axios.put(`/api/admin/orders/${orderId}/status`, { status: newStatus }, { withCredentials: true });
      queryClient.invalidateQueries('pendingOrders');
      setStatus('');
    } catch (err) {
      console.error('Error updating order status:', err);
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const Row = ({ index, style }: { index: number, style: React.CSSProperties }) => {
    const order = data.orders[index];
    return (
      <div style={style} key={order._id} className="bg-white shadow-md rounded p-4 mb-2">
        <h2 className="text-xl font-semibold">Order ID: {order._id}</h2>
        <p className="text-sm">Created At: {dayjs(order.createdAt).format('YYYY-MM-DD HH:mm')}</p>
        <p className="text-sm">Status: {order.status}</p>
        <button
          onClick={() => handleViewDetails(order)}
          className="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
        >
          View Details
        </button>
        <select
          value={status}
          onChange={(e) => handleStatusChange(order._id, e.target.value)}
          className="mt-2 block w-full p-2 border rounded"
        >
          <option value="">Update Status</option>
          <option value="pending">Pending</option>
          <option value="pick-up">Pick Up</option>
          <option value="on-the-way">On the Way</option>
          <option value="delivered">Delivered</option>
        </select>
      </div>
    );
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error fetching orders</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Pending Orders</h1>
      <List
        height={600}
        itemCount={data.orders.length}
        itemSize={200}
        width="100%"
      >
        {Row}
      </List>

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

      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white shadow-md rounded p-4 max-w-lg w-full">
            <h2 className="text-xl font-semibold">Order Details</h2>
            <p><strong>Order ID:</strong> {selectedOrder._id}</p>
            <p><strong>Sender Name:</strong> {selectedOrder.sender.name}</p>
            <p><strong>Receiver Name:</strong> {selectedOrder.receiver.name}</p>
            <p><strong>Address:</strong>
              <p>City: {selectedOrder.receiver.city}</p>
              <p>State: {selectedOrder.receiver.street}</p>
              <p>District: {selectedOrder.receiver.district}</p>
            </p>
            {/* Add more order details here as needed */}
            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-4 bg-red-500 text-white py-2 px-4 rounded"
            >
              Close
            </button>
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
