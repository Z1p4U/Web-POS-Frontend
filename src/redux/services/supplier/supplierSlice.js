import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchCreateSupplier,
  fetchDeleteSupplier,
  fetchSupplier,
  fetchUpdateSupplier,
} from "../../api/supplier/supplierApi";

export const supplierList = createAsyncThunk(
  "supplier/supplierList",
  async ({ token, pagination, search }, { rejectWithValue }) => {
    try {
      const response = await fetchSupplier(token, pagination, search);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const supplierCreate = createAsyncThunk(
  "supplier/supplierCreate",
  async ({ suppliers, token }, { rejectWithValue }) => {
    try {
      const response = await fetchCreateSupplier(suppliers, token);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add supplier");
    }
  }
);

export const supplierUpdate = createAsyncThunk(
  "supplier/supplierUpdate",
  async ({ id, suppliers, token }, { rejectWithValue }) => {
    try {
      const response = await fetchUpdateSupplier(id, suppliers, token);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update supplier"
      );
    }
  }
);

export const supplierDelete = createAsyncThunk(
  "supplier/supplierDelete",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await fetchDeleteSupplier(id, token);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to delete supplier"
      );
    }
  }
);

const initialState = {
  suppliers: [],
  status: "idle",
  error: null,
  lastPage: 1,
};

const supplierSlice = createSlice({
  name: "supplier",
  initialState,
  reducers: {
    clearSupplierData(state) {
      state.suppliers = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(supplierList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(supplierList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.suppliers = action.payload.data;
        state.lastPage = action.payload.last_page;
      })
      .addCase(supplierList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(supplierCreate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(supplierCreate.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.suppliers = [action.payload.data, ...state.suppliers];
      })
      .addCase(supplierCreate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(supplierUpdate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(supplierUpdate.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedSupplier = action.payload.data;
        state.suppliers = state.suppliers.map((supplier) =>
          supplier.id === updatedSupplier.id ? updatedSupplier : supplier
        );
      })
      .addCase(supplierUpdate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(supplierDelete.pending, (state) => {
        state.status = "loading";
      })
      .addCase(supplierDelete.fulfilled, (state, action) => {
        state.status = "succeeded";
        const deletedId = action?.payload?.data?.id;
        state.suppliers = state?.suppliers.filter(
          (item) => item.id !== deletedId
        );
      })
      .addCase(supplierDelete.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearSupplierData } = supplierSlice.actions;

export default supplierSlice.reducer;
