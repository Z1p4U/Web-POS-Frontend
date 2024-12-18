import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./services/auth/authSlice";
import mediaReducer from "./services/media/mediaSlice";
import voucherReducer from "./services/voucher/voucherSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    media: mediaReducer,
    voucher: voucherReducer,
  },
});

export default store;
