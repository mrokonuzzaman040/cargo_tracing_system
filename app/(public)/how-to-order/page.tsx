"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { FaBoxOpen, FaUser, FaTruck, FaClipboardCheck, FaCreditCard, FaPrint, FaCalendarCheck, FaSearch, FaInfoCircle } from 'react-icons/fa';

const steps = [
    {
        icon: FaBoxOpen,
        title: "Step 1: Prepare Your Shipment",
        description: "Ensure you have all necessary information about the sender and receiver, including:",
        details: ["Names", "Addresses (including country, city, street, and postal code)", "Contact numbers", "Details of items (descriptions, quantities, weights, values)"]
    },
    {
        icon: FaUser,
        title: "Step 2: Log In to Your Account",
        description: "Visit our website and log in to your account. If you don't have an account, register for a new one by providing your email address, creating a password, and filling out your profile information."
    },
    {
        icon: FaClipboardCheck,
        title: "Step 3: Create a New Order",
        description: "Navigate to the 'New Order' section and complete the form with the following details:",
        details: ["Sender information", "Receiver information", "Shipment details"],
        note: "Ensure all information is accurate and complete."
    },
    {
        icon: FaTruck,
        title: "Step 4: Choose Your Shipping Method",
        description: "Select a shipping method that suits your needs. Options include:",
        details: ["Air transportation (fastest, higher cost)", "Sea transportation (slower, lower cost)", "Land transportation (regional)"],
        note: "Each method has different rates and delivery times."
    },
    {
        icon: FaCreditCard,
        title: "Step 5: Confirm and Pay",
        description: "Review your order details and confirm everything is correct. Proceed to payment using our secure payment gateway. Accepted payment methods include:",
        details: ["Credit card", "Bank transfer", "PayPal"]
    },
    {
        icon: FaPrint,
        title: "Step 6: Print Your Shipping Label",
        description: "Once payment is completed, print your shipping label from the confirmation page. Ensure the label is securely attached and clearly visible on your package."
    },
    {
        icon: FaCalendarCheck,
        title: "Step 7: Schedule a Pickup or Drop Off",
        description: "Choose between scheduling a pickup from your location or dropping off your package at one of our designated locations. Ensure the package is ready for collection at the scheduled time."
    },
    {
        icon: FaSearch,
        title: "Step 8: Track Your Shipment",
        description: "Use the tracking number provided to monitor the status of your shipment. You can track your package in real-time through our website."
    },
];

const OrderGuide: React.FC = () => {
    return (
        <div className="bg-gray-100 min-h-screen">
            <header className="bg-blue-600 text-white py-12 text-center">
                <h1 className="text-5xl font-bold">How to Order</h1>
                <p className="mt-4 text-lg">Follow these simple steps to place your order with ease.</p>
            </header>

            <main className="container mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {steps.map((step, index) => (
                        <motion.div
                            key={index}
                            className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <step.icon className="text-blue-500 text-6xl mb-4" />
                            <h3 className="text-xl font-semibold mb-2 text-center">{step.title}</h3>
                            <p className="text-gray-700 text-center mb-4">{step.description}</p>
                            {step.details && (
                                <ul className="list-disc ml-4 text-gray-700 space-y-1">
                                    {step.details.map((detail, i) => (
                                        <li key={i}>{detail}</li>
                                    ))}
                                </ul>
                            )}
                            {step.note && <p className="text-gray-700 mt-4">{step.note}</p>}
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 1.5 }}
                    className="text-center mt-12"
                >
                    <h3 className="text-3xl font-semibold mb-4 text-gray-800">Need Help?</h3>
                    <p className="text-gray-600 mb-4">
                        If you have any questions or need assistance, please contact our customer support team. We&apos;re here to help!
                    </p>
                    <FaInfoCircle className="text-blue-500 text-4xl mx-auto" />
                </motion.div>
            </main>
        </div>
    );
};

export default OrderGuide;
