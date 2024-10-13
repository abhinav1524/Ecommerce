const express = require('express');
const router = express.Router();
const {isAuthenticated} =require('../middlewares/isAuthenticate');
const {buyProduct} = require('../controllers/buyProductController');

router.post('/buy',isAuthenticated,buyProduct);

module.exports=router;