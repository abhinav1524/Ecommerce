const express = require('express');
const router = express.Router();
const {isAuthenticated} =require('../middlewares/isAuthenticate');
const {createOrder,getallorders} =require("../controllers/buyProductController");
router.get('/all-orders/',isAuthenticated,getallorders);
router.post('/buy',isAuthenticated,createOrder);
module.exports=router;