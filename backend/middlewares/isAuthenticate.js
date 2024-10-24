function isAuthenticated(req, res, next) {
    // Check if the user is authenticated using Passport.js
    console.log("User in session:", req.user);
    if (req.isAuthenticated()) {
        return next(); // Proceed to the next middleware or route handler
    }

    // If not authenticated, respond with a 401 status
    console.error('Unauthorized access attempt:', req.method, req.originalUrl);
    return res.status(401).json({ message: "Please login first" });
}

module.exports = { isAuthenticated };
