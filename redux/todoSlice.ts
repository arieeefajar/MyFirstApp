import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Todo {
  id: string;
  judul: string;
  selesai: boolean;
}

interface TodoState {
  items: Todo[];
}

const initialState: TodoState = { items: [] };

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    tambahTugas: (state, action: PayloadAction<string>) => {
      state.items.push({
        id: Date.now().toString(),
        judul: action.payload,
        selesai: false,
      });
    },
    toggleSelesai: (state, action: PayloadAction<string>) => {
      const todo = state.items.find((t) => t.id === action.payload);
      if (todo) {
        todo.selesai = !todo.selesai;
      }
    },
    hapusTugas: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter((t) => t.id !== action.payload);
    },
  },
});

export const { tambahTugas, toggleSelesai, hapusTugas } = todoSlice.actions;
export default todoSlice.reducer;
