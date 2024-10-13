const express = require('express');
const router = express.Router(); // Use express.Router() for routes
const { isAdmin } = require('../middlewares/isAdmin');
const { isAuthenticated } = require('../middlewares/isAuthenticate');
const {getAllProducts,createProduct,getProductDetials,updateProduct,deleteProduct} =require('../controllers/productController');
// Define your admin route
router.get('/product', isAuthenticated, isAdmin,getAllProducts);
router.post('/product', isAuthenticated, isAdmin,createProduct);
router.get('/product/:id',isAuthenticated, isAdmin,getProductDetials);
router.put('/product/:id', isAuthenticated, isAdmin, updateProduct);
router.delete('/product/:id', isAuthenticated, isAdmin, deleteProduct);

module.exports = router; // Export the router
