import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchProduct,
  fetchCreateProduct,
  fetchDeleteProduct,
  fetchUpdateProduct,
  fetchProductDetail,
  fetchImportProducts,
} from "../../../api/inventory/product/productApi";

export const productList = createAsyncThunk(
  "product/productList",
  async (
    { token, pagination, search, filterProperties },
    { rejectWithValue }
  ) => {
    try {
      const response = await fetchProduct(
        token,
        pagination,
        search,
        filterProperties
      );

      const normalizedData = {
        products: pagination ? response?.data?.data : response?.data,
        lastPage: response?.data?.last_page || 1,
        totalRecord: response?.data?.total || 0,
      };

      return normalizedData;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch Products"
      );
    }
  }
);

export const productDetail = createAsyncThunk(
  "product/productDetail",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const response = await fetchProductDetail(token, id);
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
      console.error("API Error:", error);
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

export const productImport = createAsyncThunk(
  "product/productImport",
  async ({ file, token }, { rejectWithValue }) => {
    try {
      const response = await fetchImportProducts(file, token);
      return response;
    } catch (error) {
      console.error("API Error:", error);
      return rejectWithValue(
        error.response?.data || "Failed to import product"
      );
    }
  }
);

const initialState = {
  products: [],
  productDetail: {},
  status: "idle",
  error: null,
  lastPage: 1,
  totalRecord: 0,
  hasLowStock: false,
  hasOutOfStock: false,
  lowStockItemCount: 0,
  outOfStockItemCount: 0,
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
        state.products = action?.payload?.products;
        state.lastPage = action?.payload?.lastPage;
        state.totalRecord = action?.payload?.totalRecord;
        state.hasLowStock = action?.payload?.products?.some(
          (product) => product.total_stock > 0 && product.total_stock < 11
        );
        state.lowStockItemCount = action?.payload?.products.filter(
          (product) => product.total_stock > 0 && product.total_stock < 11
        ).length;
        state.hasOutOfStock = action?.payload?.products.some(
          (product) => product.total_stock === 0
        );
        state.outOfStockItemCount = action?.payload?.products.filter(
          (product) => product.total_stock === 0
        ).length;
      })
      .addCase(productList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(productDetail.pending, (state) => {
        state.status = "loading";
      })
      .addCase(productDetail.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.productDetail = action.payload;
      })
      .addCase(productDetail.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(productCreate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(productCreate.fulfilled, (state, action) => {
        state.status = "succeeded";
        const newProduct = action.payload?.data;
        state.products = [newProduct, ...state.products];
        state.totalRecord += 1;
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
        state.products = state.products.filter(
          (item) => item.id !== action.meta.arg.id
        );
        state.totalRecord -= 1;
      })
      .addCase(productDelete.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(productImport.pending, (state) => {
        state.status = "loading";
      })
      .addCase(productImport.fulfilled, (state, action) => {
        state.status = "succeeded";
        const newProducts = action.payload?.data || [];
        state.products = [...newProducts, ...state.products];
        state.totalRecord += newProducts.length;
      })
      .addCase(productImport.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearProductData } = productSlice.actions;

export default productSlice.reducer;
