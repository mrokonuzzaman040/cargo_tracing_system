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
    const [editable, setEditable] = useState(false);
    const [updatedUserInfo, setUpdatedUserInfo] = useState<UserInfo | null>(null);

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                const token = Cookies.get('token');

                // if (!token) {
                //     setError('No token found');
                //     setLoading(false);
                //     return;
                // }

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
                    setUpdatedUserInfo(data.user);
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

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        if (updatedUserInfo) {
            setUpdatedUserInfo({ ...updatedUserInfo, [name]: value });
        }
    };

    const handleSave = async () => {
        if (!updatedUserInfo) return;

        setLoading(true);

        try {
            const token = Cookies.get('token');
            if (!token) {
                setError('No token found');
                setLoading(false);
                return;
            }

            const response = await fetch('/api/user/update', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(updatedUserInfo),
            });

            const data = await response.json();

            if (response.ok) {
                setUserInfo(updatedUserInfo);
                setEditable(false);
                setError('');
            } else {
                setError(data.message);
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard - YoU are admin</h1>
            {userInfo ? (
                <div className="bg-white p-4 rounded shadow-md">
                    <h2 className="text-xl font-semibold mb-2">User Info</h2>
                    {['name', 'phone', 'address', 'memberNo', 'accountType', 'contactEmail'].map((field) => (
                        <div key={field} className="mb-2">
                            <label className="font-semibold capitalize">{field.replace(/([A-Z])/g, ' $1')}:</label>
                            <input
                                type="text"
                                name={field}
                                value={updatedUserInfo ? updatedUserInfo[field as keyof UserInfo] : ''}
                                readOnly={!editable}
                                onChange={handleInputChange}
                                className={`w-full p-2 border rounded mt-1 ${editable ? 'bg-gray-100' : 'bg-white'}`}
                            />
                        </div>
                    ))}
                    {editable ? (
                        <button
                            onClick={handleSave}
                            className="w-full py-2 px-4 bg-indigo-500 text-white rounded hover:bg-indigo-600 mt-4"
                        >
                            Save
                        </button>
                    ) : (
                        <button
                            onClick={() => setEditable(true)}
                            className="w-full py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600 mt-4"
                        >
                            Edit
                        </button>
                    )}
                </div>
            ) : (
                <p>User info not available.</p>
            )}
        </div>
    );
};

export default Dashboard;
