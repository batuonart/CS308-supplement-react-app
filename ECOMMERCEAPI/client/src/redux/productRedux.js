import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  products: [],
};

// the input will be addProduct({product, quantity: 1})

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    addProduct: (state, action) => {
      const { product, quantity, selectedAroma, selectedSize } = action.payload;
      const index = state.products.findIndex((item) => item._id === product._id);
      if (index !== -1) {
        state.products[index].quantity += quantity;
        state.products[index].rating -= quantity;
        //state.total += ( action.payload.product.price * quantity );
        
      } else {
        state.products.push({ ...product, quantity, selectedAroma, selectedSize });
      }
    },
    removeProduct: (state, action) => {
      
      const { productID } = action.payload;
      state.products = state.products.filter((item) => item.productID !== productID);
    },
    updateProduct: (state, action) => {
      const { product } = action.payload;
      const index = state.products.findIndex((item) => item.productID === product.productID);
      if (index !== -1) {
        state.products[index] = product;
      }
    },
    increaseQuantity: (state, action) => {
      const { productID } = action.payload;
      const index = state.products.findIndex((item) => item.productID === productID);
      if (index !== -1) {
        state.products[index].quantity += 1;
      }
    },
    decreaseQuantity: (state, action) => {
      const { productID } = action.payload;
      const index = state.products.findIndex((item) => item.productID === productID);
      if (index !== -1) {
        state.products[index].quantity -= 1;
      }
    },
    clearProduct: (state) => {
      state.products = [];
    },
  },
});

export const {
  addProduct,
  removeProduct,
  updateProduct,
  increaseQuantity,
  decreaseQuantity,
  clearProduct,
} = productSlice.actions;

export default productSlice.reducer;