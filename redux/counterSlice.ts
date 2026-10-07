import { createSlice } from "@reduxjs/toolkit";

interface CounterState {
  nilai: number;
}

const initialState: CounterState = { nilai: 0 };

const counterSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    tambah: (state) => {
      state.nilai += 1;
    },
    kurang: (state) => {
      state.nilai -= 1;
    },
    reset: (state) => {
      state.nilai = 0;
    },
  },
});

export const { tambah, kurang, reset } = counterSlice.actions;
export default counterSlice.reducer;
