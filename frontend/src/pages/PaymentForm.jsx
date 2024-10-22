import React, { useState } from 'react';

const PaymentForm = () => {
  const [amount, setAmount] = useState(2000); // Amount in rupees
  const [cardInfo, setCardInfo] = useState({});

  // Initialize Stripe
  const stripe = window.Stripe('your_public_stripe_key'); // Replace with your Stripe public key
  const elements = stripe.elements();

  const cardElement = elements.create('card');
  cardElement.mount('#card-element');

  const handleSubmit = async (event) => {
    event.preventDefault();

    // Create a payment method
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    });

    if (error) {
      console.error(error);
    } else {
      // Send paymentMethod.id and other order details to the backend
      const response = await fetch('/api/buy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount,
          paymentMethodId: paymentMethod.id,
          // Add other order details as needed
        }),
      });

      const data = await response.json();
      console.log(data);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div id="card-element"></div>
      <button type="submit">Pay</button>
    </form>
  );
};

export default PaymentForm;
