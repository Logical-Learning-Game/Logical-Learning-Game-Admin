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
                <Typography variant="h5" fontWeight="bold">
                    Logical Learning Game Admin
                </Typography>
            </Box>

            <List>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/players">
                        <ListItemIcon>
                            <PeopleOutlinedIcon sx={{ color: "primary.main" }} />
                        </ListItemIcon>
                        <ListItemText primary="Player Management" primaryTypographyProps={{variant: "body2", fontWeight: "medium"}} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <VideogameAssetOutlinedIcon sx={{ color: "primary.main" }} />
                        </ListItemIcon>
                        <ListItemText primary="Map Management" primaryTypographyProps={{variant: "body2", fontWeight: "medium"}} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <ConstructionOutlinedIcon sx={{ color: "primary.main" }} />
                        </ListItemIcon>
                        <ListItemText primary="Map Builder" primaryTypographyProps={{variant: "body2", fontWeight: "medium"}} />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    );
};

export default Sidebar;