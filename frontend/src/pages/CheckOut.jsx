import React from "react";

const CheckOut = () => {
  return (
    <>
      <div className="bg-white dark:bg-gray-900 mt-20">
        <div className="w-full max-w-3xl mx-auto p-8">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md border dark:border-gray-700">
            <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
              Checkout
            </h1>

            {/* Shipping Address */}
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">
                Shipping Address
              </h2>
               <p>here come shipping address</p>
            </div>

            {/* Payment Information */}
            <div>
              <h2 className="text-xl font-semibold text-gray-700 dark:text-white mb-2">
                Payment Information
              </h2>
              <div className="mt-4">
                <label
                  htmlFor="card_number"
                  className="block text-gray-700 dark:text-white mb-1"
                >
                  Card Number
                </label>
                <input
                  type="text"
                  id="card_number"
                  className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mt-4">
                <div>
                  <label
                    htmlFor="exp_date"
                    className="block text-gray-700 dark:text-white mb-1"
                  >
                    Expiration Date
                  </label>
                  <input
                    type="text"
                    id="exp_date"
                    className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                  />
                </div>
                <div>
                  <label
                    htmlFor="cvv"
                    className="block text-gray-700 dark:text-white mb-1"
                  >
                    CVV
                  </label>
                  <input
                    type="text"
                    id="cvv"
                    className="w-full rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none"
                  />
                </div>
              </div>
            </div>
            <div class="mt-5">
            <label
              htmlFor="exp_date"
              className="block text-gray-700 dark:text-white mb-1"
            >
             Pay Using UPI Id
              </label>
              <input type="text" class="rounded-lg border py-2 px-3 dark:bg-gray-700 dark:text-white dark:border-none" placeholder="Enter UPI Id" id="upi" name="upi" value=""/>
            </div>
            <div className="mt-8 flex justify-end">
              <button className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-700 dark:bg-teal-600 dark:text-white dark:hover:bg-teal-900">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CheckOut;
