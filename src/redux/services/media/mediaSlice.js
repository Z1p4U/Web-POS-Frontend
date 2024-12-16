import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addPhoto, deletePhoto, fetchPhoto } from "../../api/media/mediaApi";

export const fetchPhotoList = createAsyncThunk(
  "media/fetchPhoto",
  async ({ token, pagination }, { rejectWithValue }) => {
    try {
      const response = await fetchPhoto(token, pagination);
      console.log(response);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const photoCreate = createAsyncThunk(
  "media/addPhoto",
  async ({ photos, token }, { rejectWithValue }) => {
    try {
      const response = await addPhoto(photos, token);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to upload photos");
    }
  }
);

export const photoDelete = createAsyncThunk(
  "media/deletePhoto",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await deletePhoto(id, token);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete");
    }
  }
);

const initialState = {
  photos: [],
  status: "idle",
  error: null,
  lastPage: 1,
};

const photoSlice = createSlice({
  name: "media",
  initialState,
  reducers: {
    clearPhotoData(state) {
      state.photos = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPhotoList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPhotoList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.photos = action.payload.data;
        state.lastPage = action.payload.last_page;
      })
      .addCase(fetchPhotoList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(photoCreate.pending, (state) => {
        state.status = "loading";
      })
      .addCase(photoCreate.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.photos = [...action.payload.data, ...state.photos];
      })
      .addCase(photoCreate.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(photoDelete.pending, (state) => {
        state.status = "loading";
      })
      .addCase(photoDelete.fulfilled, (state) => {
        state.status = "succeeded";
      })
      .addCase(photoDelete.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearPhotoData } = photoSlice.actions;

export default photoSlice.reducer;
