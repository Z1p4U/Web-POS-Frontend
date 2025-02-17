import { useState, useMemo } from "react";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import ConfirmationModal from "../components/ui/model/ConfirmationModal";
import useSetting from "../redux/hooks/setting/useSetting";
import useUserProfile from "../redux/hooks/user/useUserProfile";
import DashboardAppBar from "./components/DashboardAppBar";
import DashboardDrawer from "./components/DashboardDrawer";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MediaIcon from "@mui/icons-material/VideoLibrary";
import StorefrontIcon from "@mui/icons-material/Storefront";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import CategoryIcon from "@mui/icons-material/Category";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import StyleIcon from "@mui/icons-material/Style";
import People from "@mui/icons-material/People";
import useCustomProduct from "../redux/hooks/inventory/product/useCustomProduct";

const drawerWidth = 320;

// Navigation items definition
const baseNavItems = [
  {
    label: "Dashboard",
    icon: <DashboardIcon />,
    path: "/",
  },
  {
    label: "POS",
    icon: <PointOfSaleIcon />,
    path: "/pos/casher",
  },
  {
    label: "Inventory",
    icon: <Inventory2Icon />,
    subItems: [
      { label: "Brands", icon: <StyleIcon />, path: "/inventory/brand" },
      {
        label: "Categories",
        icon: <CategoryIcon />,
        path: "/inventory/category",
      },
      {
        label: "Suppliers",
        icon: <PrecisionManufacturingIcon />,
        path: "/inventory/supplier",
      },
      {
        label: "Products",
        icon: <LocalMallIcon />,
        path: "/inventory/product",
      },
    ],
  },
  {
    label: "Sale",
    icon: <StorefrontIcon />,
    subItems: [
      {
        label: "Today Sale Record",
        icon: <ReceiptIcon />,
        path: "/sale/daily-voucher",
      },
      {
        label: "Monthly Record",
        icon: <ReceiptIcon />,
        path: "/sale/monthly-voucher",
        adminOnly: true,
      },
      {
        label: "Yearly Record",
        icon: <ReceiptIcon />,
        path: "/sale/yearly-voucher",
        adminOnly: true,
      },
    ],
  },
  {
    label: "Media",
    icon: <MediaIcon />,
    path: "/media",
  },
  {
    label: "User",
    icon: <People />,
    path: "/user",
    adminOnly: true,
  },
];

const DashboardLayout = () => {
  const { hasLowStock, hasOutOfStock } = useCustomProduct();
  const { isAdmin } = useUserProfile();
  const { setting } = useSetting();

  const [drawerOpen, setDrawerOpen] = useState(true);
  const [submenuStates, setSubmenuStates] = useState({});
  const [lastOpenedSubmenu, setLastOpenedSubmenu] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nav = useNavigate();
  const location = useLocation();

  const toggleDrawer = () => {
    if (drawerOpen) {
      setLastOpenedSubmenu(
        Object.keys(submenuStates).find((key) => submenuStates[key])
      );
      setSubmenuStates({});
    } else if (lastOpenedSubmenu) {
      setSubmenuStates({ [lastOpenedSubmenu]: true });
    }
    setDrawerOpen(!drawerOpen);
  };

  // Toggle submenu open/close
  const toggleSubmenu = (menuLabel) => {
    if (!drawerOpen) {
      setDrawerOpen(true);
    }
    setSubmenuStates((prev) => ({
      ...Object.keys(prev).reduce(
        (acc, key) => ({
          ...acc,
          [key]: key === menuLabel ? !prev[key] : false,
        }),
        {}
      ),
      [menuLabel]: !prev[menuLabel],
    }));
    if (!submenuStates[menuLabel]) {
      setLastOpenedSubmenu(menuLabel);
    }
  };

  const isActive = (path) => location.pathname === path;
  const isSubmenuActive = (subItems) =>
    subItems?.some((subItem) => location.pathname === subItem.path);

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    setDrawerOpen(false);
    nav("/login");
  };

  // Memoize the filtered navigation items to prevent unnecessary recalculations
  const filteredNavItems = useMemo(
    () =>
      baseNavItems
        .filter((item) => {
          if (item.adminOnly && !isAdmin) return false;
          return true;
        })
        .map((item) => {
          if (item.subItems) {
            const filteredSubItems = item.subItems.filter((sub) => {
              if (sub.adminOnly && !isAdmin) return false;
              return true;
            });
            return { ...item, subItems: filteredSubItems };
          }
          return item;
        }),
    [isAdmin]
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <DashboardAppBar
        toggleDrawer={toggleDrawer}
        setting={setting}
        isAdmin={isAdmin}
        hasLowStock={hasLowStock}
        hasOutOfStock={hasOutOfStock}
        onLogout={() => setIsModalOpen(true)}
      />
      <DashboardDrawer
        drawerOpen={drawerOpen}
        filteredNavItems={filteredNavItems}
        toggleSubmenu={toggleSubmenu}
        submenuStates={submenuStates}
        isActive={isActive}
        isSubmenuActive={isSubmenuActive}
      />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${drawerOpen ? drawerWidth : 64}px)`,
          transition: "width 0.3s",
        }}
      >
        <Toolbar sx={{ minHeight: 80 }} />
        {/* Renders the child routes */}
        <Outlet />
      </Box>
      <ConfirmationModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleLogout}
        message="Are you sure you want to logout?"
      />
    </Box>
  );
};

export default DashboardLayout;
