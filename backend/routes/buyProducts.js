const express = require('express');
const router = express.Router();
const {isAuthenticated} =require('../middlewares/isAuthenticate');
const createOrder =require("../controllers/buyProductController");
router.post('/buy',isAuthenticated,createOrder);
module.exports=router;