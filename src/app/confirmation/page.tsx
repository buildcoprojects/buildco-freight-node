'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ConfirmationPage() {
  const searchParams = useSearchParams();
  const [paymentDetails, setPaymentDetails] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const sessionId = searchParams.get('session_id');

    async function verifyPayment() {
      if (!sessionId) {
        setError('No payment session found');
        return;
      }

      try {
        const response = await fetch(`/api/verify-payment?session_id=${sessionId}`);
        const data = await response.json();

        if (data.payment) {
          setPaymentDetails(data.payment);
        } else {
          setError('Payment verification failed');
        }
      } catch (err) {
        console.error('Payment verification error:', err);
        setError('Unable to verify payment');
      }
    }

    verifyPayment();
  }, [searchParams]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-red-50 dark:bg-red-900">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-red-600 mb-4">Payment Error</h1>
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  if (!paymentDetails) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-dark-bg py-12 px-4 sm:px-6 lg:px-8 transition-colors">
      <div className="max-w-3xl mx-auto bg-white dark:bg-dark-card shadow-xl rounded-lg p-8">
        <div className="text-center">
          <svg className="mx-auto h-16 w-16 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mt-4">Payment Confirmed</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300">Thank you for your purchase!</p>
        </div>

        <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
          <dl className="grid grid-cols-1 gap-x-4 gap-y-8 sm:grid-cols-2">
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Transaction ID</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">{paymentDetails.id}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Amount Paid</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                ${(paymentDetails.amount_total / 100).toFixed(2)}
              </dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Payment Method</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">{paymentDetails.payment_method_types[0]}</dd>
            </div>
            <div>
              <dt className="text-sm font-medium text-gray-500 dark:text-gray-300">Date</dt>
              <dd className="mt-1 text-sm text-gray-900 dark:text-gray-100">
                {new Date(paymentDetails.created * 1000).toLocaleString()}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
}