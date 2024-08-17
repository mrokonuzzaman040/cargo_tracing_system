"use client";
import React, { useState } from 'react';
import axios from 'axios';

const TrackOrder: React.FC = () => {
    const [orderNumber, setOrderNumber] = useState('');
    const [orderStatus, setOrderStatus] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleTrackOrder = async () => {
        setLoading(true);
        setError(null);
        setOrderStatus(null);

        try {
            const response = await axios.get(`/api/orders/track/${orderNumber}`);
            setOrderStatus(response.data.status);
        } catch (error) {
            setError('Order Number not found');
        } finally {
            setLoading(false);
        }
    };

    const renderStatus = () => {
        const statuses = ['pending', 'pick-up', 'on-the-way', 'delivered'];
        const statusIndex = statuses.indexOf(orderStatus || '');

        return (
            <div className="mt-4">
                <h3 className="text-xl font-semibold">Order Status</h3>
                <ul className="mt-2 uppercase">
                    {statuses.map((status, index) => {
                        let statusClass = 'text-gray-400';
                        if (index < statusIndex) {
                            statusClass = 'text-blue-500 font-bold';
                        } else if (index === statusIndex) {
                            statusClass = 'text-green-500 font-bold underline';
                        }
                        return (
                            <li key={status} className={`py-2 ${statusClass}`}>
                                {status.replace(/-/g, ' ')} {status === 'delivered' && index === statusIndex && <span>&#10003;</span>}
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    };

    return (
        <div className="max-w-md mx-auto my-8">
            <h2 className="text-2xl font-bold mb-6">Track Order</h2>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="orderNumber">
                    Order Number
                </label>
                <input
                    type="text"
                    id="orderNumber"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
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
            {orderStatus && renderStatus()}
        </div>
    );
};

export default TrackOrder;
