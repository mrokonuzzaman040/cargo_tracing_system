"use client";
import React from 'react';

interface Rate {
    country: string;
    city: string;
    rate: number;
}

const rates: Rate[] = [
    { country: 'Éthiopie', city: 'Addis-Abeba', rate: 22 },
    { country: 'Tanzanie', city: 'Dodoma', rate: 22 },
    { country: 'Nigeria', city: 'Abuja', rate: 22 },
    { country: 'Ghana', city: 'Accra', rate: 22 },
    { country: 'Zambie', city: 'Lusaka', rate: 22 },
    { country: 'Congo (RDC)', city: 'Kinshasa', rate: 22 },
    { country: 'République du Congo', city: 'Brazzaville', rate: 22 },
    { country: 'Cameroun', city: 'Yaoundé', rate: 22 },
    { country: 'Djibouti', city: 'Djibouti', rate: 22 },
    { country: 'Côte d\'Ivoire', city: 'Yamoussoukro', rate: 22 },
    { country: 'Mali', city: 'Bamako', rate: 22 },
    { country: 'Gabon', city: 'Libreville', rate: 22 },
    { country: 'Rwanda', city: 'Kigali', rate: 22 },
    { country: 'Guinée Équatoriale', city: 'Malabo', rate: 22 },
    { country: 'Sénégal', city: 'Dakar', rate: 22 },
    { country: 'Madagascar', city: 'Antananarivo', rate: 22 },
    { country: 'Malawi', city: 'Lilongwe', rate: 22 },
    { country: 'Guinée', city: 'Conakry', rate: 22 },
    { country: 'Burkina Faso', city: 'Ouagadougou', rate: 22 },
    { country: 'Bénin', city: 'Porto-Novo', rate: 22 },
    { country: 'Afrique du Sud', city: 'Pretoria', rate: 22 },
    { country: 'Niger', city: 'Niamey', rate: 22 },
    { country: 'Botswana', city: 'Gaborone', rate: 22 },
    { country: 'Tchad', city: 'N\'Djamena', rate: 22 },
];

const Rates: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6">Shipping Rates</h2>
            <table className="min-w-full border-collapse border">
                <thead>
                    <tr className="bg-blue-500 text-white">
                        <th className="py-2 px-4 border">Country</th>
                        <th className="py-2 px-4 border">City</th>
                        <th className="py-2 px-4 border">Rate</th>
                        <th className="py-2 px-4 border">Weight (kg)</th>
                    </tr>
                </thead>
                <tbody>
                    {rates.map((rate, index) => (
                        <tr key={index}>
                            <td className="py-2 px-4 border">{rate.country}</td>
                            <td className="py-2 px-4 border">{rate.city}</td>
                            <td className="py-2 px-4 border">€{rate.rate}.00</td>
                            <td className="py-2 px-4 border">1</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Rates;