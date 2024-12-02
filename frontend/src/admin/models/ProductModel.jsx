import React, { useEffect, useState } from 'react';
import { useProducts } from "../../context/ProductContext";
const ProductModal = ({ isModalOpen, handleModalClose, productIdToEdit }) => {
  const { fetchProducts } = useProducts();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    brand: '',
    category: '',
    stock: '',
  });
  const [images, setImages] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  
  const token = localStorage.getItem('jwt'); // Replace with your auth token or method to retrieve it

  useEffect(() => {
    if (productIdToEdit) {
      setIsEditing(true);
      fetchProductData(productIdToEdit);
    } else {
      resetForm();
    }
  }, [productIdToEdit]);

  const fetchProductData = async (id) => {
    try {
      const response = await fetch(`https://ecommerce-kj7x.onrender.com/api/admin/product/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch product data');
      }

      const productData = await response.json();
      setFormData({
        name: productData.name,
        description: productData.description,
        price: productData.price,
        brand: productData.brand,
        category: productData.category,
        stock: productData.stock,
      });
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      brand: '',
      category: '',
      stock: '',
    });
    setImages([]);
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleImageChange = (e) => {
    setImages([...e.target.files]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = new FormData();
    for (const key in formData) {
      productData.append(key, formData[key]);
    }
    images.forEach((image) => {
      productData.append('images', image);
    });

    try {
      const url = isEditing
        ? `https://ecommerce-kj7x.onrender.com/api/admin/product/${productIdToEdit}`
        : 'https://ecommerce-kj7x.onrender.com/api/admin/product/';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: productData,
      });

      if (!response.ok) {
        throw new Error('Failed to add/update product');
      }
      // Reset form fields after successful submission
      resetForm();
      handleModalClose(); // Close the modal after submission
      await fetchProducts();
    } catch (error) {
      console.error('Error adding/updating product:', error);
    }
  };

  return (
    <>
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg mx-5">
            <h2 className="text-xl font-bold mb-4">{isEditing ? 'Edit Product' : 'Add Product'}</h2>
            <form onSubmit={handleSubmit}>
              {/* Input fields for product details */}
              <div className="mb-4">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Name
                </label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="border border-gray-300 p-2 w-full" />
              </div>
              <div className="mb-4">
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <input type="textarea" name="description" value={formData.description} onChange={handleInputChange} className="border border-gray-300 p-2 w-full" />
              </div>
              <div className="mb-4">
                <label htmlFor="price" className="block text-sm font-medium text-gray-700">
                  Price
                </label>
                <input type="number" name="price" value={formData.price} onChange={handleInputChange} className="border border-gray-300 p-2 w-full" />
              </div>
              <div className="mb-4">
                <label htmlFor="brand" className="block text-sm font-medium text-gray-700">
                  Brand
                </label>
                <input type="text" name="brand" value={formData.brand} onChange={handleInputChange} className="border border-gray-300 p-2 w-full" />
              </div>
              <div className="mb-4">
                <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                  Category
                </label>
                <input type="text" name="category" value={formData.category} onChange={handleInputChange} className="border border-gray-300 p-2 w-full" />
              </div>
              <div className="mb-4">
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700">
                  Stock
                </label>
                <input type="number" name="stock" value={formData.stock} onChange={handleInputChange} className="border border-gray-300 p-2 w-full" />
              </div>
              <div className="mb-4">
                <label htmlFor="images" className="block text-sm font-medium text-gray-700">
                  Images
                </label>
                <input type="file" id="images" multiple onChange={handleImageChange} className="border border-gray-300 p-2 w-full" />
              </div>
              <div className="flex justify-end">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2" onClick={handleModalClose}>
                  Cancel
                </button>
                <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                  {isEditing ? 'Update' : 'Add'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductModal;
