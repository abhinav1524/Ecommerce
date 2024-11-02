import React, { useState, useEffect } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { useCart } from '../context/CartContext';

const AddToCart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("jwt");

  if (!token) {
    console.log("Token not found in local storage.");
    return null; // Return null or some fallback UI
  }

  // Fetching the data from the cart API
  const fetchCart = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/cart", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch cart");
      }

      const data = await response.json();
      setCartItems(data.cartItems || []);
    } catch (error) {
      console.error(`Error fetching cart: ${error}`);
      setError(error.message); // Set error message if there's an error
    }
  };

  // Fetch cart items on component mount
  useEffect(() => {
    fetchCart();
  }, [token]);

  // Update total price whenever cartItems change
  useEffect(() => {
    const price = cartItems.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
    setTotalPrice(price);
  }, [cartItems]);

   // Function to update item quantity on the server
   const updateCartItemQuantity = async (productId, newQuantity) => {
    try {
      // Make a backend call to update the cart item quantity
      const response = await fetch("http://localhost:5000/api/cart/update-quantity", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity: newQuantity }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update cart item quantity");
      }
  
      // Fetch the updated cart data from the response
      const updatedCart = await response.json();
      setCartItems(updatedCart.cartItems); // Update the state with the new cart items
  
    } catch (error) {
      console.error("Error updating cart item quantity:", error);
    }
  };
  
  // Function to increase quantity
  const increaseQuantity = (productId, currentQuantity) => {
    alert(`${productId} ${currentQuantity}`)
    // updateCartItemQuantity(productId, currentQuantity + 1);
  };
  
  // Function to decrease quantity
  const decreaseQuantity = (productId, currentQuantity) => {
    alert(`${productId} ${currentQuantity}`)
    // if (currentQuantity > 1) {
    //   updateCartItemQuantity(productId, currentQuantity - 1);
    // }
  };

  const makePayment = async () => {
    const orderItems = cartItems.map((item) => ({
      product: item.product._id,
      quantity: item.quantity,
    }));

    try {
      const stripe = await loadStripe("pk_test_51NxPmTSCzRo3Tfm12xjbQZVjqzVYJ9u4Xt2ziAwSVXfw9TJ0zwptwowVPiNE2ZdzcXWZ27eSiseIzLX1RhkSLmTe00ku8sqeIU");
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
 // removing the particular items form the cart //
 const removeFromCart = async (productId) => {
  try {
    const response = await fetch(`http://localhost:5000/api/cart/item`, {
      method: 'DELETE',
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error: ${errorText}`);
    }

    // Update state to remove the deleted item
    setCartItems((prevItems) => 
      prevItems.filter((item) => item.product._id !== productId)
    );

    console.log("Item removed from cart");
  } catch (error) {
    console.error(error);
  }
};
// delete all items in cart function //
const deleteAllItems =async()=>{
  console.log("delete all items function hit")
try {
  const response = await fetch(`http://localhost:5000/api/cart`, {
    method: 'DELETE',
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(),
  });
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Error: ${errorText}`);
  }
   // Update state to remove the deleted item
   setCartItems([]);
  console.log("all items removed sucessfully");
} catch (error) {
  console.error(error);
}
}
  return (
    <div className="container mx-auto mt-10 px-4 sm:px-6 lg:px-8">
      <div className="sm:flex shadow-md my-10">
        <div className="w-full sm:w-3/4 bg-white px-6 sm:px-10 py-10">
          <div className="flex justify-between border-b pb-8">
            <h1 className="font-semibold text-xl sm:text-2xl">Shopping Cart</h1>
            <h2 className="font-semibold text-xl sm:text-2xl">{cartItems.length > 0 ? `${cartItems.length} Items` : 'Cart Is Empty'}</h2>
          </div>
          {cartItems.map((item) => (
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
                      onClick={() => decreaseQuantity(item.product._id)}
                      className="bg-red-500 text-white text-xl px-4 py-1 rounded hover:bg-red-600"
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold text-gray-800">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.product._id)}
                      className="bg-green-500 text-white text-xl px-4 py-1 rounded hover:bg-green-600"
                    >
                      +
                    </button>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-2">{item.product.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <div className="flex justify-around items-center">
                    <button
                      onClick={() => alert("i didn't fell the need of this so i leave it")}
                      className="text-xl cursor-pointer text-red-300"
                    >
                      <i className="fa-regular fa-heart"></i>
                    </button>
                    <button
                      onClick={() => removeFromCart(item.product._id)}
                      className="text-xl ml-5 cursor-pointer text-red-500"
                    >
                      <i className="fa-solid fa-trash-can"></i>
                    </button>
                  </div>
                  <p className="text-base font-black text-gray-800">₹{item.product.price * item.quantity}</p>
                </div>
              </div>
            </div>
          ))}
          <div className="grid grid-cols-12 xl:grid-cols-12 md:grid-cols-12">
            <a href="/" className="col-span-6 font-semibold text-indigo-600 text-sm mt-10">Continue Shopping</a>
            <button onClick={()=>deleteAllItems()} className="col-span-6 mt-10">Delete All</button>
          </div>
        </div>
        <div id="summary" className="w-full sm:w-1/4 bg-gray-100 px-6 py-12 mb-2">
          <h1 className="font-semibold text-xl sm:text-2xl border-b pb-8">Order Summary</h1>
          <div className="flex justify-between mt-10 mb-5">
            <span className="font-semibold text-sm uppercase">Items {cartItems.length}</span>
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
