// src/store.js
import { configureStore } from '@reduxjs/toolkit';
import { thunk } from 'redux-thunk'; // Correct import for `thunk`
import productsReducer from './features/productsSlice';
import { AxiosHeaders } from 'axios';

const store = configureStore({
  reducer: {
    products: productsReducer,
  },
  middleware(getDefaultMiddleware){
    return getDefaultMiddleware().concat(thunk)
  }
});

export default store;