const User = require('../models/User');
const passport = require('passport'); 
const bcrypt =require('bcrypt');

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
        console.error('Error during user registration:', error); // Log the error for debugging
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

exports.loginUser = (req, res, next) => {
    passport.authenticate('local', (error, user, info) => {
        if (error) return next(error);
        if (!user) {
            return res.status(400).json({ message: info.message,user: {
                username: user.username,
                role: user.role
            } });
        }
        // find if user is block by admin or not //
        if (user.isBlocked) {
            return res.status(403).json({
                message: 'Your account is blocked by admin. Contact the site owner to unblock your account.'
            });
        }
        req.logIn(user, (error) => {
            if (error) return next(error);
            return res.status(200).json({ message: 'Login successful',
                user: {
                    name: user.name,
                    email: user.email,
                    phoneNumber: user.phoneNumber,
                    address: user.address,
                },
            }); // Return user object
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

