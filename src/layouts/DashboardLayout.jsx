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
import ReceiptIcon from "@mui/icons-material/Receipt";
import { Link, Outlet } from "react-router-dom";

const drawerWidth = 320;

const navItems = [
  {
    label: "Dashboard",
    icon: <DashboardIcon />,
    path: "/",
  },
  {
    label: "Sale",
    icon: <StorefrontIcon />,
    subItems: [
      { label: "POS", icon: <PointOfSaleIcon />, path: "/sub-item-1" },
      {
        label: "Today Sale Record",
        icon: <ReceiptIcon />,
        path: "/daily-voucher",
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
  const [submenuOpen, setSubmenuOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
    if (drawerOpen) {
      setSubmenuOpen(false); // Collapse submenu when the drawer closes
    }
  };

  const toggleSubmenu = () => {
    setSubmenuOpen(!submenuOpen);
  };

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
        {/* Adjust Toolbar height inside Drawer */}

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
                  {/* Parent Menu Item */}
                  <ListItem disablePadding>
                    <ListItemButton
                      sx={{ minHeight: 50 }}
                      onClick={toggleSubmenu}
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
                        (submenuOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />)}
                    </ListItemButton>
                  </ListItem>

                  {/* Submenu Items */}
                  <Collapse in={submenuOpen} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      {item.subItems.map((subItem) => (
                        <ListItem
                          key={subItem.label}
                          disablePadding
                          sx={{ pl: 3 }}
                        >
                          <ListItemButton component={Link} to={subItem.path}>
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
                  <ListItem disablePadding>
                    <ListItemButton
                      sx={{ minHeight: 50 }}
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
        {/* Adjust Toolbar height inside Main Content */}
        <Outlet />
      </Box>
    </Box>
  );
};

export default DashboardLayout;
