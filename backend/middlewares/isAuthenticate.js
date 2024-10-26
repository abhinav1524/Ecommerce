const jwt = require('jsonwebtoken');
const User = require('../models/User'); // Assuming you have a User model

const isAuthenticated = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id); // Attaching user to req
    if (!req.user) return res.status(404).json({ message: 'User not found' });

    next();
  } catch (error) {
    res.status(500).json({ message: 'Authentication failed', error: error.message });
  }
};

module.exports = { isAuthenticated };
