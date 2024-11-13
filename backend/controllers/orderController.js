const Order =require("../models/order");

exports.getAllOrders=async(req,res)=>{
    try {
        const orders= await Order.find().populate('user').populate('orderItems.product');
        res.json(orders);
    } catch (error) {
        // console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
}

// adminController.js
exports.updateOrderStatus = async (req, res) => {
    const { id } = req.params; // Get the order ID from the URL
    const { orderStatus } = req.body; // New status from the request body
    // console.log('Updating order:', id, 'with status:', orderStatus);
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            id,
            { orderStatus }, // Ensure this is being set correctly
            { new: true } // Return the updated document
          );
        if (!updatedOrder) {
            return res.status(404).json({ message: 'Order not found' });
        }
        res.status(200).json({ message: 'Order status updated', updatedOrder });
    } catch (error) {
        // console.log(error);
        res.status(500).json({ message: 'Server error' });
    }
};

  
  