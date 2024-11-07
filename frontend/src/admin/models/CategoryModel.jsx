import React, { useEffect, useState } from 'react';
const CategoryModal = ({ isModalOpen, handleModalClose, categoryIdToEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  
  const token = localStorage.getItem('jwt'); // Replace with your auth token or method to retrieve it

  useEffect(() => {
    if (categoryIdToEdit) {
      setIsEditing(true);
      fetchCategoryData(categoryIdToEdit);
    } else {
      resetForm();
    }
  }, [categoryIdToEdit]);

  const fetchCategoryData = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/admin/category/${id}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch product data');
      }

      const categoryData = await response.json();
      console.log(categoryData);
      setFormData({
        name: categoryData.name,
      });
    } catch (error) {
      console.error('Error fetching product data:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
    });
    setIsEditing(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const categoryData = new FormData();
    for (const key in formData) {
        categoryData.append(key, formData[key]);
    }
    try {
      const url = isEditing
        ? `http://localhost:5000/api/admin/category/${categoryIdToEdit}`
        : 'http://localhost:5000/api/admin/category/';
      const method = isEditing ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method: method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to add/update product');
      }
      // Reset form fields after successful submission
      resetForm();
      handleModalClose(); // Close the modal after submission
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
                  Category Name
                </label>
                <input type="text" name="name" value={formData.name} onChange={handleInputChange} className="border border-gray-300 p-2 w-full" />
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

export default CategoryModal;
