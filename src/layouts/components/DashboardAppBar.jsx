import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
  Divider,
  Badge,
  Avatar,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import Person from "@mui/icons-material/Person";
import ErrorIcon from "@mui/icons-material/Error";
import Settings from "@mui/icons-material/Settings";
import Logout from "@mui/icons-material/Logout";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Marquee from "react-fast-marquee";
import PropTypes from "prop-types";

const DashboardAppBar = React.memo(
  ({
    toggleDrawer,
    setting,
    isAdmin,
    hasLowStock,
    hasOutOfStock,
    onLogout,
  }) => {
    const [anchorElUser, setAnchorElUser] = useState(null);
    const [anchorElNotification, setAnchorElNotification] = useState(null);

    const navigate = useNavigate();
    const location = useLocation();

    const handleUserMenuOpen = (event) => {
      setAnchorElUser(event.currentTarget);
    };
    const handleUserMenuClose = () => {
      setAnchorElUser(null);
    };

    const handleNotificationMenuOpen = (event) => {
      setAnchorElNotification(event.currentTarget);
    };
    const handleNotificationMenuClose = () => {
      setAnchorElNotification(null);
    };

    return (
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar
          sx={{
            minHeight: 80,
            display: "flex",
            justifyContent: "space-between",
            gap: "20px",
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
            <Box sx={{ width: "72px" }}>
              <Link to="/">
                <img
                  src={setting?.logo || "/logo/logo.png"}
                  className="aspect-square !w-20"
                  alt="logo"
                />
              </Link>
            </Box>
          </Box>

          {/* Center Section: Marquee */}
          <Box sx={{ width: "100%", backgroundColor: "#00000030", px: "20px" }}>
            <Marquee>{setting?.marquee || "Hello! This is Marquee"}</Marquee>
          </Box>

          {/* Right Section: Notification and User Menus */}
          <Box sx={{ display: "flex", alignItems: "center" }}>
            {location.pathname !== "/inventory/product" && (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <IconButton
                  onClick={handleNotificationMenuOpen}
                  size="small"
                  color="inherit"
                >
                  <Badge
                    color="warning"
                    variant="dot"
                    invisible={!hasLowStock && !hasOutOfStock}
                  >
                    <ErrorIcon />
                  </Badge>
                </IconButton>
                <Menu
                  anchorEl={anchorElNotification}
                  open={Boolean(anchorElNotification)}
                  onClose={handleNotificationMenuClose}
                  onClick={handleNotificationMenuClose}
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
                  <MenuItem
                    onClick={() =>
                      navigate("/inventory/product", {
                        state: { filter: "Low" },
                      })
                    }
                  >
                    <ListItemIcon>
                      <Badge
                        color="warning"
                        variant="dot"
                        invisible={!hasLowStock}
                      >
                        <Inventory2Icon fontSize="small" />
                      </Badge>
                    </ListItemIcon>
                    Low stock items
                  </MenuItem>
                  <Divider />
                  <MenuItem
                    onClick={() =>
                      navigate("/inventory/product", {
                        state: { filter: "Out" },
                      })
                    }
                  >
                    <ListItemIcon>
                      <Badge
                        color="warning"
                        variant="dot"
                        invisible={!hasOutOfStock}
                      >
                        <Inventory2Icon fontSize="small" />
                      </Badge>
                    </ListItemIcon>
                    Out of stock items
                  </MenuItem>
                </Menu>
              </Box>
            )}

            <IconButton
              onClick={handleUserMenuOpen}
              size="small"
              color="inherit"
            >
              <Person />
            </IconButton>
            <Menu
              anchorEl={anchorElUser}
              open={Boolean(anchorElUser)}
              onClose={handleUserMenuClose}
              onClick={handleUserMenuClose}
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
              <MenuItem onClick={() => navigate("/profile")}>
                <Avatar /> Profile
              </MenuItem>
              <Divider />
              {isAdmin && (
                <MenuItem onClick={() => navigate("/setting")}>
                  <ListItemIcon>
                    <Settings fontSize="small" />
                  </ListItemIcon>
                  Settings
                </MenuItem>
              )}
              <MenuItem onClick={onLogout}>
                <ListItemIcon>
                  <Logout fontSize="small" />
                </ListItemIcon>
                Logout
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
    );
  }
);

DashboardAppBar.displayName = "DashboardAppBar";

DashboardAppBar.propTypes = {
  drawerOpen: PropTypes.any,
  toggleDrawer: PropTypes.any,
  setting: PropTypes.any,
  isAdmin: PropTypes.any,
  hasLowStock: PropTypes.any,
  hasOutOfStock: PropTypes.any,
  onLogout: PropTypes.any,
};

export default DashboardAppBar;
