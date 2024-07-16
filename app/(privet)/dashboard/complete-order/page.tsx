"use client";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
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

const DeliveredOrders: React.FC = () => {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [viewOrder, setViewOrder] = useState<Order | null>(null);

    useEffect(() => {
        const fetchOrders = async () => {
            try {
                const response = await axios.get('/api/orders/delivered');
                setOrders(response.data.orders);
            } catch (error) {
                setError('Failed to fetch delivered orders');
            } finally {
                setLoading(false);
            }
        };

        fetchOrders();
    }, []);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">Delivered Orders</h2>
            {orders.length === 0 ? (
                <p>No delivered orders found</p>
            ) : (
                <table className="min-w-full border-collapse border">
                    <thead>
                        <tr className="bg-blue-500 text-white">
                            <th className="py-2 px-4 border cursor-pointer">Order ID</th>
                            <th className="py-2 px-4 border cursor-pointer">Date</th>
                            <th className="py-2 px-4 border cursor-pointer">Status</th>
                            <th className="py-2 px-4 border cursor-pointer">Total</th>
                            <th className="py-2 px-4 border">Details</th>
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

export default DeliveredOrders;
