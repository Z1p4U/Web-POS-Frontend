import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchExpense,
  fetchCreateExpense,
  fetchDeleteExpense,
  fetchUpdateExpense,
} from "../../api/expense/expenseApi";

export const expenseList = createAsyncThunk(
  "expense/expenseList",
  async ({ token, pagination, search, expenseSort }, { rejectWithValue }) => {
    try {
      const response = await fetchExpense(
        token,
        pagination,
        search,
        expenseSort
      );

      if (expenseSort && Object.keys(expenseSort).length > 0) {
        return {
          sortedExpenses: pagination ? response?.data?.data : response?.data,
        };
      } else {
        return {
          expenses: pagination ? response?.data?.data : response?.data,
          lastPage: response?.data?.last_page || 1,
          totalRecord: response?.data?.total || 0,
        };
      }
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch expenses"
      );
    }
  }
);

export const expenseCreate = createAsyncThunk(
  "expense/expenseCreate",
  async ({ expenses, token }, { rejectWithValue }) => {
    try {
      const response = await fetchCreateExpense(expenses, token);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add expense");
    }
  }
);

export const expenseUpdate = createAsyncThunk(
  "expense/expenseUpdate",
  async ({ id, expenses, token }, { rejectWithValue }) => {
    try {
      const response = await fetchUpdateExpense(id, expenses, token);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update expense"
      );
    }
  }
);

export const expenseDelete = createAsyncThunk(
  "expense/expenseDelete",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await fetchDeleteExpense(id, token);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to delete expense"
      );
    }
  }
);

const initialState = {
  expenses: [],
  sortedExpenses: [],
  status: "idle",
  error: null,
  lastPage: 1,
  totalRecord: 0,
};

const expenseSlice = createSlice({
  name: "expense",
  initialState,
  reducers: {
    clearExpenseData(state) {
      state.expenses = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(expenseList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(expenseList.fulfilled, (state, action) => {
        state.status = "succeeded";
        const braSort = action.meta.arg.expenseSort;

        if (braSort && Object.keys(braSort).length > 0) {
          state.sortedExpenses = action.payload.sortedExpenses;
        } else {
          state.expenses = action.payload.expenses;
          state.lastPage = action.payload.lastPage;
          state.totalRecord = action.payload.totalRecord;
        }
      })
      .addCase(expenseList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(expenseCreate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(expenseCreate.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.expenses = [action.payload.data, ...state.expenses];
        state.totalRecord = state.totalRecord + 1;
      })
      .addCase(expenseCreate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(expenseUpdate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(expenseUpdate.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedExpense = action.payload.data;
        state.expenses = state.expenses.map((expense) =>
          expense.id === updatedExpense.id ? updatedExpense : expense
        );
      })
      .addCase(expenseUpdate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(expenseDelete.pending, (state) => {
        state.status = "loading";
      })
      .addCase(expenseDelete.fulfilled, (state, action) => {
        state.status = "succeeded";
        const deletedId = action?.payload?.data?.id;
        state.expenses = state?.expenses.filter(
          (item) => item.id !== deletedId
        );
        state.totalRecord = state.totalRecord - 1;
      })
      .addCase(expenseDelete.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearExpenseData } = expenseSlice.actions;

export default expenseSlice.reducer;
