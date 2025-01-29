import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchTodayVoucher,
  fetchPrintVoucher,
  fetchVoucherDetail,
} from "../../../api/sale/voucher/voucherApi";

export const todayVoucherList = createAsyncThunk(
  "voucher/todayVoucherList",
  async ({ token, date }, { rejectWithValue }) => {
    try {
      const response = await fetchTodayVoucher(token, date);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const voucherDetailData = createAsyncThunk(
  "voucher/voucherDetailData",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const response = await fetchVoucherDetail(token, id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const printVoucherData = createAsyncThunk(
  "voucher/printVoucherData",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const response = await fetchPrintVoucher(token, id);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  vouchers: [],
  status: "idle",
  error: null,
  dailyTotalSale: {},
};

const voucherSlice = createSlice({
  name: "voucher",
  initialState,
  reducers: {
    clearVoucherData(state) {
      state.vouchers = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(todayVoucherList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(todayVoucherList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.vouchers = action.payload.data;
        state.dailyTotalSale = action.payload.daily_total_sale;
      })
      .addCase(todayVoucherList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(voucherDetailData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(voucherDetailData.fulfilled, (state) => {
        state.status = "succeeded";
        // state.vouchers = action.payload.data;
      })
      .addCase(voucherDetailData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(printVoucherData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(printVoucherData.fulfilled, (state) => {
        state.status = "succeeded";
        // state.vouchers = action.payload.data;
      })
      .addCase(printVoucherData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearVoucherData } = voucherSlice.actions;

export default voucherSlice.reducer;
