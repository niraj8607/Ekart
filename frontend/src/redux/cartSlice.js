// import { createSlice } from "@reduxjs/toolkit";

// const cartSlice = createSlice({
//   name: "cart",
//   initialState: {
//     cartItems: [],
//   },
//   reducers: {
//     addToCart: (state, action) => {
//       const item = action.payload;
//       // Check karo ki item pehle se cart me hai ya nahi
//       const existingItem = state.cartItems.find((i) => i._id === item._id);
      
//       if (existingItem) {
//         // Agar hai, toh bas uski quantity badha do
//         existingItem.quantity += 1;
//       } else {
//         // Agar nahi hai, toh naya item add kar do quantity 1 ke sath
//         state.cartItems.push({ ...item, quantity: 1 });
//       }
//     },
//     // Future use ke liye remove aur quantity update ke actions
//     removeFromCart: (state, action) => {
//       state.cartItems = state.cartItems.filter((i) => i._id !== action.payload);
//     },
//   },
// });

// export const { addToCart, removeFromCart } = cartSlice.actions;
// export default cartSlice.reducer;


import { createSlice } from "@reduxjs/toolkit";

// 🌟 App load hote hi local storage se data nikaalein (Refresh Fix)
const loadCartFromStorage = () => {
  const storedCart = localStorage.getItem("cartItems");
  return storedCart ? JSON.parse(storedCart) : [];
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: loadCartFromStorage(), // Initial state storage se aayegi
  },
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      
      // Check karo ki item pehle se cart me hai ya nahi (_id ya id donon check kar raha hai safe side ke liye)
      const existingItem = state.cartItems.find((i) => (i._id || i.id) === (item._id || item.id));
      
      if (existingItem) {
        // Agar hai, toh bas uski quantity badha do (Duplicates nahi banenge)
        existingItem.quantity += 1;
      } else {
        // Agar nahi hai, toh naya item add kar do quantity 1 ke sath
        state.cartItems.push({ ...item, quantity: 1 });
      }
      
      // 🌟 Har change ke baad storage update karein
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    
    removeFromCart: (state, action) => {
      // Item ko filter out karo
      state.cartItems = state.cartItems.filter(item => (item._id || item.id) !== action.payload);
      
      // 🌟 Har change ke baad storage update karein
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    
    increaseQuantity: (state, action) => {
      const item = state.cartItems.find(item => (item._id || item.id) === action.payload);
      if (item) {
        item.quantity += 1;
      }
      
      // 🌟 Har change ke baad storage update karein
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    
    decreaseQuantity: (state, action) => {
      const item = state.cartItems.find(item => (item._id || item.id) === action.payload);
      if (item && item.quantity > 1) {
        item.quantity -= 1;
      }
      
      // 🌟 Har change ke baad storage update karein
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    }
  }
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;