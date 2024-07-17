"use client";
import React from 'react';
import Image from 'next/image';

const AboutUs: React.FC = () => {
    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-4xl font-bold mb-8 text-center text-blue-600">About Us</h2>

            <div className="mb-12 text-center">
                <p className="text-xl mb-4 text-gray-700">Welcome to Our Company! We are committed to delivering exceptional service and solutions to our customers.</p>
                <p className="text-xl text-gray-700">Our mission is to provide reliable and efficient shipping services to meet the needs of businesses and individuals worldwide.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
                <div className="bg-blue-100 p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
                    <h3 className="text-3xl font-semibold mb-4 text-blue-600">Our Vision</h3>
                    <p className="text-lg text-gray-700">To be a global leader in the logistics industry, recognized for our innovative solutions, exceptional customer service, and sustainable practices.</p>
                </div>

                <div className="bg-blue-100 p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
                    <h3 className="text-3xl font-semibold mb-4 text-blue-600">Our Mission</h3>
                    <p className="text-lg text-gray-700">To continuously strive for excellence in delivering comprehensive logistics services, ensuring the utmost satisfaction and trust of our clients.</p>
                </div>
            </div>

            <div className="mb-12">
                <h3 className="text-3xl font-semibold mb-4 text-center text-blue-600">Our Team</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center transform transition duration-500 hover:scale-105">

                        <Image src="/images/team-member-1.jpg" alt="Team Member 1" width={120} height={80} className="mx-auto rounded-full mb-4" />

                        <h4 className="text-xl font-bold text-blue-600">John Doe</h4>
                        <p className="text-gray-600">CEO & Founder</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center transform transition duration-500 hover:scale-105">
                        <Image src="/images/team-member-2.jpg" alt="Team Member 2" width={120} height={80} className="mx-auto rounded-full mb-4" />
                        <h4 className="text-xl font-bold text-blue-600">Jane Smith</h4>
                        <p className="text-gray-600">Chief Operating Officer</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-lg text-center transform transition duration-500 hover:scale-105">
                        <Image src="/images/team-member-3.jpg" alt="Team Member 3" width={120} height={80} className="mx-auto rounded-full mb-4" />
                        <h4 className="text-xl font-bold text-blue-600">Michael Brown</h4>
                        <p className="text-gray-600">Chief Technology Officer</p>
                    </div>
                </div>
            </div>

            <div className="mb-12">
                <h3 className="text-3xl font-semibold mb-4 text-center text-blue-600">Our Values</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                    <div className="bg-blue-100 p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
                        <h4 className="text-2xl font-bold mb-2 text-blue-600">Integrity</h4>
                        <p className="text-lg text-gray-700">We adhere to the highest standards of honesty and transparency in all our actions.</p>
                    </div>
                    <div className="bg-blue-100 p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
                        <h4 className="text-2xl font-bold mb-2 text-blue-600">Innovation</h4>
                        <p className="text-lg text-gray-700">We continuously seek creative solutions to enhance our services and meet our customers&apos; needs.</p>
                    </div>
                    <div className="bg-blue-100 p-6 rounded-lg shadow-lg transform transition duration-500 hover:scale-105">
                        <h4 className="text-2xl font-bold mb-2 text-blue-600">Customer Focus</h4>
                        <p className="text-lg text-gray-700">Our customers are at the center of everything we do, and we strive to exceed their expectations.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
