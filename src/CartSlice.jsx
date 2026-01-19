import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
  },
  reducers: {
    // payload: plant object { name, image, description, cost }
    addItem: (state, action) => {
      const plant = action.payload;

      // Find if item already exists
      const existingItem = state.items.find((item) => item.name === plant.name);

      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({
          ...plant,
          quantity: 1,
        });
      }
    },

    // payload: item name (string) OR { name }
    removeItem: (state, action) => {
      const payload = action.payload;
      const name = typeof payload === 'string' ? payload : payload?.name;

      state.items = state.items.filter((item) => item.name !== name);
    },

    // payload: { name, amount }
    updateQuantity: (state, action) => {
      const { name, amount } = action.payload;

      const item = state.items.find((i) => i.name === name);
      if (!item) return;

      // If your UI allows 0, you can remove; otherwise clamp to at least 1
      if (amount <= 0) {
        state.items = state.items.filter((i) => i.name !== name);
      } else {
        item.quantity = amount;
      }
    },
  },
});

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;

