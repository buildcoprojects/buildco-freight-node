'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const PaymentForm = ({ orderData, shippingData, onBack }) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [includeInsurance, setIncludeInsurance] = useState(false);
  const [error, setError] = useState('');

  const subtotal = orderData.totalValue;
  const accessFee = subtotal * 0.125;
  const insuranceFee = includeInsurance ? subtotal * 0.02 : 0;
  const total = subtotal + accessFee + insuranceFee;

  const handleStripeCheckout = async () => {
    setLoading(true);
    setError('');

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          product: orderData.product,
          quantity: orderData.quantity,
          totalValue: subtotal,
          shippingData,
          includeInsurance
        })
      });

      const data = await response.json();

      if (data.checkoutUrl) {
        window.location.href = data.checkoutUrl;
      } else {
        throw new Error('No checkout URL received');
      }
    } catch (err) {
      console.error(err);
      setError('Failed to initiate payment. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="bg-white dark:bg-dark-card shadow-md rounded-lg p-6 transition-colors">
      <h2 className="text-xl font-semibold mb-4 dark:text-dark-text">Payment Details</h2>

      <div className="mb-6 bg-gray-50 dark:bg-gray-800 rounded-md p-4">
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Subtotal:</span>
            <span className="font-medium dark:text-gray-200">
              ${subtotal.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Freight Corridor Access Fee (12.5%):</span>
            <span className="font-medium dark:text-gray-200">
              ${accessFee.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>

          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="insuranceToggle"
                checked={includeInsurance}
                onChange={() => setIncludeInsurance(!includeInsurance)}
                className="mr-2 text-blue-600 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
              />
              <label htmlFor="insuranceToggle" className="text-gray-600 dark:text-gray-400">
                Add Insurance Coverage (2%)
              </label>
            </div>
            {includeInsurance && (
              <span className="font-medium dark:text-gray-200">
                +${insuranceFee.toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </span>
            )}
          </div>

          <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2 flex justify-between font-bold">
            <span className="text-gray-800 dark:text-gray-200">Total:</span>
            <span className="text-gray-800 dark:text-gray-200">
              ${total.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </span>
          </div>
        </div>
      </div>

      {error && (
        <div className="text-red-600 dark:text-red-400 text-sm mb-4">
          {error}
        </div>
      )}

      <div className="flex justify-between mt-6">
        <button
          onClick={onBack}
          className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-md dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-gray-200"
        >
          Back
        </button>
        <button
          onClick={handleStripeCheckout}
          disabled={loading}
          className={`px-6 py-2 rounded-md font-medium transition-colors ${
            loading ? 'bg-gray-400 cursor-not-allowed' :
            'bg-blue-600 hover:bg-blue-700 text-white dark:bg-blue-700 dark:hover:bg-blue-800'
          }`}
        >
          {loading ? 'Processing...' : 'Continue to Stripe Checkout'}
        </button>
      </div>
    </div>
  );
};

export default PaymentForm;