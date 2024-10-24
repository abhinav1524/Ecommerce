// authMiddleware.js
const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const token = req.headers['authorization']?.split(' ')[1];
    if (!token) {
        return res.status(403).send('A token is required for authentication');
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(401).send('Invalid Token');
        }
        req.user = user; // Assuming the token contains user information
        next();
    });
};

module.exports = verifyToken;
