"use client";
import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface CityRate {
    city: string;
    ratePerKg: number;
}

interface CountryRates {
    [country: string]: CityRate[];
}

const Rates: React.FC = () => {
    const [rates, setRates] = useState<CountryRates>({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchRates = async () => {
            try {
                const response = await axios.get('/api/common/countries-cities-rates');
                setRates(response.data.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching rates:', error);
                setLoading(false);
            }
        };

        fetchRates();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Express Air Shipping Rates</h2>
            <table className="min-w-full border-collapse border">
                <thead>
                    <tr className="bg-blue-500 text-white">
                        <th className="py-2 px-4 border">Country</th>
                        <th className="py-2 px-4 border">City</th>
                        <th className="py-2 px-4 border">Rate/kilo</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(rates).map(([country, cities]) =>
                        cities.map((cityRate, index) => (
                            <tr key={`${country}-${cityRate.city}-${index}`}>
                                <td className="py-2 px-4 border">{index === 0 ? country : ''}</td>
                                <td className="py-2 px-4 border">{cityRate.city}</td>
                                <td className="py-2 px-4 border">€{cityRate.ratePerKg}.00</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Rates;
