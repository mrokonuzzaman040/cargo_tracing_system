'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { useReactToPrint } from 'react-to-print';
import Image from 'next/image';

const InvoicePage = ({ order }: { order: any }) => {
    const router = useRouter();
    const componentRef = React.useRef<HTMLDivElement | null>(null);

    const handlePrint = useReactToPrint({
        content: () => componentRef.current!,
    });

    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div ref={componentRef}>
                <h2 className="text-2xl font-bold mb-6">Invoice</h2>

                <div className="border-b pb-4 mb-6">
                    <h3 className="text-xl font-semibold mb-4">Company Information</h3>
                    <p>Company Name: ABC Logistics</p>
                    <p>Address: 123 Main St, Anytown, USA</p>
                    <p>Email: support@abclogistics.com</p>
                    <p>Phone: +1 (555) 123-4567</p>
                </div>

                <div className="border-b pb-4 mb-6">
                    <h3 className="text-xl font-semibold mb-4">Sender Information</h3>
                    <p>Name: {order.senderName}</p>
                    <p>Phone: {order.senderPhonePrefix} {order.senderPhone}</p>
                    <p>Address: {order.senderAddress}</p>
                </div>

                <div className="border-b pb-4 mb-6">
                    <h3 className="text-xl font-semibold mb-4">Receiver Information</h3>
                    <p>Name: {order.receiverName}</p>
                    <p>Phone: {order.receiverPhonePrefix} {order.receiverPhone}</p>
                    <p>Country: {order.country}</p>
                    <p>City: {order.city}</p>
                    <p>Street: {order.street}</p>
                    {order.district && <p>District: {order.district}</p>}
                    {order.company && <p>Company: {order.company}</p>}
                </div>

                <div className="border-b pb-4 mb-6">
                    <h3 className="text-xl font-semibold mb-4">Goods Information</h3>
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
                                {order.goodsList.map((goods: any, index: number) => (
                                    <tr key={index}>
                                        <td className="py-2 px-4 border">{goods.domesticWb}</td>
                                        <td className="py-2 px-4 border">{goods.natureOfGoods}</td>
                                        <td className="py-2 px-4 border">{goods.itemName}</td>
                                        <td className="py-2 px-4 border">{goods.weight}</td>
                                        <td className="py-2 px-4 border">{goods.declaredValue}</td>
                                        <td className="py-2 px-4 border">{goods.count}</td>
                                        <td className="py-2 px-4 border">
                                            <Image src={goods.imageUrl} width={50} height={50} alt={goods.itemName} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mb-6">
                    <h3 className="text-xl font-semibold mb-4">Cost Calculation</h3>
                    <p>Estimated Fee: {order.estimatedFee} EUR</p>
                </div>
            </div>

            <div className="text-right">
                <button onClick={handlePrint} className="bg-blue-500 text-white py-2 px-4 rounded mr-4">
                    Download as PDF
                </button>
                <button
                    onClick={() => router.push(`/payment?orderId=${order.id}`)}
                    className="bg-green-500 text-white py-2 px-4 rounded"
                >
                    Make Payment
                </button>
            </div>
        </div>
    );
};

export default InvoicePage;
