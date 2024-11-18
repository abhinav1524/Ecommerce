const express = require('express');
const connectDB = require('./config/db'); // Ensure this is the correct path
const session = require('express-session'); // Corrected: 'session' should be 'express-session'
const passport = require('passport');
const passportConfig = require('./config/passportConfig'); // Ensure this points to your correct config file
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/buyProducts');
const admin = require('./routes/adminRoutes');
const isAdmin =require("./middlewares/isAdmin");
const {isAuthenticated }= require('./middlewares/isAuthenticate');
const cart = require('./routes/cartRoutes');
const shippingRoutes = require('./routes/shippingRoutes');
const displayProducts = require("./routes/productRoute");
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware setup
const corsOptions = {
    origin: ['http://localhost:5173', 'https://pcecommerce.onrender.com'], // your frontend URL
    credentials: true, // Allow cookies to be sent
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers
  };
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true })); // handle simple form data without image
app.use(express.json()); // handle json data

// Session middleware
app.use(session({
    secret:process.env.SECRET_KEY, // Ensure to use a strong secret
    resave: false,
    saveUninitialized: false, // Fixed: 'saveUnintialized' should be 'saveUninitialized'
    cookie: { secure: false,maxAge: 1000 * 60 * 60 }
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport); // Ensure your passport config is set up correctly
// serving static files //
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// User routes
app.use('/api/users', userRoutes);
// product routes
app.use('/api/products',productRoutes);
// admin routes 
app.use('/api/admin',isAuthenticated,isAdmin,admin);
// cart routes
app.use('/api/',cart);
// shipping routes
app.use('/api/users',passport.authenticate('jwt', { session: false }), shippingRoutes);
// get products for user //
app.use(displayProducts);
// Basic route to confirm server is running
app.get('/', (req, res) => {
    res.send("API is running...");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
