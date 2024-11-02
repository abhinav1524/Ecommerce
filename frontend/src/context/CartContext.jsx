// CartContext.jsx
import React, { createContext, useContext, useReducer,useEffect } from 'react';
const token = localStorage.getItem("jwt");

// Define your initial state and reducer
const initialState = {
  items: [],
  totalPrice: 0,
};

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      // Check if the item already exists in the cart
      const existingItemIndex = state.items.findIndex(item => item._id === action.payload.item._id);
      let updatedItems;

      if (existingItemIndex >= 0) {
        // Item exists, update quantity
        const existingItem = state.items[existingItemIndex];
        updatedItems = [...state.items];
        updatedItems[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + action.payload.item.quantity // Increment the quantity
        };
      } else {
        // Item does not exist, add it to the cart
        updatedItems = [...state.items, { ...action.payload.item, quantity: action.payload.item.quantity }];
      }

      return {
        ...state,
        items: updatedItems,
        totalPrice: state.totalPrice + action.payload.price,
      };

    case 'SET_CART':
      return {
        ...state,
        items: action.payload.items,
        totalPrice: action.payload.totalPrice,
      };

    default:
      return state;
  }
};

// Create context
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = async (productId, quantity = 1) => {
    try {
      const response = await fetch("http://localhost:5000/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });

      if (!response.ok) {
        throw new Error("Failed to add item to cart");
      }

      const { cartItem, cartTotal } = await response.json();

      // Ensure cartItem includes quantity
      dispatch({
        type: 'ADD_TO_CART',
        payload: { item: { ...cartItem, quantity: 1 }, price: cartTotal }, // Assuming each item has a quantity of 1
      });
      console.log("Item added to cart:", cartItem);
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };


  // Initialize Cart from backend when the component mounts (optional)
  const fetchCart = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch cart");
      }

      const data = await response.json();
      console.log("Response Data:", data); // Log the entire response

      // Destructure cartItems and totalPrice from the response
      const { cartItems, totalPrice } = data;

      // Ensure cartItems is defined
      if (!cartItems || !totalPrice) {
        console.error("Unexpected response structure:", data);
        return;
      }

      // Dispatch the updated cart state
      dispatch({
        type: 'SET_CART',
        payload: { items: cartItems, totalPrice },
      });
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };
  useEffect(()=>{
    fetchCart();
  },[])

  return (
    <CartContext.Provider value={{ cart: state, addToCart, fetchCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
