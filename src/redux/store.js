import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./services/auth/authSlice";
import brandReducer from "./services/brand/brandSlice";
import categoryReducer from "./services/category/categorySlice";
import supplierReducer from "./services/supplier/supplierSlice";
import mediaReducer from "./services/media/mediaSlice";
import voucherReducer from "./services/voucher/voucherSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    brand: brandReducer,
    category: categoryReducer,
    supplier: supplierReducer,
    media: mediaReducer,
    voucher: voucherReducer,
  },
});

export default store;
