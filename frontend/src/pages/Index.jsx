import React from "react";
import '../App.css';
import { useProducts } from '../context/ProductContext';
import { useCart } from "../context/CartContext";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
const Index = () => {
  const { products, loading, error } = useProducts();
  // console.log(products);
  const {addToCart } = useCart();
  const handleAddToCart =async (productId) => {
    const token = localStorage.getItem('jwt');
    console.log(token);
    if(token){
      alert("item add ho gayi hai ");
    }else{
      alert("noobe login first ");
    }
    const quantity=1;
    addToCart(productId, quantity); 
  };
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024, // For tablets and smaller screens
        settings: {
          slidesToShow: 2,
          slidesToScroll:2
        },
      },
      {
        breakpoint: 480, // For mobile screens
        settings: {
          slidesToShow: 1,
          slidesToScroll:1
        },
      },
    ],
  };
  return (
    <>
      {/* hero section start */}
      <div className="bg-white">
        <section className="bg-[#FCF8F1] bg-opacity-30 py-10 sm:py-16 lg:py-24">
          <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="grid items-center grid-cols-1 gap-12 lg:grid-cols-2">
              <div>
                <p className="text-base font-semibold tracking-wider text-blue-600 uppercase">
                  A PC Builders
                </p>
                <h1 className="mt-4 text-4xl font-bold text-black lg:mt-8 sm:text-6xl xl:text-6xl">
                  Consult Your Pc Building From the Experts
                </h1>
                <p className="mt-4 text-base text-black lg:mt-8 sm:text-xl">
                  And Choose Best For You.
                </p>

                <a
                  href="#"
                  title=""
                  className="inline-flex items-center px-6 py-4 mt-8 font-semibold text-black transition-all duration-200 bg-yellow-300 rounded-full lg:mt-8 hover:bg-yellow-400 focus:bg-yellow-400"
                  role="button"
                >
                  Join for free
                  <svg
                    className="w-6 h-6 ml-8 -mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1.5"
                      d="M13 9l3 3m0 0l-3 3m3-3H8m13 0a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </a>

                <p className="mt-5 text-gray-600">
                  Already joined us?{" "}
                  <a
                    href="#"
                    title=""
                    className="text-black transition-all duration-200 hover:underline"
                  >
                    Log in
                  </a>
                </p>
              </div>

              <div>
                <img className="w-full" src="/images/desktop.png" alt="" />
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* card section start here */}
      <section className="py-10 bg-gray-50 sm:py-16 lg:py-24">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex items-end justify-between">
            <div className="flex-1 text-center lg:text-left">
              <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl lg:text-5xl">
                Latest Products
              </h2>
              <p className="max-w-xl mx-auto mt-4 text-base leading-relaxed text-gray-600 lg:mx-0">
                Explore Our Latest Products
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 md:grid-cols-2 gap-6 mt-10">
            {/* first product */}
            <Slider {...settings} className="col-span-full w-full">
            {products.map(product => (
            <div key={product._id} className="w-full max-w-xs bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <a href="#">
              {/* Fixed height for image container */}
              <div className="h-48 w-full overflow-hidden rounded-t-lg mt-5">
                <img
                  className="object-cover w-full h-full"
                  src={`https://ecommerce-kj7x.onrender.com/${product.images[0]}`}
                  alt="product image"
                />
              </div>
            </a>
            <div className="p-5">
              <a href="#">
                {/* Limit the description to 2 lines */}
                <h5 className="text-lg font-semibold capitalize tracking-tight text-gray-900 dark:text-white line-clamp-2">
                  {product.description}
                </h5>
              </a>
              <div className="flex items-center mt-2.5 mb-5">
                {/* Rating stars */}
                <div className="flex items-center space-x-1 rtl:space-x-reverse">
                <svg
                      className="w-4 h-4 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-yellow-300"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                    <svg
                      className="w-4 h-4 text-gray-200 dark:text-gray-600"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 22 20"
                    >
                      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                    </svg>
                </div>
                <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded ml-3">
                  5.0
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold text-gray-900 dark:text-white">
                  ₹{product.price}
                </span>
                <button
                  onClick={() => handleAddToCart(product._id)}
                  className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Add to cart
                </button>
              </div>
            </div>
          </div>
          
            ))}
            </Slider>
          </div>
          {loading && (
                <div className="absolute inset-0 bg-white bg-opacity-50 flex justify-center items-center">
                    <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
                </div>
            )}
        </div>
      </section>
    </>
  );
};

export default Index;
