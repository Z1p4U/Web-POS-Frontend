import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./services/auth/authSlice";
import userReducer from "./services/user/userSlice";
import brandReducer from "./services/inventory/brand/brandSlice";
import categoryReducer from "./services/inventory/category/categorySlice";
import supplierReducer from "./services/inventory/supplier/supplierSlice";
import productReducer from "./services/inventory/product/productSlice";
import stockReducer from "./services/inventory/stock/stockSlice";
import mediaReducer from "./services/media/mediaSlice";
import voucherReducer from "./services/sale/voucher/voucherSlice";
import settingReducer from "./services/setting/settingSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    brand: brandReducer,
    category: categoryReducer,
    supplier: supplierReducer,
    product: productReducer,
    stock: stockReducer,
    media: mediaReducer,
    voucher: voucherReducer,
    setting: settingReducer,
  },
});

export default store;
