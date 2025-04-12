import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16'
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      product,
      quantity,
      totalValue,
      shippingData,
      includeInsurance
    } = body;

    const accessFee = totalValue * 0.125;
    const insuranceFee = includeInsurance ? totalValue * 0.02 : 0;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      client_reference_id: shippingData.email,
      customer_email: shippingData.email,
      line_items: [
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: 'Freight Arbitrage Corridor Access',
              description: `Access fee for bulk import: ${product.title}`
            },
            unit_amount: Math.round(accessFee * 100)
          },
          quantity: 1
        },
        {
          price_data: {
            currency: 'usd',
            product_data: {
              name: product.title,
              description: `Quantity: ${quantity} units`
            },
            unit_amount: Math.round(totalValue * 100)
          },
          quantity: 1
        },
        ...(includeInsurance
          ? [{
              price_data: {
                currency: 'usd',
                product_data: {
                  name: 'Comprehensive Shipping Insurance',
                  description: 'Optional 2% coverage for your shipment'
                },
                unit_amount: Math.round(insuranceFee * 100)
              },
              quantity: 1
            }]
          : [])
      ],
      metadata: {
        productUrl: product.sourceUrl || '',
        quantity: quantity.toString(),
        totalValue: totalValue.toString(),
        customerEmail: shippingData.email,
        includeInsurance: includeInsurance.toString()
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/confirmation?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/import?canceled=true`
    });

    return NextResponse.json({
      checkoutUrl: session.url,
      sessionId: session.id
    });
  } catch (err: any) {
    console.error('Stripe Checkout Error:', err);
    return NextResponse.json(
      { error: 'Failed to create Stripe Checkout session' },
      { status: 500 }
    );
  }
}