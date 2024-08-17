'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ConfigurationSettings: React.FC = () => {
    const [pickupAddresses, setPickupAddresses] = useState<string[]>([]);
    const [shippingMethods, setShippingMethods] = useState<string[]>([]);
    const [paymentGateways, setPaymentGateways] = useState<string[]>([]);
    const [newPickupAddress, setNewPickupAddress] = useState('');
    const [newShippingMethod, setNewShippingMethod] = useState('');
    const [newPaymentGateway, setNewPaymentGateway] = useState('');

    useEffect(() => {
        const fetchConfigurations = async () => {
            const [pickupResponse, shippingResponse, paymentResponse] = await Promise.all([
                axios.get('/api/admin/settings/pickup-address'),
                axios.get('/api/admin/settings/shipping-method'),
                axios.get('/api/admin/settings/payment-gateway'),
            ]);
            setPickupAddresses(pickupResponse.data);
            setShippingMethods(shippingResponse.data);
            setPaymentGateways(paymentResponse.data);
        };

        fetchConfigurations();
    }, []);

    const handleAddPickupAddress = async () => {
        try {
            await axios.post('/api/admin/settings/pickup-address', { address: newPickupAddress });
            setPickupAddresses([...pickupAddresses, newPickupAddress]);
            setNewPickupAddress('');
            alert('Pickup address added successfully');
        } catch (error) {
            console.error('Error adding pickup address:', error);
            alert('Failed to add pickup address');
        }
    };

    const handleAddShippingMethod = async () => {
        try {
            await axios.post('/api/admin/settings/shipping-method', { method: newShippingMethod });
            setShippingMethods([...shippingMethods, newShippingMethod]);
            setNewShippingMethod('');
            alert('Shipping method added successfully');
        } catch (error) {
            console.error('Error adding shipping method:', error);
            alert('Failed to add shipping method');
        }
    };

    const handleAddPaymentGateway = async () => {
        try {
            await axios.post('/api/admin/settings/payment-gateway', { gateway: newPaymentGateway });
            setPaymentGateways([...paymentGateways, newPaymentGateway]);
            setNewPaymentGateway('');
            alert('Payment gateway added successfully');
        } catch (error) {
            console.error('Error adding payment gateway:', error);
            alert('Failed to add payment gateway');
        }
    };

    return (
        <div>
            <h3 className="text-xl font-semibold mb-4">Configuration</h3>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Add Pickup Address</label>
                <input
                    type="text"
                    value={newPickupAddress}
                    onChange={(e) => setNewPickupAddress(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <button onClick={handleAddPickupAddress} className="bg-blue-500 text-white py-2 px-4 rounded mt-2">Add Pickup Address</button>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Add Shipping Method</label>
                <input
                    type="text"
                    value={newShippingMethod}
                    onChange={(e) => setNewShippingMethod(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <button onClick={handleAddShippingMethod} className="bg-blue-500 text-white py-2 px-4 rounded mt-2">Add Shipping Method</button>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Add Payment Gateway</label>
                <input
                    type="text"
                    value={newPaymentGateway}
                    onChange={(e) => setNewPaymentGateway(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <button onClick={handleAddPaymentGateway} className="bg-blue-500 text-white py-2 px-4 rounded mt-2">Add Payment Gateway</button>
            </div>
            <div>
                <h4 className="text-lg font-semibold mb-2">Existing Configurations</h4>
                <h5 className="text-md font-semibold">Pickup Addresses</h5>
                <ul>
                    {pickupAddresses.map((address) => (
                        <li key={address}>{address}</li>
                    ))}
                </ul>
                <h5 className="text-md font-semibold">Shipping Methods</h5>
                <ul>
                    {shippingMethods.map((method) => (
                        <li key={method}>{method}</li>
                    ))}
                </ul>
                <h5 className="text-md font-semibold">Payment Gateways</h5>
                <ul>
                    {paymentGateways.map((gateway) => (
                        <li key={gateway}>{gateway}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ConfigurationSettings;
