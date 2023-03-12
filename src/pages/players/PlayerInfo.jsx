import { Box, Typography, Divider, List } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";
import Header from "../../components/Header";

const PlayerInfo = () => {
    const { id } = useParams();

    const columns = [

    ];

    return (
        <>
            <Header title="PLAYERS INFO" subtitle="Player information" />

            {/* DETAIL */}
            <Box
                my={2}
                height="auto"
                boxShadow="0px 2px 4px 0 rgba(0, 0, 0, 0.2)"
                backgroundColor="background.paper"
            >
                <Box
                    px={3}
                    py={2}
                    backgroundColor="primary.dark"
                >
                    <Typography variant="h3" fontWeight="bold">
                        Detail
                    </Typography>
                </Box>

                <Box
                   p={3}
                >
                    <Box>
                        <Typography variant="h5">
                            Player ID
                        </Typography>
                        <Typography variant="h5">
                            fdsfsdfsdsefsdf
                        </Typography>
                    </Box>
                    
                    <Box>
                        <Typography variant="h5">
                            Email
                        </Typography>
                        <Typography variant="h5">
                            Email
                        </Typography>
                    </Box>
                    
                    <Box>
                        <Typography variant="h5">
                            Name
                        </Typography>
                        <Typography variant="h5">
                            Name
                        </Typography>
                    </Box>
                    
                </Box>
            </Box>

            <Divider variant="middle" />

            {/* SESSION HISTORIES */}
            <Box
                my={2}
                height="auto"
                boxShadow="0px 2px 4px 0 rgba(0, 0, 0, 0.2)"
                backgroundColor="background.paper"
                sx={{
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: "primary.dark",
                    },
                    "& .MuiDataGrid-footerContainer": {
                        backgroundColor: "primary.dark"
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: "background.paper"
                    },
                }}
            >
                <Box
                    px={3}
                    py={2}
                    backgroundColor="primary.dark"
                >
                    <Typography variant="h3" fontWeight="bold">
                        Session Histories
                    </Typography>
                </Box>

                <Box
                    p={3}
                >
                    <DataGrid
                        rows={[]}
                        columns={columns}
                        components={{ Toolbar: GridToolbar }}
                        sx={{ height: "70vh", border: "none" }}
                    />
                </Box>
            </Box>

            <Divider variant="middle" />

            {/* SIGNIN HISTORIES */}
            <Box
                my={2}
                height="auto"
                boxShadow="0px 2px 4px 0 rgba(0, 0, 0, 0.2)"
                backgroundColor="background.paper"
                sx={{
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: "primary.dark",
                    },
                    "& .MuiDataGrid-footerContainer": {
                        backgroundColor: "primary.dark"
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: "background.paper"
                    },
                }}
            >
                <Box
                    px={3}
                    py={2}
                    backgroundColor="primary.dark"
                >
                    <Typography variant="h3" fontWeight="bold">
                        Sign In Histories
                    </Typography>
                </Box>

                <Box
                    p={3}
                >
                    <DataGrid
                        rows={[]}
                        columns={columns}
                        components={{ Toolbar: GridToolbar }}
                        sx={{ height: "70vh", border: "none" }}
                    />
                </Box>
            </Box>

        </>
    )
}

export default PlayerInfo;