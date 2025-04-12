import { loadStripe } from '@stripe/stripe-js';

// Replace 'your_publishable_key' with your actual Stripe publishable key
const stripePromise = loadStripe('your_publishable_key');

export default stripePromise; 