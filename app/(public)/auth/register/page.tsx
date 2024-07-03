"use client"
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { EyeIcon, EyeSlashIcon, EnvelopeIcon, LockClosedIcon, UserIcon, PhoneIcon } from '@heroicons/react/24/outline';
import TopNavbar from '@/app/(components)/TopNavbar/TopNavbar';
import Navbar from '@/app/(components)/Navbar/Navbar';
import Footer from '@/app/(components)/Footer/Footer';

const Register = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const onSubmit = (data: any) => {
        // Handle registration logic here
        console.log(data);
    };

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    return (
        <div className="max-h-screen">
            <TopNavbar />
            <Navbar />
            <div className="container mx-auto max-w-4xl p-4">
                <div className="p-8 flex flex-col md:flex-row">
                    <div className="w-full md:w-2/3 p-4">
                        <h2 className="text-2xl font-bold mb-4">Register</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div className="relative">
                                <input
                                    {...register('contactName', { required: true })}
                                    type="text"
                                    placeholder="Contact name"
                                    className="w-full p-2 pl-10 rounded border"
                                />
                                <div className="absolute left-2 top-2.5">
                                    <UserIcon className="w-5 h-5 text-gray-400" />
                                </div>
                                {errors.contactName && <span className="text-red-500">Contact name is required</span>}
                            </div>
                            <div className="relative">
                                <input
                                    {...register('phone', { required: true })}
                                    type="text"
                                    placeholder="Phone"
                                    className="w-full p-2 pl-10 rounded border"
                                />
                                <div className="absolute left-2 top-2.5">
                                    <PhoneIcon className="w-5 h-5 text-gray-400" />
                                </div>
                                {errors.phone && <span className="text-red-500">Phone number is required</span>}
                            </div>
                            <div className="relative">
                                <input
                                    {...register('email', { required: true })}
                                    type="email"
                                    placeholder="Email"
                                    className="w-full p-2 pl-10 rounded border"
                                />
                                <div className="absolute left-2 top-2.5">
                                    <EnvelopeIcon className="w-5 h-5 text-gray-400" />
                                </div>
                                {errors.email && <span className="text-red-500">Email is required</span>}
                            </div>
                            <div className="relative">
                                <input
                                    {...register('password', { required: true })}
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
                                {errors.password && <span className="text-red-500">Password is required</span>}
                            </div>
                            <div className="relative">
                                <input
                                    {...register('confirmPassword', { required: true })}
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
                                {errors.confirmPassword && <span className="text-red-500">Confirmation password is required</span>}
                            </div>
                            <div className="flex items-center">
                                <input type="checkbox" {...register('agreement', { required: true })} />
                                <label className="ml-2 text-gray-600">I have read and accepted the <a href="#" className="text-blue-500">User Agreement</a></label>
                                {errors.agreement && <span className="text-red-500">You must accept the agreement</span>}
                            </div>
                            <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">Complete</button>
                        </form>
                        <div className="text-center mt-4">
                            <a href="/auth/signin" className="text-blue-500">I am a Member</a>
                        </div>
                    </div>
                    <div className="w-full md:w-1/3 flex items-center justify-center">
                        <img src="https://img.daisyui.com/images/stock/photo-1609621838510-5ad474b7d25d.jpg" alt="IAExp Logo" className="h-40" />
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Register;