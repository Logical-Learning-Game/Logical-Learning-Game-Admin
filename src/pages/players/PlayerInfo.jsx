import { List, ListItem, ListItemText, ListItemIcon, Button, Grid } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link, useLocation, useParams } from "react-router-dom";
import Header from "../../components/Header";
import { useQuery } from "@tanstack/react-query";
import { playerSessionQueryOption, playerMapInfoQueryOption } from "../../api/fetchData";
import DataBox from "../../components/DataBox";
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import AbcOutlinedIcon from '@mui/icons-material/AbcOutlined';
import PageviewOutlinedIcon from '@mui/icons-material/PageviewOutlined';


export const loader = (queryClient) => {
    return async ({ params }) => {
        const playerSessionQuery = playerSessionQueryOption(params.playerId);
        const playerSessionData = await queryClient.ensureQueryData(playerSessionQuery);

        const playerMapInfoQuery = playerMapInfoQueryOption(params.playerId);
        const playerMapInfoData = await queryClient.ensureQueryData(playerMapInfoQuery);

        return {
            sessions: playerSessionData,
            mapInfos: playerMapInfoData
        };
    };
};

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
        field: "submits",
        headerName: "Submits",
        flex: 1,
        valueGetter: (params) => params.row.submit_histories.length
    },
    {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        flex: 1,
        renderCell: (data) => {
            return (
                <Button
                    component={Link}
                    to={`sessions/${data.id}`}
                    state={data.row}
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

const mapInfoColumns = [
    {
        field: "world_name",
        headerName: "World",
        flex: 2
    },
    {
        field: "map_name",
        headerName: "Map",
        flex: 2
    },
    {
        field: "is_pass",
        headerName: "Pass",
        type: "boolean",
        flex: 1
    },
    {
        field: "actions",
        headerName: "Actions",
        sortable: false,
        flex: 1,
        renderCell: (data) => {
            console.log(data.row);
            return ( 
                <>
                <Button
                    disabled={!data.row.top_submit_history}
                    component={Link}
                    to={`map/${data.id}/top_submit`}
                    state={data.row}
                    variant="contained"
                    size="small"
                    startIcon={<PageviewOutlinedIcon />}
                >
                    View
                </Button>
                </>
            );
        }
    }
];

const PlayerInfo = () => {
    const { playerId } = useParams();
    const { state } = useLocation();

    const { data: sessions, isLoading: isSessionLoading } = useQuery(playerSessionQueryOption(playerId));
    const { data: mapInfos, isLoading: isMapInfoLoading } = useQuery(playerMapInfoQueryOption(playerId));

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
            id: 5,
            sign_in_datetime: new Date()
        },
        {
            id: 6,
            sign_in_datetime: new Date()
        },
        {
            id: 7,
            sign_in_datetime: new Date()
        },
    ];

    return (
        <>
            <Header title="PLAYER INFO" subtitle="Player information" />

            <Grid container spacing={2}>
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
                                getRowId={(row) => row.id}
                                autoPageSize
                                disableRowSelectionOnClick
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
                            }
                        }}
                        contentComponent={
                            <DataGrid
                                loading={isSessionLoading}
                                rows={!isSessionLoading ? sessions : []}
                                columns={sessionHistoryColumns}
                                getRowId={(row) => row.session_id}
                                components={{ Toolbar: GridToolbar }}
                                autoPageSize
                                disableRowSelectionOnClick
                                sx={{ height: "70vh", border: "none" }}
                            />
                        }
                    />
                </Grid>
                <Grid item md={12}>
                    <DataBox
                        title="Map List"
                        sx={{
                            "& .MuiDataGrid-columnHeaders": {
                                backgroundColor: "background.paper",
                            },
                            "& .MuiDataGrid-footerContainer": {
                                backgroundColor: "background.paper"
                            },
                            "& .MuiDataGrid-virtualScroller": {
                                backgroundColor: "background.paper"
                            }
                        }}
                        contentComponent={
                            <DataGrid
                                loading={isMapInfoLoading}
                                rows={!isMapInfoLoading ? mapInfos : []}
                                columns={mapInfoColumns}
                                autoPageSize
                                getRowId={(row) => row.map_for_player_id}
                                components={{ Toolbar: GridToolbar }}
                                sx={{ height: "70vh", border: "none" }}
                            />
                        }
                    />
                </Grid>
            </Grid>
        </>
    )
}

export default PlayerInfo;