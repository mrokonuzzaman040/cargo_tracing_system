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

export type { FormValues, GoodsFormValues };