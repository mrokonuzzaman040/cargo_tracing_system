import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { FormValues } from '@/types/FormValues';

interface SenderInfoFormProps {
    register: UseFormRegister<FormValues>;
    errors: FieldErrors<FormValues>;
}

const SenderInfoForm: React.FC<SenderInfoFormProps> = ({ register, errors }) => {
    const getErrorMessage = (error: any): React.ReactNode => {
        if (error) {
            return <p className="text-red-500 text-xs italic">{error.message}</p>;
        }
        return null;
    };

    return (
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
    );
};

export default SenderInfoForm;
