import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";   // 👈 default import
import productReducer from "./productSlice.js";
import cartReducer from "./cartSlice";
const store = configureStore({
  reducer: {
    user: userReducer,  
    product: productReducer,
    cart: cartReducer
  },
});

export default store;
