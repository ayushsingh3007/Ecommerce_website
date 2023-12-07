// index.js
import React from 'react';
import ReactDOM from 'react-dom';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import App from './App';

const stripePromise = loadStripe('pk_test_51OK7daSAg3lXy8qLxeoU47nqdQPoOu3wgESHAWMNtzIhR5eGPIhfLm5gIfepNIml80BTlqHbv4VUEcQmPGd2zv5G00rzNSVTkA');

ReactDOM.render(
  <React.StrictMode>
    <Elements stripe={stripePromise}>
      <App />
    </Elements>
  </React.StrictMode>,
  document.getElementById('root')
);
