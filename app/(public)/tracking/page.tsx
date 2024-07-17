"use client";
import React from 'react';
import Link from 'next/link';

const Tracking: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-4xl font-bold mb-8 text-center text-blue-600">Track Your Order</h2>
            <div className="text-center">
                <p className="text-xl mb-4 text-gray-700">You need to be logged in to track your order.</p>
                <Link href="/">
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Log In</button>
                </Link>
            </div>
        </div>
    );
};

export default Tracking;
