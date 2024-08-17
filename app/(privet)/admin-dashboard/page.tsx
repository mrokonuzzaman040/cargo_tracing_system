'use client';

import React, { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { Bar, Line } from 'react-chartjs-2';
import 'chart.js/auto';
import dayjs from 'dayjs';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const AdminDashboard = () => {
    const [dashboardData, setDashboardData] = useState({
        completedCount: 0,
        returnedCount: 0,
        pendingCount: 0,
        refundCount: 0,
        paidCount: 0,
    });
    const [orderStats, setOrderStats] = useState<{ _id: string; count: number }[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [interval, setInterval] = useState('day');
    const [startDate, setStartDate] = useState(dayjs().subtract(30, 'day').toDate());
    const [endDate, setEndDate] = useState(new Date());

    useEffect(() => {
        const fetchDashboardData = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/api/admin/dashboard');
                setDashboardData(response.data);
            } catch (err) {
                setError('Error fetching dashboard data');
                console.error('Error fetching dashboard data:', err);
            } finally {
                setLoading(false);
            }
        };

        const fetchOrderStats = async () => {
            setLoading(true);
            try {
                const response = await axios.get('/api/admin/order-stats', {
                    params: {
                        startDate: startDate.toISOString(),
                        endDate: endDate.toISOString(),
                        interval
                    }
                });
                setOrderStats(response.data.stats);
            } catch (err) {
                setError('Error fetching order stats');
                console.error('Error fetching order stats:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchDashboardData();
        fetchOrderStats();
    }, [startDate, endDate, interval]);

    const dashboardChartData = useMemo(() => ({
        labels: ['Completed', 'Returned', 'Pending', 'Refund', 'Paid'],
        datasets: [
            {
                label: 'Orders',
                data: [
                    dashboardData.completedCount,
                    dashboardData.returnedCount,
                    dashboardData.pendingCount,
                    dashboardData.refundCount,
                    dashboardData.paidCount,
                ],
                backgroundColor: [
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(75, 192, 192, 1)',
                    'rgba(255, 99, 132, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    }), [dashboardData]);

    const orderStatsChartData = useMemo(() => ({
        labels: orderStats.map(stat => stat._id),
        datasets: [
            {
                label: 'Number of Orders',
                data: orderStats.map(stat => stat.count),
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
                fill: false,
                tension: 0.1,
            },
        ],
    }), [orderStats]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white shadow-md rounded p-4">
                    <h2 className="text-xl font-semibold">Completed Orders</h2>
                    <p className="text-2xl">{dashboardData.completedCount}</p>
                </div>
                <div className="bg-white shadow-md rounded p-4">
                    <h2 className="text-xl font-semibold">Returned Orders</h2>
                    <p className="text-2xl">{dashboardData.returnedCount}</p>
                </div>
                <div className="bg-white shadow-md rounded p-4">
                    <h2 className="text-xl font-semibold">Pending Orders</h2>
                    <p className="text-2xl">{dashboardData.pendingCount}</p>
                </div>
                <div className="bg-white shadow-md rounded p-4">
                    <h2 className="text-xl font-semibold">Refund Orders</h2>
                    <p className="text-2xl">{dashboardData.refundCount}</p>
                </div>
                <div className="bg-white shadow-md rounded p-4">
                    <h2 className="text-xl font-semibold">Paid Orders</h2>
                    <p className="text-2xl">{dashboardData.paidCount}</p>
                </div>
            </div>
            <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-4 items-end">
                <div>
                    <h2 className="text-xl font-semibold mb-4">Orders Overview</h2>
                    <div className="px-4 py-2 mb-14"></div>
                    <Bar data={dashboardChartData} />
                </div>
                <div>
                    <h2 className="text-xl font-semibold mb-4">Order Stats</h2>
                    <div className="flex space-x-4 mb-4">
                        <button
                            onClick={() => setInterval('day')}
                            className={`px-4 py-2 rounded ${interval === 'day' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        >
                            Day
                        </button>
                        <button
                            onClick={() => setInterval('week')}
                            className={`px-4 py-2 rounded ${interval === 'week' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        >
                            Week
                        </button>
                        <button
                            onClick={() => setInterval('month')}
                            className={`px-4 py-2 rounded ${interval === 'month' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        >
                            Month
                        </button>
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
                    <Line data={orderStatsChartData} />
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
