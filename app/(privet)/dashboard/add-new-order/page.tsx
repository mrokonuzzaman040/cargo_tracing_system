"use client";
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CargoInfoForm from '../(component)/CargoInfoForm';
import SenderReceiverForm from '../(component)/SenderInfoForm';
import { FormValues, GoodsFormValues } from '@/types/FormValues';
import { useRouter } from 'next/navigation';

const Page: React.FC = () => {
    const { register, handleSubmit, formState: { errors }, watch } = useForm<FormValues>();
    const [goodsList, setGoodsList] = useState<Array<GoodsFormValues & { imageUrl: string }>>([]);
    const [estimatedFee, setEstimatedFee] = useState<string | undefined>(undefined);
    const router = useRouter();

    const watchedCountry = watch('country');
    const watchedCity = watch('city');

    useEffect(() => {
        const calculateEstimatedFee = async () => {
            try {
                const response = await axios.get('/api/shipping-rates', {
                    params: {
                        country: watchedCountry,
                        city: watchedCity,
                    },
                });
                const rate = response.data.rate;
                const totalWeight = goodsList.reduce((sum, goods) => sum + parseFloat(goods.weight), 0);
                const fee = (totalWeight * rate).toFixed(2);
                setEstimatedFee(fee);
            } catch (error) {
                console.error('Error fetching shipping rates:', error);
            }
        };

        if (watchedCountry && watchedCity) {
            calculateEstimatedFee();
        }
    }, [watchedCountry, watchedCity, goodsList]);

    const onSubmit = async (data: FormValues) => {
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
        }
    };

    const addGoods = (goods: GoodsFormValues & { imageUrl: string }) => {
        setGoodsList([...goodsList, goods]);
    };

    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl font-bold mb-6">Order Information</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <SenderReceiverForm register={register} errors={errors} />

                <CargoInfoForm
                    register={register}
                    errors={errors}
                    goodsList={goodsList}
                    addGoods={addGoods}
                />

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
                                <option value="door-to-door">Door to Door</option>
                                <option value="door-to-port">Door to Port</option>
                                <option value="port-to-port">Port to Port</option>
                                <option value="port-to-door">Port to Door</option>
                            </select>
                            {errors.deliveryMethod && <p className="text-red-500 text-xs italic">{errors.deliveryMethod.message}</p>}
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
                            {errors.pickupAddress && <p className="text-red-500 text-xs italic">{errors.pickupAddress.message}</p>}
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
                            {errors.payment && <p className="text-red-500 text-xs italic">{errors.payment.message}</p>}
                        </div>
                        <div>
                            <label className="block text-gray-700 text-sm font-bold mb-2">Shipping Method <span className="text-red-500">*</span></label>
                            <select
                                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.shippingMethod && 'border-red-500'}`}
                                {...register('shippingMethod', { required: 'Shipping method is required' })}
                            >
                                <option value="">Select Shipping Method</option>
                                <option value="air">Air Express</option>
                                <option value="sea">Sea</option>
                                <option value="land">Land</option>
                            </select>
                            {errors.shippingMethod && <p className="text-red-500 text-xs italic">{errors.shippingMethod.message}</p>}
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
                    {errors.terms && <p className="text-red-500 text-xs italic">{errors.terms.message}</p>}
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
                        Submit Order
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Page;
