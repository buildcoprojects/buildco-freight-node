# Build Co Freight Node Implementation Notes

## Project Overview
Build Co Freight Node is a Stripe-based freight forwarding intake platform designed to route high-value Chinese goods into the U.S. through Australia to avoid direct tariffs.

## Key Features

- Live product metadata extraction from AliExpress and DHgate URLs
- Real-time validation for minimum order values ($500K USD threshold)
- Progressive form disclosure based on validation state
- Dark mode with specific color palette
- Serverless API functions for Stripe checkout

## Environment Configuration

The project requires the following environment variables:
- `STRIPE_SECRET_KEY` - For Stripe payment processing
- `NEXT_PUBLIC_SITE_URL` - For callback URLs

## Technical Details

### Dark Mode Implementation
- Background: #121212
- Text: #E0E0E0
- Card elements: #1E1E1E
- Primary color: Blue accent
- All components properly respect theme state

### Quote Form Logic
- Real-time validation when blur events occur on quantity and URL fields
- Price threshold validation (must be ≥ $500,000 USD)
- Visual feedback:
  - Red warning banner when below threshold
  - Green checkmarks when validated
  - Progressive disclosure of payment section

### Netlify Build Compatibility

For static site generation compatibility:
1. **JSDOM Removal**: Web scraping libraries cannot be used with static site generation as they depend on Node.js modules not available in the browser.
2. **Fallback Generation**: Instead of live scraping, the app uses deterministic fallback generators based on product IDs extracted from URLs.
3. **Serverless Functions**: In a production environment, actual scraping would be done in Netlify functions.

### Future Improvements

1. Implement real web scraping in Netlify functions or Edge functions
2. Add proper error handling with retry mechanisms
3. Implement actual Stripe webhooks for payment status updates
4. Add user accounts and session management
5. Implement proper analytics and tracking

## Build and Deploy Process

1. Local development: `npm run dev`
2. Build for production: `npm run build`
3. Deploy to Netlify: Push to main branch

## Architectural Decisions

- Next.js with static site generation for better SEO and performance
- Tailwind CSS for styling with custom theme configuration
- React Hook Form + Zod for form validation
- Stripe for payment processing with serverless integration
- Progressive enhancement approach for better UX