// rootReducer.js
import { combineReducers } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import shopReducer from './shopSlice'; // Update this path

const rootReducer = combineReducers({
  cart: cartReducer,
  shop: shopReducer,  
});

export default rootReducer;
