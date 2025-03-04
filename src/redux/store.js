import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./services/auth/authSlice";
import userReducer from "./services/user/userSlice";
import brandReducer from "./services/inventory/brand/brandSlice";
import categoryReducer from "./services/inventory/category/categorySlice";
import supplierReducer from "./services/inventory/supplier/supplierSlice";
import productReducer from "./services/inventory/product/productSlice";
import stockReducer from "./services/inventory/stock/stockSlice";
import expenseReducer from "./services/expense/expenseSlice";
import mediaReducer from "./services/media/mediaSlice";
import voucherReducer from "./services/sale/voucher/voucherSlice";
import checkoutReducer from "./services/sale/checkout/checkoutSlice";
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
    expense: expenseReducer,
    media: mediaReducer,
    voucher: voucherReducer,
    checkout: checkoutReducer,
    setting: settingReducer,
  },
});

export default store;
