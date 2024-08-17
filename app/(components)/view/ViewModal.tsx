import React from 'react';
import Image from 'next/image';

interface Goods {
    domesticWb: string;
    natureOfGoods: string;
    itemName: string;
    weight: string;
    declaredValue: string;
    count: string;
    imageUrl: string;
}

interface Receiver {
    name: string;
    phonePrefix: string;
    phone: string;
    country: string;
    city: string;
    street: string;
    district?: string;
    company?: string;
}

interface ViewModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    goodsList: Goods[];
    receiver: Receiver;
}

const ViewModal: React.FC<ViewModalProps> = ({ isOpen, onRequestClose, goodsList, receiver }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white shadow-md rounded p-4 max-w-lg w-full">
                <h2 className="text-xl font-semibold mb-4">Order Details</h2>
                <h3 className="text-lg font-semibold mb-2">Receiver Information</h3>
                <p><strong>Name:</strong> {receiver.name}</p>
                <p><strong>Phone:</strong> {receiver.phonePrefix} {receiver.phone}</p>
                <p><strong>Address:</strong> {receiver.street}, {receiver.city}, {receiver.country}</p>
                {receiver.district && <p><strong>District:</strong> {receiver.district}</p>}
                {receiver.company && <p><strong>Company:</strong> {receiver.company}</p>}

                <h3 className="text-lg font-semibold mt-4 mb-2">Goods Information</h3>
                <div className="overflow-x-auto">
                    <table className="min-w-full border-collapse border">
                        <thead>
                            <tr className="bg-blue-500 text-white">
                                <th className="py-2 px-4 border">DOMESTIC WB</th>
                                <th className="py-2 px-4 border">Nature of goods</th>
                                <th className="py-2 px-4 border">Item name</th>
                                <th className="py-2 px-4 border">Weight</th>
                                <th className="py-2 px-4 border">Declared value</th>
                                <th className="py-2 px-4 border">Count</th>
                                <th className="py-2 px-4 border">Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            {goodsList.map((goods, index) => (
                                <tr key={index}>
                                    <td className="py-2 px-4 border">{goods.domesticWb}</td>
                                    <td className="py-2 px-4 border">{goods.natureOfGoods}</td>
                                    <td className="py-2 px-4 border">{goods.itemName}</td>
                                    <td className="py-2 px-4 border">{goods.weight}</td>
                                    <td className="py-2 px-4 border">{goods.declaredValue}</td>
                                    <td className="py-2 px-4 border">{goods.count}</td>
                                    <td className="py-2 px-4 border">
                                        <Image
                                            src={goods.imageUrl}
                                            width={50}
                                            height={50}
                                            alt={goods.itemName}
                                            quality={40}
                                            loader={({ src }) => src
                                        }
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="text-right mt-4">
                    <button
                        className="bg-gray-500 text-white py-1 px-3 rounded"
                        onClick={onRequestClose}
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewModal;
