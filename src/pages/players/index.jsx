import { Box, Button, Stack } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import Header from "../../components/Header";
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import VideogameAssetOutlinedIcon from '@mui/icons-material/VideogameAssetOutlined';

const mockPlayers = [
    {
        player_id: "testfdskjflkds",
        email: "test@email.com",
        name: "Patpum Hakaew"
    },
];

for (let i = 0; i < 25; i++) {
    mockPlayers.push({
        player_id: "testfdskjflkds",
        email: "test@email.com",
        name: "Patpum Hakaew"
    });
}

const Players = () => {
    const columns = [
        {
            field: "player_id",
            headerName: "ID"
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
            renderCell: (row) => {
                return (
                    <Stack direction="row" spacing={2}>
                        <Button variant="contained" color="primary" startIcon={<BarChartOutlinedIcon/>} onClick={() => console.log("info click")}>Info</Button>
                        <Button variant="contained" color="primary" startIcon={<VideogameAssetOutlinedIcon/>} onClick={() => console.log("maps click")}>Maps</Button>
                    </Stack>
                );
            }
        }
    ];

    return (
        <Box m="20px">
            <Header title="PLAYERS" subtitle="Managing the players" />
            <Box
                m="40px 0 0 0"
                height="70vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none"
                    },
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
                <DataGrid
                    rows={mockPlayers}
                    columns={columns}
                    getRowId={(row) => row.player_id}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
        </Box>
    );
}

export default Players;