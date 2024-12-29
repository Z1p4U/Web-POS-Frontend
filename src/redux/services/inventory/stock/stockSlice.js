import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchAddStock } from "../../../api/inventory/stock/stockApi";

export const addStock = createAsyncThunk(
  "stock/addStock",
  async ({ stocks, token }, { rejectWithValue }) => {
    try {
      const response = await fetchAddStock(stocks, token);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add stock");
    }
  }
);
export const adjustStock = createAsyncThunk(
  "stock/adjustStock",
  async ({ stocks, token }, { rejectWithValue }) => {
    try {
      const response = await fetchAddStock(stocks, token);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to adjust stock");
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
      .addCase(addStock.pending, (state) => {
        state.status = "loading";
      })
      .addCase(addStock.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.stocks = [action.payload.data, ...state.stocks];
      })
      .addCase(addStock.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(adjustStock.pending, (state) => {
        state.status = "loading";
      })
      .addCase(adjustStock.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.stocks = [action.payload.data, ...state.stocks];
      })
      .addCase(adjustStock.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearStockData } = stockSlice.actions;

export default stockSlice.reducer;
