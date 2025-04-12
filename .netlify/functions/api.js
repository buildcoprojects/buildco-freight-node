import express from 'express';
import serverless from 'serverless-http';
import Stripe from 'stripe';

const app = express();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2025-03-31.basil'
});

app.use(express.json());

// Verify payment endpoint
app.post('/api/verify-payment', async (req, res) => {
  try {
    const {
      product,
      quantity,
      totalValue,
      shippingData,
      includeInsurance
    } = req.body;

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

    res.json({
      checkoutUrl: session.url,
      sessionId: session.id
    });
  } catch (err) {
    console.error('Stripe Checkout Error:', err);
    res.status(500).json({ error: 'Failed to create Stripe Checkout session' });
  }
});

// Checkout endpoint (duplicate of verify-payment for compatibility)
app.post('/api/checkout', async (req, res) => {
  try {
    const {
      product,
      quantity,
      totalValue,
      shippingData,
      includeInsurance
    } = req.body;

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

    res.json({
      checkoutUrl: session.url,
      sessionId: session.id
    });
  } catch (err) {
    console.error('Stripe Checkout Error:', err);
    res.status(500).json({ error: 'Failed to create Stripe Checkout session' });
  }
});

// Default route
app.get('*', (req, res) => {
  res.status(404).json({ error: 'Not found' });
});

export const handler = serverless(app);