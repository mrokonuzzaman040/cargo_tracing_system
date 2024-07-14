'use client';

import React, { useState } from 'react';
import axios from 'axios';

const SiteSettings: React.FC = () => {
    const [siteTitle, setSiteTitle] = useState('');
    const [siteDescription, setSiteDescription] = useState('');

    const handleSave = async () => {
        try {
            await axios.post('/api/admin/settings/site', { siteTitle, siteDescription });
            alert('Settings saved successfully');
        } catch (error) {
            console.error('Error saving settings:', error);
            alert('Failed to save settings');
        }
    };

    return (
        <div>
            <h3 className="text-xl font-semibold mb-4">Site Settings</h3>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Site Title</label>
                <input
                    type="text"
                    value={siteTitle}
                    onChange={(e) => setSiteTitle(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Site Description</label>
                <textarea
                    value={siteDescription}
                    onChange={(e) => setSiteDescription(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>
            <button onClick={handleSave} className="bg-blue-500 text-white py-2 px-4 rounded">Save</button>
        </div>
    );
};

export default SiteSettings;
