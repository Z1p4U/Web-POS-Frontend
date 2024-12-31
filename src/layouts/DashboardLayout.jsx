import { useState } from "react";
import {
  Box,
  CssBaseline,
  Toolbar,
  AppBar,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Tooltip,
  Collapse,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MediaIcon from "@mui/icons-material/VideoLibrary";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StorefrontIcon from "@mui/icons-material/Storefront";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ReceiptIcon from "@mui/icons-material/Receipt";
import PrecisionManufacturingIcon from "@mui/icons-material/PrecisionManufacturing";
import CategoryIcon from "@mui/icons-material/Category";
import LocalMallIcon from "@mui/icons-material/LocalMall";
import StyleIcon from "@mui/icons-material/Style";
import { Link, Outlet, useLocation } from "react-router-dom";

const drawerWidth = 320;

const navItems = [
  {
    label: "Dashboard",
    icon: <DashboardIcon />,
    path: "/",
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
      { label: "POS", icon: <PointOfSaleIcon />, path: "/sale/pos" },
      {
        label: "Today Sale Record",
        icon: <ReceiptIcon />,
        path: "/sale/daily-voucher",
      },
    ],
  },
  {
    label: "Media",
    icon: <MediaIcon />,
    path: "/media",
  },
];

const DashboardLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [submenuStates, setSubmenuStates] = useState({});
  const [lastOpenedSubmenu, setLastOpenedSubmenu] = useState(null); // Track the last opened submenu
  const location = useLocation();

  const toggleDrawer = () => {
    if (drawerOpen) {
      setLastOpenedSubmenu(
        Object.keys(submenuStates).find((key) => submenuStates[key]) // Store the currently open submenu
      );
      setSubmenuStates({}); // Close all submenus when the drawer closes
    } else if (lastOpenedSubmenu) {
      setSubmenuStates({ [lastOpenedSubmenu]: true }); // Reopen the last selected submenu when the drawer reopens
    }
    setDrawerOpen(!drawerOpen);
  };

  const toggleSubmenu = (menuLabel) => {
    if (!drawerOpen) {
      setDrawerOpen(true);
    }
    setSubmenuStates((prev) => ({
      ...Object.keys(prev).reduce(
        (acc, key) => ({
          ...acc,
          [key]: key === menuLabel ? !prev[key] : false, // Close all other submenus
        }),
        {}
      ),
      [menuLabel]: !prev[menuLabel], // Toggle the selected submenu
    }));
    if (!submenuStates[menuLabel]) {
      setLastOpenedSubmenu(menuLabel); // Track the last opened submenu
    }
  };

  const isActive = (path) => location.pathname === path;
  const isSubmenuActive = (subItems) =>
    subItems?.some((subItem) => location.pathname === subItem.path);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar sx={{ minHeight: 80 }}>
          {/* Adjust Toolbar height */}
          <IconButton
            color="inherit"
            edge="start"
            onClick={toggleDrawer}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <h1>DeepBlue POS</h1>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        open={drawerOpen}
        sx={{
          width: drawerOpen ? drawerWidth : 64,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: drawerOpen ? drawerWidth : 64,
            transition: "width 0.3s",
            overflowX: "hidden",
          },
        }}
      >
        <Toolbar />
        {/* Dynamic Navigation */}
        <List>
          {navItems.map((item) => (
            <Tooltip
              key={item.label}
              title={item.label}
              placement="right"
              disableHoverListener={drawerOpen}
            >
              {item.subItems ? (
                <>
                  {/* Parent Menu */}
                  <ListItem disablePadding>
                    <ListItemButton
                      sx={{
                        minHeight: 50,
                        backgroundColor: isSubmenuActive(item.subItems)
                          ? "rgba(0, 0, 0, 0.1)"
                          : "inherit",
                      }}
                      onClick={() => toggleSubmenu(item.label)}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      {drawerOpen && (
                        <ListItemText
                          primary={item.label}
                          primaryTypographyProps={{
                            fontSize: "15px",
                          }}
                          sx={{ marginLeft: -1 }}
                        />
                      )}
                      {drawerOpen &&
                        (submenuStates[item.label] ? (
                          <ExpandLessIcon />
                        ) : (
                          <ExpandMoreIcon />
                        ))}
                    </ListItemButton>
                  </ListItem>
                  {/* Submenu */}
                  <Collapse
                    in={submenuStates[item.label]}
                    timeout="auto"
                    unmountOnExit
                  >
                    <List component="div" disablePadding>
                      {item.subItems.map((subItem) => (
                        <ListItem
                          key={subItem.label}
                          disablePadding
                          sx={{ pl: 3 }}
                        >
                          <ListItemButton
                            component={Link}
                            to={subItem.path}
                            sx={{
                              backgroundColor: isActive(subItem.path)
                                ? "rgba(0, 0, 0, 0.1)"
                                : "inherit",
                            }}
                          >
                            <ListItemIcon>{subItem.icon}</ListItemIcon>
                            {drawerOpen && (
                              <ListItemText
                                primary={subItem.label}
                                primaryTypographyProps={{
                                  fontSize: "14px",
                                }}
                                sx={{ marginLeft: -2 }}
                              />
                            )}
                          </ListItemButton>
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                  <Divider />
                </>
              ) : (
                <>
                  {/* Single Menu Item */}
                  <ListItem disablePadding>
                    <ListItemButton
                      sx={{
                        minHeight: 50,
                        backgroundColor: isActive(item.path)
                          ? "rgba(0, 0, 0, 0.1)"
                          : "inherit",
                      }}
                      component={Link}
                      to={item.path}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      {drawerOpen && (
                        <ListItemText
                          primary={item.label}
                          primaryTypographyProps={{
                            fontSize: "15px",
                          }}
                          sx={{ marginLeft: -1 }}
                        />
                      )}
                    </ListItemButton>
                  </ListItem>
                  <Divider />
                </>
              )}
            </Tooltip>
          ))}
        </List>
      </Drawer>

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
        {/* Renders the child routes */}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
