import emailjs from 'emailjs-com';
import type { FreightFormValues } from '../types/form';

// In a real application, you would use environment variables for these values
const SERVICE_ID = 'service_freight_node';  // Replace with your EmailJS service ID
const TEMPLATE_ID = 'template_freight_node'; // Replace with your EmailJS template ID
const USER_ID = 'user_freight_node'; // Replace with your EmailJS user ID

interface EmailParams {
  form: FreightFormValues;
  productTitle: string;
  productPrice: number;
  serviceFee: number;
  shippingOption: {
    name: string;
    price: number;
    estimatedDays: string;
  };
  totalEstimate: number;
}

// For demo purposes, we'll mock the email sending
export async function sendConfirmationEmail(params: EmailParams): Promise<boolean> {
  try {
    // In a real application, this would send an actual email
    console.log('Sending confirmation email with params:', params);

    // Mock successful email sending
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In a real app, this would use EmailJS or another email service
    // Example EmailJS implementation:
    /*
    await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      {
        to_email: params.form.email,
        to_name: `${params.form.firstName} ${params.form.lastName}`,
        product_title: params.productTitle,
        product_price: `$${params.productPrice.toFixed(2)}`,
        service_fee: `$${params.serviceFee.toFixed(2)}`,
        shipping_option: params.shippingOption.name,
        shipping_price: `$${params.shippingOption.price.toFixed(2)}`,
        estimated_delivery: params.shippingOption.estimatedDays,
        total_estimate: `$${params.totalEstimate.toFixed(2)}`
      },
      USER_ID
    );
    */

    return true;
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    return false;
  }
}

// Send notification to admin
export async function sendAdminNotification(params: EmailParams): Promise<boolean> {
  try {
    // In a real application, this would send an actual email
    console.log('Sending admin notification with params:', params);

    // Mock successful email sending
    await new Promise(resolve => setTimeout(resolve, 1000));

    // The admin email would be sent to the freight node email address
    const adminEmail = 'freightnode@buildcoprojects.com.au';

    // Example EmailJS implementation for admin notification
    /*
    await emailjs.send(
      SERVICE_ID,
      'template_admin_freight_node', // Different template for admin
      {
        to_email: adminEmail,
        customer_name: `${params.form.firstName} ${params.form.lastName}`,
        customer_email: params.form.email,
        customer_phone: params.form.phone || 'Not provided',
        product_title: params.productTitle,
        product_price: `$${params.productPrice.toFixed(2)}`,
        service_fee: `$${params.serviceFee.toFixed(2)}`,
        shipping_option: params.shippingOption.name,
        shipping_price: `$${params.shippingOption.price.toFixed(2)}`,
        estimated_delivery: params.shippingOption.estimatedDays,
        total_estimate: `$${params.totalEstimate.toFixed(2)}`
      },
      USER_ID
    );
    */

    return true;
  } catch (error) {
    console.error('Error sending admin notification:', error);
    return false;
  }
}
