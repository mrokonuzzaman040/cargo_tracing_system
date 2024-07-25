"use client";
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddPhonePrefix: React.FC = () => {
    const [country, setCountry] = useState('');
    const [code, setCode] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/admin/settings/phone-prefixes', { country, code });
            if (response.status === 201) {
                toast.success('Phone prefix added successfully');
                setCountry('');
                setCode('');
            }
        } catch (error) {
            console.error('Error adding phone prefix:', error);
            toast.error('Failed to add phone prefix');
        }
    };

    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl font-bold mb-6">Add Phone Prefix</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Country</label>
                    <input
                        type="text"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Code</label>
                    <input
                        type="text"
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    />
                </div>
                <div className="text-right">
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                        Add Phone Prefix
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddPhonePrefix;
