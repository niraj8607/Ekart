import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [],
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      // Check karo ki item pehle se cart me hai ya nahi
      const existingItem = state.cartItems.find((i) => i._id === item._id);
      
      if (existingItem) {
        // Agar hai, toh bas uski quantity badha do
        existingItem.quantity += 1;
      } else {
        // Agar nahi hai, toh naya item add kar do quantity 1 ke sath
        state.cartItems.push({ ...item, quantity: 1 });
      }
    },
    // Future use ke liye remove aur quantity update ke actions
    removeFromCart: (state, action) => {
      state.cartItems = state.cartItems.filter((i) => i._id !== action.payload);
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;