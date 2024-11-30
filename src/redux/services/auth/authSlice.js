import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchLogin, fetchRegister } from "../../api/auth/authApi";

export const register = createAsyncThunk(
  "auth/register",
  async (
    {
      name,
      role,
      username,
      password,
      selfRegister,
      primaryPhone,
      email,
      addressType,
    },
    { rejectWithValue }
  ) => {
    try {
      const registeredData = await fetchRegister(
        name,
        role,
        username,
        password,
        selfRegister,
        primaryPhone,
        email,
        addressType
      );
      console.log(registeredData);
      return registeredData;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await fetchLogin(email, password);
      return response;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async (token, { rejectWithValue }) => {
    try {
      // if (token) {
      //   await fetchLogout(token);
      // }
      sessionStorage.removeItem("authToken");
      sessionStorage.removeItem("userData");
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  token: sessionStorage.getItem("authToken") || null,
  status: "idle",
  error: null,
  isAuthenticated: !!sessionStorage.getItem("authToken"),
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthState(state) {
      state.status = "idle";
      state.error = null;
    },
    setIsAuthenticated(state, action) {
      state.isAuthenticated = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state) => {
        state.status = "succeeded";
        // state.userData = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        const token = action?.payload?.data?.access_token;
        state.token = token;
        state.isAuthenticated = true;
        sessionStorage.setItem("authToken", token);
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = "succeeded";
        state.token = null;
        // state.userData = null;
        state.isAuthenticated = false;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const { clearAuthState, setIsAuthenticated } = authSlice.actions;
export default authSlice.reducer;
