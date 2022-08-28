import {createSlice} from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: {items: [], totalQty: 0, totalAmt: 0, changed: false},
  reducers: {
    replace(state, action) {
      state.totalQty = action.payload.totalQty;
      state.items = action.payload.items;
    },
    add(state, action) {
      const newItem = action.payload;
      const isItemIn = state.items.some(item => item.id === newItem.id);
      state.changed = true;
      state.items = isItemIn
        ? state.items.map(item =>
            item.id === newItem.id
              ? {
                  ...item,
                  quantity: item.quantity + 1,
                  price: item.price,
                  totalPrice: item.totalPrice + newItem.price,
                }
              : item
          )
        : [
            ...state.items,
            {
              id: newItem.id,
              name: newItem.title,
              price: newItem.price,
              quantity: 1,
              totalPrice: newItem.price,
            },
          ];
      state.totalAmt += newItem.price;
      state.totalQty++;
    },
    remove(state, action) {
      const id = action.payload;
      const removed = state.items.find(item => item.id === id);
      state.changed = true;

      state.items =
        removed.quantity === 1
          ? state.items.filter(item => item.id !== id)
          : state.items.map(item =>
              item.id === id
                ? {
                    ...item,
                    quantity: item.quantity - 1,
                    totalPrice: item.totalPrice - item.price,
                  }
                : item
            );
      state.totalAmt -= removed.price;
      state.totalQty--;
    },
    clear(state, action) {
      state = {items: [], totalQty: 0, totalAmt: 0};
    },
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
