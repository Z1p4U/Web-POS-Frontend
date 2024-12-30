import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import ScrollToTop from "../components/ScrollToTop";
import DashboardLayout from "../layouts/DashboardLayout";
import Media from "../components/media/Media";
import Login from "../pages/Login";
import RouteGuard from "../components/RouteGuard";
import DailyVoucher from "../components/sale/voucher/DailyVoucher";
import POS from "../components/sale/pos/POS";
import Brand from "../components/inventory/brand/Brand";
import Category from "../components/inventory/category/Category";
import Supplier from "../components/inventory/supplier/Supplier";
import Product from "../components/inventory/product/Product";
import ProductDetail from "../components/inventory/product/ProductDetail";

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
            path="/inventory/product/:productId"
            element={<ProductDetail />}
          />
          {/* Inventory */}

          {/* Sale */}
          <Route path="/sale/pos" element={<POS />} />
          <Route path="/sale/daily-voucher" element={<DailyVoucher />} />
          {/* Sale */}

          {/* Media */}
          <Route path="/media" element={<Media />} />
          {/* Media */}
        </Route>

        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default Path;
