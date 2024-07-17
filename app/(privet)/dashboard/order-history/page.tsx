"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ViewModal from '@/app/(components)/view/ViewModal';

interface Order {
    _id: string;
    status: string;
    estimatedFee: string;
    createdAt: string;
    orderNumber: string;
    goodsList: Goods[];
    receiver: Receiver;
    [key: string]: any;
}

interface Goods {
    domesticWb: string;
    natureOfGoods: string;
    itemName: string;
    weight: string;
    declaredValue: string;
    count: string;
    imageUrl: string;
}

interface Receiver {
    name: string;
    phonePrefix: string;
    phone: string;
    country: string;
    city: string;
    street: string;
    district?: string;
    company?: string;
}

const OrderHistory: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [cancelOrderId, setCancelOrderId] = useState<string | null>(null);
    const [cancelReason, setCancelReason] = useState<string>('');
    const [viewOrder, setViewOrder] = useState<Order | null>(null);
    const [sortConfig, setSortConfig] = useState<{ key: string, direction: string } | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('/api/orders/history');
                setOrders(response.data.orders);
            } catch (error) {
                setError('Failed to fetch order history');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleCancelOrder = async (orderId: string) => {
        try {
            await axios.put(`/api/orders/${orderId}/cancel`, { reason: cancelReason });
            setOrders(orders.map(order => order._id === orderId ? { ...order, status: 'canceled' } : order));
            setCancelOrderId(null);
            setCancelReason('');
        } catch (error) {
            setError('Failed to cancel order');
        }
    };

    const handleSort = (key: string) => {
        let direction = 'ascending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    const sortedOrders = React.useMemo(() => {
        let sortableOrders = [...orders];
        if (sortConfig !== null) {
            sortableOrders.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableOrders;
    }, [orders, sortConfig]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Order History</h2>
            {orders.length === 0 ? (
                <p>No orders found</p>
            ) : (
                <table className="min-w-full border-collapse border">
                    <thead>
                        <tr className="bg-blue-500 text-white">
                            <th className="py-2 px-4 border cursor-pointer" onClick={() => handleSort('orderNumber')}>Order ID</th>
                            <th className="py-2 px-4 border cursor-pointer" onClick={() => handleSort('createdAt')}>Date</th>
                            <th className="py-2 px-4 border cursor-pointer" onClick={() => handleSort('status')}>Status</th>
                            <th className="py-2 px-4 border cursor-pointer" onClick={() => handleSort('estimatedFee')}>Total</th>
                            <th className="py-2 px-4 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedOrders.map(order => (
                            <tr key={order._id}>
                                <td className="py-2 px-4 border">{order.orderNumber}</td>
                                <td className="py-2 px-4 border">{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td className="py-2 px-4 border uppercase">{order.status}</td>
                                <td className="py-2 px-4 border">{order.estimatedFee}</td>
                                <td className="py-2 px-4 border">
                                    {order.status === 'pending' && (
                                        <button
                                            className="bg-red-500 text-white py-1 px-3 rounded mr-2"
                                            onClick={() => setCancelOrderId(order._id)}
                                        >
                                            Cancel
                                        </button>
                                    )}
                                    <button
                                        className="bg-blue-500 text-white py-1 px-3 rounded"
                                        onClick={() => setViewOrder(order)}
                                    >
                                        View
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {cancelOrderId && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-4 rounded shadow-md">
                        <h2 className="text-xl font-bold mb-4">Cancel Order</h2>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Reason for cancellation (optional)
                        </label>
                        <textarea
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-4"
                            value={cancelReason}
                            onChange={(e) => setCancelReason(e.target.value)}
                        />
                        <div className="text-right">
                            <button
                                className="bg-gray-500 text-white py-1 px-3 rounded mr-2"
                                onClick={() => setCancelOrderId(null)}
                            >
                                Close
                            </button>
                            <button
                                className="bg-red-500 text-white py-1 px-3 rounded"
                                onClick={() => handleCancelOrder(cancelOrderId)}
                            >
                                Cancel Order
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {viewOrder && (
                <ViewModal
                    isOpen={!!viewOrder}
                    onRequestClose={() => setViewOrder(null)}
                    goodsList={viewOrder.goodsList}
                    receiver={viewOrder.receiver}
                />
            )}
        </div>
    );
};

export default OrderHistory;
