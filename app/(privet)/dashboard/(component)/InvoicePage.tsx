'use client';
import React from 'react';
import { useReactToPrint } from 'react-to-print';
import Image from 'next/image';

const InvoicePage = ({ order }: { order: any }) => {
    const componentRef = React.useRef(null);
    const handlePrint = useReactToPrint({
        content: () => componentRef.current,
    });

    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div ref={componentRef}>
                <h2 className="text-2xl font-bold mb-6">Invoice</h2>
                <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Company Information</h3>
                    <p>Company Name: Your Company</p>
                    <p>Address: Your Company Address</p>
                    <p>Email: contact@yourcompany.com</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Sender Information</h3>
                    <p>Name: {order.senderName}</p>
                    <p>Address: {order.senderAddress}</p>
                    <p>Phone: {order.senderPhonePrefix} {order.senderPhone}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Receiver Information</h3>
                    <p>Name: {order.receiverName}</p>
                    <p>Address: {order.street}, {order.city}, {order.country}</p>
                    <p>Phone: {order.receiverPhonePrefix} {order.receiverPhone}</p>
                </div>
                <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Goods Information</h3>
                    <table className="min-w-full border-collapse border">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="py-2 px-4 border">Item Name</th>
                                <th className="py-2 px-4 border">Weight</th>
                                <th className="py-2 px-4 border">Declared Value</th>
                                <th className="py-2 px-4 border">Count</th>
                                <th className="py-2 px-4 border">Image</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.goodsList.map((goods: any, index: number) => (
                                <tr key={index}>
                                    <td className="py-2 px-4 border">{goods.itemName}</td>
                                    <td className="py-2 px-4 border">{goods.weight}</td>
                                    <td className="py-2 px-4 border">{goods.declaredValue}</td>
                                    <td className="py-2 px-4 border">{goods.count}</td>
                                    <td className="py-2 px-4 border">
                                        <Image src={goods.imageUrl} alt={goods.itemName} width={64} height={64} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mb-4">
                    <h3 className="text-xl font-semibold mb-2">Estimated Fee</h3>
                    <p>{order.estimatedFee} USD</p>
                </div>
            </div>
            <div className="text-right">
                <button onClick={handlePrint} className="bg-blue-500 text-white py-2 px-4 rounded mt-4">Download Invoice</button>
                <button className="bg-green-500 text-white py-2 px-4 rounded mt-4 ml-2">Make Payment</button>
            </div>
        </div>
    );
};

export default InvoicePage;
