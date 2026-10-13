
import { createSlice } from "@reduxjs/toolkit";

const bookingSlice = createSlice({
  name: "bookings",
  initialState: {
    items: []
  },
  reducers: {
    addBooking: (state, action) => {
      state.items.push(action.payload);
    },
    updateBooking: (state, action) => {
      const index = state.items.findIndex(
        item => item.id === action.payload.id
      );

      if (index !== -1) {
        state.items[index] = action.payload;
      }
    },
    deleteBooking: (state, action) => {
      state.items = state.items.filter(
        item => item.id !== action.payload
      );
    }
  }
});

export const { addBooking, updateBooking, deleteBooking } =
  bookingSlice.actions;

export default bookingSlice.reducer;
