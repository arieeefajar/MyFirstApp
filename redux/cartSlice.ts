import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface CartProduct {
  id: string;
  nama: string;
  harga: number;
}

interface CartState {
  items: CartProduct[];
}

const initialState: CartState = { items: [] };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    tambahItem: (state, action: PayloadAction<CartProduct>) => {
      state.items.push(action.payload);
    },
    hapusItem: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
  },
});

export const { tambahItem, hapusItem } = cartSlice.actions;
export default cartSlice.reducer;
