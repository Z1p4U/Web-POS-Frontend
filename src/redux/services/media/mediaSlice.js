import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addPhoto, deletePhoto, fetchPhoto } from "../../api/media/mediaApi";

// Fetch photos from API
export const fetchPhotoList = createAsyncThunk(
  "media/fetchPhoto",
  async ({ token, pagination }, { rejectWithValue }) => {
    try {
      const response = await fetchPhoto(token, pagination);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch photos");
    }
  }
);

// Add photo to API
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

// Delete photo from API
export const photoDelete = createAsyncThunk(
  "media/deletePhoto",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      const response = await deletePhoto(id, token);
      return { id, ...response }; // Include the deleted photo ID in the response
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to delete photo");
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
    insertImage: (state, action) => {
      const { path, modalOpen, editModalOpen, selectedImage } = action.payload;

      if (path === "/inventory/brand") {
        state.selectedBrandImage = selectedImage;
      } else if (modalOpen) {
        state.selectedBrandImage = selectedImage;
      } else if (editModalOpen) {
        state.selectedBrandEditImage = selectedImage;
      }

      state.isImageInserted = true;
    },

    clearPhotoData(state) {
      state.photos = [];
      state.status = "idle";
      state.error = null;
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
      .addCase(photoDelete.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.photos = state.photos.filter(
          (photo) => photo.id !== action.payload.id
        );
      })
      .addCase(photoDelete.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearPhotoData, insertImage } = photoSlice.actions;
export default photoSlice.reducer;
