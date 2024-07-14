'use client';

import ConfigurationSettings from '@/app/(components)/admin/ConfigurationSettings';
import CountryCitySettings from '@/app/(components)/admin/CountryCitySettings';
import SiteSettings from '@/app/(components)/admin/SiteSettings';
import React, { useState } from 'react';
;

const AdminSettings: React.FC = () => {
    const [activeSection, setActiveSection] = useState('site-settings');

    const renderSection = () => {
        switch (activeSection) {
            case 'site-settings':
                return <SiteSettings />;
            case 'country-city':
                return <CountryCitySettings />;
            case 'configuration':
                return <ConfigurationSettings />;
            default:
                return <SiteSettings />;
        }
    };

    return (
        <div className="max-w-7xl mx-auto my-8">
            <h2 className="text-2xl font-bold mb-6">Admin Settings</h2>
            <div className="flex space-x-4 mb-8">
                <button
                    className={`py-2 px-4 ${activeSection === 'site-settings' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setActiveSection('site-settings')}
                >
                    Site Settings
                </button>
                <button
                    className={`py-2 px-4 ${activeSection === 'country-city' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setActiveSection('country-city')}
                >
                    Add Country/City
                </button>
                <button
                    className={`py-2 px-4 ${activeSection === 'configuration' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                    onClick={() => setActiveSection('configuration')}
                >
                    Configuration
                </button>
            </div>
            {renderSection()}
        </div>
    );
};

export default AdminSettings;
