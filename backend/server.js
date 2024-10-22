const express = require('express');
const connectDB = require('./config/db'); // Ensure this is the correct path
const session = require('express-session'); // Corrected: 'session' should be 'express-session'
const passport = require('passport');
const passportConfig = require('./config/passportConfig'); // Ensure this points to your correct config file
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/buyProducts');
const admin = require('./routes/adminRoutes');
const isAdmin =require("./middlewares/isAdmin");
const cart = require('./routes/cartRoutes');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Middleware setup
const corsOptions = {
    origin: 'http://localhost:5173', // your frontend URL
    credentials: true, // Allow cookies to be sent
  };
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: true })); // handle simple form data without image
app.use(express.json()); // handle json data

// Session middleware
app.use(session({
    secret:process.env.SECRET_KEY, // Ensure to use a strong secret
    resave: false,
    saveUninitialized: false, // Fixed: 'saveUnintialized' should be 'saveUninitialized'
}));

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());
passportConfig(passport); // Ensure your passport config is set up correctly

// User routes
app.use('/api/users', userRoutes);
app.use('/api/products',productRoutes);
app.use('/api/admin',isAdmin,admin);
app.use('/api/',cart);
// Basic route to confirm server is running
app.get('/', (req, res) => {
    res.send("API is running...");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
