import Image from 'next/image';
import React from 'react';
import Slider from '../Slider/Slider';

const Navbar = () => {
    return (
        <>
            <div className='bg-yellow-500 w-full h-12 flex justify-between'>
                <Image src="/logo.png" alt="logo" width={150} height={120} />
                <div className="flex gap-4 justify-end items-center p-3">
                    <a href='/tracking' className='border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6'>Tracking</a>
                    <a href='/rate' className='border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6'>Rate</a>
                    <a href='/howtorder' className='border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6'>How To Order</a>
                    <a href='/about' className='border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6'>About Us</a>
                </div>
            </div>
        </>
    );
};

export default Navbar;