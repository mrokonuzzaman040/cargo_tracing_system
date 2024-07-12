'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';

interface DeliveryMan {
    _id: string;
    contactName: string;
    email: string;
    phone: string;
    address: string;
}

const queryClient = new QueryClient();

const fetchDeliveryMen = async (page: number, deliveryMenPerPage: number) => {
    const response = await axios.get('/api/admin/delivery-men', {
        params: {
            page,
            limit: deliveryMenPerPage,
        },
        withCredentials: true, // Ensure cookies are sent with the request
    });
    return response.data;
};

const DeliveryMen = () => {
    const [selectedDeliveryMan, setSelectedDeliveryMan] = useState<DeliveryMan | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const deliveryMenPerPage = 10;

    const { data, error, isLoading } = useQuery(
        ['deliveryMen', currentPage],
        () => fetchDeliveryMen(currentPage, deliveryMenPerPage),
        { keepPreviousData: true }
    );

    const handleViewDetails = (deliveryMan: DeliveryMan) => {
        setSelectedDeliveryMan(deliveryMan);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching delivery personnel</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Delivery Personnel</h1>
            <table className="min-w-full bg-white border border-gray-200">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Email</th>
                        <th className="py-2 px-4 border-b">Phone</th>
                        <th className="py-2 px-4 border-b">Address</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data.deliveryMen.map((deliveryMan: DeliveryMan) => (
                        <tr key={deliveryMan._id}>
                            <td className="py-2 px-4 border-b">{deliveryMan.contactName}</td>
                            <td className="py-2 px-4 border-b">{deliveryMan.email}</td>
                            <td className="py-2 px-4 border-b">{deliveryMan.phone}</td>
                            <td className="py-2 px-4 border-b">{deliveryMan.address}</td>
                            <td className="py-2 px-4 border-b">
                                <button
                                    onClick={() => handleViewDetails(deliveryMan)}
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
                    Page {currentPage} of {Math.ceil(data.totalDeliveryMen / deliveryMenPerPage)}
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === Math.ceil(data.totalDeliveryMen / deliveryMenPerPage)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                >
                    Next
                </button>
            </div>

            {selectedDeliveryMan && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white shadow-md rounded p-4 max-w-lg w-full">
                        <h2 className="text-xl font-semibold">Delivery Person Details</h2>
                        <p><strong>Name:</strong> {selectedDeliveryMan.contactName}</p>
                        <p><strong>Email:</strong> {selectedDeliveryMan.email}</p>
                        <p><strong>Phone:</strong> {selectedDeliveryMan.phone}</p>
                        <p><strong>Address:</strong> {selectedDeliveryMan.address}</p>
                        <button
                            onClick={() => setSelectedDeliveryMan(null)}
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

const DeliveryMenPage = () => (
    <QueryClientProvider client={queryClient}>
        <DeliveryMen />
    </QueryClientProvider>
);

export default DeliveryMenPage;
