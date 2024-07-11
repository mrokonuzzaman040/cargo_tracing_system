"use client";
import React, { useState } from 'react';
import axios from 'axios';

const TrackOrder: React.FC = () => {
    const [orderId, setOrderId] = useState('');
    const [orderStatus, setOrderStatus] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleTrackOrder = async () => {
        setLoading(true);
        setError(null);
        setOrderStatus(null);

        try {
            const response = await axios.get(`/api/orders/track/${orderId}`);
            setOrderStatus(response.data.status);
        } catch (error) {
            setError('Failed to fetch order status');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto my-8">
            <h2 className="text-2xl font-bold mb-6">Track Order</h2>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="orderId">
                    Order ID
                </label>
                <input
                    type="text"
                    id="orderId"
                    value={orderId}
                    onChange={(e) => setOrderId(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <button
                onClick={handleTrackOrder}
                className="bg-blue-500 text-white py-2 px-4 rounded"
                disabled={loading}
            >
                Track Order
            </button>

            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">{error}</p>}
            {orderStatus && (
                <div className="mt-4">
                    <h3 className="text-xl font-semibold">Order Status</h3>
                    <p>{orderStatus}</p>
                </div>
            )}
        </div>
    );
};

export default TrackOrder;
