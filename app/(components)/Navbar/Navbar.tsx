"use client";
import Image from 'next/image';
import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const Navbar = () => {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);
    const navItems = [
        { name: 'Tracking', href: '/tracking' },
        { name: 'Rate', href: '/rate' },
        { name: 'How To Order', href: '/how-to-order' },
        { name: 'About Us', href: '/about-us' }
    ];

    return (
        <div className="bg-blue-500 w-full shadow-lg">
            <div className="mx-auto max-w-7xl flex justify-between items-center py-4 px-6">
                <Link href="/">
                    <p>
                        <Image src="/logo.png" width={120} height={40} alt="Sosep Express Logo" />
                    </p>
                </Link>
                <div className="hidden md:flex gap-4">
                    {navItems.map((item, index) => (
                        <Link key={index} href={item.href}>
                            <p
                                className={`relative text-white text-lg py-2 px-3 transition-colors duration-300 ${pathname === item.href ? 'text-blue-200' : 'hover:text-gray-800 dark:hover:text-gray-200'
                                    }`}
                            >
                                {item.name}
                                <span
                                    className={`absolute left-0 bottom-0 w-full h-0.5 bg-blue-200 transform ${pathname === item.href ? 'scale-x-100' : 'scale-x-0'
                                        } transition-transform duration-300`}
                                ></span>
                            </p>
                        </Link>
                    ))}
                </div>
                <div className="md:hidden">
                    <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>
                </div>
            </div>
            {isOpen && (
                <div className="md:hidden">
                    <div className="flex flex-col gap-2 p-4">
                        {navItems.map((item, index) => (
                            <Link key={index} href={item.href}>
                                <p
                                    className={`relative text-white text-lg py-2 px-3 transition-colors duration-300 ${pathname === item.href ? 'text-blue-200' : 'hover:text-gray-800 dark:hover:text-gray-200'
                                        }`}
                                >
                                    {item.name}
                                    <span
                                        className={`absolute left-0 bottom-0 w-full h-0.5 bg-blue-200 transform ${pathname === item.href ? 'scale-x-100' : 'scale-x-0'
                                            } transition-transform duration-300`}
                                    ></span>
                                </p>
                            </Link>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Navbar;
