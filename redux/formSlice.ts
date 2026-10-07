import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface FormState {
  nama: string;
  email: string;
}

const initialState: FormState = { nama: "", email: "" };

const formSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    updateField: (
      state,
      action: PayloadAction<{ field: keyof FormState; value: string }>
    ) => {
      state[action.payload.field] = action.payload.value;
    },
    resetForm: (state) => {
      state.nama = "";
      state.email = "";
    },
  },
});

export const { updateField, resetForm } = formSlice.actions;
export default formSlice.reducer;
