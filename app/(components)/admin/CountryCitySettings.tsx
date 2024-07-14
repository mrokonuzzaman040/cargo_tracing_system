'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CountryCitySettings: React.FC = () => {
    const [countries, setCountries] = useState<string[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [newCountry, setNewCountry] = useState('');
    const [newCity, setNewCity] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');

    useEffect(() => {
        const fetchCountries = async () => {
            const response = await axios.get('/api/admin/settings/countries');
            setCountries(response.data);
        };

        fetchCountries();
    }, []);

    useEffect(() => {
        if (selectedCountry) {
            const fetchCities = async () => {
                const response = await axios.get(`/api/admin/settings/cities?country=${selectedCountry}`);
                setCities(response.data);
            };

            fetchCities();
        }
    }, [selectedCountry]);

    const handleAddCountry = async () => {
        try {
            await axios.post('/api/admin/settings/country', { name: newCountry });
            setCountries([...countries, newCountry]);
            setNewCountry('');
            alert('Country added successfully');
        } catch (error) {
            console.error('Error adding country:', error);
            alert('Failed to add country');
        }
    };

    const handleAddCity = async () => {
        try {
            await axios.post('/api/admin/settings/city', { name: newCity, country: selectedCountry });
            setCities([...cities, newCity]);
            setNewCity('');
            alert('City added successfully');
        } catch (error) {
            console.error('Error adding city:', error);
            alert('Failed to add city');
        }
    };

    return (
        <div>
            <h3 className="text-xl font-semibold mb-4">Add Country/City</h3>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Add Country</label>
                <input
                    type="text"
                    value={newCountry}
                    onChange={(e) => setNewCountry(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <button onClick={handleAddCountry} className="bg-blue-500 text-white py-2 px-4 rounded mt-2">Add Country</button>
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Add City</label>
                <select
                    value={selectedCountry}
                    onChange={(e) => setSelectedCountry(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-2"
                >
                    <option value="">Select Country</option>
                    {countries.map((country) => (
                        <option key={country} value={country}>{country}</option>
                    ))}
                </select>
                <input
                    type="text"
                    value={newCity}
                    onChange={(e) => setNewCity(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <button onClick={handleAddCity} className="bg-blue-500 text-white py-2 px-4 rounded mt-2">Add City</button>
            </div>
            {selectedCountry && (
                <div>
                    <h4 className="text-lg font-semibold mb-2">Cities in {selectedCountry}</h4>
                    <ul>
                        {cities.map((city) => (
                            <li key={city}>{city}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default CountryCitySettings;
