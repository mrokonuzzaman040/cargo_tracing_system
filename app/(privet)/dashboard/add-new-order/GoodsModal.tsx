import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { GoodsFormValues } from '@/types/FormValues';

interface GoodsModalProps {
    isOpen: boolean;
    onRequestClose: () => void;
    onAddGoods: (goods: GoodsFormValues, imageUrl: string) => void;
}

const GoodsModal: React.FC<GoodsModalProps> = ({ isOpen, onRequestClose, onAddGoods }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<GoodsFormValues>();
    const [image, setImage] = useState<FileList | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState<boolean>(false);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files);
        }
    };

    const onSubmit: SubmitHandler<GoodsFormValues> = async (data) => {
        setIsUploading(true);
        if (image && image.length > 0) {
            const formData = new FormData();
            formData.append('file', image[0]);

            try {
                const uploadResponse = await axios.post('/api/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                const imageUrl = uploadResponse.data.imageUrl;
                setImageUrl(imageUrl);
                onAddGoods(data, imageUrl);
                reset();
                setImage(null);
                onRequestClose();
            } catch (error) {
                console.error('Error uploading image:', error);
                toast.error('Failed to upload image');
            } finally {
                setIsUploading(false);
            }
        } else {
            onAddGoods(data, '');
            reset();
            onRequestClose();
            setIsUploading(false);
        }
    };

    return isOpen ? (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white shadow-md rounded p-4 max-w-lg w-full">
                <h2 className="text-xl font-semibold mb-4">Add Goods</h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Domestic WB <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.domesticWb && 'border-red-500'}`}
                            {...register('domesticWb', { required: 'Domestic WB is required' })}
                        />
                        {errors.domesticWb && <p className="text-red-500 text-xs italic">{errors.domesticWb.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Nature of Goods <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.natureOfGoods && 'border-red-500'}`}
                            {...register('natureOfGoods', { required: 'Nature of goods is required' })}
                        />
                        {errors.natureOfGoods && <p className="text-red-500 text-xs italic">{errors.natureOfGoods.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Item Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.itemName && 'border-red-500'}`}
                            {...register('itemName', { required: 'Item name is required' })}
                        />
                        {errors.itemName && <p className="text-red-500 text-xs italic">{errors.itemName.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Weight</label>
                        <input className="border p-2 w-full" type="number" step="0.01" {...register('weight', { required: 'Weight is required' })} />
                        {errors.weight && <span className="text-red-500">{errors.weight.message}</span>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Declared Value</label>
                        <input className="border p-2 w-full" type="number" step="0.01" {...register('declaredValue', { required: 'Declared value is required' })} />
                        {errors.declaredValue && <span className="text-red-500">{errors.declaredValue.message}</span>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Count</label>
                        <input className="border p-2 w-full" type="number" {...register('count', { required: 'Count is required' })} />
                        {errors.count && <span className="text-red-500">{errors.count.message}</span>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Image</label>
                        <input
                            type="file"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            onChange={handleImageChange}
                        />
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
                            onClick={onRequestClose}
                        >
                            Cancel
                        </button>
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded" disabled={isUploading}>
                            {isUploading ? 'Uploading...' : 'Add Goods'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    ) : null;
};

export default GoodsModal;

