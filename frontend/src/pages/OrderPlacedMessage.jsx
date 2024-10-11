import React from "react";

const OrderPlacedMessage = () => {
  return (
    <>
      <div class="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 md:p-10 text-center">
          <div class="text-green-500 mb-4">
          <i class="fa-solid fa-square-check text-green-500 text-6xl"></i>
          </div>
          <h1 class="text-2xl font-semibold text-gray-900 dark:text-white">
            Order Confirmed!
          </h1>
          <p class="text-gray-600 dark:text-gray-400 mt-2">
            Thank you for your purchase. Your order has been successfully
            placed.
          </p>
          <div class="mt-6">
            <h2 class="text-lg font-bold text-gray-800 dark:text-gray-200 mb-2">
              Order Summary
            </h2>
            <p class="text-gray-600 dark:text-gray-400">
              Order ID: <span class="font-semibold">#123456</span>
            </p>
            <p class="text-gray-600 dark:text-gray-400">
              Total Amount: <span class="font-semibold">$120.00</span>
            </p>
          </div>
          <div class="mt-8">
            <a
              href="/"
              class="bg-indigo-500 text-white px-6 py-2 rounded-lg hover:bg-indigo-600 transition"
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
