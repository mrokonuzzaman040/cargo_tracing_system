"use client";
import React from 'react';

const rates = [
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
            <table className="min-w-full border-collapse border mb-8">
                <thead>
                    <tr className="bg-blue-500 text-white">
                        <th className="py-2 px-4 border">Country</th>
                        <th className="py-2 px-4 border">City</th>
                        <th className="py-2 px-4 border">Rate</th>
                    </tr>
                </thead>
                <tbody>
                    {rates.map((rate, index) => (
                        <tr key={index}>
                            <td className="py-2 px-4 border">{rate.country}</td>
                            <td className="py-2 px-4 border">{rate.city}</td>
                            <td className="py-2 px-4 border">€{rate.rate}.00</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2 className="text-2xl font-bold mb-4">Shipping Rules</h2>
            <div className="mb-4">
                <h3 className="text-xl font-semibold">General Information</h3>
                <p>1. Do not accept transportation of (including but not limited to) dangerous goods, money, and perishable cargo in our China domestic express services.</p>
                <p>2. &quot;Including tax&quot; means rates include destination customs clearance fees.</p>
                <p>3. Min chargeable weight is 1 KG and the unit is 0.5 KG.</p>
                <p>4. If the document is more than 1 kg, it will be charged as general cargo.</p>
                <p>5. Dimensional weight is calculated by multiplying length by width by height of each package (all in centimeters) and dividing by 6,000. Charges based on the dimensional weight will be assessed if it exceeds the actual weight.</p>
                <p>6. The cargos shall be subject to inspection and quarantine, magnetic inspection, etc., all expenses shall be paid by the customer and domestic payment.</p>
                <p>7. Customs Clearance: The customs clearance process is regulated by the customs authorities of the destination country and is independent of the Company&apos;s operations.</p>
                <p>8. Client Responsibilities: The Client is responsible for providing accurate and complete documentation, including invoices and proof of payment, for goods purchased for shipping through the Company.</p>
                <p>9. Shipping Timeframes: While the Company strives to meet the estimated shipping timeframes, we do not control the time frame of shipping or customs clearance.</p>
            </div>
            <div>
                <h3 className="text-xl font-semibold">Freight of Low Density Cargo</h3>
                <p>1. Low density cargo refers to goods that are bulky, have low density, and are relatively light in weight.</p>
                <p>2. Calculation formula for low density cargo volume: volume weight (kg) = Length * width * height (cm) / 6000.</p>
                <p>3. Compare the volume weight of the low density cargo with the actual weight, and take the larger weight.</p>
                <p>4. The freight does not contain any tariffs and VAT at the destination.</p>
            </div>
        </div>
    );
};

export default Rates;
