import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchBrand,
  fetchCreateBrand,
  fetchDeleteBrand,
  fetchUpdateBrand,
} from "../../../api/inventory/brand/brandApi";

export const brandList = createAsyncThunk(
  "brand/brandList",
  async ({ token, pagination, search }, { rejectWithValue }) => {
    try {
      const response = await fetchBrand(token, pagination, search);
      const normalizedData = {
        brands: pagination ? response?.data?.data : response?.data,
        lastPage: response?.last_page || 1,
        totalRecord: response?.total || 0,
      };
      return normalizedData;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch brands");
    }
  }
);

export const brandCreate = createAsyncThunk(
  "brand/brandCreate",
  async ({ brands, token }, { rejectWithValue }) => {
    try {
      const response = await fetchCreateBrand(brands, token);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add brand");
    }
  }
);

export const brandUpdate = createAsyncThunk(
  "brand/brandUpdate",
  async ({ id, brands, token }, { rejectWithValue }) => {
    try {
      const response = await fetchUpdateBrand(id, brands, token);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to update brand");
    }
  }
);

export const brandDelete = createAsyncThunk(
  "brand/brandDelete",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await fetchDeleteBrand(id, token);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete brand");
    }
  }
);

const initialState = {
  brands: [],
  status: "idle",
  error: null,
  lastPage: 1,
  totalRecord: 0,
};

const brandSlice = createSlice({
  name: "brand",
  initialState,
  reducers: {
    clearBrandData(state) {
      state.brands = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(brandList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(brandList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.brands = action.payload.brands;
        state.lastPage = action.payload.lastPage;
        state.totalRecord = action.payload.totalRecord;
      })
      .addCase(brandList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(brandCreate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(brandCreate.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.brands = [action.payload.data, ...state.brands];
        state.totalRecord = state.totalRecord + 1;
      })
      .addCase(brandCreate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(brandUpdate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(brandUpdate.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedBrand = action.payload.data;
        state.brands = state.brands.map((brand) =>
          brand.id === updatedBrand.id ? updatedBrand : brand
        );
      })
      .addCase(brandUpdate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(brandDelete.pending, (state) => {
        state.status = "loading";
      })
      .addCase(brandDelete.fulfilled, (state, action) => {
        state.status = "succeeded";
        const deletedId = action?.payload?.data?.id;
        state.brands = state?.brands.filter((item) => item.id !== deletedId);
        state.totalRecord = state.totalRecord - 1;
      })
      .addCase(brandDelete.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearBrandData } = brandSlice.actions;

export default brandSlice.reducer;
