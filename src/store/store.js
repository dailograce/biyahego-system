import { configureStore } from "@reduxjs/toolkit";
import routeReducer from "./routeSlice.js";
import bookingReducer from "./bookingSlice.js";

export const store = configureStore({
  reducer: {
    routes: routeReducer,
    booking: bookingReducer
  }
});
