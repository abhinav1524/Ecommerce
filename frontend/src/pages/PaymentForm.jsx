import React, { useState,useEffect,useContext } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';
// import { UserContext } from "../context/UserContext";
import {jwtDecode} from "jwt-decode";
const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [message, setMessage] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
          try {
              const decoded = jwtDecode(token);
              setUser(decoded.name || decoded.username);
          } catch (error) {
              console.error('Error decoding token:', error);
          }
      }
  }, []);

  const handlePayment = async (event) => {
      event.preventDefault();

      if (!stripe || !elements) {
          return;
      }

      const orderData = {
          orderItems: [{ product: '670bc517c62d5b2adabc7d8e', quantity: 2 }],
          shippingAddress: '123 Test St, Test City',
          paymentMethod: 'card',
      };

      const token = localStorage.getItem('token'); // Consistent token retrieval
      try {
          const response = await fetch('http://localhost:5000/api/products/buy', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
              },
              body: JSON.stringify(orderData),
          });

          const data = await response.json();
          if (response.ok) {
              const clientSecret = data.clientSecret;
              const cardElement = elements.getElement(CardElement);
              const { error: stripeError, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
                  payment_method: { card: cardElement },
              });

              if (stripeError) {
                  setError(stripeError.message);
              } else {
                  setMessage('Payment successful! Your order is being processed.');
              }
          } else {
              setError(data.message);
          }
      } catch (error) {
          setError('Payment failed. Please try again.');
          console.error('Error during payment processing:', error);
      }
  };

  return (
      <form onSubmit={handlePayment} className='mt-32'>
          <CardElement />
          <button type="submit" disabled={!stripe}>Pay Now</button>
          {error && <div>{error}</div>}
          {message && <div>{message}</div>}
      </form>
  );
};
export default PaymentForm