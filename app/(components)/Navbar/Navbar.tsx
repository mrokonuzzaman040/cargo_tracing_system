import Image from 'next/image';
import React from 'react';

const Navbar = () => {
    return (
        <div className=' bg-blue-500 w-full'>
            <div className='mx-auto max-w-7xl flex justify-between items-center'>
                <Image src='/logo.png' width={120} height={40} alt='Sosep Express Logo' />
                <div className="flex gap-4 justify-end items-center p-3">
                    <a href='/tracking' className='border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6'>Tracking</a>
                    <a href='/rate' className='border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6'>Rate</a>
                    <a href='/howtorder' className='border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6'>How To Order</a>
                    <a href='/about' className='border-b-2 border-transparent hover:text-gray-800 dark:hover:text-gray-200 hover:border-blue-500 mx-1.5 sm:mx-6'>About Us</a>
                </div>
            </div>
        </div>
    );
};

export default Navbar;