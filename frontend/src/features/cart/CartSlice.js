import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

// Create Async Thunks for API requests with token

export const addToCart = createAsyncThunk('cart/addToCart', async ({ productId, quantity }, thunkAPI) => {
  const token = localStorage.getItem('jwt');  // Directly access the token from localStorage or global state
  // console.log(quantity);
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
    return data.cartItems; // Assuming you get the updated cart items after adding
  } catch (error) {
    return thunkAPI.rejectWithValue(error.message);
  }
});

// Action to Remove Item from Cart
export const removeFromCart = (productId) => async (dispatch) => {
  const token = localStorage.getItem('jwt');
  
  try {
    const response = await fetch(`http://localhost:5000/api/cart/item`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ productId }), // Send the productId to the backend
    });

    if (!response.ok) {
      throw new Error('Failed to remove item from cart');
    }

    const data = await response.json();
    
    // Dispatch updated cartItems to Redux store
    dispatch(setCartItems(data.cartItems));
    
    // Also update localStorage to persist changes
    localStorage.setItem('cartItems', JSON.stringify(data.cartItems));

  } catch (error) {
    console.error('Error removing item from cart:', error);
  }
};


// Update quantity
export const updateCartQuantity = createAsyncThunk(
  'cart/updateCartQuantity',
  async ({ productId, quantity }, thunkAPI) => {
    const token = localStorage.getItem('jwt');  // Directly access the token from localStorage or global state

    try {
      const response = await fetch('http://localhost:5000/api/cart/update-quantity', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });

      if (!response.ok) {
        throw new Error('Failed to update quantity');
      }

      const data = await response.json();
      return { ...data, productId, quantity }; // Return response data with updated quantity
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

// Slice for cart state
const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: JSON.parse(localStorage.getItem('cartItems')) || [],
    loading: false,
    error: null,
  },
  reducers: {
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
      localStorage.setItem('cartItems', JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      state.cartItems = action.payload;
    },
    updateCartQuantityManually: (state, action) => {
      const { productId, quantity } = action.payload;
      const itemIndex = state.cartItems.findIndex((item) => item.product._id === productId);
      if (itemIndex !== -1) {
        state.cartItems[itemIndex].quantity = quantity;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        const { productId, quantity } = action.payload;
        const itemIndex = state.cartItems.findIndex((item) => item.product._id === productId);
        if (itemIndex !== -1) {
          state.cartItems[itemIndex].quantity = quantity;
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { setCartItems, updateCartQuantityManually } = cartSlice.actions;

export default cartSlice.reducer;
