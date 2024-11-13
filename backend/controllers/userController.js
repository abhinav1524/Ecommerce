const User = require('../models/User');
const passport = require('passport'); 
const bcrypt =require('bcrypt');
const jwt = require('jsonwebtoken');


exports.getAllUsers=async(req,res)=>{
  try {
    const users =await User.find();
    res.status(200).json({
        users:users
    })
    // console.log(users);
  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}
exports.registerUser = async (req, res) => {
    const { name, email, phoneNumber, address, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({
            name,
            email,
            phoneNumber,
            address,
            password: hashedPassword,
        });

        // Save the user and store the result in savedUser
        const savedUser = await newUser.save();

        // Return user object along with success message
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email,
                phoneNumber: savedUser.phoneNumber,
                address: savedUser.address,
            }
        });
    } catch (error) {
        // console.error('Error during user registration:', error); // Log the error for debugging
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.loginUser = (req, res, next) => {
    passport.authenticate('local', (error, user, info) => {
        if (error) return next(error);
        if (!user) return res.status(400).json({ message: info.message });

        // Check if user is blocked
        if (user.isBlocked) {
            return res.status(403).json({
                message: 'Your account is blocked by admin. Contact the site owner to unblock your account.'
            });
        }

        // Create JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        return res.status(200).json({
            message: 'Login successful',
            token,
            user: {
                id: user.id,
                role:user.role,
                name: user.name,
                email: user.email,
                phoneNumber: user.phoneNumber,
                address: user.address,
            },
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

// toogle functionality for blocking or unblocking the user //
exports.toggleUserBlock = async (req, res) => {
    const { id } = req.params; // Get user ID from request parameters

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Toggle the isBlocked field
        user.isBlocked = !user.isBlocked;
        await user.save();

        res.status(200).json({
            message: user.isBlocked ? 'User blocked' : 'User unblocked',
            user,
        });
    } catch (error) {
        console.error('Error toggling user block:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.editUser = async (req,res) => {
    try {
        const {id}=req.params;
        const user=await User.findById(id);
        if(!user){
            res.status(404).json({message:"No user found"});
        }
        res.status(200).json(user);
     } catch (error) {
        res.status(500).json({ message: 'Error fetching user details', error });
     }
}

exports.updateUser=async(req,res)=>{
    try {
        const {id}=req.params;
        const updateuser=await User.findById(id);
        if(!updateuser){
            res.status(404).json({message:"No user found"});
        }
        if (!updateuser) {
            return res.status(400).json({ message: 'all field are required' });
        }
        updateuser.name = req.body.name;
        updateuser.email = req.body.email;
        updateuser.phoneNumber = req.body.phoneNumber;
        updateuser.address = req.body.address;
        await updateuser.save();
        res.status(200).json(updateuser);
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

