import { Button, Stack } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import VideogameAssetOutlinedIcon from '@mui/icons-material/VideogameAssetOutlined';
import { useQuery } from "@tanstack/react-query";
import { fetchPlayerData } from "../../api/fetchData";
import DataBox from "../../components/DataBox";

const playerListQuery = () => ({
    queryKey: ["playerList"],
    queryFn: fetchPlayerData()
});

export const loader = (queryClient) => {
    return async ({ params }) => {
        const query = playerListQuery();
        const data = await queryClient.ensureQueryData(query);
        return data;
    }
};

const PlayerList = () => {
    const { data: players, isLoading } = useQuery(playerListQuery());

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
                            to={`${data.id}`}
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
                            to={`${data.id}/maps`}
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

            <DataBox
                title="Player List"
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
            />
        </>
    );
};

export default PlayerList;