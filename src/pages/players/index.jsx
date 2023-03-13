import { Box, Button, Stack, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import VideogameAssetOutlinedIcon from '@mui/icons-material/VideogameAssetOutlined';
import { useQuery } from "react-query";
import { fetchPlayerData } from "../../api/fetchData";


const PlayerList = () => {
    const { data: players, isLoading } = useQuery("playerData", fetchPlayerData());

    const columns = [
        {
            field: "player_id",
            headerName: "ID",
            flex: 1
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1
        },
        {
            field: "name",
            headerName: "Name",
            flex: 1
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            renderCell: (data) => {
                return (
                    <Stack direction="row" spacing={2}>
                        <Button
                            component={Link}
                            to={`/players/${data.id}`}
                            state={data.row}
                            variant="contained" color="primary"
                            startIcon={<BarChartOutlinedIcon />}
                            onClick={() => console.log("info click")}
                            size="small"
                        >
                            Info
                        </Button>
                        <Button
                            component={Link}
                            to={`/players/${data.id}/maps`}
                            variant="contained" color="primary"
                            startIcon={<VideogameAssetOutlinedIcon />}
                            onClick={() => console.log("maps click")}
                            size="small"
                        >
                            Maps
                        </Button>
                    </Stack>
                );
            }
        }
    ];

    return (
        <>
            <Header title="PLAYERS" subtitle="Managing the players" />
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
                        Player List
                    </Typography>
                </Box>

                <Box
                    p={3}
                >
                    {
                        !isLoading ?
                            (
                                <DataGrid
                                    rows={players}
                                    columns={columns}
                                    getRowId={(row) => row.player_id}
                                    components={{ Toolbar: GridToolbar }}
                                    sx={{ height: "70vh", border: "none" }}
                                />) : (
                                <DataGrid
                                    loading
                                    rows={[]}
                                    columns={columns}
                                    components={{ Toolbar: GridToolbar }}
                                    sx={{ height: "70vh", border: "none" }}
                                />
                            )
                    }
                </Box>

            </Box>
        </>
    );
}

export default PlayerList;