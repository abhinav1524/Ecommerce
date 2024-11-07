import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cartCount, setCartCount] = useState(0);
    const [items,setItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [cartUpdated, setCartUpdated] = useState(false);

    const token = localStorage.getItem('jwt'); // Assuming you store the JWT token in localStorage

    // Helper function to get headers with Authorization
    const getHeaders = () => ({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
    });
    //Fetching all the items present in the cart //
    const getCartItems = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/cart", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error("Failed to fetch cart items");
        }
        const data = await response.json();
        console.log(data.cartItems);
        setItems(data.cartItems);
        setCartUpdated(true);
        // console.log(data); // Ensure you return the cartItems array from the data
      } catch (error) {
        console.error("Error fetching cart items:", error);
        return [];
      }
    };
    // console.log(items);
    // Update the cart items when the component mounts
    useEffect(() => {
      getCartItems();
    }, []);
    // fetch the data when item add in cart //
    useEffect(() => {
      if (cartCount) {
          getCartItems(); // Fetch cart items if cartCount has a valid value
      }
  }, [cartCount]); 
    // Fetch the cart count
    const getCartCount = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/cart/count', {
                method: 'GET',
                headers: getHeaders(),
            });
            if (!response.ok) throw new Error('Failed to fetch cart count');
            const data = await response.json();
            console.log(data);
            setCartCount(data.count);
        } catch (error) {
            console.error(error);
        }
    };
    // add items in cart //
    const addToCart = async (productId, quantity) => {
      const token = localStorage.getItem('jwt');
      try {
          const response = await fetch('http://localhost:5000/api/cart', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  Authorization: `Bearer ${token}`,
              },
              body: JSON.stringify({ productId, quantity }),
          });

          if (!response.ok) {
              throw new Error('Failed to add to cart');
          }

          const data = await response.json();
          setCartItems(data.cartItems);  // Update cart items with response data
          getCartCount();  // Refresh cart count after adding item
      } catch (error) {
          console.error('Error adding item to cart:', error.message);
      }
  };
    // Update cart quantity
    const updateCartQuantity = async (productId, quantityChange) => {
        try {
            const response = await fetch(`http://localhost:5000/api/cart/update-quantity`, {
                method: 'PUT',
                headers: getHeaders(),
                body: JSON.stringify({ productId, quantityChange}),
            });
            if (!response.ok) throw new Error('Failed to update cart quantity');
            const data = await response.json();
            console.log(data);
            setCartItems(data.cartItems); // Assuming API returns updated cart items
            getCartCount(); // Refresh cart count
            getCartItems();
        } catch (error) {
            console.error(error);
        }
    };

    // Remove item from cart
    const removeItemFromCart = async (productId) => {
        try {
            const response = await fetch(`http://localhost:5000/api/cart/item`, {
                method: 'DELETE',
                headers: getHeaders(),
                body: JSON.stringify({ productId }),
            });
            if (!response.ok) throw new Error('Failed to remove item from cart');
            const data = await response.json();
            setCartItems(data.cartItems); // Assuming API returns updated cart items
            getCartCount(); // Refresh cart count
            getCartItems();
        } catch (error) {
            console.error(error);
        }
    };

    // removing all the items from the cart //
    const removeAllItems = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/cart", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        if (!response.ok) {
          throw new Error("Failed to remove all items from cart");
        }
        alert("items are deleted successfully please refresh the page");
        getCartItems();
      } catch (error) {
        console.error(error);
      }
    }

    // Calculate total price and total items whenever cartItems change
    useEffect(() => {
      const calculateTotals = () => {
          // Ensure cartItems is an array and has valid items
          if (!Array.isArray(cartItems)) {
              return; // If cartItems is not an array, do nothing
          }
  
          // Check if cartItems has items and each item has the necessary structure
          const total = cartItems.reduce((acc, item) => {
              if (item.product && item.product.price && item.quantity) {
                  return acc + item.product.price * item.quantity;
              }
              return acc; // If any item doesn't have the expected structure, skip it
          }, 0);
  
          const itemCount = cartItems.reduce((acc, item) => {
              if (item.quantity) {
                  return acc + item.quantity;
              }
              return acc; // Skip items without a valid quantity
          }, 0);
  
          // Set the calculated values to state
          setTotalPrice(total);
          setTotalItems(itemCount);
      };
  
      // Only calculate totals if cartItems is a valid array
      if (Array.isArray(cartItems)) {
          calculateTotals();
      }
  }, [cartItems]);
  

    // Load cart count on mount
    useEffect(() => {
        getCartCount();
    }, []);

    return (
        <CartContext.Provider value={{ 
            cartCount, 
            cartItems, 
            totalPrice, 
            totalItems, 
            updateCartQuantity, 
            removeItemFromCart,
            addToCart, 
            items,
            removeAllItems
        }}>
            {children}
        </CartContext.Provider>
    );
};
