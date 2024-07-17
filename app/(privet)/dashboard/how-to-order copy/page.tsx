"use client";
import React from 'react';
import { FaBoxOpen, FaUser, FaTruck, FaClipboardCheck, FaCreditCard, FaPrint, FaCalendarCheck, FaSearch } from 'react-icons/fa';

const OrderGuide: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold mb-8 text-center">How to Order</h2>

            <div className="space-y-8">
                <div className="flex items-center space-x-4">
                    <FaBoxOpen className="text-blue-500 text-3xl" />
                    <div>
                        <h3 className="text-2xl font-semibold">Step 1: Prepare Your Shipment</h3>
                        <p>Ensure you have all necessary information about the sender and receiver, including:</p>
                        <ul className="list-disc ml-6">
                            <li>Names</li>
                            <li>Addresses (including country, city, street, and postal code)</li>
                            <li>Contact numbers</li>
                            <li>Details of items (descriptions, quantities, weights, values)</li>
                        </ul>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <FaUser className="text-blue-500 text-3xl" />
                    <div>
                        <h3 className="text-2xl font-semibold">Step 2: Log In to Your Account</h3>
                        <p>Visit our website and log in to your account. If you don&apos;t have an account, register for a new one by providing your email address, creating a password, and filling out your profile information.</p>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <FaClipboardCheck className="text-blue-500 text-3xl" />
                    <div>
                        <h3 className="text-2xl font-semibold">Step 3: Create a New Order</h3>
                        <p>Navigate to the &quot;New Order&quot; section and complete the form with the following details:</p>
                        <ul className="list-disc ml-6">
                            <li>Sender information</li>
                            <li>Receiver information</li>
                            <li>Shipment details</li>
                        </ul>
                        <p>Ensure all information is accurate and complete.</p>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <FaTruck className="text-blue-500 text-3xl" />
                    <div>
                        <h3 className="text-2xl font-semibold">Step 4: Choose Your Shipping Method</h3>
                        <p>Select a shipping method that suits your needs. Options include:</p>
                        <ul className="list-disc ml-6">
                            <li>Air transportation (fastest, higher cost)</li>
                            <li>Sea transportation (slower, lower cost)</li>
                            <li>Land transportation (regional)</li>
                        </ul>
                        <p>Each method has different rates and delivery times.</p>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <FaCreditCard className="text-blue-500 text-3xl" />
                    <div>
                        <h3 className="text-2xl font-semibold">Step 5: Confirm and Pay</h3>
                        <p>Review your order details and confirm everything is correct. Proceed to payment using our secure payment gateway. Accepted payment methods include:</p>
                        <ul className="list-disc ml-6">
                            <li>Credit card</li>
                            <li>Bank transfer</li>
                            <li>PayPal</li>
                        </ul>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <FaPrint className="text-blue-500 text-3xl" />
                    <div>
                        <h3 className="text-2xl font-semibold">Step 6: Print Your Shipping Label</h3>
                        <p>Once payment is completed, print your shipping label from the confirmation page. Ensure the label is securely attached and clearly visible on your package.</p>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <FaCalendarCheck className="text-blue-500 text-3xl" />
                    <div>
                        <h3 className="text-2xl font-semibold">Step 7: Schedule a Pickup or Drop Off</h3>
                        <p>Choose between scheduling a pickup from your location or dropping off your package at one of our designated locations. Ensure the package is ready for collection at the scheduled time.</p>
                    </div>
                </div>

                <div className="flex items-center space-x-4">
                    <FaSearch className="text-blue-500 text-3xl" />
                    <div>
                        <h3 className="text-2xl font-semibold">Step 8: Track Your Shipment</h3>
                        <p>Use the tracking number provided to monitor the status of your shipment. You can track your package in real-time through our website.</p>
                    </div>
                </div>

                <div className="text-center mt-8">
                    <h3 className="text-2xl font-semibold mb-4">Need Help?</h3>
                    <p>If you have any questions or need assistance, please contact our customer support team. We&apos;re here to help!</p>
                </div>
            </div>
        </div>
    );
};

export default OrderGuide;
