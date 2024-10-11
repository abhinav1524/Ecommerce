const User = require('../models/User');
const passport = require('passport'); 
const bcrypt =require('bcrypt');

exports.registerUser =async (req,res) =>{
    const {name,email,phoneNumber,address,password} = req.body;
    try {
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:'user already exist'})
        }
        const hashedPassword = await bcrypt.hash(password,10);
        const newUser =new User({
            name,
            email,
            phoneNumber,
            address,
            password:hashedPassword,
        })
        await newUser.save();
        res.status(201).json({message:"user registered successfully"});
    } catch (error) {
        res.status(500).json({message:'server error',error:error.message});
    }
}

exports.loginUser = (req, res, next) => {
    passport.authenticate('local', (error, user, info) => {
        if (error) return next(error);
        if (!user) {
            return res.status(400).json({ message: info.message });
        }
        req.logIn(user, (error) => {
            if (error) return next(error);
            return res.status(200).json({ message: 'Login successful', user }); // Return user object
        });
    })(req, res, next);
};

exports.logoutUser = (req, res) => {
    req.logout((err) => {
        if (err) {
            return res.status(500).json({ message: 'Error logging out', error: err });
        }
        res.status(200).json({ message: 'Logout successful' });
    });
};

