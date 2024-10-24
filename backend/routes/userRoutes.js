const express = require('express');
const router = express.Router();
const {registerUser,loginUser,logoutUser,editUser,updateUser}=require('../controllers/userController');
router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/logout',logoutUser);
// adding profile update routes //
router.get("/edit/:id",editUser);
router.patch("/edit/:id",updateUser);

module.exports =router;