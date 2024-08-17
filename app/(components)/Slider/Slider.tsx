'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { EyeIcon, EyeSlashIcon, EnvelopeIcon, LockClosedIcon } from '@heroicons/react/24/outline';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';


const Slider = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
                const { token } = data || {};

                if (token) {
                    const decodedToken = jwtDecode<{ role: string }>(token);
                    const { role } = decodedToken;

                    if (role === 'admin') {
                        router.push('/admin-dashboard');
                    } else if (role === 'rider') {
                        router.push('/rider-dashboard');
                    } else if (role === 'user') {
                        router.push('/dashboard');
                    }
                } else {
                    setError('Login failed. No token received.');
                }
            } else if (response.status === 401) {
                // Redirect to verify page if user is not verified
                router.push('/verify');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="relative w-full mx-auto max-w-7xl">
            {/* Slider */}
            <div data-hs-carousel='{
    "loadingClasses": "opacity-0"
  }' className="relative">
                <div className="hs-carousel relative overflow-hidden w-full min-h-96 bg-white">
                    <div className="hs-carousel-body absolute top-0 bottom-0 start-0 flex flex-nowrap transition-transform duration-700 opacity-0">
                        <div className="hs-carousel-slide">
                            <div className="flex justify-center h-full bg-gray-100 p-6 dark:bg-neutral-900">
                                <span className="self-center text-4xl text-gray-800 transition duration-700 dark:text-white">First slide</span>
                            </div>
                        </div>
                        <div className="hs-carousel-slide">
                            <div className="flex justify-center h-full bg-gray-200 p-6 dark:bg-neutral-800">
                                <span className="self-center text-4xl text-gray-800 transition duration-700 dark:text-white">Second slide</span>
                            </div>
                        </div>
                        <div className="hs-carousel-slide">
                            <div className="flex justify-center h-full bg-gray-300 p-6 dark:bg-neutral-700">
                                <span className="self-center text-4xl text-gray-800 transition duration-700 dark:text-white">Third slide</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="hs-carousel-pagination flex justify-center absolute bottom-3 start-0 end-0 space-x-2">
                    <span className="hs-carousel-active:bg-blue-700 hs-carousel-active:border-blue-700 size-3 border border-gray-400 rounded-full cursor-pointer dark:border-neutral-600 dark:hs-carousel-active:bg-blue-500 dark:hs-carousel-active:border-blue-500"></span>
                    <span className="hs-carousel-active:bg-blue-700 hs-carousel-active:border-blue-700 size-3 border border-gray-400 rounded-full cursor-pointer dark:border-neutral-600 dark:hs-carousel-active:bg-blue-500 dark:hs-carousel-active:border-blue-500"></span>
                    <span className="hs-carousel-active:bg-blue-700 hs-carousel-active:border-blue-700 size-3 border border-gray-400 rounded-full cursor-pointer dark:border-neutral-600 dark:hs-carousel-active:bg-blue-500 dark:hs-carousel-active:border-blue-500"></span>
                </div>
            </div>

            {/* Login Form */}
            <div className="absolute top-0 right-0 bg-gray-900 bg-opacity-70 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 h-full flex flex-col justify-center p-4 sm:p-8">
                <h2 className="text-white text-2xl mb-6">Log In</h2>
                {error && <p className="text-red-500">{error}</p>}
                <form className="space-y-4" onSubmit={handleLogin}>
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Email or phone"
                            className="w-full p-2 pl-10 rounded bg-gray-800 text-white placeholder-gray-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
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
                        disabled={loading}
                    >
                        {loading ? 'Signing In...' : 'Sign In'}
                    </button>
                </form>
                <div className="text-right text-white mt-4">
                    <a href="/auth/forgot-password" className="text-sm text-blue-500 hover:underline">
                        Forgot password?
                    </a>
                    <br />
                    <a href="/auth/register" className="text-sm">Register</a>
                </div>
            </div>
        </div>
    );
};

export default Slider;
