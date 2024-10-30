import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
const AddToCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("jwt");
  if (!token) {
    console.log("Token not found in local storage.");
    return;
  }
  //fetching the data form the cart api //
  const fetchCart = async () => {
    try {
        const token = localStorage.getItem('token'); // Replace with your token retrieval method
        const response = await fetch('http://localhost:5000/api/cart', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Failed to fetch cart');
        }

        const data = await response.json();
        setCartItems(data);
    } catch (error) {
        console.error(`Error fetching cart:, ${error}`);
        setError(error.message); // Set error message if there's an error
    }
};

useEffect(() => {
    fetchCart();
}, []);
  // Function to increase item quantity
  const increaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Function to decrease item quantity
  const decreaseQuantity = (id) => {
    setCartItems(
      cartItems.map((item) =>
        item.id === id && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const makePayment = async () => {
    const orderItems = cartItems.map((item) => ({
      product: item.id, // Use the product ID or any identifier
      quantity: item.quantity,
    }));
    console.log(orderItems);
    try {
      const stripe = await loadStripe(
        "pk_test_51NxPmTSCzRo3Tfm12xjbQZVjqzVYJ9u4Xt2ziAwSVXfw9TJ0zwptwowVPiNE2ZdzcXWZ27eSiseIzLX1RhkSLmTe00ku8sqeIU"
      );
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

      const result = await stripe.redirectToCheckout({
        sessionId: session.id,
      });
      if (result.error) {
        console.log(result.error);
      }
    } catch (error) {
      console.log("Payment Error:", error.message);
    }
  };
  //  console.log("Token in localStorage at component render:", localStorage.getItem('jwt'));
  return (
    <div className="container mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <div className="sm:flex shadow-md my-10">
        <div className="w-full sm:w-3/4 bg-white px-6 sm:px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-xl sm:text-2xl">Shopping Cart</h1>
            <h2 className="font-semibold text-xl sm:text-2xl">
              {cartItems.length} Items
            </h2>
          </div>
          {cartItems.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row md:items-center py-8 border-t border-gray-50"
            >
              <div className="md:w-4/12 w-full">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-48 w-full object-center object-cover"
                />
              </div>
              <div className="md:pl-6 md:w-8/12 w-full mt-4 md:mt-0">
                <p className="text-sm text-gray-800">RF293</p>
                <div className="flex justify-between items-center mt-2">
                  <p className="text-base font-black text-gray-800">
                    {item.name}
                  </p>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="bg-red-500 text-white text-xl px-4 py-1 rounded hover:bg-red-600"
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold text-gray-800">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="bg-green-500 text-white text-xl px-4 py-1 rounded hover:bg-green-600"
                    >
                      +
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">
                  Height: {item.size}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Color: {item.color}
                </p>
                <div className="flex justify-between items-center mt-4">
                  <p className="text-sm underline text-gray-800 cursor-pointer">
                    Add to favorites
                  </p>
                  <p className="text-base font-black text-gray-800">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              </div>
            </div>
          ))}
          <a
            href="#"
            className="flex font-semibold text-indigo-600 text-sm mt-10"
          >
            Continue Shopping
          </a>
        </div>
        <div
          id="summary"
          className="w-full sm:w-1/4 bg-gray-100 px-6 py-12 mb-2"
        >
          <h1 className="font-semibold text-xl sm:text-2xl border-b pb-8">
            Order Summary
          </h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">
              Items {cartItems.length}
            </span>
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
