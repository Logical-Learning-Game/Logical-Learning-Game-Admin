import { Card, CardHeader, Stack, CardActions, Box, Typography, IconButton, CardContent } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import Map from "./Map";

const MapEditorCard = ({
    mapHeight, 
    mapWidth, 
    mapElements, 
    selectedElement, 
    setSelectedElement, 
    handleIncreaseHeight, 
    handleIncreaseWidth,
    handleDecreaseHeight,
    handleDecreaseWidth
}) => {
    return (
        <Card
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "800px"
            }}
        >
            <CardHeader title="Map" sx={{ backgroundColor: "primary.dark" }} />

            <Stack direction="column" justifyContent="space-between" flex={1}>
                <CardContent sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "500px"
                }}
                >
                    <Map
                        height={mapHeight}
                        width={mapWidth}
                        mapElements={mapElements}
                        selectedElement={selectedElement}
                        setSelectedElement={setSelectedElement}
                    />
                </CardContent>

                <CardActions sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <Box>
                        <Box>
                            <Typography>
                                Height
                            </Typography>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <IconButton onClick={handleDecreaseHeight}><RemoveIcon /></IconButton>
                                <Typography>{mapHeight}</Typography>
                                <IconButton onClick={handleIncreaseHeight}><AddIcon /></IconButton>
                            </Stack>
                        </Box>
                        <Box>
                            <Typography>
                                Width
                            </Typography>
                            <Stack direction="row" spacing={2} alignItems="center">
                                <IconButton onClick={handleDecreaseWidth}><RemoveIcon /></IconButton>
                                <Typography>{mapWidth}</Typography>
                                <IconButton onClick={handleIncreaseWidth}><AddIcon /></IconButton>
                            </Stack>
                        </Box>
                    </Box>
                </CardActions>
            </Stack>
        </Card>
    );
};

export default MapEditorCard;