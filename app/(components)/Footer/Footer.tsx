import React from 'react';
import Image from 'next/image';
const Footer = () => {
    return (
        <footer className="bg-yellow-500 text-white py-4">
            <div className="container mx-auto max-w-7xl flex justify-between items-center px-4">
                <div className="text-sm">
                    <p>Company Address: Room 411-1013, No. 1, Mingzhu 1st Street, Hengli Town, Nansha District, Guangdong</p>
                    <p>Customer Service Center: 020-89052726 备案号粤ICP备15022641号</p>
                    <p>All rights reserved powered by INTERAFRICA EXPRESS.</p>
                </div>
                <div className="flex items-center">
                    <Image height={40} width={40} src="/logo.png" alt="IAExp Logo" />
                    {/* <span className="text-lg font-bold">IAExp</span> */}
                </div>
            </div>
        </footer>
    );
};

export default Footer;
