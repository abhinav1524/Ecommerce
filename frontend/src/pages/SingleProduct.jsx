import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null); // Initially set to null to fetch data
  const [mainImage, setMainImage] = useState(null); // Initially set to null for main image
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/products/${id}`);
        const data = await response.json();
        setProduct(data);
        setMainImage(`http://localhost:5000/${data.images[0]}`); // Set initial main image
      } catch (error) {
        console.error('Error fetching product data:', error);
      }
    };

    if (!product) {
      fetchProduct();
    }
  }, [id, product]);

  if (!product) return <p>Loading...</p>;

  // Function to change the main image when a thumbnail is clicked
  const changeImage = (thumbnail) => {
    setMainImage(thumbnail);
  };

  return (
    <>
      <div className="max-w-6xl mx-auto p-4 margin_top">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <div className="border p-4">
              {/* Main Image */}
              <img src={mainImage} alt="Main Product" className="w-full object-cover" />
            </div>

            <div className="flex space-x-2 mt-4">
              {/* Thumbnails */}
              {product.images.map((image, index) => (
                <div className="border p-1" key={index}>
                  <img
                    src={`http://localhost:5000/${image}`}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-20 h-20 object-cover cursor-pointer"
                    onClick={() => changeImage(`http://localhost:5000/${image}`)} // Update main image on click
                  />
                </div>
              ))}
            </div>
          </div>
          <div>
            <h1 className="text-2xl font-semibold">{product.name}</h1>
            <p className="text-sm text-gray-600">Brand: {product.brand}</p>
            <div className="text-lg mb-3">
              <span className="text-green-600 font-bold ml-2">${product.price}</span>
              <span className="text-sm">Per Piece</span>
            </div>
            <p className="text-sm text-gray-600 mb-4">{product.description}</p>
            <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full flex items-center">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SingleProduct;
