import { Box, Card, CardHeader, CardContent, Grid, CardActions, Stack, MenuItem, Button, IconButton, Typography, List, ListItem, ListItemText, Chip, FormControl, Select, InputLabel, TextField } from "@mui/material";
import { useState } from "react";
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Formik } from "formik";
import * as yup from "yup";
import Header from "../../components/Header";
import Map from "../../components/Map";
import {useWorldQuery} from "../../hooks/useWorldQuery";


const MAX_HEIGHT = 8;
const MAX_WIDTH = 8;
const MIN_HEIGHT = 1;
const MIN_WIDTH = 1;

const makeArray = (height, width) => {
  const arr = Array.from({ length: height });
  for (let i = 0; i < height; i++) {
    arr[i] = Array.from({ length: width }, () => 0);
  }

  return arr;
};

export const containPlayer = (elements, position) => (elements[position.i][position.j] & 0b0001) === 0b0001;
export const containGoal = (elements, position) => ((elements[position.i][position.j] >> 4) & 0b1111) === 0b0010;
export const containObstacle = (elements, position) => ((elements[position.i][position.j] >> 4) & 0b1111) === 0b0001;
export const containAnyCondition = (elements, position) => {
  const tileData = (elements[position.i][position.j] >> 4) & 0b1111;
  return [0b0011, 0b00100, 0b00101, 0b00110, 0b00111].includes(tileData);
};
export const containAnyItem = (elements, position) => {
  const itemData = (elements[position.i][position.j] >> 8) & 0b1111;
  return [0b0001, 0b0010, 0b0011].includes(itemData)
};
export const containWestDoor = (elements, position) => ((elements[position.i][position.j] >> 12) & 0b0001) === 0b0001;
export const containNorthDoor = (elements, position) => ((elements[position.i][position.j] >> 16) & 0b0001) === 0b0001;
export const containEastDoor = (elements, position) => ((elements[position.i][position.j] >> 20) & 0b0001) === 0b0001;
export const containSouthDoor = (elements, position) => ((elements[position.i][position.j] >> 24) & 0b0001) === 0b0001;
export const getDoorWestSegment = (elements, position) => (elements[position.i][position.j] >> 12) & 0b1111;
export const getDoorNorthSegment = (elements, position) => (elements[position.i][position.j] >> 16) & 0b1111;
export const getDoorEastSegment = (elements, position) => (elements[position.i][position.j] >> 20) & 0b1111;
export const getDoorSouthSegment = (elements, position) => (elements[position.i][position.j] >> 24) & 0b1111;
export const containDoorNoKey = (doorSegment) => (doorSegment & 0b0110) === 0b0000;
export const containDoorA = (doorSegment) => (doorSegment & 0b0110) === 0b0010;
export const containDoorB = (doorSegment) => (doorSegment & 0b0110) === 0b0100;
export const containDoorC = (doorSegment) => (doorSegment & 0b0110) === 0b0110;
export const getDoorValueFromType = (type) => {
  switch (type) {
    case "door_no_key":
      return 0b0001;
    case "door_a":
      return 0b0011;
    case "door_b":
      return 0b0101;
    case "door_c":
      return 0b0111;
    case "none":
      return 0b0000;
    default:
      return null;
  }
};
export const outOfBoundCheck = (height, width, position) => position.i < 0 || position.i >= height || position.j < 0 || position.j >= width;

// const createMapFormInitialValues = {
//   world: "",
//   name: "",
//   difficulty: "",
//   starRequirement: 0,
//   leastSolvableCommandGold: 0,
//   leastSolvableCommandSilver: 0,
//   leastSolvableCommandBronze: 0,
//   leastSolvableActionGold: 0,
//   leastSolvableActionSilver: 0,
//   leastSolvableActionBronze: 0,
// };

// const mapSchema = yup.object().shape({
//   world: yup.string().required("required"),
//   name: yup.string().required("required"),
//   difficulty: yup.string().required("required"),
//   starRequirement: yup.number().required("required").positive().integer(),
//   leastSolvableCommandGold: yup.number().required("required").positive().integer(),
// });

const MapBuilder = () => {
  // Data
  const { data: worlds, isLoading } = useWorldQuery();

  // Map 
  const [mapElements, setMapElements] = useState(makeArray(4, 4));
  const [selectedElement, setSelectedElement] = useState(null);
  const [havePlayer, setHavePlayer] = useState(false);
  const [haveGoal, setHaveGoal] = useState(false);
  const [selectedPlayerDirection, setSelectedPlayerDirection] = useState("N");

  // Detail
  const [mapDetailFormData, setMapDetailFormData] = useState({
    world: "",
    name: "",
    difficulty: "",
    starRequirement: 0,
    leastSolvableCommandGold: 0,
    leastSolvableCommandSilver: 0,
    leastSolvableCommandBronze: 0,
    leastSolvableActionGold: 0,
    leastSolvableActionSilver: 0,
    leastSolvableActionBronze: 0,
  });

  // Rule

  const mapHeight = mapElements.length;
  const mapWidth = mapElements[0].length;

  const getDoorFromSelectedElement = () => {
    const doors = ["none", "none", "none", "none"];

    if (!selectedElement) {
      return doors;
    }

    // west door
    if (containWestDoor(mapElements, selectedElement)) {
      const doorWestSegment = getDoorWestSegment(mapElements, selectedElement);
      if (containDoorNoKey(doorWestSegment)) {
        doors[0] = "door_no_key";
      } else if (containDoorA(doorWestSegment)) {
        doors[0] = "door_a";
      } else if (containDoorB(doorWestSegment)) {
        doors[0] = "door_b";
      } else if (containDoorC(doorWestSegment)) {
        doors[0] = "door_c";
      }
    }

    // north door
    if (containNorthDoor(mapElements, selectedElement)) {
      const doorNorthSegment = getDoorNorthSegment(mapElements, selectedElement);
      if (containDoorNoKey(doorNorthSegment)) {
        doors[1] = "door_no_key";
      } else if (containDoorA(doorNorthSegment)) {
        doors[1] = "door_a";
      } else if (containDoorB(doorNorthSegment)) {
        doors[1] = "door_b";
      } else if (containDoorC(doorNorthSegment)) {
        doors[1] = "door_c";
      }
    }

    // east door
    if (containEastDoor(mapElements, selectedElement)) {
      const doorEastSegment = getDoorEastSegment(mapElements, selectedElement);
      if (containDoorNoKey(doorEastSegment)) {
        doors[2] = "door_no_key";
      } else if (containDoorA(doorEastSegment)) {
        doors[2] = "door_a";
      } else if (containDoorB(doorEastSegment)) {
        doors[2] = "door_b";
      } else if (containDoorC(doorEastSegment)) {
        doors[2] = "door_c";
      }
    }

    // south door
    if (containSouthDoor(mapElements, selectedElement)) {
      const doorSouthSegment = getDoorSouthSegment(mapElements, selectedElement);
      if (containDoorNoKey(doorSouthSegment)) {
        doors[3] = "door_no_key";
      } else if (containDoorA(doorSouthSegment)) {
        doors[3] = "door_a";
      } else if (containDoorB(doorSouthSegment)) {
        doors[3] = "door_b";
      } else if (containDoorC(doorSouthSegment)) {
        doors[3] = "door_c";
      }
    }

    return doors;
  };

  const selectedElementDoor = getDoorFromSelectedElement();

  const handleIncreaseHeight = () => {
    if (mapHeight < MAX_HEIGHT) {
      setMapElements(makeArray(mapHeight + 1, mapWidth));
      setSelectedElement(null);
      setHavePlayer(false);
      setHaveGoal(false);
    }
  };

  const handleIncreaseWidth = () => {
    if (mapWidth < MAX_WIDTH) {
      setMapElements(makeArray(mapHeight, mapWidth + 1));
      setSelectedElement(null);
      setHavePlayer(false);
      setHaveGoal(false);
    }
  };

  const handleDecreaseHeight = () => {
    if (mapHeight > MIN_HEIGHT) {
      setMapElements(makeArray(mapHeight - 1, mapWidth));
      setSelectedElement(null);
      setHavePlayer(false);
      setHaveGoal(false);
    }
  };

  const handleDecreaseWidth = () => {
    if (mapWidth > MIN_WIDTH) {
      setMapElements(makeArray(mapHeight, mapWidth - 1));
      setSelectedElement(null);
      setHavePlayer(false);
      setHaveGoal(false);
    }
  };

  const handlePlayerClick = () => {
    const newMapElements = [...mapElements];
    if (containPlayer(newMapElements, selectedElement)) {
      newMapElements[selectedElement.i][selectedElement.j] &= ~0b1111;
    } else {
      newMapElements[selectedElement.i][selectedElement.j] |= 0b0001;

      // default player direction is north
      newMapElements[selectedElement.i][selectedElement.j] |= 0b0010;
    }

    setHavePlayer(!havePlayer);
    setMapElements(newMapElements);
  };

  const handlePlayerDirectionChange = (event) => {
    const playerDirection = event.target.value;
    const newMapElements = [...mapElements];

    newMapElements[selectedElement.i][selectedElement.j] &= ~0b0110;

    switch (playerDirection) {
      case "W":
        newMapElements[selectedElement.i][selectedElement.j] |= 0b0000;
        setSelectedPlayerDirection("W");
        break;
      case "N":
        newMapElements[selectedElement.i][selectedElement.j] |= 0b0010;
        setSelectedPlayerDirection("N");
        break;
      case "E":
        newMapElements[selectedElement.i][selectedElement.j] |= 0b0100;
        setSelectedPlayerDirection("E");
        break;
      case "S":
        newMapElements[selectedElement.i][selectedElement.j] |= 0b0110;
        setSelectedPlayerDirection("S");
        break;
      default:
        console.error("undefined behavior on handlePlayerDirectionChange");
        break;
    }

    setMapElements(newMapElements);
  };

  const handleGoalClick = () => {
    const newMapElements = [...mapElements];
    if (containGoal(newMapElements, selectedElement)) {
      newMapElements[selectedElement.i][selectedElement.j] &= ~(0b1111 << 4);
    } else {
      newMapElements[selectedElement.i][selectedElement.j] |= 0b0010 << 4;
    }

    setHaveGoal(!haveGoal);
    setMapElements(newMapElements);
  };

  const handleObstacleClick = () => {
    const newMapElements = [...mapElements];
    if (containObstacle(newMapElements, selectedElement)) {
      newMapElements[selectedElement.i][selectedElement.j] &= ~(0b1111 << 4);
    } else {
      newMapElements[selectedElement.i][selectedElement.j] |= 0b0001 << 4;
    }

    setMapElements(newMapElements);
  };

  const handleConditionClick = (conditionValue) => {
    const newMapElements = [...mapElements];
    newMapElements[selectedElement.i][selectedElement.j] &= ~(0b1111 << 4);
    newMapElements[selectedElement.i][selectedElement.j] |= conditionValue << 4;
    setMapElements(newMapElements);
  };

  const handleRemoveCondition = () => {
    const newMapElements = [...mapElements];
    newMapElements[selectedElement.i][selectedElement.j] &= ~(0b1111 << 4);
    setMapElements(newMapElements);
  };

  const handleClickItem = (itemValue) => {
    const newMapElements = [...mapElements];
    newMapElements[selectedElement.i][selectedElement.j] &= ~(0b1111 << 8);
    newMapElements[selectedElement.i][selectedElement.j] |= itemValue << 8;
    setMapElements(newMapElements);
  };

  const handleRemoveItem = () => {
    const newMapElements = [...mapElements];
    newMapElements[selectedElement.i][selectedElement.j] &= ~(0b1111 << 8);
    setMapElements(newMapElements);
  };

  const handleDoorNorthChange = (event) => {
    const newMapElements = [...mapElements];
    const doorValue = getDoorValueFromType(event.target.value);

    // north
    newMapElements[selectedElement.i][selectedElement.j] &= ~(0b1111 << 16);
    newMapElements[selectedElement.i][selectedElement.j] |= doorValue << 16;

    // south
    newMapElements[selectedElement.i - 1][selectedElement.j] &= ~(0b1111 << 24);
    newMapElements[selectedElement.i - 1][selectedElement.j] |= doorValue << 24;

    setMapElements(newMapElements);
  };

  const handleDoorEastChange = (event) => {
    const newMapElements = [...mapElements];
    const doorValue = getDoorValueFromType(event.target.value);

    //east
    newMapElements[selectedElement.i][selectedElement.j] &= ~(0b1111 << 20);
    newMapElements[selectedElement.i][selectedElement.j] |= doorValue << 20;

    //west
    newMapElements[selectedElement.i][selectedElement.j + 1] &= ~(0b1111 << 12);
    newMapElements[selectedElement.i][selectedElement.j + 1] |= doorValue << 12;

    setMapElements(newMapElements);
  };

  const handleDoorSouthChange = (event) => {
    const newMapElements = [...mapElements];
    const doorValue = getDoorValueFromType(event.target.value);

    // south
    newMapElements[selectedElement.i][selectedElement.j] &= ~(0b1111 << 24);
    newMapElements[selectedElement.i][selectedElement.j] |= doorValue << 24;

    // north
    newMapElements[selectedElement.i + 1][selectedElement.j] &= ~(0b1111 << 16);
    newMapElements[selectedElement.i + 1][selectedElement.j] |= doorValue << 16;

    setMapElements(newMapElements);
  };

  const handleDoorWestChange = (event) => {
    const newMapElements = [...mapElements];
    const doorValue = getDoorValueFromType(event.target.value);

    // west
    newMapElements[selectedElement.i][selectedElement.j] &= ~(0b1111 << 12);
    newMapElements[selectedElement.i][selectedElement.j] |= doorValue << 12;

    // east
    newMapElements[selectedElement.i][selectedElement.j - 1] &= ~(0b1111 << 20);
    newMapElements[selectedElement.i][selectedElement.j - 1] |= doorValue << 20;

    setMapElements(newMapElements);
  };

  const handleCreateMapSubmit = (values) => {
    console.log(values);
  };

  return (
    <>
      <Header title="MAP BUILDER" subtitle="Build your map" />

      <Grid container spacing={2}>
        <Grid item md={8}>
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
        </Grid>
        <Grid item md={4}>
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
                        (havePlayer && !containPlayer(mapElements, selectedElement)) ||
                        containObstacle(mapElements, selectedElement) ||
                        containAnyItem(mapElements, selectedElement)
                      }
                    />
                    <Chip
                      label="Goal"
                      onClick={handleGoalClick}
                      disabled={
                        !selectedElement ||
                        (haveGoal && !containGoal(mapElements, selectedElement)) ||
                        containPlayer(mapElements, selectedElement) ||
                        containObstacle(mapElements, selectedElement) ||
                        containAnyCondition(mapElements, selectedElement) ||
                        containAnyItem(mapElements, selectedElement)
                      }
                    />
                    <Chip
                      label="Obstacle"
                      onClick={handleObstacleClick}
                      disabled={
                        !selectedElement ||
                        containGoal(mapElements, selectedElement) ||
                        containPlayer(mapElements, selectedElement) ||
                        containAnyCondition(mapElements, selectedElement) ||
                        containAnyItem(mapElements, selectedElement)
                      }
                    />

                  </Stack>
                  <Box mt={2}>
                    {
                      havePlayer &&
                      (
                        <FormControl fullWidth disabled={!selectedElement || !containPlayer(mapElements, selectedElement)}>
                          <InputLabel>Player Direction</InputLabel>
                          <Select variant="outlined" value={selectedPlayerDirection} onChange={handlePlayerDirectionChange}>
                            <MenuItem value="N">North</MenuItem>
                            <MenuItem value="E">East</MenuItem>
                            <MenuItem value="S">South</MenuItem>
                            <MenuItem value="W">West</MenuItem>
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
                        containObstacle(mapElements, selectedElement) ||
                        containGoal(mapElements, selectedElement)
                      }
                    />
                    <Chip
                      label="Condition B"
                      onClick={() => handleConditionClick(0b0100)}
                      disabled={
                        !selectedElement ||
                        containObstacle(mapElements, selectedElement) ||
                        containGoal(mapElements, selectedElement)
                      }
                    />
                    <Chip
                      label="Condition C"
                      onClick={() => handleConditionClick(0b0101)}
                      disabled={
                        !selectedElement ||
                        containObstacle(mapElements, selectedElement) ||
                        containGoal(mapElements, selectedElement)
                      }
                    />
                    <Chip
                      label="Condition D"
                      onClick={() => handleConditionClick(0b0110)}
                      disabled={
                        !selectedElement ||
                        containObstacle(mapElements, selectedElement) ||
                        containGoal(mapElements, selectedElement)
                      }
                    />
                    <Chip
                      label="Condition E"
                      onClick={() => handleConditionClick(0b0111)}
                      disabled={
                        !selectedElement ||
                        containObstacle(mapElements, selectedElement) ||
                        containGoal(mapElements, selectedElement)
                      }
                    />
                    <Chip
                      label="No Condition"
                      onClick={handleRemoveCondition}
                      disabled={
                        !selectedElement ||
                        !containAnyCondition(mapElements, selectedElement)
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
                        containObstacle(mapElements, selectedElement) ||
                        containGoal(mapElements, selectedElement) ||
                        containPlayer(mapElements, selectedElement)
                      }
                    />
                    <Chip
                      label="Key B"
                      onClick={() => handleClickItem(0b0010)}
                      disabled={
                        !selectedElement ||
                        containObstacle(mapElements, selectedElement) ||
                        containGoal(mapElements, selectedElement) ||
                        containPlayer(mapElements, selectedElement)
                      }
                    />
                    <Chip
                      label="Key C"
                      onClick={() => handleClickItem(0b0011)}
                      disabled={
                        !selectedElement ||
                        containObstacle(mapElements, selectedElement) ||
                        containGoal(mapElements, selectedElement) ||
                        containPlayer(mapElements, selectedElement)
                      }
                    />
                    <Chip
                      label="Remove Item"
                      onClick={handleRemoveItem}
                      disabled={
                        !selectedElement ||
                        !containAnyItem(mapElements, selectedElement)
                      }
                    />
                  </Stack>
                </Box>
                <Box>
                  <Typography variant="h6">
                    Doors
                  </Typography>
                  <Box mt={2}>
                    <FormControl fullWidth disabled={!selectedElement || outOfBoundCheck(mapHeight, mapWidth, { i: selectedElement.i - 1, j: selectedElement.j })}>
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
                    <FormControl fullWidth disabled={!selectedElement || outOfBoundCheck(mapHeight, mapWidth, { i: selectedElement.i, j: selectedElement.j + 1 })}>
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
                    <FormControl fullWidth disabled={!selectedElement || outOfBoundCheck(mapHeight, mapWidth, { i: selectedElement.i + 1, j: selectedElement.j })}>
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
                    <FormControl fullWidth disabled={!selectedElement || outOfBoundCheck(mapHeight, mapWidth, { i: selectedElement.i, j: selectedElement.j - 1 })}>
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
        </Grid>
        <Grid item md={12}>
          <Card>
            <CardHeader title="Detail" sx={{ backgroundColor: "primary.dark" }} />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item md={6}>
                  {/* WORLD NAME */}
                  <FormControl fullWidth>
                    <InputLabel>World</InputLabel>
                    <Select
                      variant="filled"
                      value={mapDetailFormData.world}
                      onChange={(event) => {
                        setMapDetailFormData({ ...mapDetailFormData, world: event.target.value });
                      }}
                    >
                      {
                        !isLoading && worlds.map((w, idx) => (
                          <MenuItem key={idx} value={w.world_id}>{w.world_name}</MenuItem>
                        ))
                      }
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item md={6}>
                  {/* MAP NAME */}
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Name"
                    onBlur={(event) => {
                      setMapDetailFormData({ ...mapDetailFormData, name: event.target.value });
                    }}
                  />
                </Grid>

                {/* MAP IMAGE */}
                <Grid item md={12}>

                </Grid>

                <Grid item md={6}>
                  {/* DIFFICULTY */}
                  <FormControl fullWidth>
                    <InputLabel>Difficulty</InputLabel>
                    <Select
                      variant="filled"
                      value={mapDetailFormData.difficulty}
                      onChange={(event) => {
                        setMapDetailFormData({ ...mapDetailFormData, difficulty: event.target.value });
                      }}
                    >
                      <MenuItem value="easy">Easy</MenuItem>
                      <MenuItem value="medium">Medium</MenuItem>
                      <MenuItem value="hard">Hard</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>

                <Grid item md={6}>
                  {/* STAR REQUIREMENT */}
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Star Requirement"
                    onBlur={(event) => {
                      setMapDetailFormData({ ...mapDetailFormData, starRequirement: event.target.value });
                    }}
                  />
                </Grid>

                {/* LEASE SOLVABLE COMMAND 3 */}
                <Grid item md={4}>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Least Solvable Command Gold"
                    onBlur={(event) => {
                      setMapDetailFormData({ ...mapDetailFormData, leastSolvableCommandGold: event.target.value });
                    }}
                  />
                </Grid>
                <Grid item md={4}>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Least Solvable Command Silver"
                    onBlur={(event) => {
                      setMapDetailFormData({ ...mapDetailFormData, leastSolvableCommandSilver: event.target.value });
                    }}
                  />
                </Grid>
                <Grid item md={4}>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Least Solvable Command Bronze"
                    onBlur={(event) => {
                      setMapDetailFormData({ ...mapDetailFormData, leastSolvableCommandBronze: event.target.value });
                    }}
                  />
                </Grid>

                {/* LEAST SOLVABLE ACTION 3 */}
                <Grid item md={4}>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Least Solvable Action Gold"
                    onBlur={(event) => {
                      setMapDetailFormData({ ...mapDetailFormData, leastSolvableActionGold: event.target.value });
                    }}
                  />
                </Grid>
                <Grid item md={4}>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Least Solvable Action Silver"
                    onBlur={(event) => {
                      setMapDetailFormData({ ...mapDetailFormData, leastSolvableActionSilver: event.target.value });
                    }}
                  />
                </Grid>
                <Grid item md={4}>
                  <TextField
                    fullWidth
                    variant="filled"
                    type="text"
                    label="Least Solvable Action Bronze"
                    onBlur={(event) => {
                      setMapDetailFormData({ ...mapDetailFormData, leastSolvableActionBronze: event.target.value });
                    }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item md={12}>
          <Card>
            <CardHeader title="Rules" sx={{ backgroundColor: "primary.dark" }} />
          </Card>
        </Grid>
        <Grid item md={4}>
          <Card>
            <CardHeader title="Map Analyzer" sx={{ backgroundColor: "primary.dark" }} />
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default MapBuilder;