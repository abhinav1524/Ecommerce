const { STRIPE_SECRET_KEY } = process.env;
const stripe = require("stripe")(STRIPE_SECRET_KEY);
const Order = require("../models/order");
const Product = require("../models/product");
const User =require("../models/user");
const ShippingAddress = require("../models/shippingAddress");
const getallorders = async (req, res) => {
  try {
    const userId = req.user._id;
    // const userId = mongoose.Types.ObjectId(req.user._id);
    // console.log("User ID Type:", typeof userId, "User ID Value:", userId);
    const orders = await Order.find({ user: userId.toString() }).populate(
      "orderItems.product"
    );
    console.log("Fetched orders:", orders);
    res.json(orders);
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error" });
  }
};

const createOrder = async (req, res) => {
  try {
    // Destructure necessary information from the request body
    const { cartItems, paymentMethod } = req.body;
    console.log("Cart Items: ", cartItems); // Debugging step

    // Fetch user details from the database
    const userDetails = await User.findById(req.user._id);
    if (!userDetails) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Fetch the shipping address from the database using the shippingAddressId
    const shippingAddress = await ShippingAddress.findOne({ user: req.user._id });
    if (!shippingAddress) {
      return res.status(404).json({ message: 'Shipping address not found' });
    }

    // Validate cart items and calculate prices
    let itemsPrice = 0;
    const orderItems = [];

    for (const item of cartItems) {
      const product = await Product.findById(item.product);
      console.log(product);
      if (!product) {
        return res.status(404).json({ message: `Product not found: ${item.product}` });
      }
      const quantity = Number(item.quantity); // Ensure quantity is a number
      console.log(`Product ID: ${item.product}, Quantity: ${quantity}, Price: ${product.price}`); // Debugging step

      if (isNaN(quantity) || quantity <= 0) {
        return res.status(400).json({ message: `Invalid quantity for product: ${item.product}` });
      }

      if (isNaN(product.price)) {
        return res.status(400).json({ message: `Invalid price for product: ${item.product}` });
      }

      const totalItemPrice = product.price * quantity; // Calculate total price for this item
      itemsPrice += totalItemPrice; // Accumulate the total item price
      orderItems.push({
        product: product._id,
        quantity: quantity,
      });
    }

    console.log(`Items Price: ${itemsPrice}`); // Debugging step

    // Example fixed tax and shipping prices
    const taxPrice = Number((itemsPrice * 0.05).toFixed(2)); // Assume a tax of 5%
    const shippingPrice = 100; // Fixed shipping price
    const totalPrice = itemsPrice + taxPrice + shippingPrice; // Total price calculation

    console.log(`Tax Price: ${taxPrice}, Shipping Price: ${shippingPrice}, Total Price: ${totalPrice}`); // Debugging step

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: await Promise.all(orderItems.map(async (item) => {
        // Fetch product details again for name and price
        const product = await Product.findById(item.product); // Make sure to await this if you are using async
        if (!product) {
          throw new Error(`Product not found: ${item.product}`);
        }

        const productPrice = Number((product.price * 100).toFixed(0)); // Ensure price is in cents and is a number
        console.log(`Line Item - Product: ${product.name}, Unit Amount: ${productPrice}, Quantity: ${item.quantity}`); // Debugging step

        if (isNaN(productPrice)) {
          throw new Error(`Invalid price for product: ${item.product}`);
        }

        return {
          price_data: {
            currency: 'inr',
            product_data: {
              name: product.name, // Use the name from the Product model
            },
            unit_amount: productPrice, // Price in cents
          },
          quantity: item.quantity,
        };
      })),
      success_url: 'http://localhost:5173/success',
      cancel_url: 'http://localhost:5173/cancel',
      customer_email: userDetails.email,
      shipping_address_collection: {
        allowed_countries: ['IN'], // Specify allowed countries if needed
      },
    });

    // Create a new order in the database
    const newOrder = new Order({
      user: req.user._id,
      orderItems: orderItems,
      shippingAddress: shippingAddress.street,
      paymentMethod,
      paymentStatus: 'Pending',
      paymentId: session.id, // Use the session ID for payment
      itemsPrice: Number(itemsPrice.toFixed(2)), // Ensure itemsPrice is a number
      taxPrice,
      shippingPrice,
      totalPrice: Number((totalPrice / 100).toFixed(2)), // Store total price in original currency (not cents) and ensure it's a number
      orderStatus: 'Processing',
    });

    // Save order to database
    await newOrder.save();

    // Respond with the session ID
    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ error: error.message });
  }
};



module.exports = { createOrder, getallorders };
