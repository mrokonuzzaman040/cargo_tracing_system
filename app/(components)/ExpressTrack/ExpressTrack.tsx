"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { motion } from 'framer-motion';

const ExpressTrack: React.FC = () => {
    const [orderNumber, setOrderNumber] = useState('');
    const [orderStatus, setOrderStatus] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleTrackOrder = async () => {
        setLoading(true);
        setError(null);
        setOrderStatus(null);

        try {
            const response = await axios.get(`/api/orders/track/${orderNumber}`);
            setOrderStatus(response.data.status);
        } catch (error) {
            setError('You have to log in to track your order.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto max-w-7xl my-8 p-4 flex flex-wrap">
            {/* Express Track Section */}
            <motion.div
                className="w-full lg:w-1/3 p-4 border-gray-300 bg-white rounded-lg shadow-lg"
                initial={{ opacity: 0, x: -100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-2xl font-bold mb-4 text-blue-600">Express Track</h2>
                <textarea
                    className="w-full h-32 p-2 border rounded mb-4"
                    placeholder="Enter tracking details"
                    value={orderNumber}
                    onChange={(e) => setOrderNumber(e.target.value)}
                ></textarea>
                <button
                    onClick={handleTrackOrder}
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
                    disabled={loading}
                >
                    Track Order
                </button>

                {loading && <p className="mt-4 text-blue-600">Loading...</p>}
                {error && <p className="mt-4 text-red-500">{error}</p>}

                {orderStatus && (
                    <div className="mt-4">
                        <h3 className="text-xl font-semibold text-blue-600">Order Status</h3>
                        <p>{orderStatus}</p>
                    </div>
                )}
            </motion.div>

            {/* Why choose Sosep Express? Section */}
            <motion.div
                className="w-full lg:w-2/3 p-4 border-gray-300 bg-white rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-2xl font-bold mb-4 text-blue-600">Why choose Sosep Express?</h2>
                <div className="mb-4 p-2 text-gray-700">
                    <p>
                        At Sosep Express, we prioritize fast, reliable air transport thanks to our strong airline partnerships. We`&apos;`ve rapidly expanded to 23 branches across Africa, demonstrating our commitment to the region. We are dedicated to efficiency and quality, ensuring our services meet the specific needs of our customers. Our specialties include Air Express International, International Air Transport, and management of complex International Logistics Projects.
                    </p>
                    <br />
                    <p>
                        Choose Sosep Express for superior air transport and logistics solutions tailored to your requirements. Contact us to see how we can support your logistics goals efficiently and reliably.
                    </p>
                </div>
                <div className="mb-4">
                    <div className="flex items-start mb-2">
                        <div className="mr-2">
                            <Image src="/speed.png" width={24} height={24} alt="Speed Icon" />
                        </div>
                        <div>
                            <h3 className="font-bold text-blue-600">Speed</h3>
                            <p className="text-sm">Unbeatable Service time, Sosep Express is the fastest solution from China to Africa & South America.</p>
                        </div>
                    </div>
                    <div className="flex items-start mb-2">
                        <div className="mr-2">
                            <Image src="/flexibility.png" width={24} height={24} alt="Flexibility Icon" />
                        </div>
                        <div>
                            <h3 className="font-bold text-blue-600">Flexibility</h3>
                            <p className="text-sm">Sosep Express offers a flexible, first class delivery service that is tailored to your individual customer needs.</p>
                        </div>
                    </div>
                    <div className="flex items-start">
                        <div className="mr-2">
                            <Image src="/reliability.png" width={24} height={24} alt="Reliability Icon" />
                        </div>
                        <div>
                            <h3 className="font-bold text-blue-600">Reliability</h3>
                            <p className="text-sm">Track your shipments on our state of the art tracking system and get real-time tracking information or contact our customer services.</p>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* QR Codes Section */}
            {/* <motion.div
                className="w-full lg:w-1/4 p-4 flex flex-col items-center bg-white rounded-lg shadow-lg"
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
            >
                <div className="mb-4">
                    <Image src="/qr-code.png" width={100} height={100} alt="WeChat QR Code" />
                    <p className="text-center text-sm">Follow us on WeChat</p>
                </div>
                <div className="mb-4">
                    <Image src="/qr-code.png" width={100} height={100} alt="Weibo QR Code" />
                    <p className="text-center text-sm">Follow us on Weibo</p>
                </div>
            </motion.div> */}
        </div>
    );
};

export default ExpressTrack;
