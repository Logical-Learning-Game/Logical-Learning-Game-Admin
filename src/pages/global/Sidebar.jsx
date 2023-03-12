import { useState } from "react";
import { Box, Typography, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { Link } from "react-router-dom";
import VideogameAssetOutlinedIcon from "@mui/icons-material/VideogameAssetOutlined";
import ConstructionOutlinedIcon from "@mui/icons-material/ConstructionOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";


const drawerWidth = 240;

const Sidebar = () => {
    return (
        <Drawer
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    backgroundColor: "background.paper"
                },
            }}
            variant="permanent"
            anchor="left"
        >
            <Box p={2} textAlign="center">
                <Typography variant="h3">
                    Logical Learning Game Admin
                </Typography>
            </Box>

            <List>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <PeopleOutlinedIcon sx={{ color: "primary.main" }} />
                        </ListItemIcon>
                        <ListItemText primary="Player Management" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <VideogameAssetOutlinedIcon sx={{ color: "primary.main" }} />
                        </ListItemIcon>
                        <ListItemText primary="Map Management" />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <ConstructionOutlinedIcon sx={{ color: "primary.main" }} />
                        </ListItemIcon>
                        <ListItemText primary="Map Builder" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Sidebar;