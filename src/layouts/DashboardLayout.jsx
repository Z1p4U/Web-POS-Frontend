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
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MediaIcon from "@mui/icons-material/VideoLibrary";
import { Link, Outlet } from "react-router-dom";

const drawerWidth = 240;

const DashboardLayout = () => {
  const [drawerOpen, setDrawerOpen] = useState(true);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />

      {/* AppBar */}
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
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

        {/* Section: Dashboard */}
        <List>
          <Tooltip
            title="Dashboard"
            placement="right"
            disableHoverListener={drawerOpen}
          >
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/">
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
                {drawerOpen && <ListItemText primary="Dashboard" />}
              </ListItemButton>
            </ListItem>
          </Tooltip>
        </List>

        <Divider />

        {/* Section: Media */}
        <List>
          <Tooltip
            title="Media"
            placement="right"
            disableHoverListener={drawerOpen}
          >
            <ListItem disablePadding>
              <ListItemButton component={Link} to="/media">
                <ListItemIcon>
                  <MediaIcon />
                </ListItemIcon>
                {drawerOpen && <ListItemText primary="Media" />}
              </ListItemButton>
            </ListItem>
          </Tooltip>
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
        <Toolbar />

        {/* Renders the child routes */}
        <Outlet />
        {/* Renders the child routes */}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
