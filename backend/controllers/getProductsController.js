const Product = require("../models/product");

const getProducts=async(req,res)=>{
    try {
        const products = await Product.find(); // Fetch all products from the database
        res.json(products); // Send the products as a JSON response
    } catch (error) {
        // console.error('Error fetching products:', error);
        res.status(500).json({ message: 'Server error' });
    }
}
const getSingleProduct=async (req, res) => {
  // console.log('getSingleProduct called with ID:', req.params.id);
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
const getSearchResult=async (req, res) => {
  const { searchTerm } = req.query;
  // console.log('Search term received:', searchTerm);
  try {
    const query = {};
    if (searchTerm) {
        // Use regex to search for products that match the search term
        query.name = { $regex: searchTerm, $options: 'i' }; // Case insensitive
    }

    // Find products matching the search query
    const products = await Product.find(query);
    
    // Return the matching products
    res.status(200).json(products);
} catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server error' });
}
}
module.exports = {getProducts ,getSingleProduct,getSearchResult};