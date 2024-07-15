import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface GoodsFormValues {
    domesticWb: string;
    natureOfGoods: string;
    itemName: string;
    weight: string;
    declaredValue: string;
    count: string;
    image: FileList;
}

const GoodsModal: React.FC<{
    isOpen: boolean;
    onRequestClose: () => void;
    onAddGoods: (goods: GoodsFormValues, imageUrl: string) => void;
}> = ({ isOpen, onRequestClose, onAddGoods }) => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm<GoodsFormValues>();
    const [image, setImage] = useState<FileList | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImage(e.target.files);
        }
    };

    const onSubmit: SubmitHandler<GoodsFormValues> = async (data) => {
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
            }
        } else {
            onAddGoods(data, '');
            reset();
            onRequestClose();
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
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Weight <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.weight && 'border-red-500'}`}
                            {...register('weight', { required: 'Weight is required' })}
                        />
                        {errors.weight && <p className="text-red-500 text-xs italic">{errors.weight.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Declared Value <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.declaredValue && 'border-red-500'}`}
                            {...register('declaredValue', { required: 'Declared value is required' })}
                        />
                        {errors.declaredValue && <p className="text-red-500 text-xs italic">{errors.declaredValue.message}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Count <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.count && 'border-red-500'}`}
                            {...register('count', { required: 'Count is required' })}
                        />
                        {errors.count && <p className="text-red-500 text-xs italic">{errors.count.message}</p>}
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
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
                            Add
                        </button>
                    </div>
                </form>
            </div>
        </div>
    ) : null;
};

export default GoodsModal;
