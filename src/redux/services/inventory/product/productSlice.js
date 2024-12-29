import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchProduct,
  fetchCreateProduct,
  fetchDeleteProduct,
  fetchUpdateProduct,
} from "../../../api/inventory/product/productApi";

export const productList = createAsyncThunk(
  "product/productList",
  async ({ token, pagination, search }, { rejectWithValue }) => {
    try {
      const response = await fetchProduct(token, pagination, search);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const productCreate = createAsyncThunk(
  "product/productCreate",
  async ({ products, token }, { rejectWithValue }) => {
    try {
      const response = await fetchCreateProduct(products, token);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to add product");
    }
  }
);

export const productUpdate = createAsyncThunk(
  "product/productUpdate",
  async ({ id, products, token }, { rejectWithValue }) => {
    try {
      const response = await fetchUpdateProduct(id, products, token);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to update product"
      );
    }
  }
);

export const productDelete = createAsyncThunk(
  "product/productDelete",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await fetchDeleteProduct(id, token);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to delete product"
      );
    }
  }
);

const initialState = {
  products: [],
  status: "idle",
  error: null,
  lastPage: 1,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    clearProductData(state) {
      state.products = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(productList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(productList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.data;
        state.lastPage = action.payload.last_page;
      })
      .addCase(productList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(productCreate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(productCreate.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = [action.payload.data, ...state.products];
      })
      .addCase(productCreate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(productUpdate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(productUpdate.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedProduct = action.payload.data;
        state.products = state.products.map((product) =>
          product.id === updatedProduct.id ? updatedProduct : product
        );
      })
      .addCase(productUpdate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(productDelete.pending, (state) => {
        state.status = "loading";
      })
      .addCase(productDelete.fulfilled, (state, action) => {
        state.status = "succeeded";
        const deletedId = action?.payload?.data?.id;
        state.products = state?.products.filter(
          (item) => item.id !== deletedId
        );
      })
      .addCase(productDelete.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearProductData } = productSlice.actions;

export default productSlice.reducer;
