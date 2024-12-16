import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./services/auth/authSlice";
import mediaReducer from "./services/media/mediaSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    media: mediaReducer,
  },
});

export default store;
