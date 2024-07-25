import React, { useState } from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import Image from 'next/image';
import { FormValues, GoodsFormValues } from '@/types/FormValues';
import axios from 'axios';
import { toast } from 'react-toastify';

interface CargoInfoFormProps {
    register: UseFormRegister<FormValues>;
    errors: FieldErrors<FormValues>;
    goodsList: Array<GoodsFormValues & { imageUrl: string }>;
    addGoods: (goods: GoodsFormValues & { imageUrl: string }) => void;
}

const CargoInfoForm: React.FC<CargoInfoFormProps> = ({ goodsList, addGoods }) => {
    const [goodsData, setGoodsData] = useState<Array<GoodsFormValues & { imageUrl: string }>>([{
        domesticWb: '',
        natureOfGoods: '',
        itemName: '',
        weight: '',
        declaredValue: '',
        count: '',
        image: {} as FileList,
        imageUrl: '',
    }]);
    const [uploading, setUploading] = useState(false);

    const handleInputChange = (index: number, e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        const newGoodsData = [...goodsData];
        // @ts-ignore
        newGoodsData[index][name] = value;
        setGoodsData(newGoodsData);
    };

    const handleImageChange = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append('file', file);

            setUploading(true);
            try {
                const uploadResponse = await axios.post('/api/upload', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                const uploadedImageUrl = uploadResponse.data.imageUrl;
                const newGoodsData = [...goodsData];
                newGoodsData[index].image = e.target.files;
                newGoodsData[index].imageUrl = uploadedImageUrl;
                setGoodsData(newGoodsData);
                setUploading(false);
                toast.success('Image uploaded successfully');
            } catch (error) {
                console.error('Error uploading image:', error);
                toast.error('Failed to upload image');
                setUploading(false);
            }
        }
    };

    const handleSaveGoods = () => {
        goodsData.forEach(goods => addGoods(goods));
        setGoodsData([{
            domesticWb: '',
            natureOfGoods: '',
            itemName: '',
            weight: '',
            declaredValue: '',
            count: '',
            image: {} as FileList,
            imageUrl: '',
        }]);
    };

    const handleAddAnotherGoods = () => {
        setGoodsData([
            ...goodsData,
            {
                domesticWb: '',
                natureOfGoods: '',
                itemName: '',
                weight: '',
                declaredValue: '',
                count: '',
                image: {} as FileList,
                imageUrl: '',
            },
        ]);
    };

    return (
        <div className="border-b pb-4 mb-6">
            <h3 className="text-xl font-semibold mb-4">Cargo Information</h3>
            <p className="text-red-500 text-sm mb-4">
                Please fill out the customs value accurately, it may affect the destination clearance and cause penalties if it is a false declaration.
            </p>
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
                                    {goods.imageUrl && <Image src={goods.imageUrl} width={50} height={50} alt={goods.itemName} />}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {goodsData.map((goods, index) => (
                <div key={index} className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-4">
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Domestic WB <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="domesticWb"
                            value={goods.domesticWb}
                            onChange={(e) => handleInputChange(index, e)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Nature of Goods <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="natureOfGoods"
                            value={goods.natureOfGoods}
                            onChange={(e) => handleInputChange(index, e)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Item Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="itemName"
                            value={goods.itemName}
                            onChange={(e) => handleInputChange(index, e)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Weight <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="weight"
                            value={goods.weight}
                            onChange={(e) => handleInputChange(index, e)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Declared Value <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="declaredValue"
                            value={goods.declaredValue}
                            onChange={(e) => handleInputChange(index, e)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">
                            Count <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="count"
                            value={goods.count}
                            onChange={(e) => handleInputChange(index, e)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700 text-sm font-bold mb-2">Image</label>
                        <input
                            type="file"
                            name="image"
                            onChange={(e) => handleImageChange(index, e)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                        {uploading && <p className="text-blue-500 text-xs italic">Uploading...</p>}
                        {goods.imageUrl && <Image src={goods.imageUrl} width={50} height={50} alt="Goods Image" />}
                    </div>
                </div>
            ))}
            <button
                type="button"
                className="mt-4 bg-green-500 text-white py-2 px-4 rounded"
                onClick={handleSaveGoods}
            >
                Save Goods
            </button>
            <button
                type="button"
                className="mt-4 ml-4 bg-blue-500 text-white py-2 px-4 rounded"
                onClick={handleAddAnotherGoods}
            >
                Add Another Goods
            </button>
        </div>
    );
};

export default CargoInfoForm;
