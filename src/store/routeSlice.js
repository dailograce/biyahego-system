import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchRoutes = createAsyncThunk("routes/fetchRoutes", async () => {
  const response = await fetch("/mock-api/routes.json");
  if (!response.ok) {
    throw new Error("Unable to load route schedule.");
  }
  const data = await response.json();
  return data.routes;
});

const routeSlice = createSlice({
  name: "routes",
  initialState: {
    items: [],
    status: "idle",
    error: null,
    selectedRouteId: "BX-101"
  },
  reducers: {
    selectRoute(state, action) {
      state.selectedRouteId = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchRoutes.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(fetchRoutes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.items = action.payload;
      })
      .addCase(fetchRoutes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  }
});

export const { selectRoute } = routeSlice.actions;
export default routeSlice.reducer;
