// app/(components)/HowToBuy/HowToBuy.tsx

import React from 'react';

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
                <h2 className="text-xl font-bold text-center mb-12">How to buy from China</h2>
                <ul className="steps steps-vertical lg:steps-horizontal">
                    {steps.map((step, index) => (
                        <li key={index} className="step step-info">
                            <div className="flex flex-col items-center text-center px-2">
                                <div className="w-20 h-20 mb-4 flex items-center justify-center bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-full shadow">
                                    <img src={step.image} alt={step.title} className="w-10 h-10" />
                                </div>
                                <h3 className="font-bold mb-2">{step.title}</h3>
                                <p className="text-sm">{step.description}</p>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </section>
    );
};

export default HowToBuy;
