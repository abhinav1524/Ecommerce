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
        // console.log(error);
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
        // console.log(error);
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
// Backend Route to Remove Product from Cart
exports.removeFromCart = async (req, res) => {
    const { productId } = req.body; // The ID of the product to remove
    const userId = req.user._id; // User ID from the authentication middleware
  
    try {
      // Find the user's cart
      const cart = await Cart.findOne({ user: userId });
  
      // If cart is not found, return an error
      if (!cart) {
        return res.status(404).json({ message: 'Cart not found' });
      }
  
      // Find the index of the product to remove from cart
      const itemIndex = cart.cartItems.findIndex(item => item.product.toString() === productId);
  
      // If the item exists in the cart, remove it
      if (itemIndex > -1) {
        cart.cartItems.splice(itemIndex, 1); // Remove the product from cartItems array
        await cart.save(); // Save the updated cart
  
        // Return the updated cart in the response
        return res.status(200).json({ message: 'Item removed from cart', cart });
      }
  
      // If the item is not found, return a not found error
      return res.status(404).json({ message: 'Item not found in cart' });
    } catch (error) {
      // If there's an error, return a server error response
      res.status(500).json({ message: 'Error removing item from cart', error });
    }
  };
  


// Helper function to get product price
async function getProductPrice(productId) {
    const product = await Product.findById(productId);
    return product ? product.price : 0; // Assuming your Product model has a price field
}

exports.updateCartItemQuantity = async (req, res) => {
    // console.log("Controller hit for updating item quantity");
    const { productId, quantityChange } = req.body; // The change in quantity (+1 or -1)
    const userId = req.user._id; // Using middleware to get the logged-in user
    // Validate quantityChange
    if (isNaN(quantityChange)) {
        return res.status(400).json({ message: 'Invalid quantity change' });
    }

    try {
        const cart = await Cart.findOne({ user: userId });

        if (!cart) {
            return res.status(404).json({ message: 'Cart not found' });
        }

        const itemIndex = cart.cartItems.findIndex(item => item.product.toString() === productId);

        if (itemIndex > -1) {
            const productPrice = await getProductPrice(productId);

            // Ensure productPrice is a valid number
            if (isNaN(productPrice)) {
                return res.status(400).json({ message: 'Invalid product price' });
            }

            // Update the quantity and check if it falls below 1
            let updatedQuantity = cart.cartItems[itemIndex].quantity + quantityChange;

            // Ensure updated quantity is not NaN and is a valid number
            if (isNaN(updatedQuantity) || updatedQuantity < 1) {
                // Remove item if the quantity drops below 1
                cart.totalPrice -= productPrice * cart.cartItems[itemIndex].quantity; // Adjust total price before removing
                cart.cartItems.splice(itemIndex, 1);
            } else {
                // Adjust total price based on the change
                cart.cartItems[itemIndex].quantity = updatedQuantity;
                cart.totalPrice += productPrice * quantityChange;
            }

            // Ensure totalPrice is a valid number
            if (isNaN(cart.totalPrice)) {
                return res.status(500).json({ message: 'Invalid total price calculation' });
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


exports.countCartItem = async (req, res) => {
    try {
      // Get current user ID from request (after authentication)
      const currentUser = req.user._id;
  
      // Find the cart of the current user
      const cart = await Cart.findOne({ user: currentUser });
  
      // If no cart or cartItems field is missing, return 0 count
      if (!cart || !cart.cartItems) {
        return res.status(200).json({ count: 0 });
      }
  
      // Sum the quantity of all items in the cart
      const count = cart.cartItems.reduce((acc, item) => acc + item.quantity, 0);
  
      // Return the count of items in the cart
      res.status(200).json({ count });
    } catch (error) {
      console.error('Error fetching cart count:', error);
      res.status(500).json({ message: 'Error fetching count', error });
    }
  };
  
  
  

