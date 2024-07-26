"use client";
import React, { useState, useEffect } from "react";
import { useForm, FieldError, FieldErrorsImpl, Merge } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Image from "next/image";
import GoodsModal from "./GoodsModal";
import { GoodsFormValues, FormValues } from "@/types/FormValues";

const Page: React.FC = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm<FormValues>();
  const [loading, setLoading] = useState(false);
  const [goodsList, setGoodsList] = useState<Array<GoodsFormValues & { imageUrl: string }>>([]);
  const [estimatedFee, setEstimatedFee] = useState<string | undefined>(undefined);
  const [phonePrefixes, setPhonePrefixes] = useState([]);
  const [countriesCities, setCountriesCities] = useState<any>({});
  const [isGoodsModalOpen, setIsGoodsModalOpen] = useState(false);
  const router = useRouter();

  const watchedCountry = watch("country");
  const watchedCity = watch("city");

  useEffect(() => {
    const fetchPhonePrefixes = async () => {
      const response = await axios.get("/api/common/phone-prefixes");
      setPhonePrefixes(response.data.phonePrefixes);
    };
    fetchPhonePrefixes();

    const fetchCountriesCitiesRates = async () => {
      const response = await axios.get("/api/common/countries-cities-rates");
      setCountriesCities(response.data.data);
    };
    fetchCountriesCitiesRates();
  }, []);

  useEffect(() => {
    if (watchedCountry && watchedCity) {
      const selectedCity = countriesCities[watchedCountry]?.find((item: any) => item.city === watchedCity);
      const ratePerKg = selectedCity?.ratePerKg || 0;
      const totalWeight = goodsList.reduce((sum, goods) => sum + parseFloat(goods.weight), 0);
      const fee = (totalWeight * ratePerKg).toFixed(2);
      setEstimatedFee(fee);
    }
  }, [watchedCountry, watchedCity, goodsList, countriesCities]);

  const onSubmit = async (data: FormValues) => {
    setLoading(true);
    data.goodsList = goodsList;
    data.estimatedFee = estimatedFee;
    try {
      const response = await axios.post("/api/orders", data);
      if (response.status === 201) {
        toast.success("Order submitted successfully");
        setTimeout(() => {
          router.push("/dashboard/order-history");
        }, 1500);
      }
    } catch (error) {
      console.error("Error saving order:", error);
      toast.error("Failed to submit order");
    } finally {
      setLoading(false);
    }
  };

  const getErrorMessage = (
    error: FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined
  ): React.ReactNode => {
    if (error) {
      return <p className="text-red-500 text-xs italic">
        {/* @ts-ignore */}
        {error.message}
      </p>;
    }
    return null;
  };

  const addGoods = (goods: GoodsFormValues, imageUrl: string) => {
    setGoodsList([...goodsList, { ...goods, imageUrl }]);
    setIsGoodsModalOpen(false);
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
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.senderName && "border-red-500"}`}
                {...register("senderName", { required: "Name is required" })}
              />
              {getErrorMessage(errors.senderName)}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Phone <span className="text-red-500">*</span></label>
              <div className="flex">
                <select
                  className={`shadow appearance-none border rounded-l w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.senderPhonePrefix && "border-red-500"}`}
                  {...register("senderPhonePrefix", { required: "Phone prefix is required" })}
                >
                  {phonePrefixes.map((prefix: any, index: number) => (
                    <option key={index} value={prefix.code}>{prefix.country} ({prefix.code})</option>
                  ))}
                </select>
                <input
                  type="text"
                  className={`shadow appearance-none border rounded-r w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.senderPhone && "border-red-500"}`}
                  {...register("senderPhone", { required: "Phone is required" })}
                />
              </div>
              {getErrorMessage(errors.senderPhone)}
            </div>
            <div className="sm:col-span-2">
              <label className="block text-gray-700 text-sm font-bold mb-2">Address <span className="text-red-500">*</span></label>
              <input
                type="text"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.senderAddress && "border-red-500"}`}
                {...register("senderAddress", { required: "Address is required" })}
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
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.country && "border-red-500"}`}
                {...register("country", { required: "Country is required" })}
              >
                <option value="">Select Country</option>
                {Object.keys(countriesCities).map((country: string, index: number) => (
                  <option key={index} value={country}>{country}</option>
                ))}
              </select>
              {getErrorMessage(errors.country)}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">City <span className="text-red-500">*</span></label>
              <select
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.city && "border-red-500"}`}
                {...register("city", { required: "City is required" })}
              >
                <option value="">Select City</option>
                {countriesCities[watchedCountry]?.map((cityObj: any, index: number) => (
                  <option key={index} value={cityObj.city}>{cityObj.city}</option>
                ))}
              </select>
              {getErrorMessage(errors.city)}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Street <span className="text-red-500">*</span></label>
              <input
                type="text"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.street && "border-red-500"}`}
                {...register("street", { required: "Street is required" })}
              />
              {getErrorMessage(errors.street)}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">District</label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register("district")}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Company</label>
              <input
                type="text"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                {...register("company")}
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Name <span className="text-red-500">*</span></label>
              <input
                type="text"
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.receiverName && "border-red-500"}`}
                {...register("receiverName", { required: "Receiver name is required" })}
              />
              {getErrorMessage(errors.receiverName)}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Phone <span className="text-red-500">*</span></label>
              <div className="flex">
                <select
                  className={`shadow appearance-none border rounded-l w-1/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.receiverPhonePrefix && "border-red-500"}`}
                  {...register("receiverPhonePrefix", { required: "Phone prefix is required" })}
                >
                  {phonePrefixes.map((prefix: any, index: number) => (
                    <option key={index} value={prefix.code}>{prefix.country} ({prefix.code})</option>
                  ))}
                </select>
                <input
                  type="text"
                  className={`shadow appearance-none border rounded-r w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.receiverPhone && "border-red-500"}`}
                  {...register("receiverPhone", {
                    required: "Phone is required",
                    pattern: {
                      value: /^[0-9]{10}$/,
                      message: "Invalid phone number",
                    },
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
                      <Image src={goods.imageUrl} width={50} height={50} alt={goods.itemName} />
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
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.deliveryMethod && "border-red-500"}`}
                {...register("deliveryMethod", { required: "Delivery method is required" })}
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
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.pickupAddress && "border-red-500"}`}
                {...register("pickupAddress", { required: "Pick-up address is required" })}
              >
                {countriesCities[watchedCountry]?.map((cityObj: any, index: number) => (
                  <option key={index} value={cityObj.city}>{cityObj.city}</option>
                ))}
              </select>
              {getErrorMessage(errors.pickupAddress)}
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-bold mb-2">Payment <span className="text-red-500">*</span></label>
              <select
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.payment && "border-red-500"}`}
                {...register("payment", { required: "Payment is required" })}
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
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.shippingMethod && "border-red-500"}`}
                {...register("shippingMethod", { required: "Shipping method is required" })}
              >
                <option value="">Select Shipping Method</option>
                <option value="air">Air Express</option>
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
            className={`mr-2 leading-tight ${errors.terms && "border-red-500"}`}
            {...register("terms", { required: "You must agree to the terms" })}
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
            value={estimatedFee || ""}
          />
        </div>

        <div className="text-right">
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded">
            {loading ? "Loading..." : "Submit Order"}
          </button>
        </div>
      </form>

      {isGoodsModalOpen && (
        <GoodsModal
          isOpen={isGoodsModalOpen}
          onRequestClose={() => setIsGoodsModalOpen(false)}
          onAddGoods={addGoods}
        />
      )}
    </div>
  );
};

export default Page;

