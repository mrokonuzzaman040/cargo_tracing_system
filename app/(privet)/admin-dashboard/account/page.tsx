'use client';

import React, { useState, useMemo } from 'react';
import axios from 'axios';
import { useQuery, QueryClient, QueryClientProvider } from 'react-query';
import { Bar, Line, Doughnut } from 'react-chartjs-2';
import 'chart.js/auto';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface Payment {
    date: string;
    amount: number;
    method: string;
}

interface Account {
    _id: string;
    balance: number;
    profit: number;
    loss: number;
    payments: Payment[];
}

const queryClient = new QueryClient();

const fetchAccountData = async (page: number, accountsPerPage: number, startDate: Date, endDate: Date) => {
    const response = await axios.get('/api/admin/account', {
        params: {
            page,
            limit: accountsPerPage,
            startDate: startDate.toISOString(),
            endDate: endDate.toISOString(),
        },
        withCredentials: true,
    });
    return response.data;
};

const AccountPage = () => {
    const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const accountsPerPage = 10;
    const [startDate, setStartDate] = useState<Date>(new Date());
    const [endDate, setEndDate] = useState<Date>(new Date());

    const { data, error, isLoading } = useQuery(
        ['accountData', currentPage, startDate, endDate],
        () => fetchAccountData(currentPage, accountsPerPage, startDate, endDate),
        { keepPreviousData: true }
    );

    const handleViewDetails = (account: Account) => {
        setSelectedAccount(account);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const balanceData = useMemo(() => {
        return {
            labels: data ? data.accounts.map((account: Account) => account._id) : [],
            datasets: [
                {
                    label: 'Balance',
                    data: data ? data.accounts.map((account: Account) => account.balance) : [],
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
            ],
        };
    }, [data]);

    const profitLossData = useMemo(() => {
        return {
            labels: data ? data.accounts.map((account: Account) => account._id) : [],
            datasets: [
                {
                    label: 'Profit',
                    data: data ? data.accounts.map((account: Account) => account.profit) : [],
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    borderWidth: 1,
                },
                {
                    label: 'Loss',
                    data: data ? data.accounts.map((account: Account) => account.loss) : [],
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 1,
                },
            ],
        };
    }, [data]);

    const paymentData = useMemo(() => {
        if (!selectedAccount) return { labels: [], datasets: [] };

        return {
            labels: selectedAccount.payments.map(payment => new Date(payment.date).toLocaleDateString()),
            datasets: [
                {
                    label: 'Payments',
                    data: selectedAccount.payments.map(payment => payment.amount),
                    backgroundColor: 'rgba(153, 102, 255, 0.2)',
                    borderColor: 'rgba(153, 102, 255, 1)',
                    borderWidth: 1,
                },
            ],
        };
    }, [selectedAccount]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error fetching account data</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Account Management</h1>

            <div className="mb-4 flex space-x-4">
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        Start Date
                    </label>
                    <DatePicker
                        selected={startDate}
                        onChange={(date: Date | null) => setStartDate(date!)}
                        dateFormat="yyyy-MM-dd"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div>
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                        End Date
                    </label>
                    <DatePicker
                        selected={endDate}
                        onChange={(date: Date | null) => setEndDate(date!)}
                        dateFormat="yyyy-MM-dd"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {data.accounts.map((account: Account) => (
                    <div key={account._id} className="bg-white shadow-md rounded p-4">
                        <h2 className="text-xl font-semibold">Account ID: {account._id}</h2>
                        <p><strong>Balance:</strong> ${account.balance.toFixed(2)}</p>
                        <p><strong>Profit:</strong> ${account.profit.toFixed(2)}</p>
                        <p><strong>Loss:</strong> ${account.loss.toFixed(2)}</p>
                        <button
                            onClick={() => handleViewDetails(account)}
                            className="mt-2 bg-blue-500 text-white py-2 px-4 rounded"
                        >
                            View Details
                        </button>
                    </div>
                ))}
            </div>

            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Balance Overview</h2>
                <Bar data={balanceData} />
            </div>
            <div className="mt-8">
                <h2 className="text-xl font-semibold mb-4">Profit & Loss Overview</h2>
                <Line data={profitLossData} />
            </div>

            {selectedAccount && (
                <div className="mt-8">
                    <h2 className="text-xl font-semibold mb-4">Payments Overview</h2>
                    <Doughnut data={paymentData} />
                </div>
            )}

            <div className="flex justify-between items-center mt-4">
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                >
                    Previous
                </button>
                <span>
                    Page {currentPage} of {Math.ceil(data.totalAccounts / accountsPerPage)}
                </span>
                <button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === Math.ceil(data.totalAccounts / accountsPerPage)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded"
                >
                    Next
                </button>
            </div>

            {selectedAccount && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="bg-white shadow-md rounded p-4 max-w-lg w-full">
                        <h2 className="text-xl font-semibold">Account Details</h2>
                        <p><strong>Balance:</strong> ${selectedAccount.balance.toFixed(2)}</p>
                        <p><strong>Profit:</strong> ${selectedAccount.profit.toFixed(2)}</p>
                        <p><strong>Loss:</strong> ${selectedAccount.loss.toFixed(2)}</p>
                        <h3 className="text-lg font-semibold mt-4">Payments</h3>
                        <ul>
                            {selectedAccount.payments.map((payment, index) => (
                                <li key={index}>
                                    <p><strong>Date:</strong> {new Date(payment.date).toLocaleDateString()}</p>
                                    <p><strong>Amount:</strong> ${payment.amount.toFixed(2)}</p>
                                    <p><strong>Method:</strong> {payment.method}</p>
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={() => setSelectedAccount(null)}
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

const AccountManagementPage = () => (
    <QueryClientProvider client={queryClient}>
        <AccountPage />
    </QueryClientProvider>
);

export default AccountManagementPage;
