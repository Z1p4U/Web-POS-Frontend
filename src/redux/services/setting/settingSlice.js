import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchShowSetting,
  fetchUpdateSetting,
} from "../../api/setting/settingApi";

// Thunk for fetching the setting
export const showSetting = createAsyncThunk(
  "setting/showSetting",
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetchShowSetting(token);
      return response; // Assume `response` contains the setting object
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch app setting"
      );
    }
  }
);

// Thunk for updating the setting
export const updateSetting = createAsyncThunk(
  "setting/updateSetting",
  async ({ setting, token }, { rejectWithValue }) => {
    try {
      const response = await fetchUpdateSetting(setting, token);
      return response; // Assume `response` contains the updated setting object
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to edit app setting"
      );
    }
  }
);

// Initial state
const initialState = {
  setting: null, // Single setting record
  status: "idle",
  error: null,
};

// Slice
const settingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    clearSettingData(state) {
      state.setting = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(showSetting.pending, (state) => {
        state.status = "loading";
      })
      .addCase(showSetting.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.setting = action.payload; // Save the fetched setting
      })
      .addCase(showSetting.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(updateSetting.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateSetting.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.setting = action.payload; // Update the setting with new values
      })
      .addCase(updateSetting.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearSettingData } = settingSlice.actions;

export default settingSlice.reducer;
