'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';

interface Customer {
    _id: string;
    contactName: string;
    email: string;
    phone: string;
    address: string;
}

const queryClient = new QueryClient();

const fetchCustomers = async (page: number, customersPerPage: number) => {
    const response = await axios.get('/api/admin/customers', {
        params: {
            page,
            limit: customersPerPage,
        },
        withCredentials: true, // Ensure cookies are sent with the request
    });
    return response.data;
};

const Customers = () => {
    const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const customersPerPage = 10;

    const { data, error, isLoading } = useQuery(
        ['customers', currentPage],
        () => fetchCustomers(currentPage, customersPerPage),
        { keepPreviousData: true }
    );

    const handleViewDetails = (customer: Customer) => {
        setSelectedCustomer(customer);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching customers</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Customers</h1>
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
                    {data.customers.map((customer: Customer) => (
                        <tr key={customer._id}>
                            <td className="py-2 px-4 border-b">{customer.contactName}</td>
                            <td className="py-2 px-4 border-b">{customer.email}</td>
                            <td className="py-2 px-4 border-b">{customer.phone}</td>
                            <td className="py-2 px-4 border-b">{customer.address}</td>
                            <td className="py-2 px-4 border-b">
                                <button
                                    onClick={() => handleViewDetails(customer)}
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
                    Page {currentPage} of {Math.ceil(data.totalCustomers / customersPerPage)}
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === Math.ceil(data.totalCustomers / customersPerPage)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                >
                    Next
                </button>
            </div>

            {selectedCustomer && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white shadow-md rounded p-4 max-w-lg w-full">
                        <h2 className="text-xl font-semibold">Customer Details</h2>
                        <p><strong>Name:</strong> {selectedCustomer.contactName}</p>
                        <p><strong>Email:</strong> {selectedCustomer.email}</p>
                        <p><strong>Phone:</strong> {selectedCustomer.phone}</p>
                        <p><strong>Address:</strong> {selectedCustomer.address}</p>
                        <button
                            onClick={() => setSelectedCustomer(null)}
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

const CustomersPage = () => (
    <QueryClientProvider client={queryClient}>
        <Customers />
    </QueryClientProvider>
);

export default CustomersPage;
