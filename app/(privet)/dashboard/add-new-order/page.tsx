"use client";

import React, { useState } from 'react';
import { useForm, FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import axios from 'axios';
import Modal from 'react-modal';

type FormValues = {
    sender: any;
    receiver: any;
    senderName: string;
    senderPhonePrefix: string;
    senderPhone: string;
    senderAddress: string;
    receiverName: string;
    receiverPhonePrefix: string;
    receiverPhone: string;
    country: string;
    city: string;
    street: string;
    district?: string;
    company?: string;
    deliveryMethod: string;
    pickupAddress: string;
    payment: string;
    shippingMethod: string;
    terms: boolean;
    estimatedFee?: string;
};

const Page: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [orderData, setOrderData] = useState<FormValues | null>(null);

    const onSubmit = async (data: FormValues) => {
        try {
            const response = await axios.post('/api/orders', data);
            setOrderData(response.data.order);
            setIsModalOpen(true);
        } catch (error) {
            console.error('Error saving order:', error);
        }
    };

    const getErrorMessage = (
        error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined,
    ): React.ReactNode => {
        if (error) {
            // @ts-ignore   
            return <p className="text-red-500 text-xs italic">{error.message}</p>;
        }
        return null;
    };


    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl font-bold mb-6">Order Information</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                {/* Sender Information */}
                <div className="border-b pb-4 mb-6">
                    <h3 className="text-xl font-semibold mb-4">Sender Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Name <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.senderName && 'border-red-500'}`}
                                {...register('senderName', { required: 'Name is required' })}
                            />
                            {getErrorMessage(errors.senderName)}
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Phone <span className="text-red-500">*</span></label>
                            <div className="flex">
                                <input
                                    type="text"
                                    className={`shadow appearance-none border rounded-l w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.senderPhonePrefix && 'border-red-500'}`}
                                    placeholder="+86"
                                    {...register('senderPhonePrefix', { required: 'Phone prefix is required' })}
                                />
                                <input
                                    type="text"
                                    className={`shadow appearance-none border rounded-r w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.senderPhone && 'border-red-500'}`}
                                    {...register('senderPhone', { required: 'Phone is required' })}
                                />
                            </div>
                            {getErrorMessage(errors.senderPhone)}
                        </div>
                        <div className="sm:col-span-2">
                            <label className="block text-gray-700 text-sm font-bold mb-2">Address <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.senderAddress && 'border-red-500'}`}
                                {...register('senderAddress', { required: 'Address is required' })}
                            />
                            {getErrorMessage(errors.senderAddress)}
                        </div>
                    </div>
                </div>

                {/* Receiver Information */}
                <div className="border-b pb-4 mb-6">
                    <h3 className="text-xl font-semibold mb-4">Receiver Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Country <span className="text-red-500">*</span></label>
                            <select
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.country && 'border-red-500'}`}
                                {...register('country', { required: 'Country is required' })}
                            >
                                <option value="">Select Country</option>
                            </select>
                            {getErrorMessage(errors.country)}
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">City <span className="text-red-500">*</span></label>
                            <select
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.city && 'border-red-500'}`}
                                {...register('city', { required: 'City is required' })}
                            >
                                <option value="">Select City</option>
                            </select>
                            {getErrorMessage(errors.city)}
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Street <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.street && 'border-red-500'}`}
                                {...register('street', { required: 'Street is required' })}
                            />
                            {getErrorMessage(errors.street)}
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">District</label>
                            <input
                                type="text"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                {...register('district')}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Company</label>
                            <input
                                type="text"
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                {...register('company')}
                            />
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Name <span className="text-red-500">*</span></label>
                            <input
                                type="text"
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.receiverName && 'border-red-500'}`}
                                {...register('receiverName', { required: 'Receiver name is required' })}
                            />
                            {getErrorMessage(errors.receiverName)}
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Phone <span className="text-red-500">*</span></label>
                            <div className="flex">
                                <input
                                    type="text"
                                    className={`shadow appearance-none border rounded-l w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.receiverPhonePrefix && 'border-red-500'}`}
                                    placeholder="+86"
                                    {...register('receiverPhonePrefix', { required: 'Phone prefix is required' })}
                                />
                                <input
                                    type="text"
                                    className={`shadow appearance-none border rounded-r w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.receiverPhone && 'border-red-500'}`}
                                    {...register('receiverPhone', { required: 'Phone is required' })}
                                />
                            </div>
                            {getErrorMessage(errors.receiverPhone)}
                        </div>
                    </div>
                </div>

                {/* Cargo Information */}
                <div className="border-b pb-4 mb-6">
                    <h3 className="text-xl font-semibold mb-4">Cargo Information</h3>
                    <p className="text-red-500 text-sm mb-4">Please fill out the customs value accurately, it may affect the destination clearance and cause penalties if it is a false declaration.</p>
                    <div className="overflow-x-auto">
                        <table className="min-w-full border-collapse border">
                            <thead>
                                <tr className="bg-blue-500 text-white">
                                    <th className="py-2 px-4 border">DOMESTIC WB</th>
                                    <th className="py-2 px-4 border">Nature of goods</th>
                                    <th className="py-2 px-4 border">Item name</th>
                                    <th className="py-2 px-4 border">Weight</th>
                                    <th className="py-2 px-4 border">Declared value</th>
                                    <th className="py-2 px-4 border">Count</th>
                                    <th className="py-2 px-4 border">Operate</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Add dynamic rows here */}
                            </tbody>
                        </table>
                    </div>
                    <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded">Add goods</button>
                </div>

                {/* Other Information */}
                <div className="border-b pb-4 mb-6">
                    <h3 className="text-xl font-semibold mb-4">Other Information</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Delivery method <span className="text-red-500">*</span></label>
                            <select
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.deliveryMethod && 'border-red-500'}`}
                                {...register('deliveryMethod', { required: 'Delivery method is required' })}
                            >
                                <option value="">Select Delivery Method</option>
                            </select>
                            {getErrorMessage(errors.deliveryMethod)}
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Pick-up Address <span className="text-red-500">*</span></label>
                            <select
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.pickupAddress && 'border-red-500'}`}
                                {...register('pickupAddress', { required: 'Pick-up address is required' })}
                            >
                                <option value="">Select Pick-up Address</option>
                            </select>
                            {getErrorMessage(errors.pickupAddress)}
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Payment <span className="text-red-500">*</span></label>
                            <select
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.payment && 'border-red-500'}`}
                                {...register('payment', { required: 'Payment is required' })}
                            >
                                <option value="">Select Payment</option>
                            </select>
                            {getErrorMessage(errors.payment)}
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Shipping Method <span className="text-red-500">*</span></label>
                            <select
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.shippingMethod && 'border-red-500'}`}
                                {...register('shippingMethod', { required: 'Shipping method is required' })}
                            >
                                <option value="">Select Shipping Method</option>
                            </select>
                            {getErrorMessage(errors.shippingMethod)}
                        </div>
                    </div>
                </div>

                {/* Agreement and Submit */}
                <div className="flex items-center mb-6">
                    <input
                        type="checkbox"
                        id="terms"
                        className={`mr-2 leading-tight ${errors.terms && 'border-red-500'}`}
                        {...register('terms', { required: 'You must agree to the terms' })}
                    />
                    <label htmlFor="terms" className="text-gray-700 text-sm font-bold">I have read and agree to (Express Contract Terms)</label>
                    {getErrorMessage(errors.terms)}
                </div>

                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Estimated fee</label>
                    <input
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        {...register('estimatedFee')}
                    />
                </div>

                <div className="text-right">
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Submit</button>
                </div>
            </form>

            {orderData && (
                <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
                    <h2 className="text-2xl font-bold mb-4">Order Submitted</h2>
                    <div className="mb-4">
                        <h3 className="text-xl font-semibold mb-2">Sender Information</h3>
                        <p>Name: {orderData.sender.name}</p>
                        <p>Phone: {orderData.sender.phonePrefix} {orderData.sender.phone}</p>
                        <p>Address: {orderData.sender.address}</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-xl font-semibold mb-2">Receiver Information</h3>
                        <p>Name: {orderData.receiver.name}</p>
                        <p>Phone: {orderData.receiver.phonePrefix} {orderData.receiver.phone}</p>
                        <p>Country: {orderData.receiver.country}</p>
                        <p>City: {orderData.receiver.city}</p>
                        <p>Street: {orderData.receiver.street}</p>
                        <p>District: {orderData.receiver.district}</p>
                        <p>Company: {orderData.receiver.company}</p>
                    </div>
                    <div className="mb-4">
                        <h3 className="text-xl font-semibold mb-2">Other Information</h3>
                        <p>Delivery Method: {orderData.deliveryMethod}</p>
                        <p>Pick-up Address: {orderData.pickupAddress}</p>
                        <p>Payment: {orderData.payment}</p>
                        <p>Shipping Method: {orderData.shippingMethod}</p>
                        <p>Estimated Fee: {orderData.estimatedFee}</p>
                    </div>
                    <button onClick={() => setIsModalOpen(false)} className="bg-blue-500 text-white py-2 px-4 rounded">Close</button>
                </Modal>
            )}
        </div>
    );
};

export default Page;