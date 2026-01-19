import { createSlice } from "@reduxjs/toolkit";

export const CartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [], // { name, image, description, cost, quantity }
  },
  reducers: {
    // Called from ProductList.jsx
    addItem: (state, action) => {
      const plant = action.payload;

      const existingItem = state.items.find(
        (item) => item.name === plant.name
      );

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...plant, quantity: 1 });
      }
    },

    // Remove item entirely by name
    removeItem: (state, action) => {
      const name = action.payload;
      state.items = state.items.filter((item) => item.name !== name);
    },

    // Update quantity via + / -
    updateQuantity: (state, action) => {
      const { name, amount } = action.payload;

      const item = state.items.find((item) => item.name === name);
      if (!item) return;

      item.quantity = amount;

      // Auto-remove if quantity hits 0
      if (item.quantity <= 0) {
        state.items = state.items.filter((item) => item.name !== name);
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;
export default CartSlice.reducer;


