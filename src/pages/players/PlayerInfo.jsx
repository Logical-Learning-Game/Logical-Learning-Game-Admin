import { List, ListItem, ListItemText, ListItemIcon, Button, Grid } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link, useLocation, useParams } from "react-router-dom";
import Header from "../../components/Header";
import { useQuery } from "@tanstack/react-query";
import { fetchPlayerSessionData } from "../../api/fetchData";
import DataBox from "../../components/DataBox";
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import AbcOutlinedIcon from '@mui/icons-material/AbcOutlined';
import PageviewOutlinedIcon from '@mui/icons-material/PageviewOutlined';

const playerSessionQuery = (playerId) => ({
    queryKey: ["playerSessions", playerId],
    queryFn: fetchPlayerSessionData(playerId)
});

export const loader = (queryClient) => {
    return async ({ params }) => {
        const query = playerSessionQuery(params.playerId);
        const data = await queryClient.ensureQueryData(query);
        return data;
    };
};

const PlayerInfo = () => {
    const { playerId } = useParams();
    const { state } = useLocation();

    const { data: sessions, isLoading } = useQuery(playerSessionQuery(playerId));

    const sessionHistoryColumns = [
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
            headerName: "Start Date/Time",
            type: "date",
            valueGetter: (params) => new Date(params.value),
            valueFormatter: (params) => params.value.toLocaleString("en-GB"),
            flex: 1
        },
        {
            field: "end_datetime",
            headerName: "End Date/Time",
            type: "date",
            valueGetter: (params) => new Date(params.value),
            valueFormatter: (params) => params.value.toLocaleString("en-GB"),
            flex: 1
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            renderCell: (data) => {
                return (
                    <Button
                        component={Link}
                        to={`sessions/${data.id}`}
                        variant="contained"
                        size="small"
                        startIcon={<PageviewOutlinedIcon />}
                    >
                        View
                    </Button>
                );
            }
        }
    ];

    const signInHistoryColumns = [
        {
            field: "sign_in_datetime",
            headerName: "Date/Time",
            type: "date",
            valueGetter: (params) => new Date(params.value),
            valueFormatter: (params) => params.value.toLocaleString("en-GB"),
            flex: 6,
            headerAlign: "center",
            align: "center"
        }
    ];

    const mockSignInHistoryData = [
        {
            id: 1,
            sign_in_datetime: new Date()
        },
        {
            id: 2,
            sign_in_datetime: new Date()
        },
        {
            id: 3,
            sign_in_datetime: new Date()
        },
        {
            id: 4,
            sign_in_datetime: new Date()
        },
        {
            id: 4,
            sign_in_datetime: new Date()
        },
        {
            id: 4,
            sign_in_datetime: new Date()
        },
        {
            id: 4,
            sign_in_datetime: new Date()
        },
    ];

    return (
        <>
            <Header title="PLAYER INFO" subtitle="Player information" />

            <Grid container spacing={2} mb={2}>
                <Grid item md={6}>
                    {/* DETAIL */}
                    <DataBox
                        disableContentPadding
                        title="Detail"
                        sx={{
                            height: "400px"
                        }}
                        contentComponent={
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
                        }
                    />
                </Grid>
                <Grid item md={6}>
                    {/* SIGNIN HISTORIES */}

                    <DataBox
                        title="Sign In Histories"
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
                            height: "400px"
                        }}
                        contentComponent={
                            <DataGrid
                                rows={mockSignInHistoryData}
                                columns={signInHistoryColumns}
                                getRowId={(idx, row) => idx}
                                autoPageSize
                                sx={{ height: "300px", border: "none" }}
                            />
                        }
                    />
                </Grid>
                <Grid item md={12}>
                    {/* SESSION HISTORIES */}
                    <DataBox
                        title="Session Histories"
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
                        contentComponent={
                            !isLoading ? (
                                <DataGrid
                                    rows={sessions}
                                    columns={sessionHistoryColumns}
                                    getRowId={(row) => row.session_id}
                                    components={{ Toolbar: GridToolbar }}
                                    autoPageSize
                                    sx={{ height: "70vh", border: "none" }}
                                />) : (
                                <DataGrid
                                    loading
                                    rows={[]}
                                    columns={sessionHistoryColumns}
                                    getRowId={(row) => row.session_id}
                                    components={{ Toolbar: GridToolbar }}
                                    sx={{ height: "70vh", border: "none" }}
                                />
                            )
                        }
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default PlayerInfo;