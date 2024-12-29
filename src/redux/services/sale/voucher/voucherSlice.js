import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchDailyVoucher,
  fetchExportVoucher,
  fetchVoucherDetail,
} from "../../../api/sale/voucher/voucherApi";

export const dailyVoucherList = createAsyncThunk(
  "voucher/dailyVoucherList",
  async ({ token }, { rejectWithValue }) => {
    try {
      const response = await fetchDailyVoucher(token);
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

export const exportVoucherData = createAsyncThunk(
  "voucher/exportVoucherData",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const response = await fetchExportVoucher(token, id);
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
      .addCase(dailyVoucherList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(dailyVoucherList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.vouchers = action.payload.data;
        state.dailyTotalSale = action.payload.daily_total_sale;
      })
      .addCase(dailyVoucherList.rejected, (state, action) => {
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
      .addCase(exportVoucherData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(exportVoucherData.fulfilled, (state) => {
        state.status = "succeeded";
        // state.vouchers = action.payload.data;
      })
      .addCase(exportVoucherData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearVoucherData } = voucherSlice.actions;

export default voucherSlice.reducer;
