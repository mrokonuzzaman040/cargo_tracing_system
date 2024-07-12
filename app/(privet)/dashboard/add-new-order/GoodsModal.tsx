import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import Modal from 'react-modal';

interface GoodsFormValues {
    domesticWb: string;
    natureOfGoods: string;
    itemName: string;
    weight: string;
    declaredValue: string;
    count: string;
    image: FileList;
}

interface GoodsModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onAddGoods: (data: GoodsFormValues) => void;
}

const GoodsModal: React.FC<GoodsModalProps> = ({ isOpen, onRequestClose, onAddGoods }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<GoodsFormValues>();

    const onSubmit: SubmitHandler<GoodsFormValues> = async (data) => {
        const formData = new FormData();
        formData.append('domesticWb', data.domesticWb);
        formData.append('natureOfGoods', data.natureOfGoods);
        formData.append('itemName', data.itemName);
        formData.append('weight', data.weight);
        formData.append('declaredValue', data.declaredValue);
        formData.append('count', data.count);
        if (data.image && data.image.length > 0) {
            formData.append('image', data.image[0]);
        }

        const image = data.image[0];

        try {
            const response = await axios.post('/api/upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data); // Handle success response
            onAddGoods(data);
            onRequestClose();
        } catch (error) {
            console.error('Error uploading file:', error);
        }
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
            <h2 className="text-2xl font-bold mb-4">Add Goods</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">DOMESTIC WB</label>
                    <input
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        {...register('domesticWb', { required: 'This field is required' })}
                    />
                    {errors.domesticWb && <p className="text-red-500 text-xs italic">{errors.domesticWb.message}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Nature of Goods</label>
                    <input
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        {...register('natureOfGoods', { required: 'This field is required' })}
                    />
                    {errors.natureOfGoods && <p className="text-red-500 text-xs italic">{errors.natureOfGoods.message}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Item Name</label>
                    <input
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        {...register('itemName', { required: 'This field is required' })}
                    />
                    {errors.itemName && <p className="text-red-500 text-xs italic">{errors.itemName.message}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Weight</label>
                    <input
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        {...register('weight', { required: 'This field is required' })}
                    />
                    {errors.weight && <p className="text-red-500 text-xs italic">{errors.weight.message}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Declared Value</label>
                    <input
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        {...register('declaredValue', { required: 'This field is required' })}
                    />
                    {errors.declaredValue && <p className="text-red-500 text-xs italic">{errors.declaredValue.message}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Count</label>
                    <input
                        type="text"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        {...register('count', { required: 'This field is required' })}
                    />
                    {errors.count && <p className="text-red-500 text-xs italic">{errors.count.message}</p>}
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2">Image</label>
                    <input
                        type="file"
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        {...register('image', { required: 'This field is required' })}
                    />
                    {errors.image && <p className="text-red-500 text-xs italic">{errors.image.message}</p>}
                </div>
                <div className="text-right">
                    <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">Add Goods</button>
                </div>
            </form>
        </Modal>
    );
};

export default GoodsModal;
