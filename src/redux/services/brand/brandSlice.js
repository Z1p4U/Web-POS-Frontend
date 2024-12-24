import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchBrand,
  fetchCreateBrand,
  fetchDeleteBrand,
  fetchUpdateBrand,
} from "../../api/brand/brandApi";

export const brandList = createAsyncThunk(
  "brand/brandList",
  async ({ token, pagination, search }, { rejectWithValue }) => {
    try {
      const response = await fetchBrand(token, pagination, search);
      // console.log(response);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
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
  async ({ brands, token }, { rejectWithValue }) => {
    try {
      const response = await fetchUpdateBrand(brands, token);
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
        state.brands = action.payload.data;
        state.lastPage = action.payload.last_page;
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
        state.brands = [...action.payload.data, ...state.brands];
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
        state.brands = [...action.payload.data, ...state.brands];
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
      })
      .addCase(brandDelete.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearBrandData } = brandSlice.actions;

export default brandSlice.reducer;
