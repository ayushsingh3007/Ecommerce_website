// store.js
import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer'; // Update this path


const store = configureStore({
  reducer: rootReducer,
});

export default store;
