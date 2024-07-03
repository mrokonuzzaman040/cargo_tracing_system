"use client";

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';

interface FormData {
  email: string;
  code: string;
}

const Verify = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);
    setMessage('');

    try {
      const response = await fetch('/api/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Something went wrong');
      }

      setMessage('Verification successful. Redirecting to dashboard...');
      setTimeout(() => {
        router.push('/private/dashboard');
      }, 2000);
    } catch (error: any) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto max-w-4xl p-4">
      <div className="bg-white shadow-md rounded p-8">
        <h2 className="text-2xl font-bold mb-4">Email Verification</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="relative">
            <input
              {...register('email', { required: 'Email is required' })}
              type="email"
              placeholder="Email"
              className="w-full p-2 pl-10 rounded border"
            />
            {errors.email && <span className="text-red-500">{errors.email.message}</span>}
          </div>
          <div className="relative">
            <input
              {...register('code', { required: 'Verification code is required' })}
              type="text"
              placeholder="Verification Code"
              className="w-full p-2 pl-10 rounded border"
            />
            {errors.code && <span className="text-red-500">{errors.code.message}</span>}
          </div>
          <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600" disabled={loading}>
            {loading ? 'Verifying...' : 'Verify'}
          </button>
        </form>
        {message && <p className="mt-4 text-red-500">{message}</p>}
      </div>
    </div>
  );
};

export default Verify;
