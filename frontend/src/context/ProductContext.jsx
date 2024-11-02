import React, { createContext, useContext, useState, useEffect } from 'react';

// Create context
const ProductContext = createContext();

// Custom hook to use the ProductContext
export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to fetch products
    const fetchProducts = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/getproducts');
            if (!response.ok) {
                throw new Error("Error fetching products");
            }
            const data = await response.json();
            setProducts(data);
            setLoading(false);
        } catch (err) {
            console.error("Fetch error:", err);
            setError(err.message);
            setLoading(false);
        }
    };

    // Fetch products only once on component mount
    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <ProductContext.Provider value={{ products, loading, error }}>
            {children}
        </ProductContext.Provider>
    );
};
