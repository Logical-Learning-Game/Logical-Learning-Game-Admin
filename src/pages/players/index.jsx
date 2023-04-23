import { Button, Card, CardContent, CardHeader, Stack } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import Header from "../../components/Header";
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import { usePlayerListQuery, playerListQueryOption } from "../../hooks/usePlayerListQuery";



export const loader = (queryClient) => {
    return async ({ params }) => {
        const query = playerListQueryOption();
        const data = await queryClient.ensureQueryData(query);
        return data;
    }
};

const PlayerList = () => {
    const { data: players, isLoading } = usePlayerListQuery();

    const columns = [
        {
            field: "player_id",
            headerName: "ID",
            flex: 3
        },
        {
            field: "email",
            headerName: "Email",
            flex: 2
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
                    </Stack>
                );
            }
        }
    ];

    return (
        <>
            <Header title="PLAYERS" subtitle="Managing the players" />

            <Card>
                <CardHeader
                    title="Player List"
                    sx={{ backgroundColor: "primary.dark" }}
                />
                <CardContent>
                    <DataGrid
                        loading={isLoading}
                        rows={!isLoading ? players : []}
                        columns={columns}
                        getRowId={(row) => row.player_id}
                        components={{ Toolbar: GridToolbar }}
                        sx={{ height: "70vh", border: "none" }}
                    />
                </CardContent>
            </Card>
        </>
    );
};

export default PlayerList;