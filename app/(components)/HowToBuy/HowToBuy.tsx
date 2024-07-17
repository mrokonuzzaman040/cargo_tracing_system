"use client";
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const steps = [
    {
        image: '/cart-icon.png',
        title: 'Register',
        description: 'Register on Interafrica website and we will give you our warehouse address so that you can use it as your China address.'
    },
    {
        image: '/truck-icon.png',
        title: 'Provide Address',
        description: 'Provide the warehouse address to your supplier.'
    },
    {
        image: '/warehouse-icon.png',
        title: 'Ship Goods',
        description: 'Your goods will be shipped out within 24Hrs of arriving in our warehouse.'
    },
    {
        image: '/delivery-icon.png',
        title: 'Deliver',
        description: 'Your goods will be delivered to your door.'
    }
];

const HowToBuy = () => {
    return (
        <section className="relative overflow-hidden bg-gray-50 dark:bg-gray-900 py-12">
            <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                <h2 className="text-3xl font-bold text-center mb-12 text-blue-600">How to Buy from China</h2>
                <ul className="flex flex-col lg:flex-row justify-center items-center">
                    {steps.map((step, index) => (
                        <motion.li
                            key={index}
                            className="mb-8 lg:mb-0 lg:mx-4"
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.2 }}
                        >
                            <div className="flex flex-col items-center text-center px-2">
                                <div className="w-20 h-20 mb-4 flex items-center justify-center bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-full shadow-lg">
                                    <Image src={step.image} width={40} height={40} alt={step.title} />
                                </div>
                                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">{step.title}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">{step.description}</p>
                            </div>
                        </motion.li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default HowToBuy;
