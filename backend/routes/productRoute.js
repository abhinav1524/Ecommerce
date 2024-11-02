const express = require('express');
const router = express.Router();
const {getProducts,getSingleProduct} = require("../controllers/getProductsController");
// get all the products to show in the home page //
router.get("/api/getproducts",getProducts);
router.get('/api/products/:id',getSingleProduct);
module.exports =router;