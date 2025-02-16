import React from "react";
import {
  Drawer,
  Toolbar,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Collapse,
  Divider,
  Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import PropTypes from "prop-types";

const drawerWidth = 320;

const DashboardDrawer = React.memo(
  ({
    drawerOpen,
    filteredNavItems,
    toggleSubmenu,
    submenuStates,
    isActive,
    isSubmenuActive,
  }) => {
    return (
      <Drawer
        variant="permanent"
        open={drawerOpen}
        sx={{
          width: {
            xs: drawerOpen ? drawerWidth : 0,
            md: drawerOpen ? drawerWidth : 64,
          },
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: {
            width: {
              xs: drawerOpen ? drawerWidth : 0,
              md: drawerOpen ? drawerWidth : 64,
            },
            transition: "width 0.3s",
            overflowX: "hidden",
          },
        }}
      >
        <Toolbar />
        <List>
          {filteredNavItems.map((item) => (
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
                  {/* Submenu Items */}
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
    );
  }
);

DashboardDrawer.displayName = "DashboardDrawer";

DashboardDrawer.propTypes = {
  drawerOpen: PropTypes.any,
  filteredNavItems: PropTypes.any,
  toggleSubmenu: PropTypes.any,
  submenuStates: PropTypes.any,
  isActive: PropTypes.any,
  isSubmenuActive: PropTypes.any,
};

export default DashboardDrawer;
