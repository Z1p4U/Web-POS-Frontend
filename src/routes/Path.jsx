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
import BrandCreate from "../components/inventory/brand/BrandCreate";
import BrandUpdate from "../components/inventory/brand/BrandUpdate";

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
          <Route path="/brand" element={<Brand />} />
          <Route path="/brand-create" element={<BrandCreate />} />
          <Route path="/brand-update" element={<BrandUpdate />} />
          <Route path="/category" element={<Category />} />
          <Route path="/supplier" element={<Supplier />} />
          <Route path="/product" element={<Product />} />
          {/* Inventory */}

          {/* Sale */}
          <Route path="/pos" element={<POS />} />
          <Route path="/daily-voucher" element={<DailyVoucher />} />
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
