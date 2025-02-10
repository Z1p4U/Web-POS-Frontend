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
import MonthlyVoucher from "../components/sale/voucher/MonthlyVoucher";
import YearlyVoucher from "../components/sale/voucher/YearlyVoucher";
import AuthGuard from "../components/AuthGuard";

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
          <Route
            path="/inventory/entry-product"
            element={
              <AuthGuard>
                <EntryProduct />
              </AuthGuard>
            }
          />
          <Route
            path="/inventory/product/:productId"
            element={<ProductDetail />}
          />
          {/* Inventory */}

          {/* Sale */}
          <Route path="/sale/daily-voucher" element={<DailyVoucher />} />
          <Route
            path="/sale/monthly-voucher"
            element={
              <AuthGuard>
                <MonthlyVoucher />
              </AuthGuard>
            }
          />
          <Route
            path="/sale/yearly-voucher"
            element={
              <AuthGuard>
                <YearlyVoucher />
              </AuthGuard>
            }
          />
          {/* Sale */}

          {/* Media */}
          <Route path="/media" element={<Media />} />
          {/* Media */}

          {/* User */}

          <Route
            path="/user"
            element={
              <AuthGuard>
                <User />
              </AuthGuard>
            }
          />
          <Route path="/profile" element={<UserProfile />} />
          {/* User */}

          {/* Setting */}
          <Route
            path="/setting"
            element={
              <AuthGuard>
                <Setting />
              </AuthGuard>
            }
          />
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
