import { Route, Routes } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import ScrollToTop from "../components/ScrollToTop";
import DashboardLayout from "../layouts/DashboardLayout";
import Media from "../components/media/Media";
import Login from "../pages/Login";
import RouteGuard from "../components/RouteGuard";

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
          <Route path="/media" element={<Media />} />
        </Route>

        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
};

export default Path;
