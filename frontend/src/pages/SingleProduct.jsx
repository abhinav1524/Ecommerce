import React from 'react'
import { useState } from 'react';
const SingleProduct = () => {
    const [mainImage, setMainImage] = useState('images/samsungMonitor2.jpg'); // Initial main image

  // Array of thumbnail images
  const thumbnails = [
    'images/samsungMonitor2.jpg',
    'images/Samsung_Monitor3.jpg',
    'images/Samsung_Monitor5.jpg',
    'images/Samsung_Monitor6.jpg',
    'images/Samsung_Monitor7.jpg',
  ];

  // Function to change the main image
  const changeImage = (thumbnail) => {
    setMainImage(thumbnail);
  };

  return (
    <>
     <div class="max-w-6xl mx-auto p-4 margin_top">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
            <div className="border p-4">
                {/* Main Image */}
                <img src={mainImage} alt="Main Product" className="w-full object-cover" />
            </div>

            <div className="flex space-x-2 mt-4">
                {/* Thumbnails */}
                {thumbnails.map((thumbnail, index) => (
                <div className="border p-1" key={index}>
                    <img
                    src={thumbnail}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-20 h-20 object-cover cursor-pointer"
                    onClick={() => changeImage(thumbnail)} // Update main image on click
                    />
                </div>
                ))}
            </div>
            </div>
            <div>
            <h1 class="text-2xl font-semibold">Samsung 27-inches 68.46cm 2560 X 1440 (WQHD) Pixels Odyssey G5 Gaming, Ultra WQHD, 144 Hz, 1ms, 1000R Curved Monitor, QLED, AMD FreeSync Premium LC27G55TQWWXXL, Black</h1>
            <p class="text-sm text-gray-600">SKU: 1234567 &middot; BRAND:Samsung</p>
            <div class="flex items-center space-x-2 my-3">
                <div class="flex">
                <svg class="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927a1 1 0 011.902 0l1.286 4.18a1 1 0 00.949.69h4.392a1 1 0 01.592 1.808l-3.555 2.605a1 1 0 00-.36 1.118l1.286 4.18a1 1 0 01-1.539 1.118L10 14.118l-3.555 2.605a1 1 0 01-1.539-1.118l1.286-4.18a1 1 0 00-.36-1.118L2.277 9.605a1 1 0 01.592-1.808h4.392a1 1 0 00.949-.69l1.286-4.18z"></path>
                </svg>
                </div>
                <span class="text-sm text-gray-600">
                <i class="fa-solid fa-star text-yellow-500"></i>
                <i class="fa-solid fa-star text-yellow-500"></i>
                <i class="fa-solid fa-star text-yellow-500"></i>
                <i class="fa-solid fa-star text-yellow-500"></i>
                <i class="fa-solid fa-star-half-stroke text-yellow-500"></i>
                </span>
            </div>
            <div class="text-lg mb-3">
                <span class="line-through text-gray-500">$38.00</span>
                <span class="text-green-600 font-bold ml-2">$24.00</span>
                <span class="text-sm">Per Piece</span>
            </div>
            <p class="text-sm text-gray-600 mb-4">Lorem ipsum dolor sit amet consectetur adipisicing elit facere harum natus amet soluta fuga consectetur alias veritatis.</p>
            {/* <div class="space-x-2 mb-4">
                <span class="inline-block bg-gray-100 text-gray-600 py-1 px-2 rounded-full text-sm">Organic</span>
                <span class="inline-block bg-gray-100 text-gray-600 py-1 px-2 rounded-full text-sm">Fruits</span>
                <span class="inline-block bg-gray-100 text-gray-600 py-1 px-2 rounded-full text-sm">Chillis</span>
            </div> */}
            <div class="flex items-center space-x-4 mb-6">
                <a href="#" class="text-gray-500 hover:text-gray-800"><i class="fab fa-facebook"></i></a>
                <a href="#" class="text-gray-500 hover:text-gray-800"><i class="fab fa-twitter"></i></a>
                <a href="#" class="text-gray-500 hover:text-gray-800"><i class="fab fa-linkedin"></i></a>
                <a href="#" class="text-gray-500 hover:text-gray-800"><i class="fab fa-instagram"></i></a>
            </div>
            <div class="flex space-x-4">
                <button class="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full flex items-center">
                <i class="fas fa-shopping-cart mr-2"></i> ADD TO CART
                </button>
                {/* <button class="bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-full">ADD TO WISH</button> */}
            </div>
            </div>
        </div>
    </div>
   
    </>
  )
}

export default SingleProduct