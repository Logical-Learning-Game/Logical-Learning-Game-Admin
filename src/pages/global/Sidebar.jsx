import { Box, Typography, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Dialog, DialogTitle, DialogActions, Button } from "@mui/material";
import { Link } from "react-router-dom";
import VideogameAssetOutlinedIcon from "@mui/icons-material/VideogameAssetOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { useAuth } from "../../hooks/useAuth";
import { useState } from "react";


const drawerWidth = 240;

const Sidebar = () => {
    const [signOutDialogOpen, setSignOutDialogOpen] = useState(false);
    const { onLogout } = useAuth();

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
                position: "relative"
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
                        <ListItemText primary="Player Management" primaryTypographyProps={{ variant: "body2", fontWeight: "medium" }} />
                    </ListItemButton>
                </ListItem>
                <ListItem disablePadding>
                    <ListItemButton component={Link} to="/maps">
                        <ListItemIcon>
                            <VideogameAssetOutlinedIcon sx={{ color: "primary.main" }} />
                        </ListItemIcon>
                        <ListItemText primary="Map Management" primaryTypographyProps={{ variant: "body2", fontWeight: "medium" }} />
                    </ListItemButton>
                </ListItem>


            </List>

            <List sx={{ position: "absolute", bottom: 6, width: "100%" }}>
                <ListItem disablePadding>
                    <ListItemButton onClick={() => setSignOutDialogOpen(true)}>
                        <ListItemIcon>
                            <LogoutOutlinedIcon sx={{ color: "primary.main" }} />
                        </ListItemIcon>
                        <ListItemText primary="Sign Out" primaryTypographyProps={{ variant: "body2", fontWeight: "medium" }} />
                    </ListItemButton>
                </ListItem>
            </List>

            <Dialog
                open={signOutDialogOpen}
                onClose={() => setSignOutDialogOpen(false)}
                aria-labelledby="sign-out"
                aria-describedby="confirm-to-sign-out"
            >
                <DialogTitle id="sign-out">
                    Are you sure you want to sign out?
                </DialogTitle>
                <DialogActions>
                    <Button onClick={() => setSignOutDialogOpen(false)}>Cancel</Button>
                    <Button autoFocus onClick={onLogout}>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </Drawer>

    );
};

export default Sidebar;