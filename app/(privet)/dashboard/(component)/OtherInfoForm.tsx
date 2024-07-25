import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { FormValues } from '@/types/FormValues';

interface OtherInfoFormProps {
    register: UseFormRegister<FormValues>;
    errors: FieldErrors<FormValues>;
    estimatedFee?: string;
}

const OtherInfoForm: React.FC<OtherInfoFormProps> = ({ register, errors, estimatedFee }) => {
    const getErrorMessage = (error: any): React.ReactNode => {
        if (error) {
            return <p className="text-red-500 text-xs italic">{error.message}</p>;
        }
        return null;
    };

    return (
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
                        <option value="air">Air Express</option>
                        <option value="sea">Sea</option>
                        <option value="land">Land</option>
                    </select>
                    {getErrorMessage(errors.shippingMethod)}
                </div>
            </div>
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
        </div>
    );
};

export default OtherInfoForm;
