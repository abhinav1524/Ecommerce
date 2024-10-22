const stripe = require('stripe')('your_stripe_secret_key');

const createOrder = async (req, res) => {
  try {
    const { amount, source } = req.body;  // `amount` should be in Rupees from the frontend (₹2000, for example)

    // Process the payment
    const charge = await stripe.charges.create({
      amount: amount * 100,  // Convert Rupees to paisa (₹2000 becomes 200000 paisa)
      currency: 'inr',       // Currency set to INR
      source: source,        // Stripe token received from frontend
      description: 'Order payment',
    });

    // Create the order with payment information
    const newOrder = new Order({
      user: req.user._id,
      orderItems: req.body.orderItems,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: 'Stripe',
      paymentStatus: 'Paid',
      paymentId: charge.id,
      itemsPrice: req.body.itemsPrice,
      taxPrice: req.body.taxPrice,
      shippingPrice: req.body.shippingPrice,
      totalPrice: req.body.totalPrice,
    });

    await newOrder.save();
    res.status(201).json({ message: 'Order placed successfully', order: newOrder });
  } catch (error) {
    res.status(500).json({ message: 'Payment failed', error });
  }
};
module.exports = createOrder;