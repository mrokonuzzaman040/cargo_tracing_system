"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddPhonePrefix: React.FC = () => {
    const [country, setCountry] = useState('');
    const [code, setCode] = useState('');
    const [phonePrefixes, setPhonePrefixes] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        fetchPhonePrefixes(currentPage);
    }, [currentPage]);

    const fetchPhonePrefixes = async (page: number) => {
        try {
            const response = await axios.get(`/api/admin/settings/phone-prefixes?page=${page}&limit=${itemsPerPage}`);
            setPhonePrefixes(response.data.phonePrefixes);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching phone prefixes:', error);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = isEditing
                ? await axios.put(`/api/admin/settings/phone-prefixes/${editId}`, { country, code })
                : await axios.post('/api/admin/settings/phone-prefixes', { country, code });

            if (response.status === 201 || response.status === 200) {
                toast.success(`Phone prefix ${isEditing ? 'updated' : 'added'} successfully`);
                setCountry('');
                setCode('');
                setIsEditing(false);
                setEditId('');
                fetchPhonePrefixes(currentPage);
            }
        } catch (error) {
            console.error(`Error ${isEditing ? 'updating' : 'adding'} phone prefix:`, error);
            toast.error(`Failed to ${isEditing ? 'update' : 'add'} phone prefix`);
        }
    };

    const handleEdit = (id: string, country: string, code: string) => {
        setCountry(country);
        setCode(code);
        setIsEditing(true);
        setEditId(id);
    };

    const handleDelete = async (id: string) => {
        try {
            const response = await axios.delete(`/api/admin/settings/phone-prefixes/${id}`);
            if (response.status === 200) {
                toast.success('Phone prefix deleted successfully');
                fetchPhonePrefixes(currentPage);
            }
        } catch (error) {
            console.error('Error deleting phone prefix:', error);
            toast.error('Failed to delete phone prefix');
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl font-bold mb-6">{isEditing ? 'Edit Phone Prefix' : 'Add Phone Prefix'}</h2>
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
                        {isEditing ? 'Update Phone Prefix' : 'Add Phone Prefix'}
                    </button>
                </div>
            </form>
            <table className="min-w-full border-collapse border mt-8">
                <thead>
                    <tr className="bg-blue-500 text-white">
                        <th className="py-2 px-4 border">Country</th>
                        <th className="py-2 px-4 border">Code</th>
                        <th className="py-2 px-4 border">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {phonePrefixes.map((prefix: any) => (
                        <tr key={prefix._id}>
                            <td className="py-2 px-4 border">{prefix.country}</td>
                            <td className="py-2 px-4 border">{prefix.code}</td>
                            <td className="py-2 px-4 border">
                                <button
                                    className="bg-yellow-500 text-white py-1 px-3 rounded mr-2"
                                    onClick={() => handleEdit(prefix._id, prefix.country, prefix.code)}
                                >
                                    Edit
                                </button>
                                <button
                                    className="bg-red-500 text-white py-1 px-3 rounded"
                                    onClick={() => handleDelete(prefix._id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-between mt-4">
                <button
                    className="bg-gray-500 text-white py-1 px-3 rounded"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <span>Page {currentPage} of {totalPages}</span>
                <button
                    className="bg-gray-500 text-white py-1 px-3 rounded"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AddPhonePrefix;