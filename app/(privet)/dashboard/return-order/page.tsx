"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ViewModal from '@/app/(components)/view/ViewModal';

interface Order {
    _id: string;
    sender: {
        name: string;
        phonePrefix: string;
        phone: string;
        address: string;
    };
    receiver: {
        name: string;
        phonePrefix: string;
        phone: string;
        country: string;
        city: string;
        street: string;
        district?: string;
        company?: string;
    };
    deliveryMethod: string;
    pickupAddress: string;
    payment: string;
    shippingMethod: string;
    estimatedFee?: string;
    status: string;
    createdAt: string;
    refundCalled: boolean;
    orderNumber: string;
    goodsList: Goods[];
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

const ReturnedOrders: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [viewOrder, setViewOrder] = useState<Order | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('/api/orders/returned');
                setOrders(response.data.orders);
            } catch (error) {
                setError('Failed to fetch returned orders');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    const handleRefundRequest = async (orderId: string) => {
        try {
            const response = await axios.put(`/api/orders/${orderId}/refund`);
            if (response.status === 200) {
                toast.success('Refund requested successfully');
                setOrders(prevOrders =>
                    prevOrders.map(order =>
                        order._id === orderId ? { ...order, refundCalled: true } : order
                    )
                );
            }
        } catch (error) {
            toast.error('Failed to request refund');
            console.error('Error requesting refund:', error);
        }
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Returned Orders</h2>
            {orders.length === 0 ? (
                <p>No returned orders found</p>
            ) : (
                <table className="min-w-full border-collapse border">
                    <thead>
                        <tr className="bg-blue-500 text-white">
                            <th className="py-2 px-4 border">Order ID</th>
                            <th className="py-2 px-4 border">Date</th>
                            <th className="py-2 px-4 border">Status</th>
                            <th className="py-2 px-4 border">Total</th>
                            <th className="py-2 px-4 border">Details</th>
                            <th className="py-2 px-4 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td className="py-2 px-4 border">{order.orderNumber}</td>
                                <td className="py-2 px-4 border">{new Date(order.createdAt).toLocaleDateString()}</td>
                                <td className="py-2 px-4 border uppercase">{order.status}</td>
                                <td className="py-2 px-4 border">{order.estimatedFee}</td>
                                <td className="py-2 px-4 border">
                                    <button
                                        className="bg-blue-500 text-white py-1 px-3 rounded"
                                        onClick={() => setViewOrder(order)}
                                    >
                                        View
                                    </button>
                                </td>
                                <td className="py-2 px-4 border">
                                    {order.status === 'returned' && !order.refundCalled && (
                                        <button
                                            className="bg-red-500 text-white py-1 px-3 rounded"
                                            onClick={() => handleRefundRequest(order._id)}
                                        >
                                            Ask For Refund
                                        </button>
                                    )}
                                    {order.refundCalled && <span className="text-green-500">Refund Requested</span>}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
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

export default ReturnedOrders;
