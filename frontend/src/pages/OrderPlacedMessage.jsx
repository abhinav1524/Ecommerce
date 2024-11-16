import React from "react";

const OrderPlacedMessage = () => {
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-10 text-center">
          <div className="text-green-500 mb-4">
          <i className="fa-solid fa-square-check text-green-500 text-6xl"></i>
          </div>
          <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
            Order Confirmed!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Thank you for your purchase. Your order has been successfully
            placed.
          </p>
          <div className="mt-8">
            <a
              href="/"
              className="bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition"
            >
              Continue Shopping
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderPlacedMessage;
