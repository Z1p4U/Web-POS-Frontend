import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./services/auth/authSlice";
import brandReducer from "./services/brand/brandSlice";
import categoryReducer from "./services/category/categorySlice";
import mediaReducer from "./services/media/mediaSlice";
import voucherReducer from "./services/voucher/voucherSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    brand: brandReducer,
    category: categoryReducer,
    media: mediaReducer,
    voucher: voucherReducer,
  },
});

export default store;
