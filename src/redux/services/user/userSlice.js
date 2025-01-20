import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  fetchUser,
  fetchRegister,
  fetchProfile,
  fetchUserProfile,
  fetchEditProfile,
  fetchEditUserProfile,
} from "../../api/user/userApi";

export const userList = createAsyncThunk(
  "user/userList",
  async ({ token, pagination, search }, { rejectWithValue }) => {
    try {
      const response = await fetchUser(token, pagination, search);

      const normalizedData = {
        users: pagination ? response?.data?.data : response?.data,
        lastPage: response?.data?.last_page || 1,
        totalRecord: response?.data?.total || 0,
      };

      return normalizedData;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch users");
    }
  }
);

export const userRegister = createAsyncThunk(
  "user/userRegister",
  async ({ userData, token }, { rejectWithValue }) => {
    try {
      const response = await fetchRegister(userData, token);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to register user");
    }
  }
);

export const profile = createAsyncThunk(
  "user/profile",
  async (token, { rejectWithValue }) => {
    try {
      const response = await fetchProfile(token);
      return response?.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to fetch profile");
    }
  }
);

export const userProfile = createAsyncThunk(
  "user/userProfile",
  async ({ token, id }, { rejectWithValue }) => {
    try {
      const response = await fetchUserProfile(token, id);
      return response?.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to fetch user profile"
      );
    }
  }
);

export const editProfile = createAsyncThunk(
  "user/editProfile",
  async ({ userData, token }, { rejectWithValue }) => {
    try {
      const response = await fetchEditProfile(userData, token);
      return response;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Failed to edit profile");
    }
  }
);

export const editUserProfile = createAsyncThunk(
  "user/editUserProfile",
  async ({ id, userData, token }, { rejectWithValue }) => {
    try {
      const response = await fetchEditUserProfile(id, userData, token);
      return response;
    } catch (error) {
      return rejectWithValue(
        error.response?.data || "Failed to edit user profile"
      );
    }
  }
);

const initialState = {
  users: [],
  profile: {},
  userProfile: {},
  status: "idle",
  error: null,
  lastPage: 1,
  totalRecord: 0,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearUserData(state) {
      state.users = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(userList.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userList.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload.users;
        state.lastPage = action.payload.lastPage;
        state.totalRecord = action.payload.totalRecord;
      })
      .addCase(userList.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(profile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(profile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.profile = action.payload;
      })
      .addCase(profile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(userProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userProfile = action.payload;
      })
      .addCase(userProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(userRegister.pending, (state) => {
        state.status = "loading";
      })
      .addCase(userRegister.fulfilled, (state, action) => {
        state.status = "succeeded";
        const newUser = action.payload?.data;
        state.users = [newUser, ...state.users];
        state.totalRecord += 1;
      })
      .addCase(userRegister.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(editProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editProfile.fulfilled, (state, action) => {
        state.status = "succeeded";

        Object.keys(action.payload.data).forEach((key) => {
          state.profile[key] = action.payload.data[key];
        });
      })
      .addCase(editProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(editUserProfile.pending, (state) => {
        state.status = "loading";
      })
      .addCase(editUserProfile.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedUserData = action.payload?.data;

        state.users = state.users.map((user) => {
          if (user.id === updatedUserData.id) {
            return {
              ...user,
              ...updatedUserData,
            };
          }
          return user;
        });
      })
      .addCase(editUserProfile.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearUserData } = userSlice.actions;

export default userSlice.reducer;
