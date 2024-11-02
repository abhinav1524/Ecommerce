// controllers/cartController.js
const Cart = require('../models/cart');
const Product = require('../models/product');

// Add item to cart
exports.addToCart = async (req, res) => {
    const { productId, quantity } = req.body;
    const userId = req.user._id; // Assuming you're using middleware to get the logged-in user

    try {
        let cart = await Cart.findOne({ user: userId });

        if (!cart) {
            // If no cart exists, create a new one
            const productPrice = await getProductPrice(productId);
            cart = new Cart({
                user: userId,
                cartItems: [{ product: productId, quantity }],
                totalPrice: productPrice * quantity // Calculate total price based on product price
            });
        } else {
            // If the cart exists, update the cartItems
            const itemIndex = cart.cartItems.findIndex(item => item.product.toString() === productId);

            if (itemIndex > -1) {
                // If the item already exists in the cart, update the quantity
                const existingItem = cart.cartItems[itemIndex];
                const productPrice = await getProductPrice(productId);

                // Update total price
                cart.totalPrice += productPrice * quantity - productPrice * existingItem.quantity;
                existingItem.quantity += quantity;
            } else {
                // If the item does not exist in the cart, add it
                const productPrice = await getProductPrice(productId);
                cart.cartItems.push({ product: productId, quantity });
                cart.totalPrice += productPrice * quantity; // Update total price
            }
        }

        await cart.save();
        res.status(200).json({ message: 'Item added to cart', cart });
    } catch (error) {
        res.status(500).json({ message: 'Error adding to cart', error });
    }
};

// Get cart items
exports.getCart = async (req, res) => {
    const userId = req.user._id; //  using middleware to get the logged-in user
    try {
        const cart = await Cart.findOne({ user: userId }).populate('cartItems.product');

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }
        res.status(200).json(cart);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error fetching cart', error });
    }
};

// Clear cart
exports.clearCart = async (req, res) => {
    const userId = req.user._id; // using middleware to get the logged-in user

    try {
        const result = await Cart.findOneAndDelete({ user: userId });

        if (!result) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        res.status(200).json({ message: 'Cart cleared' });
    } catch (error) {
        res.status(500).json({ message: 'Error clearing cart', error });
    }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
    console.log("contorller hit by request ")
    const { productId,quantityChange } = req.body;
    const userId = req.user._id; // using middleware to get the logged-in user

    try {
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const itemIndex = cart.cartItems.findIndex(item => item.product.toString() === productId);

        if (itemIndex > -1) {
            const productPrice = await getProductPrice(productId);
            cart.totalPrice -= productPrice * cart.cartItems[itemIndex].quantity; // Update total price
            cart.cartItems.splice(itemIndex, 1); // Remove the item
            await cart.save();
            res.status(200).json({ message: 'Item removed from cart', cart });
        } else {
            res.status(404).json({ message: 'Item not found in cart' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error removing item from cart', error });
    }
};

// Helper function to get product price
async function getProductPrice(productId) {
    const product = await Product.findById(productId);
    return product ? product.price : 0; // Assuming your Product model has a price field
}

exports.updateCartItemQuantity = async (req, res) => {
    console.log("Controller hit for updating item quantity");
    const { productId, quantityChange } = req.body; // The change in quantity (+1 or -1)
    const userId = req.user._id; // Using middleware to get the logged-in user
    try {
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const itemIndex = cart.cartItems.findIndex(item => item.product.toString() === productId);

        if (itemIndex > -1) {
            const productPrice = await getProductPrice(productId);

            // Update the quantity and check if it falls below 1
            cart.cartItems[itemIndex].quantity += quantityChange;

            if (cart.cartItems[itemIndex].quantity < 1) {
                // Remove item if the quantity drops below 1
                cart.totalPrice -= productPrice * cart.cartItems[itemIndex].quantity; // Adjust total price before removing
                cart.cartItems.splice(itemIndex, 1);
            } else {
                // Adjust total price based on the change
                cart.totalPrice += productPrice * quantityChange;
            }

            await cart.save();
            res.status(200).json({ message: 'Cart item quantity updated', cart });
        } else {
            res.status(404).json({ message: 'Item not found in cart' });
        }
    } catch (error) {
        console.error('Error updating item quantity:', error);
        res.status(500).json({ message: 'Error updating item quantity', error });
    }
};

