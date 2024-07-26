"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation'; // Correct useRouter import for Next.js 13
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ConfirmationModal from '@/app/(components)/admin/ConfirmationModal';

interface ShippingRate {
    _id: string;
    country: string;
    city: string;
    ratePerKg: number;
}

const AddShippingRate: React.FC = () => {
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [ratePerKg, setRatePerKg] = useState('');
    const [shippingRates, setShippingRates] = useState<ShippingRate[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [editingRateId, setEditingRateId] = useState<string | null>(null);
    const [message, setMessage] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [rateIdToDelete, setRateIdToDelete] = useState<string | null>(null);
    const router = useRouter();

    const fetchShippingRates = async (page: number) => {
        try {
            const response = await fetch(`/api/admin/settings/shipping-rates?page=${page}&limit=10`);
            const data = await response.json();
            setShippingRates(data.shippingRates);
            setTotalPages(data.pagination.pages);
        } catch (error) {
            console.error('Error fetching shipping rates:', error);
            toast.error('Failed to fetch shipping rates');
        }
    };

    useEffect(() => {
        fetchShippingRates(currentPage);
    }, [currentPage]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(editingRateId ? `/api/admin/settings/shipping-rates/${editingRateId}` : '/api/admin/settings/shipping-rates', {
                method: editingRateId ? 'PUT' : 'POST',
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
                toast.success(`Shipping rate ${editingRateId ? 'updated' : 'added'} successfully!`);
                setCountry('');
                setCity('');
                setRatePerKg('');
                setEditingRateId(null);
                fetchShippingRates(currentPage); // Refresh the table after adding or updating
            } else {
                setMessage(`Error: ${data.message}`);
            }
        } catch (error) {
            console.error(`Error ${editingRateId ? 'updating' : 'adding'} shipping rate:`, error);
            toast.error(`Failed to ${editingRateId ? 'update' : 'add'} shipping rate`);
        }
    };

    const handleEdit = (rate: ShippingRate) => {
        setCountry(rate.country);
        setCity(rate.city);
        setRatePerKg(rate.ratePerKg.toString());
        setEditingRateId(rate._id);
    };

    const confirmDelete = (id: string) => {
        setIsModalOpen(true);
        setRateIdToDelete(id);
    };

    const handleDelete = async () => {
        if (!rateIdToDelete) return;

        try {
            const response = await fetch(`/api/admin/settings/shipping-rates/${rateIdToDelete}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                toast.success('Shipping rate deleted successfully!');
                fetchShippingRates(currentPage);
            } else {
                toast.error('Failed to delete shipping rate');
            }
        } catch (error) {
            console.error('Error deleting shipping rate:', error);
            toast.error('Failed to delete shipping rate');
        } finally {
            setIsModalOpen(false);
            setRateIdToDelete(null);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Add Shipping Rate</h1>

            {message && <p className="mb-4 text-red-500">{message}</p>}

            <form onSubmit={handleSubmit} className="space-y-6 mb-6">
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
                    {editingRateId ? 'Update Shipping Rate' : 'Add Shipping Rate'}
                </button>
            </form>

            <h2 className="text-2xl font-bold mb-4">Shipping Rates</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">Country</th>
                            <th className="px-4 py-2 border">City</th>
                            <th className="px-4 py-2 border">Rate per Kg</th>
                            <th className="px-4 py-2 border">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {shippingRates.map((rate) => (
                            <tr key={rate._id}>
                                <td className="px-4 py-2 border">{rate.country}</td>
                                <td className="px-4 py-2 border">{rate.city}</td>
                                <td className="px-4 py-2 border">{rate.ratePerKg}</td>
                                <td className="px-4 py-2 border">
                                    <button
                                        className="bg-green-500 text-white px-3 py-1 rounded mr-2"
                                        onClick={() => handleEdit(rate)}
                                    >
                                        Update
                                    </button>
                                    <button
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                        onClick={() => confirmDelete(rate._id)}
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-between mt-4">
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span className="text-gray-700">
                    Page {currentPage} of {totalPages}
                </span>
                <button
                    className="px-4 py-2 bg-blue-500 text-white rounded"
                    onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>

            <ConfirmationModal
                isOpen={isModalOpen}
                message="Are you sure you want to delete this shipping rate?"
                onConfirm={handleDelete}
                onCancel={() => setIsModalOpen(false)}
            />
        </div>
    );
};

export default AddShippingRate;
