"use client";
import React, { useState } from 'react';
import Image from 'next/image';
import { EyeIcon, EyeSlashIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';

const Slider = () => {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="relative w-full mx-auto max-w-7xl">
            {/* Slider */}
            <div className="carousel w-full">
                <div id="item1" className="carousel-item w-full">
                    <Image src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg" width={1280} height={100} alt="Slide 1" />
                </div>
                <div id="item2" className="carousel-item w-full">
                    <Image src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg" width={1280} height={100} alt="Slide 2" />
                </div>
                <div id="item3" className="carousel-item w-full">
                    <Image src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg" width={1280} height={100} alt="Slide 3" />
                </div>
                <div id="item4" className="carousel-item w-full">
                    <Image src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg" width={1280} height={100} alt="Slide 4" />
                </div>
            </div>

            {/* Login Form */}
            <div className="absolute top-0 right-0 bg-gray-900 bg-opacity-70 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 h-full flex flex-col justify-center p-4 sm:p-8">
                <h2 className="text-white text-2xl mb-6">Log In</h2>
                <form className="space-y-4">
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Email or phone"
                            className="w-full p-2 pl-10 rounded bg-gray-800 text-white placeholder-gray-500"
                        />
                        <div className="absolute left-2 top-2.5">
                            <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                        </div>
                    </div>
                    <div className="relative">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            placeholder="Password"
                            className="w-full p-2 pl-10 pr-10 rounded bg-gray-800 text-white placeholder-gray-500"
                        />
                        <div className="absolute left-2 top-2.5">
                            <LockClosedIcon className="w-5 h-5 text-gray-400" />
                        </div>
                        <div className="absolute right-2 top-2.5 cursor-pointer" onClick={togglePasswordVisibility}>
                            {showPassword ? <EyeIcon className="w-5 h-5 text-gray-400" /> : <EyeSlashIcon className="w-5 h-5 text-gray-400" />}
                        </div>
                    </div>
                    <button
                        type="submit"
                        className="w-full p-2 rounded bg-blue-500 text-white hover:bg-blue-600"
                    >
                        Sign In
                    </button>
                </form>
                <div className="text-right text-white mt-4">
                    <a href="#" className="text-sm">Forgot password?</a>
                    <br />
                    <a href="#" className="text-sm">Register</a>
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex w-full justify-center gap-2 py-2">
                <a href="#item1" className="btn btn-xs">1</a>
                <a href="#item2" className="btn btn-xs">2</a>
                <a href="#item3" className="btn btn-xs">3</a>
                <a href="#item4" className="btn btn-xs">4</a>
            </div>
        </div>
    );
};

export default Slider;
