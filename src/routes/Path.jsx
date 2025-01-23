import { Route, Routes } from "react-router-dom";
import ScrollToTop from "../components/ScrollToTop";
import DashboardLayout from "../layouts/DashboardLayout";
import Media from "../components/media/Media";
import Login from "../pages/Login";
import RouteGuard from "../components/RouteGuard";
import DailyVoucher from "../components/sale/voucher/DailyVoucher";
import Brand from "../components/inventory/brand/Brand";
import Category from "../components/inventory/category/Category";
import Supplier from "../components/inventory/supplier/Supplier";
import Product from "../components/inventory/product/Product";
import ProductDetail from "../components/inventory/product/ProductDetail";
import EntryProduct from "../components/inventory/product/components/EntryProduct";
import Dashboard from "../components/dashboard/Dashboard";
import Casher from "../pages/pos/Casher";
import User from "../components/user/User";
import Setting from "../components/setting/Setting";
import UserProfile from "../components/user/UserProfile";

const Path = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Routes that use the DashboardLayout */}
        <Route
          path="/"
          element={
            <RouteGuard>
              <DashboardLayout />
            </RouteGuard>
          }
        >
          <Route index element={<Dashboard />} />

          {/* Inventory */}
          <Route path="/inventory/brand" element={<Brand />} />
          <Route path="/inventory/category" element={<Category />} />
          <Route path="/inventory/supplier" element={<Supplier />} />
          <Route path="/inventory/product" element={<Product />} />
          <Route path="/inventory/entry-product" element={<EntryProduct />} />
          <Route
            path="/inventory/product/:productId"
            element={<ProductDetail />}
          />
          {/* Inventory */}

          {/* Sale */}
          <Route path="/sale/daily-voucher" element={<DailyVoucher />} />
          {/* Sale */}

          {/* Media */}
          <Route path="/media" element={<Media />} />
          {/* Media */}

          {/* User */}
          <Route path="/user" element={<User />} />
          <Route path="/user-profile" element={<UserProfile />} />
          {/* User */}

          {/* Setting */}
          <Route path="/setting" element={<Setting />} />
          {/* Settings */}
        </Route>

        {/* POS */}
        <Route path="/pos/casher" element={<Casher />} />
        {/* POS */}

        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default Path;
