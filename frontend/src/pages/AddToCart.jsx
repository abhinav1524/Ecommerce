import { useEffect, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useCart } from '../context/CartContext';
const AddToCart = () => {
  const token = localStorage.getItem("jwt");
  const {  items,totalPrice,updateCartQuantity,removeItemFromCart,removeAllItems} = useCart();
console.log(totalPrice);
  // Fetching the data from the cart API

  const handleUpdateQuantity = (productId, quantity, action) => {
    let quantityChange = 0;

    // Determine the new quantity change based on the action
    if (action === 'increase') {
        quantityChange = 1;  // Increase by 1
    } else if (action === 'decrease' && quantity > 1) {
        quantityChange = -1; // Decrease by 1, but only if quantity is greater than 1
    }

    // Send the quantityChange to the backend
    if (quantityChange !== 0) {
        updateCartQuantity(productId, quantityChange);
    }
};
// useEffect(() => {
//   getCartItems();
// }, [handleUpdateQuantity]);

  const handleRemove = (productId) => {
    console.log(productId);
    removeItemFromCart(productId);
  };

  const makePayment = async () => {
    const orderItems = items.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
    }));

    try {
      const stripe = await loadStripe("your-stripe-publishable-key");
      const response = await fetch("http://localhost:5000/api/products/buy", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ cartItems: orderItems, paymentMethod: "card" }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.log("Server Error:", errorText);
        return;
      }

      const session = await response.json();
      if (!session.id) {
        console.log("Stripe session ID not returned from backend.");
        return;
      }

      const result = await stripe.redirectToCheckout({ sessionId: session.id });
      if (result.error) {
        console.log(result.error);
      }
    } catch (error) {
      console.log("Payment Error:", error.message);
    }
  };

  // delete all items //
  const deleteAllItems = async () => {
    console.log("delete all items function hit");
    removeAllItems();
  };

  return (
    <div className="container mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <div className="sm:flex shadow-md my-10">
        <div className="w-full sm:w-3/4 bg-white px-6 sm:px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-xl sm:text-2xl">Shopping Cart</h1>
            <h2 className="font-semibold text-xl sm:text-2xl">{items.length > 0 ? `${items.length} Items` : 'Cart Is Empty'}</h2>
          </div>
          {items.length > 0 ? (
            items.map((item) => (
              <div key={item.product._id} className="flex flex-col md:flex-row md:items-center py-8 border-t border-gray-50">
                <div className="md:w-4/12 w-full">
                  <img
                    src={`http://localhost:5000/${item.product.images[0]}`}
                    alt={item.product.name}
                    className="h-48 w-full object-center object-cover"
                  />
                </div>
                <div className="md:pl-6 md:w-8/12 w-full mt-4 md:mt-0">
                  <p className="text-sm text-gray-800">{item.product.brand}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-base font-black text-gray-800">{item.product.name}</p>
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleUpdateQuantity(item.product._id, item.quantity, 'decrease')}
                        className="bg-red-500 text-white text-xl px-4 py-1 rounded hover:bg-red-600"
                      >
                        -
                      </button>
                      <span className="text-lg font-semibold text-gray-800">{item.quantity}</span>
                      <button
                        onClick={() => handleUpdateQuantity(item.product._id, item.quantity, 'increase')}
                        className="bg-green-500 text-white text-xl px-4 py-1 rounded hover:bg-green-600"
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">{item.product.description}</p>
                  <div className="flex justify-between items-center mt-4">
                    <button
                      onClick={() => handleRemove(item.product._id)}
                      className="text-xl ml-5 cursor-pointer text-red-500"
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                    <p className="text-base font-black text-gray-800">₹{item.product.price * item.quantity}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p>No items in cart.</p>
          )}
          <div className="grid grid-cols-12 xl:grid-cols-12 md:grid-cols-12">
            <a href="/" className="col-span-6 font-semibold text-indigo-600 text-sm mt-10">Continue Shopping</a>
            <button onClick={deleteAllItems} className="col-span-6 mt-10">Delete All</button>
          </div>
        </div>
        <div id="summary" className="w-full sm:w-1/4 bg-gray-100 px-6 py-12 mb-2">
          <h1 className="font-semibold text-xl sm:text-2xl border-b pb-8">Order Summary</h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">Items {items.length}</span>
            <span className="font-semibold text-sm">₹{totalPrice}</span>
          </div>
          <div className="border-t mt-8">
            <div className="flex font-semibold justify-between py-6 text-sm uppercase">
              <span>Total cost</span>
              <span>₹{totalPrice}</span>
            </div>
            <button
              className="bg-indigo-500 font-semibold hover:bg-indigo-600 py-3 text-sm text-white uppercase w-full"
              onClick={makePayment}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddToCart;
