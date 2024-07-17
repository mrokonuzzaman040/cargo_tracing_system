"use client";
import React, { useState, useEffect } from 'react';
import { useForm, FieldError, FieldErrorsImpl, Merge } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import GoodsModal from './GoodsModal';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

type FormValues = {
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
    goodsList: Array<GoodsFormValues & { imageUrl: string }>;
    state?: string;
};

interface GoodsFormValues {
    domesticWb: string;
    natureOfGoods: string;
    itemName: string;
    weight: string;
    declaredValue: string;
    count: string;
    image: FileList;
}

const Page: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm<FormValues>();
    const [isGoodsModalOpen, setIsGoodsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [goodsList, setGoodsList] = useState<Array<GoodsFormValues & { imageUrl: string }>>([]);
    const [estimatedFee, setEstimatedFee] = useState<string | undefined>(undefined);
    const router = useRouter();

    const watchedCountry = watch('country');
    const watchedCity = watch('city');
    const watchedState = watch('state');

    useEffect(() => {
        const fetchEstimatedFee = async () => {
            if (watchedCountry && watchedCity && watchedState) {
                try {
                    const response = await axios.get(`/api/order/fare-cost`, {
                        params: {
                            country: watchedCountry,
                            city: watchedCity,
                            state: watchedState,
                        },
                    });
                    setEstimatedFee(response.data.fareCost);
                } catch (error) {
                    console.error('Error fetching fare cost:', error);
                    toast.error('Failed to fetch fare cost');
                }
            }
        };

        fetchEstimatedFee();
    }, [watchedCountry, watchedCity, watchedState]);

    const onSubmit = async (data: FormValues) => {
        setLoading(true);
        data.goodsList = goodsList;
        data.estimatedFee = estimatedFee;
        try {
            const response = await axios.post('/api/orders', data);
            if (response.status === 201) {
                toast.success('Order submitted successfully');
                setTimeout(() => {
                    router.push('/dashboard/order-history');
                }, 1500);
            }
        } catch (error) {
            console.error('Error saving order:', error);
            toast.error('Failed to submit order');
        } finally {
            setLoading(false);
        }
    };

    const getErrorMessage = (
        error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined,
    ): React.ReactNode => {
        if (error) {
            return <p className="text-red-500 text-xs italic">
                {/* @ts-ignore */}
                {error.message}
            </p>;
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
                                <select
                                    className={`shadow appearance-none border rounded-l w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.senderPhonePrefix && 'border-red-500'}`}
                                    {...register('senderPhonePrefix', { required: 'Phone prefix is required' })}
                                >
                                    <option value="+86">+86</option>
                                    <option value="+1">+1</option>
                                    <option value="+44">+44</option>
                                    <option value="+49">+49</option>
                                    <option value="+81">+81</option>
                                    <option value="+82">+82</option>
                                </select>
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
                                <option value="china">China</option>
                                <option value="usa">USA</option>
                                <option value="uk">UK</option>
                                <option value="germany">Germany</option>
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
                                <option value="beijing">Beijing</option>
                                <option value="shanghai">Shanghai</option>
                                <option value="new-york">New York</option>
                                <option value="london">London</option>
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
                                <select
                                    className={`shadow appearance-none border rounded-l w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.receiverPhonePrefix && 'border-red-500'}`}
                                    {...register('receiverPhonePrefix', { required: 'Phone prefix is required' })}
                                >
                                    <option value="+86">+86</option>
                                    <option value="+1">+1</option>
                                    <option value="+44">+44</option>
                                    <option value="+49">+49</option>
                                    <option value="+81">+81</option>
                                    <option value="+82">+82</option>
                                </select>
                                <input
                                    type="text"
                                    className={`shadow appearance-none border rounded-r w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.receiverPhone && 'border-red-500'}`}
                                    {...register('receiverPhone', {
                                        required: 'Phone is required',
                                        pattern: {
                                            value: /^[0-9]{10}$/,
                                            message: 'Invalid phone number'
                                        }
                                    })}
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
                                    <th className="py-2 px-4 border">Image</th>
                                </tr>
                            </thead>
                            <tbody>
                                {goodsList.map((goods, index) => (
                                    <tr key={index}>
                                        <td className="py-2 px-4 border">{goods.domesticWb}</td>
                                        <td className="py-2 px-4 border">{goods.natureOfGoods}</td>
                                        <td className="py-2 px-4 border">{goods.itemName}</td>
                                        <td className="py-2 px-4 border">{goods.weight}</td>
                                        <td className="py-2 px-4 border">{goods.declaredValue}</td>
                                        <td className="py-2 px-4 border">{goods.count}</td>
                                        <td className="py-2 px-4 border">
                                            {/* <img src={`/uploads/${goods.imageUrl}`} alt={goods.itemName} className="h-16" /> */}
                                            <Image src={`/uploads/${goods.imageUrl}`} alt={goods.itemName} width={50} height={50} />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <button type="button" className="mt-4 bg-blue-500 text-white py-2 px-4 rounded" onClick={() => setIsGoodsModalOpen(true)}>Add goods</button>
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
                                <option value="door-to-door">Door to Door</option>
                                <option value="door-to-port">Door to Port</option>
                                <option value="port-to-port">Port to Port</option>
                                <option value="port-to-door">Port to Door</option>
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
                                <option value="beijing">Beijing</option>
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
                                <option value="cash">Cash</option>
                                <option value="credit-card">Credit Card</option>
                                <option value="bank-transfer">Bank Transfer</option>
                                <option value="paypal">Paypal</option>
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
                                <option value="air">Air</option>
                                <option value="sea">Sea</option>
                                <option value="land">Land</option>
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
                        disabled
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        value={estimatedFee || ''}
                    />
                </div>

                <div className="text-right">
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                        {loading ? 'Loading...' : 'Submit Order'}
                    </button>
                </div>
            </form>

            {/* <GoodsModal isOpen={isGoodsModalOpen} onRequestClose={() => setIsGoodsModalOpen(false)}
               onAddGoods={addGnoods} /> */}
        </div>
    );
};

export default Page;
