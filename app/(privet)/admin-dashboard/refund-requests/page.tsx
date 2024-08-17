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

const fetchRefundRequests = async (page: number, ordersPerPage: number) => {
    const response = await axios.get('/api/admin/refunds', {
        params: {
            page,
            limit: ordersPerPage,
        },
        withCredentials: true, // Ensure cookies are sent with the request
    });
    return response.data;
};

const RefundRequests = () => {
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const ordersPerPage = 10;

    const { data, error, isLoading } = useQuery(
        ['refundRequests', currentPage],
        () => fetchRefundRequests(currentPage, ordersPerPage),
        { keepPreviousData: true }
    );

    const handleViewDetails = (order: Order) => {
        setSelectedOrder(order);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching refund requests</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Refund Requests</h1>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Order ID</th>
                        <th className="py-2 px-4 border-b">Created At</th>
                        <th className="py-2 px-4 border-b">Sender</th>
                        <th className="py-2 px-4 border-b">Receiver</th>
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
                                <button
                                    onClick={() => handleViewDetails(order)}
                                    className="bg-blue-500 text-white py-1 px-2 rounded"
                                >
                                    View Details
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

            {selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white shadow-md rounded p-4 max-w-lg w-full">
                        <h2 className="text-xl font-semibold">Order Details</h2>
                        <p><strong>Order ID:</strong> {selectedOrder.orderId}</p>
                        <p><strong>Sender Name:</strong> {selectedOrder.sender.name}</p>
                        <p><strong>Receiver Name:</strong> {selectedOrder.receiver.name}</p>
                        <p><strong>Address:</strong>
                            <p>City: {selectedOrder.receiver.city}</p>
                            <p>Street: {selectedOrder.receiver.street}</p>
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

const RefundRequestsPage = () => (
    <QueryClientProvider client={queryClient}>
        <RefundRequests />
    </QueryClientProvider>
);

export default RefundRequestsPage;
