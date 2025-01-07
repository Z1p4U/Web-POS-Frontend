import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { checkout } from "../../../api/sale/checkout/checkoutApi";

export const checkoutCreate = createAsyncThunk(
  "checkout/checkoutCreate",
  async ({ formData, token }, { rejectWithValue }) => {
    try {
      const response = await checkout(formData, token);

      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to checkout");
    }
  }
);

const initialState = {
  status: "idle",
  error: null,
};

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(checkoutCreate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkoutCreate.fulfilled, (state, action) => {
        state.status = "succeeded";
        console.log(action.payload);
      })
      .addCase(checkoutCreate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export default checkoutSlice.reducer;
