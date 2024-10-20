// routes/cartRoutes.js
const express = require('express');
const { addToCart, getCart, clearCart, removeFromCart } = require('../controllers/cartController');
const { isAuthenticated } = require("../middlewares/isAuthenticate"); // Assuming you have an auth middleware

const router = express.Router();

router.post('/cart', isAuthenticated, addToCart); // Add item to cart
router.get('/cart', isAuthenticated, getCart); // Get cart items
router.delete('/cart', isAuthenticated, clearCart); // Clear cart
router.delete('/cart/item', isAuthenticated, removeFromCart); // Remove item from cart

module.exports = router;
