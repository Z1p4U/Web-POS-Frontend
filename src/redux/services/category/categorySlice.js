import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchCategory,
  fetchCreateCategory,
  fetchDeleteCategory,
  fetchUpdateCategory,
} from "../../api/category/categoryApi";

export const categoryList = createAsyncThunk(
  "category/categoryList",
  async ({ token, pagination, search }, { rejectWithValue }) => {
    try {
      const response = await fetchCategory(token, pagination, search);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
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
        state.categories = action.payload.data;
        state.lastPage = action.payload.last_page;
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
      })
      .addCase(categoryDelete.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearCategoryData } = categorySlice.actions;

export default categorySlice.reducer;
