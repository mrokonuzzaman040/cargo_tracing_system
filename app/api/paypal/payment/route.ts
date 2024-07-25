import { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import dbConnect from '@/lib/mongodb';
import Order from '@/models/Order';

const PAYPAL_API_BASE = 'https://api-m.sandbox.paypal.com'; // Use sandbox for testing, switch to live for production
const PAYPAL_CLIENT_ID = process.env.PAYPAL_CLIENT_ID;
const PAYPAL_SECRET = process.env.PAYPAL_SECRET;

const getPayPalAccessToken = async () => {
  const response = await axios({
    url: `${PAYPAL_API_BASE}/v1/oauth2/token`,
    method: 'post',
    auth: {
      username: PAYPAL_CLIENT_ID!,
      password: PAYPAL_SECRET!,
    },
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    data: 'grant_type=client_credentials',
  });

  return response.data.access_token;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      await dbConnect();

      const { orderId } = req.body;
      const accessToken = await getPayPalAccessToken();

      const response = await axios({
        url: `${PAYPAL_API_BASE}/v2/checkout/orders/${orderId}/capture`,
        method: 'post',
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const order = await Order.findById(orderId);
      if (order) {
        order.paymentStatus = 'Paid';
        await order.save();
      }

      res.status(200).json({ message: 'Payment successful', data: response.data });
    } catch (error) {
      console.error('Error processing PayPal payment:', error);
      res.status(500).json({ message: 'Internal Server Error', error });
    }
  } else {
    res.status(405).json({ message: 'Method Not Allowed' });
  }
}
