const multer = require('multer');
const fs = require('fs');
const path = require('path');
const Product =require("../models/product");

// Set up Multer storage engine
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/'); // Folder to save uploaded files
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // Use timestamp to avoid file name collisions
    },
});

// Create upload middleware
const upload = multer({ storage }).array('images', 6);
exports.upload = upload;
// read all the product
exports.getAllProducts=async (req, res) => {
    try {
        const products = await Product.find(); // Fetch all products from the database
        res.json(products); // Send the products as a JSON response
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

// create the product
exports.createProduct =async (req, res) => {
    // console.log('Request body:', req.body);
    // console.log('Request files:', req.files); 
    try {
        const { name, description, price,brand, category, stock,images } = req.body;

        // Validate the input
        if (!name || !description || !price || !category || typeof stock === 'undefined') {
            return res.status(400).json({ message: 'All fields are required' });
        }

        if (!req.files || req.files.length === 0) {
            return res.status(400).json({ message: 'At least one image is required' });
        }

        // Create the product
        const product = new Product({
            name,
            description,
            price,
            brand,
            category,
            stock,
            images:req.files.map(file=>file.path)
        });

        // Save the product in the database
        const savedProduct = await product.save();

        // Respond with the created product
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ message: `Server error ${error}` });
    }
};

exports.getProductDetials =async (req,res)=>{
    try {
        const { id } = req.params; // Extract product ID from request params
        const product = await Product.findById(id);

        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        res.status(200).json(product); // Send back the product details
    } catch (error) {
        res.status(500).json({ message: 'Error fetching product details', error });
    }
}

exports.updateProduct = async (req, res) => {
    const { id } = req.params; // Get the product ID from the request parameters

    try {
        // console.log('Request body:', req.body);
        // console.log('Request files:', req.files);

        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Validate fields
        if (!req.body.name || !req.body.description || !req.body.price || !req.body.category || typeof req.body.stock === 'undefined') {
            return res.status(400).json({ message: 'All fields are required' });
        }

        // Handle image uploads
        if (req.files && req.files.length > 0) {
            // Delete old images if they exist
            if (product.images && product.images.length > 0) {
                const oldImages = product.images;
                oldImages.forEach((image) => {
                    const filePath = path.join(__dirname, '..', image); // Adjust the path as necessary
                    fs.unlink(filePath, (err) => {
                        if (err) {
                            console.error(`Error deleting old image: ${image}`, err);
                        } else {
                            console.log(`Deleted old image: ${image}`);
                        }
                    });
                });
            }

            // Update the images array with new images
            product.images = req.files.map(file => file.path); // Update the images array
        }

        // Update product fields
        product.name = req.body.name;
        product.description = req.body.description;
        product.price = req.body.price;
        product.brand = req.body.brand;
        product.category = req.body.category;
        product.stock = req.body.stock;

        await product.save(); // Save the updated product
        res.json({ message: 'Product updated successfully', product }); // Return the updated product
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ message: 'Server error' });
    }
};

exports.deleteProduct=async (req, res) => {
    const { id } = req.params; // Get the product ID from the request parameters

    try {
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        await Product.findByIdAndDelete(id); // Delete the product from the database
        res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ message: 'Server error' });
    }
};
