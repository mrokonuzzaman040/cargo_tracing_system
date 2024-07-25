'use client';
import React from 'react';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('YOUR_STRIPE_PUBLIC_KEY');

const PaymentPage = ({ order }: { order: any }) => {
    const stripe = useStripe();
    const elements = useElements();

    const handleStripePayment = async (e: any) => {
        e.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const cardElement = elements.getElement(CardElement);

        if (!cardElement) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card: cardElement,
        });

        if (error) {
            console.error(error);
        } else {
            console.log(paymentMethod);
            // Send payment method to your server to create a charge
        }
    };

    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <h2 className="text-2xl font-bold mb-6">Make Payment</h2>

            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4">Pay with PayPal</h3>
                <PayPalScriptProvider options={{ clientId: 'YOUR_PAYPAL_CLIENT_ID' }}>
                    <PayPalButtons
                        style={{ layout: 'vertical' }}
                        createOrder={(data, actions) => {
                            return actions.order.create({
                                purchase_units: [
                                    {
                                        amount: {
                                            currency_code: 'USD',
                                            value: order.estimatedFee.toString(),
                                        },
                                    },
                                ],
                                intent: 'CAPTURE'
                            });
                        }}
                        onApprove={(data, actions) => {
                            if (!actions.order) {
                                return Promise.reject(new Error('Order action is undefined'));
                            }
                            return actions.order.capture().then(function (details) {
                                console.log(details);
                                // Send details to your server to save the transaction
                            });
                        }}
                    />
                </PayPalScriptProvider>
            </div>

            <div className="mb-6">
                <h3 className="text-xl font-semibold mb-4">Pay with Credit Card</h3>
                <Elements stripe={stripePromise}>
                    <form onSubmit={handleStripePayment}>
                        <CardElement />
                        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mt-4">
                            Pay with Stripe
                        </button>
                    </form>
                </Elements>
            </div>
        </div>
    );
};

export default PaymentPage;
