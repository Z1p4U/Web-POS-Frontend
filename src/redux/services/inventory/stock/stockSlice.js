import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchControlStock,
  fetchTodayStock,
} from "../../../api/inventory/stock/stockApi";

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
export const todayStock = createAsyncThunk(
  "stock/todayStock",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await fetchTodayStock(token);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to today stock");
    }
  }
);

const initialState = {
  stocks: [],
  stockInCount: 0,
  stockOutCount: 0,
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
      })
      .addCase(todayStock.pending, (state) => {
        state.status = "loading";
      })
      .addCase(todayStock.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.stockInCount = action.payload.stock_in_count;
        state.stockOutCount = action.payload.stock_out_count;
      })
      .addCase(todayStock.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearStockData } = stockSlice.actions;

export default stockSlice.reducer;
