const express = require('express');
const router = express.Router(); // Use express.Router() for routes
const { isAdmin } = require('../middlewares/isAdmin');
const { isAuthenticated } = require('../middlewares/isAuthenticate');
const {getAllProducts,createProduct,getProductDetials,updateProduct,deleteProduct,upload} =require('../controllers/productController');
// Define your admin route
router.get('/product', isAuthenticated, isAdmin,getAllProducts);
router.post('/product', isAuthenticated, isAdmin,upload,createProduct);
router.get('/product/:id',isAuthenticated, isAdmin,getProductDetials);
router.post('/product/:id', isAuthenticated, isAdmin,upload,updateProduct);
router.delete('/product/:id', isAuthenticated, isAdmin, deleteProduct);
router.post('/test-upload', upload, (req, res) => {
    console.log('Request files:', req.files); // Log received files
    if (!req.files || req.files.length === 0) {
        return res.status(400).json({ message: 'No files uploaded' });
    }
    res.status(200).json({ message: 'File(s) uploaded successfully', files: req.files });
});


module.exports = router; // Export the router
