import React from 'react';
import Image from 'next/image';
const Footer = () => {
    return (
        <footer className="bg-blue-500 text-white py-4">
            <div className="container mx-auto max-w-7xl flex justify-between items-center px-4">
                <div className="text-sm">
                    <p>Company Address: Room 411-1013, No. 1, Mingzhu 1st Street, Hengli Town, Nansha District, Guangdong</p>
                    <p>Customer Service Center: 020-89052726 备案号粤ICP备15022641号</p>
                    <p>All rights reserved powered by INTERAFRICA EXPRESS.</p>
                </div>
                <div className="flex items-center flex-col">
                    <Image height={40} width={80} src="/logo.png" alt="Sosep Express Logo" />
                    <span className="text-lg font-bold">Sosep Express</span>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
