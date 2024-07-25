"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation'; // Correct useRouter import for Next.js 13

const AddShippingRate: React.FC = () => {
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [ratePerKg, setRatePerKg] = useState('');
    const [message, setMessage] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const response = await fetch('/api/admin/settings/shipping-rates', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                country,
                city,
                ratePerKg: parseFloat(ratePerKg),
            }),
        });

        const data = await response.json();

        if (response.ok) {
            setMessage('Shipping rate added successfully!');
            setCountry('');
            setCity('');
            setRatePerKg('');
            router.push('/admin-dashboard/settings/shipping-rates'); // Redirect to the shipping rates list or any other page
        } else {
            setMessage(`Error: ${data.message}`);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Add Shipping Rate</h1>

            {message && <p className="mb-4 text-red-500">{message}</p>}

            <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Country
                    </label>
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        City
                    </label>
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Rate per Kg
                    </label>
                    <input
                        type="number"
                        step="0.01"
                        value={ratePerKg}
                        onChange={(e) => setRatePerKg(e.target.value)}
                        required
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    Add Shipping Rate
                </button>
            </form>
        </div>
    );
};

export default AddShippingRate;
