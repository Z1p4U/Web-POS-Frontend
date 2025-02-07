import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchTodayVoucher,
  fetchPrintVoucher,
  fetchVoucherDetail,
  fetchMonthlyVoucher,
  fetchYearlyVoucher,
  fetchMonthsInYear,
  fetchDaysInMonth,
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

export const monthlyVoucherList = createAsyncThunk(
  "voucher/monthlyVoucherList",
  async ({ token, month }, { rejectWithValue }) => {
    try {
      const response = await fetchMonthlyVoucher(token, month);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const yearlyVoucherList = createAsyncThunk(
  "voucher/yearlyVoucherList",
  async ({ token, year }, { rejectWithValue }) => {
    try {
      const response = await fetchYearlyVoucher(token, year);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const daysInMonth = createAsyncThunk(
  "voucher/daysInMonth",
  async ({ token, month }, { rejectWithValue }) => {
    try {
      const response = await fetchDaysInMonth(token, month);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const monthsInYear = createAsyncThunk(
  "voucher/monthsInYear",
  async ({ token, year }, { rejectWithValue }) => {
    try {
      const response = await fetchMonthsInYear(token, year);
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
  monthlyTotalSale: {},
  yearlyTotalSale: {},
  dailyRecordsInMonth: [],
  monthlyRecordsInYear: [],
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
      .addCase(monthlyVoucherList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(monthlyVoucherList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.vouchers = action.payload.data;
        state.monthlyTotalSale = action.payload.monthly_total_sale;
      })
      .addCase(monthlyVoucherList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(yearlyVoucherList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(yearlyVoucherList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.vouchers = action.payload.data;
        state.yearlyTotalSale = action.payload.yearly_total_sale;
      })
      .addCase(yearlyVoucherList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(daysInMonth.pending, (state) => {
        state.status = "loading";
      })
      .addCase(daysInMonth.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.dailyRecordsInMonth = action.payload?.monthly_day_total_sale;
      })
      .addCase(daysInMonth.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(monthsInYear.pending, (state) => {
        state.status = "loading";
      })
      .addCase(monthsInYear.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.monthlyRecordsInYear = action.payload?.yearly_month_total_sale;
      })
      .addCase(monthsInYear.rejected, (state, action) => {
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
