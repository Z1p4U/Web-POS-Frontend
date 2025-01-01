import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchCategory,
  fetchCreateCategory,
  fetchDeleteCategory,
  fetchUpdateCategory,
} from "../../../api/inventory/category/categoryApi";

export const categoryList = createAsyncThunk(
  "category/categoryList",
  async ({ token, pagination, search }, { rejectWithValue }) => {
    try {
      const response = await fetchCategory(token, pagination, search);
      const normalizedData = {
        categories: pagination ? response?.data?.data : response?.data,
        lastPage: response?.data?.last_page || 1,
        totalRecord: response?.data?.total || 0,
      };
      return normalizedData;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch Categories"
      );
    }
  }
);

export const categoryCreate = createAsyncThunk(
  "category/categoryCreate",
  async ({ categories, token }, { rejectWithValue }) => {
    try {
      const response = await fetchCreateCategory(categories, token);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add category");
    }
  }
);

export const categoryUpdate = createAsyncThunk(
  "category/categoryUpdate",
  async ({ id, categories, token }, { rejectWithValue }) => {
    try {
      const response = await fetchUpdateCategory(id, categories, token);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update category"
      );
    }
  }
);

export const categoryDelete = createAsyncThunk(
  "category/categoryDelete",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await fetchDeleteCategory(id, token);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to delete category"
      );
    }
  }
);

const initialState = {
  categories: [],
  status: "idle",
  error: null,
  lastPage: 1,
  totalRecord: 0,
};

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    clearCategoryData(state) {
      state.categories = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(categoryList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(categoryList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = action.payload.categories;
        state.lastPage = action.payload.lastPage;
        state.totalRecord = action.payload.totalRecord;
      })
      .addCase(categoryList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(categoryCreate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(categoryCreate.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.categories = [action.payload.data, ...state.categories];
        state.totalRecord = state.totalRecord + 1;
      })
      .addCase(categoryCreate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(categoryUpdate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(categoryUpdate.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedCategory = action.payload.data;
        state.categories = state.categories.map((category) =>
          category.id === updatedCategory.id ? updatedCategory : category
        );
      })
      .addCase(categoryUpdate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(categoryDelete.pending, (state) => {
        state.status = "loading";
      })
      .addCase(categoryDelete.fulfilled, (state, action) => {
        state.status = "succeeded";
        const deletedId = action?.payload?.data?.id;
        state.categories = state?.categories.filter(
          (item) => item.id !== deletedId
        );
        state.totalRecord = state.totalRecord - 1;
      })
      .addCase(categoryDelete.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearCategoryData } = categorySlice.actions;

export default categorySlice.reducer;
