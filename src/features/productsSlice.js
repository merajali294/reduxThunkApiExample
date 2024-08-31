// Working example of Redux Thunk without createAsyncThunk
// import { createSlice } from "@reduxjs/toolkit";

// const productsSlice = createSlice({
//   name: "products",
//   initialState: {
//     items: [],
//     loading: false,
//     error: null,
//   },
//   reducers: {
//     fetchProductsStart(state) {
//       state.loading = true;
//       state.error = null;
//     },
//     fetchProductsSuccess(state, action) {
//       state.loading = false;
//       state.items = action.payload;
//     },
//     fetchProductsFailure(state, action) {
//       state.loading = false;
//       state.error = action.payload;
//     },
//   },
// });

// export const {
//     fetchProductsStart,
//     fetchProductsSuccess,
//     fetchProductsFailure,
// } = productsSlice.actions;

// export const fetchProducts = () => async (dispatch) => {
//   dispatch(fetchProductsStart());
//   try {
//     const response = await fetch("https://fakestoreapi.com/products");
//     let res = await response.json();
//     dispatch(fetchProductsSuccess(res));
//   } catch (error) {
//     dispatch(fetchProductsFailure(error.message));
//   }
// };

// export default productsSlice.reducer;


// Working example of Redux Thunk WITH createAsyncThunk

// src/features/productsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define the async thunk
export const fetchProducts = createAsyncThunk(
  'products/fetchProducts',
  async () => {
    const response = await axios.get('https://fakestoreapi.com/products');
    return response.data; // This will be the payload for the fulfilled action
  }
);

const productsSlice = createSlice({
  name: 'products',
  initialState: {
    items: [],
    loading: false,
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        console.log('pending');
        state.loading = true;
        state.error = null;
    })
    .addCase(fetchProducts.fulfilled, (state, action) => {
          console.log('fulfiled');
          state.loading = false;
          state.items = action.payload;
        })
        .addCase(fetchProducts.rejected, (state, action) => {
            console.log('rejected');
            state.loading = false;
        state.error = action.error.message;
      })
  },
});

export default productsSlice.reducer;
