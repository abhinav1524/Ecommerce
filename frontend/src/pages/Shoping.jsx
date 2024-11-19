import { useState, useEffect } from "react";
import { useProducts } from "../context/ProductContext";
import { Link } from "react-router-dom";
const Shoping = () => {
const { products, loading,setLoading, error } = useProducts();
const [searchTerm, setSearchTerm] = useState("");
const [searchResults, setSearchResults] = useState([]); // New state for search results
const [filteredProducts, setFilteredProducts] = useState([]);
const [selectedBrands, setSelectedBrands] = useState([]);
const [priceRange, setPriceRange] = useState({ min: "", max: "" });

useEffect(() => {
  if (Array.isArray(products) && products.length > 0 && searchResults.length === 0) {
    setFilteredProducts(products);
  }
}, [products, searchResults]);
// console.log(products);
// console.log(filteredProducts);

// Fetch search results from the backend
const handleSearch = async () => {
  if (!searchTerm) return;
  setLoading(true);
  try {
    const response = await fetch(`https://ecommerce-kj7x.onrender.com/api/products/search?searchTerm=${encodeURIComponent(searchTerm)}`);
    const data = await response.json();
    if (Array.isArray(data)) {
      setSearchResults(data); // Ensure data is an array
      setFilteredProducts(data); // Set the filtered products from the search results
      setLoading(false);
    } else {
      setSearchResults([]); // Reset if data is not an array
      setFilteredProducts([]);
      setLoading(false);
    }
  } catch (error) {
    console.log('Error fetching search results:', error);
    setLoading(false);
  }
};

// Handle brand checkbox changes
const handleBrandChange = (brand) => {
  setSelectedBrands((prevBrands) =>
    prevBrands.includes(brand)
      ? prevBrands.filter((b) => b !== brand)
      : [...prevBrands, brand]
  );
};

// Handle price range input changes
const handlePriceChange = (e) => {
  const { name, value } = e.target;
  setPriceRange((prevRange) => ({
    ...prevRange,
    [name]: value,
  }));
};

// Apply filters to the products or search results
const applyFilters = () => {
  let filtered = searchResults.length > 0 ? searchResults : products; // Use searchResults if available

  // Filter by brand
  if (selectedBrands.length > 0) {
    filtered = filtered.filter((product) =>
      selectedBrands.includes(product.brand)
    );
  }

  // Filter by price range
  const minPrice = parseFloat(priceRange.min) || 0;
  const maxPrice = parseFloat(priceRange.max) || 200000;
  filtered = filtered.filter((product) => {
    return product.price >= minPrice && product.price <= maxPrice;
  });

  setFilteredProducts(filtered);
};
const clearFilters=()=>{
  setSelectedBrands([]);
  setPriceRange({ min: "", max: "" });
  setFilteredProducts(products);
  // console.log("y")
}
  return (
    <>
      <div className="mt-24 flex justify-center items-center px-4">
        <div className="flex border rounded-md shadow-md overflow-hidden">
          <input
            className="px-4 py-2 outline-none text-gray-700 w-full sm:w-64"
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-green-500 text-white px-4 py-2 hover:bg-green-600 transition duration-200"
          >
            Search
          </button>
        </div>
      </div>
      <main class="max-w-7xl mx-auto p-4 mt-24 space-y-8 lg:space-y-0 lg:flex lg:space-x-8">
        <aside class="w-full lg:w-1/4">
          <div class="bg-white p-4 rounded-lg shadow-md mb-6 lg:mb-0">
            <h2 class="font-bold mb-4">Filter by Price</h2>
            <div class="flex space-x-2 mb-4">
              <input
                type="number"
                name="min"
                placeholder="Min Price"
                className="border rounded p-2 w-full"
                value={priceRange.min}
                onChange={handlePriceChange}
              />
              <input
                type="number"
                name="max"
                placeholder="Max Price"
                className="border rounded p-2 w-full"
                value={priceRange.max}
                onChange={handlePriceChange}
              />
            </div>
          </div>
          <div class="bg-white p-4 rounded-lg shadow-md  mt-6">
            <h2 class="font-bold mb-4">Filter by Brand</h2>
            <div class="max-h-40 overflow-y-auto">
              {[
                "Samsung",
                "AMD",
                "Intel",
                "Nvidia",
                "Asus",
                "Corsair",
                "Logitech",
              ].map((brand) => (
                <label key={brand} className="flex items-center space-x-2 mb-2">
                  <input
                    type="checkbox"
                    className="form-checkbox h-4 w-4"
                    onChange={() => handleBrandChange(brand)}
                  />
                  <span>{brand}</span>
                </label>
              ))}
            </div>
          </div>
          <button
            onClick={applyFilters}
            class="bg-green-500 text-white w-full py-2 rounded mt-4 hover:bg-green-600"
          >
          Apply Filter
          </button>
          <button
            onClick={clearFilters}
            class="bg-red-500 text-white w-full py-2 rounded mt-4 hover:bg-red-600"
          >
          Clear Filter
          </button>
        </aside>

        <section class="w-full lg:w-3/4 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div class="bg-white p-4 rounded-lg shadow-md relative h-[320px]">
              <span class="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                New
              </span>
              <Link to={`/product/${product._id}`}>
                <img
                  src={`https://ecommerce-kj7x.onrender.com/${product.images[0]}`}
                  alt="Product"
                  class="mx-auto mb-4 max-h-32"
                />
              </Link>
              <div class="text-center">
                <i class="fa-solid fa-star text-yellow-500"></i>
                <i class="fa-solid fa-star text-yellow-500"></i>
                <i class="fa-solid fa-star text-yellow-500"></i>
                <i class="fa-solid fa-star text-yellow-500"></i>
                <i class="fa-solid fa-star-half-stroke text-yellow-500"></i>
              </div>
              <h3 class="font-medium text-lg mb-2 text-center truncate w-48 mx-auto">
                {product.name}
              </h3>
              <div class="flex justify-center items-center mb-2">
                {/* <span class="line-through text-gray-400">₹</span> */}
                <span class="ml-2 text-green-500">₹{product.price}</span>
              </div>
              <div class="flex justify-between items-center">
                <button class="bg-green-500 text-white w-full text-sm xl:text-lg 2xl:text-xl md:text-base px-2 xl:px-4 2xl:px-4 md:px-4 py-2 rounded hover:bg-green-600 custom_btn">
                  Buy Now <i class="fa-solid fa-cart-shopping"></i>
                </button>
              </div>
            </div>
          ))}
        </section>
        {loading && (
                <div className="absolute inset-0 bg-white bg-opacity-50 flex justify-center items-center">
                    <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
                </div>
            )}
      </main>
    </>
  );
};

export default Shoping;
