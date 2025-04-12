// Stripe implementation for payment processing
import type { FreightFormValues } from "../types/form";

// Define a safe type for Stripe parameters instead of 'any'
type StripeParams = Record<string, unknown>;
type StripeResponse = Record<string, unknown>;

// Define a Stripe interface type with safer types
interface StripeInstance {
  paymentIntents: {
    create: (params: StripeParams) => Promise<StripeResponse>;
    retrieve: (id: string) => Promise<StripeResponse>;
  };
  charges: {
    retrieve: (id: string) => Promise<StripeResponse>;
  };
}

// In a client-side only approach, we should ensure we're only executing in the browser
const isBrowser = typeof window !== 'undefined';

// Dynamically import Stripe only on the client side
const initializeStripe = async (): Promise<StripeInstance | null> => {
  if (!isBrowser) return null;

  try {
    // For static site export, we should use mock implementations only
    // No actual Stripe implementation in client-side only mode
    console.log('Using mock Stripe implementation for static site');

    // Return a mock implementation that mimics Stripe functionality
    return {
      paymentIntents: {
        create: async (params: StripeParams) => {
          console.log('Mock Stripe: Creating payment intent', params);
          return {
            id: `pi_${Math.random().toString(36).substring(2, 15)}`,
            client_secret: `seti_${Math.random().toString(36).substring(2, 15)}`,
            amount: params.amount,
            status: 'requires_payment_method',
            currency: params.currency
          };
        },
        retrieve: async (id: string) => {
          console.log('Mock Stripe: Retrieving payment intent', id);
          return {
            id,
            client_secret: `seti_${Math.random().toString(36).substring(2, 15)}`,
            amount: 0,
            status: 'succeeded',
            currency: 'usd'
          };
        }
      },
      charges: {
        retrieve: async (id: string) => {
          console.log('Mock Stripe: Retrieving charge', id);
          return {
            id,
            receipt_url: `https://dashboard.stripe.com/receipts/mock_${id}`,
            amount: 0,
            status: 'succeeded',
            currency: 'usd'
          };
        }
      }
    };
  } catch (error) {
    console.error('Error initializing Stripe:', error);
    return null;
  }
};

export interface PaymentIntent {
  id: string;
  clientSecret: string;
  amount: number;
  status: 'requires_payment_method' | 'requires_confirmation' | 'succeeded' | 'canceled';
  currency?: string;
}

interface OrderData {
  formData: FreightFormValues;
  productInfo: {
    title: string;
    price: number;
    weight: number;
    image: string;
  };
  shipping: {
    method: string;
    price: number;
    estimatedDays: string;
  };
  costs: {
    itemPrice: number;
    serviceFee: number;
    shippingPrice: number;
    totalEstimate: number;
  };
  paymentIntent: string;
  status: string;
  createdAt: string;
}

// Function to create a payment intent with Stripe
export async function createPaymentIntent(amount: number, currency = 'usd'): Promise<PaymentIntent> {
  try {
    if (!isBrowser) {
      throw new Error('Payment intents can only be created in the browser');
    }

    // Get our mock Stripe implementation
    const stripe = await initializeStripe();

    if (!stripe) {
      throw new Error('Failed to initialize Stripe');
    }

    // Create payment intent with our mock Stripe
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Amount in cents
      currency, // Default to USD
      payment_method_types: ['card'],
      description: 'Build Co Freight Node - 12.5% Service Fee',
      metadata: {
        service: 'freight_forwarding',
        fee_type: 'service_fee'
      }
    });

    // Safely type-cast paymentIntent properties with defaults
    const id = String(paymentIntent.id || '');
    const clientSecret = String(paymentIntent.client_secret || '');
    const returnedAmount = typeof paymentIntent.amount === 'number' ? paymentIntent.amount : amount;
    const status = String(paymentIntent.status || 'requires_payment_method') as PaymentIntent['status'];
    const returnedCurrency = String(paymentIntent.currency || currency);

    return {
      id,
      clientSecret,
      amount: returnedAmount,
      status,
      currency: returnedCurrency
    };
  } catch (error) {
    console.error('Error creating payment intent:', error);

    // Fallback to a mock payment intent even if there's an error
    const paymentIntentId = `pi_${Math.random().toString(36).substring(2, 15)}`;
    const clientSecret = `${paymentIntentId}_secret_${Math.random().toString(36).substring(2, 15)}`;

    return {
      id: paymentIntentId,
      clientSecret,
      amount,
      status: 'requires_payment_method',
      currency
    };
  }
}

// Function to confirm payment with Stripe
export async function confirmPayment(paymentIntentId: string): Promise<{ success: boolean; paymentIntent: PaymentIntent }> {
  try {
    if (!isBrowser) {
      throw new Error('Payments can only be confirmed in the browser');
    }

    // Return mock success data for static site
    return {
      success: true,
      paymentIntent: {
        id: paymentIntentId,
        clientSecret: `${paymentIntentId}_secret_confirmed`,
        amount: 0,
        status: 'succeeded'
      }
    };
  } catch (error) {
    console.error('Error confirming payment:', error);
    return {
      success: false,
      paymentIntent: {
        id: paymentIntentId,
        clientSecret: '',
        amount: 0,
        status: 'canceled'
      }
    };
  }
}

// Function to generate a receipt for the payment
export async function generateReceipt(
  paymentIntentId: string,
  customerInfo: { name: string; email: string },
  amount: number,
  currency = 'USD'
): Promise<{ receiptUrl: string | null; success: boolean }> {
  try {
    if (!isBrowser) {
      throw new Error('Receipts can only be generated in the browser');
    }

    // Always return a mock receipt URL for static sites
    return {
      receiptUrl: `https://dashboard.stripe.com/receipts/mock_${paymentIntentId}`,
      success: true
    };
  } catch (error) {
    console.error('Error generating receipt:', error);
    return {
      receiptUrl: null,
      success: false
    };
  }
}

// Mock function to save form data to "database" (would be replaced by actual DB implementation)
export async function saveFormDataToDatabase(formData: OrderData): Promise<{ success: boolean; id: string }> {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1200));

  console.log('Saving form data to database:', formData);

  // Generate a mock order ID
  const orderId = `order_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;

  // In a real application, this would save to a database
  // For now, we just log the data

  return {
    success: true,
    id: orderId
  };
}
