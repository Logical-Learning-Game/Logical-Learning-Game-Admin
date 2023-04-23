import { List, ListItem, ListItemText, ListItemIcon, Button, Grid, Stack, Card, CardHeader, CardContent } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link, useLocation, useParams } from "react-router-dom";
import Header from "../../components/Header";
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PageviewOutlinedIcon from '@mui/icons-material/PageviewOutlined';
import VideogameAssetOutlinedIcon from '@mui/icons-material/VideogameAssetOutlined';
import VideogameAssetOffOutlinedIcon from '@mui/icons-material/VideogameAssetOffOutlined';
import { usePlayerSessionQuery, playerSessionQueryOption } from "../../hooks/usePlayerSessionQuery";
import { usePlayerMapInfoQuery, playerMapInfoQueryOption } from "../../hooks/usePlayerMapInfoQuery";
import { useWorldWithMapQuery, worldWithMapQueryOption } from "../../hooks/useWorldWithMapQuery";
import { useSetMapOfPlayerActive } from "../../hooks/useSetMapOfPlayerActive";
import { useMemo } from "react";
import config from "../../config/mapConfig";
import { useSignInHistoriesQuery } from "../../hooks/useSignInHistoriesQuery";


export const loader = (queryClient) => {
    return async ({ params }) => {
        const playerSessionQuery = playerSessionQueryOption(params.playerId);
        const playerSessionData = await queryClient.ensureQueryData(playerSessionQuery);

        const playerMapInfoQuery = playerMapInfoQueryOption(params.playerId);
        const playerMapInfoData = await queryClient.ensureQueryData(playerMapInfoQuery);

        const worldWithMapQuery = worldWithMapQueryOption();
        const worldWithMapData = await queryClient.ensureQueryData(worldWithMapQuery);

        return {
            sessions: playerSessionData,
            mapInfos: playerMapInfoData,
            worldWithmaps: worldWithMapData
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
        field: "signInDatetime",
        headerName: "Date/Time",
        type: "date",
        valueGetter: (params) => new Date(params.value),
        valueFormatter: (params) => params.value.toLocaleString("en-GB"),
        flex: 6,
        headerAlign: "center",
        align: "center"
    }
];


const PlayerInfo = () => {
    const { playerId } = useParams();
    const { state } = useLocation();

    const { data: sessions, isLoading: isSessionLoading } = usePlayerSessionQuery(playerId);
    const { data: playerMapInfos, isLoading: isPlayerMapInfoLoading } = usePlayerMapInfoQuery(playerId);
    const { data: allMapInfos, isLoading: isAllMapInfoLoading } = useWorldWithMapQuery();
    const { data: signInHistories, isLoading: isSignInHistoriesLoading } = useSignInHistoriesQuery(playerId);
    const setMapOfPlayerActiveMutation = useSetMapOfPlayerActive();

    const handleSetMapOfPlayerActive = (mapId, active) => {
        setMapOfPlayerActiveMutation.mutate({
            playerId: playerId,
            mapId: mapId,
            data: {
                active: active
            }
        });
    };

    const playerMapInfoColumns = [
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
            field: "is_pass",
            headerName: "Pass",
            type: "boolean",
            valueGetter: (params) => params.row.map_for_player ? params.row.map_for_player.is_pass : false,
            flex: 1
        },
        {
            field: "active",
            headerName: "Global Active",
            type: "boolean",
            flex: 1
        },
        {
            field: "actions",
            headerName: "Actions",
            sortable: false,
            flex: 1,
            renderCell: (params) => {
                return (
                    <Stack direction="row" spacing={1}>
                        <Button
                            disabled={!params.row.map_for_player?.top_submit_history}
                            component={Link}
                            to={`map/${params.id}/top_submit`}
                            state={params.row.map_for_player}
                            variant="contained"
                            size="small"
                            startIcon={<PageviewOutlinedIcon />}
                        >
                            View
                        </Button>
                        {
                            params.row.map_for_player?.active ? (
                                <Button
                                    disabled={!params.row.active || config.defaultMap.includes(params.id)}
                                    variant="contained"
                                    size="small"
                                    color="warning"
                                    startIcon={<VideogameAssetOffOutlinedIcon />}
                                    onClick={() => handleSetMapOfPlayerActive(params.id, false)}
                                >
                                    Disable
                                </Button>
                            ) : (
                                <Button
                                    disabled={!params.row.active || config.defaultMap.includes(params.id)}
                                    variant="contained"
                                    size="small"
                                    color="success"
                                    startIcon={<VideogameAssetOutlinedIcon />}
                                    onClick={() => handleSetMapOfPlayerActive(params.id, true)}
                                >
                                    Enable
                                </Button>
                            )
                        }
                    </Stack>
                );
            }
        }
    ];

    const transformedAllmapInfos = useMemo(() => {
        if (!isAllMapInfoLoading && !isPlayerMapInfoLoading) {
            const data = [];

            const playerMapInfoLookup = {};
            for (const pm of playerMapInfos) {
                playerMapInfoLookup[pm.map_id] = pm;
            }

            for (const w of allMapInfos) {
                for (const m of w.maps) {
                    let transformedData = {
                        world_id: w.world_id,
                        world_name: w.world_name,
                        ...m,
                    };

                    const playerMapInfo = playerMapInfoLookup[m.map_id];
                    if (playerMapInfo) {
                        transformedData = {
                            ...transformedData,
                            map_for_player: {
                                map_for_player_id: playerMapInfo.map_for_player_id,
                                active: playerMapInfo.active,
                                is_pass: playerMapInfo.is_pass,
                                top_submit_history: playerMapInfo.top_submit_history
                            }
                        }
                    } else {
                        transformedData = {
                            ...transformedData,
                            map_for_player: null
                        }
                    }

                    data.push(transformedData);
                }
            }
            return data;
        }
    }, [allMapInfos, isAllMapInfoLoading, playerMapInfos, isPlayerMapInfoLoading]);

    return (
        <>
            <Header title="PLAYER INFO" subtitle="Player information" />

            <Grid container spacing={2}>
                <Grid item md={6}>
                    {/* DETAIL */}
                    <Card
                        sx={{ height: "400px" }}
                    >
                        <CardHeader
                            title="Detail"
                            sx={{ backgroundColor: "primary.dark" }}
                        />
                        <CardContent>
                            <List>
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
                            </List>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item md={6}>
                    {/* SIGNIN HISTORIES */}
                    <Card
                        sx={{ height: "400px" }}
                    >
                        <CardHeader
                            title="Sign In Histories"
                            sx={{ backgroundColor: "primary.dark" }}
                        />
                        <CardContent
                        >
                            <DataGrid
                                loading={isSignInHistoriesLoading}
                                rows={!isSignInHistoriesLoading ? signInHistories : []}
                                columns={signInHistoryColumns}
                                getRowId={(row) => row.id}
                                autoPageSize
                                disableRowSelectionOnClick
                                sx={{ height: "300px", border: "none" }}
                            />
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item md={12}>
                    {/* SESSION HISTORIES */}
                    <Card>
                        <CardHeader
                            title="Session Histories"
                            sx={{ backgroundColor: "primary.dark" }}
                        />
                        <CardContent>
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
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item md={12}>
                    <Card>
                        <CardHeader
                            title="Map List"
                            sx={{ backgroundColor: "primary.dark" }}
                        />
                        <CardContent>
                            <DataGrid
                                loading={isPlayerMapInfoLoading || isAllMapInfoLoading}
                                rows={!isPlayerMapInfoLoading && !isAllMapInfoLoading ? transformedAllmapInfos : []}
                                columns={playerMapInfoColumns}
                                autoPageSize
                                getRowId={(row) => row.map_id}
                                components={{ Toolbar: GridToolbar }}
                                sx={{ height: "70vh", border: "none" }}
                            />
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>
        </>
    )
}

export default PlayerInfo;