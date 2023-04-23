import { Card, CardHeader, CardContent, Stack, Box, Typography, Chip, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import * as mapUtil from "../utils/map";
import { playerDirectionType } from "../enums/player";

const MapObjectsCard = ({
    handlePlayerClick, 
    selectedElement, 
    havePlayer, 
    haveGoal, 
    mapElements, 
    handleGoalClick, 
    selectedPlayerDirection, 
    handlePlayerDirectionChange,
    handleConditionClick,
    handleRemoveCondition,
    handleClickItem,
    handleRemoveItem,
    handleObstacleClick,
    handleDoorNorthChange,
    handleDoorEastChange,
    handleDoorSouthChange,
    handleDoorWestChange,
    selectedElementDoor,
    mapHeight,
    mapWidth
}) => {
    return (
        <Card
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "800px"
            }}
        >
            <CardHeader title="Objects" sx={{ backgroundColor: "primary.dark" }} />
            <CardContent sx={{ overflowY: "auto" }}>
                <Stack direction="column" spacing={2}>
                    <Box>
                        <Typography variant="h6">
                            Basic
                        </Typography>
                        <Stack direction="row" mt={1} spacing={1}>
                            <Chip
                                label="Player"
                                onClick={handlePlayerClick}
                                disabled={!selectedElement ||
                                    (havePlayer && !mapUtil.containPlayer(mapElements, selectedElement)) ||
                                    mapUtil.containObstacle(mapElements, selectedElement) ||
                                    mapUtil.containAnyItem(mapElements, selectedElement)
                                }
                            />
                            <Chip
                                label="Goal"
                                onClick={handleGoalClick}
                                disabled={
                                    !selectedElement ||
                                    (haveGoal && !mapUtil.containGoal(mapElements, selectedElement)) ||
                                    mapUtil.containPlayer(mapElements, selectedElement) ||
                                    mapUtil.containObstacle(mapElements, selectedElement) ||
                                    mapUtil.containAnyCondition(mapElements, selectedElement) ||
                                    mapUtil.containAnyItem(mapElements, selectedElement)
                                }
                            />
                            <Chip
                                label="Obstacle"
                                onClick={handleObstacleClick}
                                disabled={
                                    !selectedElement ||
                                    mapUtil.containGoal(mapElements, selectedElement) ||
                                    mapUtil.containPlayer(mapElements, selectedElement) ||
                                    mapUtil.containAnyCondition(mapElements, selectedElement) ||
                                    mapUtil.containAnyItem(mapElements, selectedElement)
                                }
                            />

                        </Stack>
                        <Box mt={2}>
                            {
                                havePlayer &&
                                (
                                    <FormControl fullWidth disabled={!selectedElement || !mapUtil.containPlayer(mapElements, selectedElement)}>
                                        <InputLabel>Player Direction</InputLabel>
                                        <Select variant="outlined" value={selectedPlayerDirection} onChange={handlePlayerDirectionChange}>
                                            <MenuItem value={playerDirectionType.NORTH}>North</MenuItem>
                                            <MenuItem value={playerDirectionType.EAST}>East</MenuItem>
                                            <MenuItem value={playerDirectionType.SOUTH}>South</MenuItem>
                                            <MenuItem value={playerDirectionType.WEST}>West</MenuItem>
                                        </Select>
                                    </FormControl>
                                )
                            }
                        </Box>
                    </Box>
                    <Box>
                        <Typography variant="h6">
                            Conditions
                        </Typography>
                        <Stack direction="row" flexWrap="wrap" gap={1} mt={1}>
                            <Chip
                                label="Condition A"
                                onClick={() => handleConditionClick(0b0011)}
                                disabled={
                                    !selectedElement ||
                                    mapUtil.containObstacle(mapElements, selectedElement) ||
                                    mapUtil.containGoal(mapElements, selectedElement)
                                }
                            />
                            <Chip
                                label="Condition B"
                                onClick={() => handleConditionClick(0b0100)}
                                disabled={
                                    !selectedElement ||
                                    mapUtil.containObstacle(mapElements, selectedElement) ||
                                    mapUtil.containGoal(mapElements, selectedElement)
                                }
                            />
                            <Chip
                                label="Condition C"
                                onClick={() => handleConditionClick(0b0101)}
                                disabled={
                                    !selectedElement ||
                                    mapUtil.containObstacle(mapElements, selectedElement) ||
                                    mapUtil.containGoal(mapElements, selectedElement)
                                }
                            />
                            <Chip
                                label="Condition D"
                                onClick={() => handleConditionClick(0b0110)}
                                disabled={
                                    !selectedElement ||
                                    mapUtil.containObstacle(mapElements, selectedElement) ||
                                    mapUtil.containGoal(mapElements, selectedElement)
                                }
                            />
                            <Chip
                                label="Condition E"
                                onClick={() => handleConditionClick(0b0111)}
                                disabled={
                                    !selectedElement ||
                                    mapUtil.containObstacle(mapElements, selectedElement) ||
                                    mapUtil.containGoal(mapElements, selectedElement)
                                }
                            />
                            <Chip
                                label="No Condition"
                                onClick={handleRemoveCondition}
                                disabled={
                                    !selectedElement ||
                                    !mapUtil.containAnyCondition(mapElements, selectedElement)
                                }
                            />
                        </Stack>
                    </Box>
                    <Box>
                        <Typography variant="h6">
                            Items
                        </Typography>
                        <Stack direction="row" mt={1} sx={{ flexWrap: "wrap", gap: 1 }}>
                            <Chip
                                label="Key A"
                                onClick={() => handleClickItem(0b0001)}
                                disabled={
                                    !selectedElement ||
                                    mapUtil.containObstacle(mapElements, selectedElement) ||
                                    mapUtil.containGoal(mapElements, selectedElement) ||
                                    mapUtil.containPlayer(mapElements, selectedElement)
                                }
                            />
                            <Chip
                                label="Key B"
                                onClick={() => handleClickItem(0b0010)}
                                disabled={
                                    !selectedElement ||
                                    mapUtil.containObstacle(mapElements, selectedElement) ||
                                    mapUtil.containGoal(mapElements, selectedElement) ||
                                    mapUtil.containPlayer(mapElements, selectedElement)
                                }
                            />
                            <Chip
                                label="Key C"
                                onClick={() => handleClickItem(0b0011)}
                                disabled={
                                    !selectedElement ||
                                    mapUtil.containObstacle(mapElements, selectedElement) ||
                                    mapUtil.containGoal(mapElements, selectedElement) ||
                                    mapUtil.containPlayer(mapElements, selectedElement)
                                }
                            />
                            <Chip
                                label="Remove Item"
                                onClick={handleRemoveItem}
                                disabled={
                                    !selectedElement ||
                                    !mapUtil.containAnyItem(mapElements, selectedElement)
                                }
                            />
                        </Stack>
                    </Box>
                    <Box>
                        <Typography variant="h6">
                            Doors
                        </Typography>
                        <Box mt={2}>
                            <FormControl fullWidth disabled={!selectedElement || mapUtil.outOfBoundCheck(mapHeight, mapWidth, { i: selectedElement.i - 1, j: selectedElement.j })}>
                                <InputLabel>North</InputLabel>
                                <Select variant="filled" value={selectedElementDoor[1]} onChange={handleDoorNorthChange}>
                                    <MenuItem value="none">None</MenuItem>
                                    <MenuItem value="door_no_key">Door No Key</MenuItem>
                                    <MenuItem value="door_a">Door A</MenuItem>
                                    <MenuItem value="door_b">Door B</MenuItem>
                                    <MenuItem value="door_c">Door C</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box mt={2}>
                            <FormControl fullWidth disabled={!selectedElement || mapUtil.outOfBoundCheck(mapHeight, mapWidth, { i: selectedElement.i, j: selectedElement.j + 1 })}>
                                <InputLabel>East</InputLabel>
                                <Select variant="filled" value={selectedElementDoor[2]} onChange={handleDoorEastChange}>
                                    <MenuItem value="none">None</MenuItem>
                                    <MenuItem value="door_no_key">Door No Key</MenuItem>
                                    <MenuItem value="door_a">Door A</MenuItem>
                                    <MenuItem value="door_b">Door B</MenuItem>
                                    <MenuItem value="door_c">Door C</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box mt={2}>
                            <FormControl fullWidth disabled={!selectedElement || mapUtil.outOfBoundCheck(mapHeight, mapWidth, { i: selectedElement.i + 1, j: selectedElement.j })}>
                                <InputLabel>South</InputLabel>
                                <Select variant="filled" value={selectedElementDoor[3]} onChange={handleDoorSouthChange}>
                                    <MenuItem value="none">None</MenuItem>
                                    <MenuItem value="door_no_key">Door No Key</MenuItem>
                                    <MenuItem value="door_a">Door A</MenuItem>
                                    <MenuItem value="door_b">Door B</MenuItem>
                                    <MenuItem value="door_c">Door C</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box mt={2}>
                            <FormControl fullWidth disabled={!selectedElement || mapUtil.outOfBoundCheck(mapHeight, mapWidth, { i: selectedElement.i, j: selectedElement.j - 1 })}>
                                <InputLabel>West</InputLabel>
                                <Select variant="filled" value={selectedElementDoor[0]} onChange={handleDoorWestChange}>
                                    <MenuItem value="none">None</MenuItem>
                                    <MenuItem value="door_no_key">Door No Key</MenuItem>
                                    <MenuItem value="door_a">Door A</MenuItem>
                                    <MenuItem value="door_b">Door B</MenuItem>
                                    <MenuItem value="door_c">Door C</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                    </Box>
                </Stack>
            </CardContent>
        </Card>
    );
};

export default MapObjectsCard;