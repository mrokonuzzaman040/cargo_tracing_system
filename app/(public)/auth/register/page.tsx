"use client";

import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { EyeIcon, EyeSlashIcon, EnvelopeIcon, LockClosedIcon, UserIcon, PhoneIcon } from '@heroicons/react/24/outline';

interface FormData {
    contactName: string;
    phone: string;
    email: string;
    password: string;
    confirmPassword: string;
    agreement: boolean;
}

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');

    const onSubmit: SubmitHandler<FormData> = async (data) => {
        setLoading(true);
        setMessage('');

        if (data.password !== data.confirmPassword) {
            setMessage('Passwords do not match');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Something went wrong');
            }

            setMessage('Registration successful');
        } catch (error: any) {
            setMessage(error.message);
        } finally {
            setLoading(false);
        }
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="container mx-auto max-w-4xl p-4">
            <div className="bg-white shadow-md rounded p-8 flex flex-col md:flex-row">
                <div className="w-full md:w-2/3 p-4">
                    <h2 className="text-2xl font-bold mb-4">Register</h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className="relative">
                            <input
                                {...register('contactName', { required: 'Contact name is required' })}
                                type="text"
                                placeholder="Contact name"
                                className="w-full p-2 pl-10 rounded border"
                            />
                            <div className="absolute left-2 top-2.5">
                                <UserIcon className="w-5 h-5 text-gray-400" />
                            </div>
                            {errors.contactName && <span className="text-red-500">{errors.contactName.message}</span>}
                        </div>
                        <div className="relative">
                            <input
                                {...register('phone', {
                                    required: 'Phone number is required',
                                    pattern: {
                                        value: /^\+\d{1,2} \(\d{3}\) \d{3}-\d{4}$/,
                                        message: 'Invalid phone number format. Expected format: +1 (125) 941-9489',
                                    },
                                })}
                                type="text"
                                placeholder="Phone"
                                className="w-full p-2 pl-10 rounded border"
                            />
                            <div className="absolute left-2 top-2.5">
                                <PhoneIcon className="w-5 h-5 text-gray-400" />
                            </div>
                            {errors.phone && <span className="text-red-500">{errors.phone.message}</span>}
                        </div>
                        <div className="relative">
                            <input
                                {...register('email', {
                                    required: 'Email is required',
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: 'Invalid email address',
                                    },
                                })}
                                type="email"
                                placeholder="Email"
                                className="w-full p-2 pl-10 rounded border"
                            />
                            <div className="absolute left-2 top-2.5">
                                <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                            </div>
                            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                        </div>
                        <div className="relative">
                            <input
                                {...register('password', {
                                    required: 'Password is required',
                                    pattern: {
                                        value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                                        message: 'Password must be at least 8 characters long, include an uppercase letter, a number, and a special character',
                                    },
                                })}
                                type={showPassword ? 'text' : 'password'}
                                placeholder="Password"
                                className="w-full p-2 pl-10 pr-10 rounded border"
                            />
                            <div className="absolute left-2 top-2.5">
                                <LockClosedIcon className="w-5 h-5 text-gray-400" />
                            </div>
                            <div className="absolute right-2 top-2.5 cursor-pointer" onClick={togglePasswordVisibility}>
                                {showPassword ? <EyeIcon className="w-5 h-5 text-gray-400" /> : <EyeSlashIcon className="w-5 h-5 text-gray-400" />}
                            </div>
                            {errors.password && <span className="text-red-500">{errors.password.message}</span>}
                        </div>
                        <div className="relative">
                            <input
                                {...register('confirmPassword', {
                                    required: 'Confirmation password is required',
                                })}
                                type={showConfirmPassword ? 'text' : 'password'}
                                placeholder="Confirm Password"
                                className="w-full p-2 pl-10 pr-10 rounded border"
                            />
                            <div className="absolute left-2 top-2.5">
                                <LockClosedIcon className="w-5 h-5 text-gray-400" />
                            </div>
                            <div className="absolute right-2 top-2.5 cursor-pointer" onClick={toggleConfirmPasswordVisibility}>
                                {showConfirmPassword ? <EyeIcon className="w-5 h-5 text-gray-400" /> : <EyeSlashIcon className="w-5 h-5 text-gray-400" />}
                            </div>
                            {errors.confirmPassword && <span className="text-red-500">{errors.confirmPassword.message}</span>}
                        </div>
                        <div className="flex items-center">
                            <input type="checkbox" {...register('agreement', { required: 'You must accept the agreement' })} />
                            <label className="ml-2 text-gray-600">I have read and accepted the <a href="#" className="text-blue-500">User Agreement</a></label>
                            {errors.agreement && <span className="text-red-500">{errors.agreement.message}</span>}
                        </div>
                        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600" disabled={loading}>
                            {loading ? 'Loading...' : 'Complete'}
                        </button>
                    </form>
                    {message && <p className="mt-4 text-red-500">{message}</p>}
                    <div className="text-center mt-4">
                        <a href="/auth/signin" className="text-blue-500">I am a Member</a>
                    </div>
                </div>
                <div className="w-full md:w-1/3 flex items-center justify-center">
                    <img src="/path-to-your-logo.png" alt="IAExp Logo" className="h-40" />
                </div>
            </div>
        </div>
    );
};

export default Register;
