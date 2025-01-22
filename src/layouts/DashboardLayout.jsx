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
  Menu,
  MenuItem,
  Avatar,
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
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Logout, People, Person, Settings } from "@mui/icons-material";
import ConfirmationModal from "../components/ui/model/ConfirmationModal";
import useSetting from "../redux/hooks/setting/useSetting";

const drawerWidth = 320;

const navItems = [
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
  },
];

const DashboardLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);
  const [submenuStates, setSubmenuStates] = useState({});
  const [lastOpenedSubmenu, setLastOpenedSubmenu] = useState(null); // Track the last opened submenu
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const { setting } = useSetting();

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const nav = useNavigate();

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

  const handleLogout = () => {
    sessionStorage.removeItem("authToken");
    setDrawerOpen(false);
    nav("/login");
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar
          sx={{
            minHeight: 80,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          {/* Left Section: Menu Icon and Logo */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              color="inherit"
              edge="start"
              onClick={toggleDrawer}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Link to={"/"}>
              <img
                src={`${setting?.logo ? setting?.logo : "/logo/logo.png"}`}
                className="aspect-square w-16"
                alt="logo"
              />
            </Link>
          </Box>

          {/* Right Section: Settings and User Icons */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              onClick={handleClick}
              size="small"
              color="inherit"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <Person />
            </IconButton>
          </Box>
        </Toolbar>
        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                overflow: "visible",
                filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                mt: 1.5,
                "& .MuiAvatar-root": {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                "&::before": {
                  content: '""',
                  display: "block",
                  position: "absolute",
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: "background.paper",
                  transform: "translateY(-50%) rotate(45deg)",
                  zIndex: 0,
                },
              },
            },
          }}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          <MenuItem onClick={handleClose}>
            <Avatar /> Profile
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => nav("/setting")}>
            <ListItemIcon>
              <Settings fontSize="small" />
            </ListItemIcon>
            Settings
          </MenuItem>
          <MenuItem onClick={() => setIsModalOpen(true)}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Logout
          </MenuItem>
        </Menu>
      </AppBar>

      <Drawer
        variant="permanent"
        open={drawerOpen}
        sx={{
          width: {
            xs: drawerOpen ? drawerWidth : 0,
            sm: drawerOpen ? drawerWidth : 64,
            md: drawerOpen ? drawerWidth : 64,
          },
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: {
              xs: drawerOpen ? drawerWidth : 0,
              sm: drawerOpen ? drawerWidth : 64,
              md: drawerOpen ? drawerWidth : 64,
            },
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
