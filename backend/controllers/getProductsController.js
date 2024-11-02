const Product = require("../models/product");

const getProducts=async(req,res)=>{
    try {
        const products = await Product.find(); // Fetch all products from the database
        res.json(products); // Send the products as a JSON response
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server error' });
    }
}
const getSingleProduct=async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.json(product);
    } catch (error) {
      console.error('Error fetching product:', error);
      res.status(500).json({ message: 'Server error' });
    }
  }
module.exports = {getProducts ,getSingleProduct};