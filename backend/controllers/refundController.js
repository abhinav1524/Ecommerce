const Order =require("../models/order")
const stripe = require('stripe')('your_stripe_secret_key');

exports.handleRefundRequest = async (req, res) => {
    const { orderId, action } = req.body; // action can be 'approve' or 'reject'

    try {
        const order = await Order.findById(orderId);
        
        if (!order) {
            return res.status(404).json({ message: 'Order not found' });
        }

        if (action === 'approve') {
            // Process the refund
            const refund = await stripe.refunds.create({
                charge: order.paymentId, // Use the payment ID from the order
                amount: order.totalPrice * 100, // Amount in paisa
            });

            // Update the order status
            order.orderStatus = 'Refunded'; // Update this based on your requirement
            await order.save();

            return res.status(200).json({ message: 'Refund approved', refund });
        } else if (action === 'reject') {
            // Update the order status to indicate the refund was rejected
            order.orderStatus = 'Refund Rejected';
            await order.save();

            return res.status(200).json({ message: 'Refund rejected' });
        } else {
            return res.status(400).json({ message: 'Invalid action' });
        }
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error processing refund', error });
    }
};