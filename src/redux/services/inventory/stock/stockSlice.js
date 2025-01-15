import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchControlStock } from "../../../api/inventory/stock/stockApi";

export const controlStock = createAsyncThunk(
  "stock/controlStock",
  async ({ stocks, token }, { rejectWithValue }) => {
    try {
      const response = await fetchControlStock(stocks, token);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to control stock");
    }
  }
);

const initialState = {
  stocks: [],
  status: "idle",
  error: null,
};

const stockSlice = createSlice({
  name: "stock",
  initialState,
  reducers: {
    clearStockData(state) {
      state.stocks = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(controlStock.pending, (state) => {
        state.status = "loading";
      })
      .addCase(controlStock.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.stocks = [action.payload.data, ...state.stocks];
      })
      .addCase(controlStock.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearStockData } = stockSlice.actions;

export default stockSlice.reducer;
