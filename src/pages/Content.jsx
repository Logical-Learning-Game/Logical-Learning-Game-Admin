import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import Sidebar from "./global/Sidebar";

const Content = () => {
    return (
        <Box
            display="flex"
        >
            <Sidebar />
            <Box width="100%">
                <Container
                    component="main"
                    fixed
                    sx={{
                        pt: 2,
                        mb: 2
                    }}
                >
                    <Outlet />
                </Container>
            </Box>
        </Box>
    );
};

export default Content;