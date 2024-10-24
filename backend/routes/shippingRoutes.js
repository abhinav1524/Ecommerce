const express = require('express');
const router = express.Router();
const {getShippingAddress,addShippingAddress,editShippingAddress,updateShippingAddress,deleteShippingAddress} =require('../controllers/shippingAddressController')
// adding shipping address routes //
router.get("/shipping-address",getShippingAddress);
router.post("/add-shipping-address",addShippingAddress);
router.get("/edit-shipping-address/:id",editShippingAddress);
router.put("/update-shipping-address/:id",updateShippingAddress);
router.delete("/delete-shipping-address/:id",deleteShippingAddress);

module.exports =router;