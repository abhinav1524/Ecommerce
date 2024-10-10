import React from "react";

const AddToCart = () => {
  return (
    <>
      <div class="container mx-auto mt-10 px-4 sm:px-6 lg:px-8">
        <div class="sm:flex shadow-md my-10">
          <div class="w-full sm:w-3/4 bg-white px-6 sm:px-10 py-10">
            <div class="flex justify-between border-b pb-8">
              <h1 class="font-semibold text-xl sm:text-2xl">Shopping Cart</h1>
              <h2 class="font-semibold text-xl sm:text-2xl">3 Items</h2>
            </div>
            <div class="flex flex-col md:flex-row md:items-center py-8 border-t border-gray-50">
              <div class="md:w-4/12 w-full">
                <img
                  src="https://i.ibb.co/6gzWwSq/Rectangle-20-1.png"
                  alt="Black Leather Purse"
                  class="h-48 w-full object-center object-cover md:block hidden"
                />
                <img
                  src="https://i.ibb.co/TTnzMTf/Rectangle-21.png"
                  alt="Black Leather Purse"
                  class="md:hidden w-full h-48 object-center object-cover"
                />
              </div>
              <div class="md:pl-6 md:w-8/12 w-full mt-4 md:mt-0">
                <p class="text-sm text-gray-800">RF293</p>
                <div class="flex justify-between items-center mt-2">
                  <p class="text-base font-black text-gray-800">
                    Luxe card holder
                  </p>
                  <div class="flex items-center space-x-2">
                    <button class="bg-red-500 text-white text-xl px-4 py-1 rounded hover:bg-red-600">
                      -
                    </button>
                    <span class="text-lg font-semibold text-gray-800">1</span>
                    <button class="bg-green-500 text-white text-xl px-4 py-1 rounded hover:bg-green-600">
                      +
                    </button>
                  </div>
                </div>
                <p class="text-sm text-gray-600 mt-2">Height: 10 inches</p>
                <p class="text-sm text-gray-600 mt-1">Color: Black</p>
                <p class="text-sm text-gray-600 mt-2">
                  Composition: 100% calf leather
                </p>
                <div class="flex justify-between items-center mt-4">
                  <div class="flex space-x-4">
                    <p class="text-sm underline text-gray-800 cursor-pointer">
                      Add to favorites
                    </p>
                    <p class="text-sm underline text-red-500 cursor-pointer">
                      Remove
                    </p>
                  </div>
                  <p class="text-base font-black text-gray-800">$600</p>
                </div>
              </div>
            </div>
            {/* adding one more product */}
            <div class="flex flex-col md:flex-row md:items-center py-8 border-t border-gray-50">
              <div class="md:w-4/12 w-full">
                <img
                  src="https://i.ibb.co/6gzWwSq/Rectangle-20-1.png"
                  alt="Black Leather Purse"
                  class="h-48 w-full object-center object-cover md:block hidden"
                />
                <img
                  src="https://i.ibb.co/TTnzMTf/Rectangle-21.png"
                  alt="Black Leather Purse"
                  class="md:hidden w-full h-48 object-center object-cover"
                />
              </div>
              <div class="md:pl-6 md:w-8/12 w-full mt-4 md:mt-0">
                <p class="text-sm text-gray-800">RF293</p>
                <div class="flex justify-between items-center mt-2">
                  <p class="text-base font-black text-gray-800">
                    Luxe card holder
                  </p>
                  <div class="flex items-center space-x-2">
                    <button class="bg-red-500 text-white text-xl px-4 py-1 rounded hover:bg-red-600">
                      -
                    </button>
                    <span class="text-lg font-semibold text-gray-800">1</span>
                    <button class="bg-green-500 text-white text-xl px-4 py-1 rounded hover:bg-green-600">
                      +
                    </button>
                  </div>
                </div>
                <p class="text-sm text-gray-600 mt-2">Height: 10 inches</p>
                <p class="text-sm text-gray-600 mt-1">Color: Black</p>
                <p class="text-sm text-gray-600 mt-2">
                  Composition: 100% calf leather
                </p>
                <div class="flex justify-between items-center mt-4">
                  <div class="flex space-x-4">
                    <p class="text-sm underline text-gray-800 cursor-pointer">
                      Add to favorites
                    </p>
                    <p class="text-sm underline text-red-500 cursor-pointer">
                      Remove
                    </p>
                  </div>
                  <p class="text-base font-black text-gray-800">$600</p>
                </div>
              </div>
            </div>
            <a
              href="#"
              class="flex font-semibold text-indigo-600 text-sm mt-10"
            >
              <svg
                class="fill-current mr-2 text-indigo-600 w-4"
                viewBox="0 0 448 512"
              >
                <path d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
              </svg>
              Continue Shopping
            </a>
          </div>
          <div id="summary" class="w-full h-full max-h-100 sm:w-1/4 bg-gray-100 px-6 py-12 mb-2 mr-2">
            <h1 class="font-semibold text-xl sm:text-2xl border-b pb-8 pt-4">
              Order Summary
            </h1>
            <div class="flex justify-between mt-10 mb-5">
              <span class="font-semibold text-sm uppercase">Items 3</span>
              <span class="font-semibold text-sm">$590</span>
            </div>
            {/* <div>
              <label class="font-medium inline-block mb-3 text-sm uppercase">
                Shipping
              </label>
              <select class="block p-2 text-gray-600 w-full text-sm">
                <option>Standard shipping - $10.00</option>
              </select>
            </div> */}
            {/* <div class="py-10">
              <label class="font-semibold inline-block mb-3 text-sm uppercase">
                Promo Code
              </label>
              <input
                type="text"
                placeholder="Enter your code"
                class="p-2 text-sm w-full"
              />
            </div>
            <button class="bg-red-500 hover:bg-red-600 px-5 py-2 text-sm text-white uppercase w-full">
              Apply
            </button> */}
            <div class="border-t mt-8">
              <div class="flex font-semibold justify-between py-6 text-sm uppercase">
                <span>Total cost</span>
                <span>$600</span>
              </div>
              <button class="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full">
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddToCart;
