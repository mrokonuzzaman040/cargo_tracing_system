import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { FormValues } from '@/types/FormValues';

interface ReceiverInfoFormProps {
    register: UseFormRegister<FormValues>;
    errors: FieldErrors<FormValues>;
}

const ReceiverInfoForm: React.FC<ReceiverInfoFormProps> = ({ register, errors }) => {
    const getErrorMessage = (error: any): React.ReactNode => {
        if (error) {
            return <p className="text-red-500 text-xs italic">{error.message}</p>;
        }
        return null;
    };

    return (
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
                        <option value="Éthiopie">Éthiopie</option>
                        <option value="Tanzanie">Tanzanie</option>
                        <option value="Nigeria">Nigeria</option>
                        <option value="Ghana">Ghana</option>
                        <option value="Zambie">Zambie</option>
                        <option value="Congo (RDC)">Congo (RDC)</option>
                        <option value="République du Congo">République du Congo</option>
                        <option value="Cameroun">Cameroun</option>
                        <option value="Djibouti">Djibouti</option>
                        <option value="Côte d'Ivoire">Côte d&apos;Ivoire</option>
                        <option value="Mali">Mali</option>
                        <option value="Gabon">Gabon</option>
                        <option value="Rwanda">Rwanda</option>
                        <option value="Guinée Équatoriale">Guinée Équatoriale</option>
                        <option value="Sénégal">Sénégal</option>
                        <option value="Madagascar">Madagascar</option>
                        <option value="Malawi">Malawi</option>
                        <option value="Guinée">Guinée</option>
                        <option value="Burkina Faso">Burkina Faso</option>
                        <option value="Bénin">Bénin</option>
                        <option value="Afrique du Sud">Afrique du Sud</option>
                        <option value="Niger">Niger</option>
                        <option value="Botswana">Botswana</option>
                        <option value="Tchad">Tchad</option>
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
                        <option value="Addis-Abeba">Addis-Abeba</option>
                        <option value="Dodoma">Dodoma</option>
                        <option value="Abuja">Abuja</option>
                        <option value="Accra">Accra</option>
                        <option value="Lusaka">Lusaka</option>
                        <option value="Kinshasa">Kinshasa</option>
                        <option value="Brazzaville">Brazzaville</option>
                        <option value="Yaoundé">Yaoundé</option>
                        <option value="Djibouti">Djibouti</option>
                        <option value="Yamoussoukro">Yamoussoukro</option>
                        <option value="Bamako">Bamako</option>
                        <option value="Libreville">Libreville</option>
                        <option value="Kigali">Kigali</option>
                        <option value="Malabo">Malabo</option>
                        <option value="Dakar">Dakar</option>
                        <option value="Antananarivo">Antananarivo</option>
                        <option value="Lilongwe">Lilongwe</option>
                        <option value="Conakry">Conakry</option>
                        <option value="Ouagadougou">Ouagadougou</option>
                        <option value="Porto-Novo">Porto-Novo</option>
                        <option value="Pretoria">Pretoria</option>
                        <option value="Niamey">Niamey</option>
                        <option value="Gaborone">Gaborone</option>
                        <option value="N'Djamena">N&apos;Djamena</option>
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
    );
};

export default ReceiverInfoForm;
