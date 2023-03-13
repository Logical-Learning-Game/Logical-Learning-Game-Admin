import { Box, Typography, Divider, List, ListItem, ListItemText, ListItemIcon, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useLocation, useParams } from "react-router-dom";
import Header from "../../components/Header";
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import AbcOutlinedIcon from '@mui/icons-material/AbcOutlined';
import { useQuery } from "react-query";
import { fetchPlayerSessionData } from "../../api/fetchData";

const PlayerInfo = () => {
    const { id } = useParams();
    const { state } = useLocation();

    const { data: sessions, isLoading } = useQuery("playerSessionData", fetchPlayerSessionData(id), {
        select: (sessions) => {
            return sessions.map(({start_datetime, end_datetime, ...other}) => ({
                start_datetime: new Date(start_datetime),
                end_datetime: new Date(end_datetime),
                ...other
            }));
        }
    });

    const columns = [
        {
            field: "world_name",
            headerName: "World",
            flex: 1
        },
        {
            field: "map_name",
            headerName: "Map",
            flex: 1
        },
        {
            field: "start_datetime",
            headerName: "Start Datetime",
            type: "date",
            valueFormatter: (params) => new Date(params.value).toLocaleString("en-GB"),
            flex: 1
        },
        {
            field: "end_datetime",
            headerName: "End Datetime",
            type: "date",
            valueFormatter: (params) => new Date(params.value).toLocaleString("en-GB"),
            flex: 1
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            renderCell: (data) => {
                return (
                    <Button variant="contained" size="small">
                        View
                    </Button>
                );
            }
        }
    ];

    return (
        <>
            <Header title="PLAYER INFO" subtitle="Player information" />

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
                    <Typography variant="h5" fontWeight="bold">
                        Detail
                    </Typography>
                </Box>

                <Box
                >
                    <List
                        sx={{ p: 3 }}
                    >
                        <ListItem disableGutters>
                            <ListItemIcon>
                                <PersonOutlinedIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                                primary="Player ID"
                                secondary={state.player_id}
                            />
                        </ListItem>
                        <ListItem disableGutters>
                            <ListItemIcon>
                                <EmailOutlinedIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                                primary="Email"
                                secondary={state.email}
                            />
                        </ListItem>
                        <ListItem disableGutters>
                            <ListItemIcon>
                                <AbcOutlinedIcon color="primary" />
                            </ListItemIcon>
                            <ListItemText
                                primary="Name"
                                secondary={state.name}
                            />
                        </ListItem>
                    </List>
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
                        backgroundColor: "background.paper",
                    },
                    "& .MuiDataGrid-footerContainer": {
                        backgroundColor: "background.paper"
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
                    <Typography variant="h5" fontWeight="bold">
                        Session Histories
                    </Typography>
                </Box>

                <Box
                    p={3}
                >
                    {
                        !isLoading ? (
                            <DataGrid
                                rows={sessions}
                                columns={columns}
                                getRowId={(row) => row.session_id}
                                components={{ Toolbar: GridToolbar }}
                                sx={{ height: "70vh", border: "none" }}
                            />) : (
                            <DataGrid
                                loading
                                rows={[]}
                                columns={columns}
                                getRowId={(row) => row.session_id}
                                components={{ Toolbar: GridToolbar }}
                                sx={{ height: "70vh", border: "none" }}
                            />
                        )
                    }

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
                        backgroundColor: "background.paper",
                    },
                    "& .MuiDataGrid-footerContainer": {
                        backgroundColor: "background.paper"
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
                    <Typography variant="h5" fontWeight="bold">
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