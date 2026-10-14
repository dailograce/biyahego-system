import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  passenger: "",
  contact: "",
  routeId: "BX-101",
  seats: 1,
  savedTickets: [
    {
      ticketNo: "TKT-24081",
      passenger: "Sample Passenger",
      routeId: "BX-101",
      seats: 1,
      status: "Reserved"
    }
  ]
};

const bookingSlice = createSlice({
  name: "booking",
  initialState,
  reducers: {
    updateDraft(state, action) {
      Object.assign(state, action.payload);
    },
    submitBooking(state) {
      state.savedTickets.unshift({
        ticketNo: `TKT-${Math.floor(10000 + Math.random() * 89999)}`,
        passenger: state.passenger,
        routeId: state.routeId,
        seats: Number(state.seats),
        status: "Pending payment"
      });
      state.passenger = "";
      state.contact = "";
      state.seats = 1;
    }
  }
});

export const { updateDraft, submitBooking } = bookingSlice.actions;
export default bookingSlice.reducer;
