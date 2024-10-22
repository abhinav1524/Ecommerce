const express = require('express');
const router = express.Router(); // Use express.Router() for routes
const {getAllProducts,createProduct,getProductDetials,updateProduct,deleteProduct,upload} =require('../controllers/productController');
const {getAllCategories,createCategory,updateCategory,deleteCategory,getCategoryDetials}=require("../controllers/categoryController");
const {getAllOrders,updateOrderStatus,cancelOrder}=require("../controllers/orderController");
const {toggleUserBlock}=require("../controllers/userController");
const {handleRefundRequest} =require("../controllers/refundController");
// const { getAllInventories,createInventory, getSingleInventory, updateInventory, deleteInventory } = require('../controllers/inventoryController');
// Define admin product route
router.get('/product',getAllProducts);
router.post('/product',upload,createProduct);
router.put('/product/:id',upload,updateProduct);
router.delete('/product/:id',deleteProduct);
router.get('/product/:id',getProductDetials);
// Define admin categories route //
router.get('/category',getAllCategories);
router.post('/category',createCategory);
router.put('/category/:id',updateCategory);
router.delete('/category/:id',deleteCategory);
router.get('/category/:id',getCategoryDetials);
// Define orders route //
router.get('/orders/',getAllOrders);
router.patch('/orders/:id/status', updateOrderStatus); // Update order status
router.patch('/orders/:id/cancel', cancelOrder);
// user block unblock route //
// In your admin routes file
router.patch('/users/:id/toggle-block', toggleUserBlock);
// return or refund route //
router.post('/refund',handleRefundRequest);
// route for inventory //
// router.get('/inventory', getAllInventories);
// router.post('/inventory', createInventory);
// router.get('/inventory/:productId', getSingleInventory);
// router.patch('/inventory/:productId', updateInventory);
// router.delete('/inventory/:productId', deleteInventory);
module.exports = router;
