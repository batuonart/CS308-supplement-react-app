import { createSlice } from "@reduxjs/toolkit";


const cartSlice = createSlice({
  name: "cart",
  initialState: {
    products: [],
    quantity: 0,
    total: 0,
    size: "",
    aroma: "",
  },
  reducers: {
    addProduct: (state, action) => {
      state.quantity += 1;
      state.products.push(action.payload);
      state.total += action.payload.price * action.payload.quantity;
      state.aroma = action.payload.aroma;
      state.size = action.payload.size;
    },
  },
});

export const { addProduct } = cartSlice.actions;
export default cartSlice.reducer;

