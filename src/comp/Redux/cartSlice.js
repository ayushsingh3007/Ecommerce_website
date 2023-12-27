

import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
const loadCartFromStorage = () => {
  const storedCart = localStorage.getItem('cartItems');
  return storedCart ? JSON.parse(storedCart) : [];
};


const initialState = {
  cartItems: loadCartFromStorage(),
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const existingItemIndex = state.cartItems.findIndex(item => item.id === action.payload.id);
    
      if (existingItemIndex !== -1) {
        // If the item already exists in the cart, create a new array with the updated quantity
        const updatedCartItems = [...state.cartItems];
        updatedCartItems[existingItemIndex] = {
          ...updatedCartItems[existingItemIndex],
          qty: updatedCartItems[existingItemIndex].qty + 1
        };
    
        state.cartItems = updatedCartItems;
    
        toast.info("Increased product quantity", { position: "bottom-left" });
      } else {
        // If the item is not in the cart, create a new array with the added item
        state.cartItems = [...state.cartItems, { ...action.payload, qty: 1 }];
    
        toast.success("Added product to the cart", { position: "bottom-left" });
      }
    
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decreaseCart(state, action) {
      const { id } = action.payload;
      const itemIndex = state.cartItems.findIndex((item) => item.id === id);

      if (state.cartItems[itemIndex].qty > 1) {
        // Use Immer to produce a new state
        state.cartItems[itemIndex].qty -= 1;
        toast.info("Decreased product quantity", {
          position: "bottom-left",
        });
      } else if (state.cartItems[itemIndex].qty === 1) {
        // Use Immer to produce a new state
        state.cartItems = state.cartItems.filter((item) => item.id !== id);
        toast.error("Product removed from cart", {
          position: "bottom-left",
        });
      }

      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeFromCart(state, action) {
      const itemId = action.payload.id;
      state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      toast.error("Product removed from cart", { position: "bottom-left" });
    },
    clearCart(state, action) {
      console.log("Clearing cart");
      state.cartItems = [];
      localStorage.removeItem("cartItems");
      console.log("Cart cleared. Updated state:", state.cartItems);
      toast.error("Cart cleared", { position: "bottom-left" });
    },
    
  },
});

export const { addItem, decreaseCart, removeFromCart,  clearCart } =
  cartSlice.actions;
  export const selectCartItems = (state) => state.cart.cartItems;

export default cartSlice.reducer;