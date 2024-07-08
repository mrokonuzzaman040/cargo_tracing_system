'use client';

import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

interface UserInfo {
    name: string;
    phone: string;
    address: string;
    memberNo: string;
    accountType: string;
    contactEmail: string;
}

const Dashboard = () => {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = Cookies.get('token');
                if (!token) {
                    setError('No token found');
                    setLoading(false);
                    return;
                }

                const response = await fetch('/api/user/info', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`,
                    },
                });

                const data = await response.json();

                if (response.ok) {
                    setUserInfo(data.user);
                } else {
                    setError(data.message);
                }
            } catch (err) {
                setError('An error occurred. Please try again.');
            } finally {
                setLoading(false);
            }
        };

        fetchUserInfo();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            {userInfo ? (
                <div className="bg-white p-4 rounded shadow-md">
                    <h2 className="text-xl font-semibold mb-2">User Info</h2>
                    <div className="mb-2">
                        <label className="font-semibold">Name:</label>
                        <input
                            type="text"
                            value={userInfo.name}
                            readOnly
                            className="w-full p-2 border rounded mt-1"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="font-semibold">Phone:</label>
                        <input
                            type="text"
                            value={userInfo.phone}
                            readOnly
                            className="w-full p-2 border rounded mt-1"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="font-semibold">Address:</label>
                        <input
                            type="text"
                            value={userInfo.address}
                            readOnly
                            className="w-full p-2 border rounded mt-1"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="font-semibold">Member No:</label>
                        <input
                            type="text"
                            value={userInfo.memberNo}
                            readOnly
                            className="w-full p-2 border rounded mt-1"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="font-semibold">Account Type:</label>
                        <input
                            type="text"
                            value={userInfo.accountType}
                            readOnly
                            className="w-full p-2 border rounded mt-1"
                        />
                    </div>
                    <div className="mb-2">
                        <label className="font-semibold">Contact Email:</label>
                        <input
                            type="text"
                            value={userInfo.contactEmail}
                            readOnly
                            className="w-full p-2 border rounded mt-1"
                        />
                    </div>
                </div>
            ) : (
                <p>User info not available.</p>
            )}
        </div>
    );
};

export default Dashboard;
