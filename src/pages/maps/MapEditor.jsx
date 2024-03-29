import { Grid, Stack, Button } from "@mui/material";
import { useWorldQuery } from "../../hooks/useWorldQuery";
import { useEffect, useState } from "react";
import * as mapUtil from "../../utils/map";
import Header from "../../components/Header";
import MapEditorCard from "../../components/MapEditorCard";
import MapObjectsCard from "../../components/MapObjectsCard";
import MapDetailEditorCard from "../../components/MapDetailEditorCard";
import RuleEditorCard from "../../components/RuleEditorCard";
import MapAnalyzerCard from "../../components/MapAnalyzerCard";
import { ruleType } from "../../enums/rule";
import { playerDirectionType } from "../../enums/player";
import { useParams, useNavigate } from "react-router-dom";
import { mapQueryOption } from "../../hooks/useMapQuery";
import { makeArray } from "../../utils/map";
import { useEditMap } from "../../hooks/useEditMap";
import { useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../hooks/useAuth";

const transformTile = (tile, height, width) => {
  const mapHeight = height;
  const mapWidth = width;
  const mapElements = makeArray(mapHeight, mapWidth);

  let idx = 0;
  for (let i = mapHeight - 1; i >= 0; i--) {
    for (let j = mapWidth - 1; j >= 0; j--) {
      mapElements[i][j] = tile[idx];
      idx++;
    }
  }

  return mapElements;
};

export const loader = (queryClient) => {
  return async ({ params }) => {
    const query = mapQueryOption(params.mapId);
    const data = await queryClient.ensureQueryData(query);

    const mapData = {
      worldId: data.world_id,
      name: data.map_name,
      difficulty: data.difficulty,
      starRequirement: data.star_requirement,
      leastSolvableCommandGold: data.least_solvable_command_gold,
      leastSolvableCommandSilver: data.least_solvable_command_silver,
      leastSolvableCommandBronze: data.least_solvable_command_bronze,
      leastSolvableActionGold: data.least_solvable_action_gold,
      leastSolvableActionSilver: data.least_solvable_action_silver,
      leastSolvableActionBronze: data.least_solvable_action_bronze,
      currentFile: undefined,
      previewImage: data.map_image_path
    };

    const playerData = {
      startPlayerPositionX: data.start_player_position_x,
      startPlayerPositionY: data.start_player_position_y,
      goalPositionX: data.goal_position_x,
      goalPositionY: data.goal_position_y
    };

    return {
      mapData: mapData,
      rulesData: data.rules.map((r) => ({
        name: r.rule_name,
        theme: r.rule_theme,
        parameters: r.parameters
      })),
      tileData: transformTile(data.tile, data.height, data.width),
      playerData: playerData,
      playerDirection: data.start_player_direction
    };
  };
};

const MAX_HEIGHT = 9;
const MAX_WIDTH = 9;
const MIN_HEIGHT = 1;
const MIN_WIDTH = 1;

const MapEditor = () => {
  const navigate = useNavigate();
  const { mapId } = useParams();

  // Query
  const { data: worlds, isLoading } = useWorldQuery();
  const queryClient = useQueryClient();
  const { token } = useAuth();

  useEffect(() => {
    (async () => {
      const query = mapQueryOption(token, mapId);
      const data = await queryClient.ensureQueryData(query);

      const mapData = {
        worldId: data.world_id,
        name: data.map_name,
        difficulty: data.difficulty,
        starRequirement: data.star_requirement,
        leastSolvableCommandGold: data.least_solvable_command_gold,
        leastSolvableCommandSilver: data.least_solvable_command_silver,
        leastSolvableCommandBronze: data.least_solvable_command_bronze,
        leastSolvableActionGold: data.least_solvable_action_gold,
        leastSolvableActionSilver: data.least_solvable_action_silver,
        leastSolvableActionBronze: data.least_solvable_action_bronze,
        currentFile: undefined,
        previewImage: data.map_image_path
      };

      const playerData = {
        startPlayerPositionX: data.start_player_position_x,
        startPlayerPositionY: data.start_player_position_y,
        goalPositionX: data.goal_position_x,
        goalPositionY: data.goal_position_y
      };

      const rulesData = data.rules.map((r) => ({
        name: r.rule_name,
        theme: r.rule_theme,
        parameters: r.parameters
      }));

      const tileData = transformTile(data.tile, data.height, data.width);

      const playerDirection = data.start_player_direction;

      setMapElements(tileData);
      setSelectedPlayerDirection(playerDirection);
      setMapDetailFormData(mapData);
      setPlayerData(playerData);
      setRules(rulesData);
    })();
  }, [mapId, queryClient, token])

  // Mutation
  const editMapMutation = useEditMap();

  // Map 
  const [mapElements, setMapElements] = useState([[]]);
  const [selectedElement, setSelectedElement] = useState(null);
  const [havePlayer, setHavePlayer] = useState(true);
  const [haveGoal, setHaveGoal] = useState(true);
  const [selectedPlayerDirection, setSelectedPlayerDirection] = useState(playerDirectionType.NORTH);

  // Detail
  const [mapDetailFormData, setMapDetailFormData] = useState({
    worldId: "",
    name: "",
    difficulty: "",
    starRequirement: "",
    leastSolvableCommandGold: "",
    leastSolvableCommandSilver: "",
    leastSolvableCommandBronze: "",
    leastSolvableActionGold: "",
    leastSolvableActionSilver: "",
    leastSolvableActionBronze: "",
    currentFile: undefined,
    previewImage: undefined
  });

  // Additional data
  const [playerData, setPlayerData] = useState(null);

  // Rule
  const [rules, setRules] = useState([]);

  const handleSelectImageFile = (event) => {
    setMapDetailFormData({
      ...mapDetailFormData,
      currentFile: event.target.files[0],
      previewImage: URL.createObjectURL(event.target.files[0])
    });
  };

  const getDoorFromSelectedElement = () => {
    const doors = ["none", "none", "none", "none"];

    if (!selectedElement) {
      return doors;
    }

    // west door
    if (mapUtil.containWestDoor(mapElements, selectedElement)) {
      const doorWestSegment = mapUtil.getDoorWestSegment(mapElements, selectedElement);
      if (mapUtil.containDoorNoKey(doorWestSegment)) {
        doors[0] = "door_no_key";
      } else if (mapUtil.containDoorA(doorWestSegment)) {
        doors[0] = "door_a";
      } else if (mapUtil.containDoorB(doorWestSegment)) {
        doors[0] = "door_b";
      } else if (mapUtil.containDoorC(doorWestSegment)) {
        doors[0] = "door_c";
      }
    }

    // north door
    if (mapUtil.containNorthDoor(mapElements, selectedElement)) {
      const doorNorthSegment = mapUtil.getDoorNorthSegment(mapElements, selectedElement);
      if (mapUtil.containDoorNoKey(doorNorthSegment)) {
        doors[1] = "door_no_key";
      } else if (mapUtil.containDoorA(doorNorthSegment)) {
        doors[1] = "door_a";
      } else if (mapUtil.containDoorB(doorNorthSegment)) {
        doors[1] = "door_b";
      } else if (mapUtil.containDoorC(doorNorthSegment)) {
        doors[1] = "door_c";
      }
    }

    // east door
    if (mapUtil.containEastDoor(mapElements, selectedElement)) {
      const doorEastSegment = mapUtil.getDoorEastSegment(mapElements, selectedElement);
      if (mapUtil.containDoorNoKey(doorEastSegment)) {
        doors[2] = "door_no_key";
      } else if (mapUtil.containDoorA(doorEastSegment)) {
        doors[2] = "door_a";
      } else if (mapUtil.containDoorB(doorEastSegment)) {
        doors[2] = "door_b";
      } else if (mapUtil.containDoorC(doorEastSegment)) {
        doors[2] = "door_c";
      }
    }

    // south door
    if (mapUtil.containSouthDoor(mapElements, selectedElement)) {
      const doorSouthSegment = mapUtil.getDoorSouthSegment(mapElements, selectedElement);
      if (mapUtil.containDoorNoKey(doorSouthSegment)) {
        doors[3] = "door_no_key";
      } else if (mapUtil.containDoorA(doorSouthSegment)) {
        doors[3] = "door_a";
      } else if (mapUtil.containDoorB(doorSouthSegment)) {
        doors[3] = "door_b";
      } else if (mapUtil.containDoorC(doorSouthSegment)) {
        doors[3] = "door_c";
      }
    }

    return doors;
  };

  const selectedElementDoor = getDoorFromSelectedElement();

  const mapHeight = mapElements.length;
  const mapWidth = mapElements[0].length;

  const handleIncreaseHeight = () => {
    if (mapHeight < MAX_HEIGHT) {
      setMapElements(mapUtil.makeArray(mapHeight + 1, mapWidth));
      setSelectedElement(null);
      setHavePlayer(false);
      setHaveGoal(false);
    }
  };

  const handleIncreaseWidth = () => {
    if (mapWidth < MAX_WIDTH) {
      setMapElements(mapUtil.makeArray(mapHeight, mapWidth + 1));
      setSelectedElement(null);
      setHavePlayer(false);
      setHaveGoal(false);
    }
  };

  const handleDecreaseHeight = () => {
    if (mapHeight > MIN_HEIGHT) {
      setMapElements(mapUtil.makeArray(mapHeight - 1, mapWidth));
      setSelectedElement(null);
      setHavePlayer(false);
      setHaveGoal(false);
    }
  };

  const handleDecreaseWidth = () => {
    if (mapWidth > MIN_WIDTH) {
      setMapElements(mapUtil.makeArray(mapHeight, mapWidth - 1));
      setSelectedElement(null);
      setHavePlayer(false);
      setHaveGoal(false);
    }
  };

  const handlePlayerClick = () => {
    const newMapElements = [...mapElements];
    if (mapUtil.containPlayer(newMapElements, selectedElement)) {
      newMapElements[selectedElement.i][selectedElement.j] &= ~0b1111;
      setPlayerData({ ...playerData, startPlayerPositionX: null, startPlayerPostionY: null });
      setSelectedPlayerDirection(null);
    } else {
      newMapElements[selectedElement.i][selectedElement.j] |= 0b0001;

      // default player direction is north
      newMapElements[selectedElement.i][selectedElement.j] |= 0b0010;
      setPlayerData({ ...playerData, startPlayerPositionX: selectedElement.j, startPlayerPostionY: selectedElement.i });
      setSelectedPlayerDirection(playerDirectionType.NORTH);
    }

    setHavePlayer(!havePlayer);
    setMapElements(newMapElements);
  };

  const handlePlayerDirectionChange = (event) => {
    const playerDirection = event.target.value;
    const newMapElements = [...mapElements];

    newMapElements[selectedElement.i][selectedElement.j] &= ~0b0110;

    switch (playerDirection) {
      case playerDirectionType.WEST:
        newMapElements[selectedElement.i][selectedElement.j] |= 0b0000;
        setSelectedPlayerDirection(playerDirectionType.WEST);
        break;
      case playerDirectionType.NORTH:
        newMapElements[selectedElement.i][selectedElement.j] |= 0b0010;
        setSelectedPlayerDirection(playerDirectionType.NORTH);
        break;
      case playerDirectionType.EAST:
        newMapElements[selectedElement.i][selectedElement.j] |= 0b0100;
        setSelectedPlayerDirection(playerDirectionType.EAST);
        break;
      case playerDirectionType.SOUTH:
        newMapElements[selectedElement.i][selectedElement.j] |= 0b0110;
        setSelectedPlayerDirection(playerDirectionType.SOUTH);
        break;
      default:
        console.error("undefined behavior on handlePlayerDirectionChange");
        break;
    }

    setMapElements(newMapElements);
  };

  const handleGoalClick = () => {
    const newMapElements = [...mapElements];
    if (mapUtil.containGoal(newMapElements, selectedElement)) {
      newMapElements[selectedElement.i][selectedElement.j] &= ~(0b1111 << 4);
      setPlayerData({ ...playerData, goalPositionX: null, goalPositionY: null });
    } else {
      newMapElements[selectedElement.i][selectedElement.j] |= 0b0010 << 4;
      setPlayerData({ ...playerData, goalPositionX: selectedElement.j, goalPositionY: selectedElement.i });
    }

    setHaveGoal(!haveGoal);
    setMapElements(newMapElements);
  };

  const handleObstacleClick = () => {
    const newMapElements = [...mapElements];
    if (mapUtil.containObstacle(newMapElements, selectedElement)) {
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
    const doorValue = mapUtil.getDoorValueFromType(event.target.value);

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
    const doorValue = mapUtil.getDoorValueFromType(event.target.value);

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
    const doorValue = mapUtil.getDoorValueFromType(event.target.value);

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
    const doorValue = mapUtil.getDoorValueFromType(event.target.value);

    // west
    newMapElements[selectedElement.i][selectedElement.j] &= ~(0b1111 << 12);
    newMapElements[selectedElement.i][selectedElement.j] |= doorValue << 12;

    // east
    newMapElements[selectedElement.i][selectedElement.j - 1] &= ~(0b1111 << 20);
    newMapElements[selectedElement.i][selectedElement.j - 1] |= doorValue << 20;

    setMapElements(newMapElements);
  };

  const handleSetRuleParameterValue = (ruleIdx, parameterIdx, value) => {
    const newRules = [...rules];
    newRules[ruleIdx].parameters[parameterIdx] = value;
    setRules(newRules);
  };

  const handleSetRuleName = (ruleIdx, name) => {
    const newRules = [...rules];
    newRules[ruleIdx].name = name;

    if (name === ruleType.COMMAND_LIMIT_RULE || name === ruleType.ACTION_LIMIT_RULE) {
      newRules[ruleIdx].parameters = [0, 0, 0];
    } else if (name === ruleType.ITEM_COLLECTOR_RULE) {
      newRules[ruleIdx].parameters = [0, 0];
    } else if (name === ruleType.LEVEL_CLEAR_RULE) {
      newRules[ruleIdx].parameters = [];
    }

    setRules(newRules);
  };

  const handleSetRuleTheme = (ruleIdx, theme) => {
    const newRules = [...rules];
    newRules[ruleIdx].theme = theme;
    setRules(newRules);
  };

  const handleEditMapSubmit = () => {
    const flattenTile = [];
    for (let i = mapHeight - 1; i >= 0; i--) {
      for (let j = mapWidth - 1; j >= 0; j--) {
        flattenTile.push(mapElements[i][j]);
      }
    }

    const formData = new FormData();

    const data = {
      world_id: mapDetailFormData.worldId,
      map_name: mapDetailFormData.name,
      tile: flattenTile,
      height: mapHeight,
      width: mapWidth,
      start_player_direction: selectedPlayerDirection,
      start_player_position_x: playerData.startPlayerPositionX,
      start_player_position_y: playerData.startPlayerPostionY,
      goal_position_x: playerData.goalPositionX,
      goal_position_y: playerData.goalPositionY,
      difficulty: mapDetailFormData.difficulty,
      star_requirement: mapDetailFormData.starRequirement,
      least_solvable_command_gold: mapDetailFormData.leastSolvableCommandGold,
      least_solvable_command_silver: mapDetailFormData.leastSolvableCommandSilver,
      least_solvable_command_bronze: mapDetailFormData.leastSolvableCommandBronze,
      least_solvable_action_gold: mapDetailFormData.leastSolvableActionGold,
      least_solvable_action_silver: mapDetailFormData.leastSolvableActionSilver,
      least_solvable_action_bronze: mapDetailFormData.leastSolvableActionBronze,
      rules: rules.map((r) => ({ rule_name: r.name, rule_theme: r.theme, parameters: r.parameters })),
    };

    formData.append("data", JSON.stringify(data));
    if (mapDetailFormData.currentFile) {
      formData.append("image", mapDetailFormData.currentFile, mapDetailFormData.currentFile.name);
    }

    editMapMutation.mutate({ mapId: mapId, data: formData });
    navigate("/maps");
  };

  return (
    <>
      <Header title="MAP EDITOR" subtitle="Edit your map" />

      <Grid container spacing={2}>
        <Grid item md={8}>
          <MapEditorCard
            mapHeight={mapHeight}
            mapWidth={mapWidth}
            mapElements={mapElements}
            selectedElement={selectedElement}
            setSelectedElement={setSelectedElement}
            handleIncreaseHeight={handleIncreaseHeight}
            handleIncreaseWidth={handleIncreaseWidth}
            handleDecreaseHeight={handleDecreaseHeight}
            handleDecreaseWidth={handleDecreaseWidth}
          />
        </Grid>
        <Grid item md={4}>
          <MapObjectsCard
            handlePlayerClick={handlePlayerClick}
            selectedElement={selectedElement}
            havePlayer={havePlayer}
            haveGoal={haveGoal}
            mapElements={mapElements}
            handleGoalClick={handleGoalClick}
            selectedPlayerDirection={selectedPlayerDirection}
            handlePlayerDirectionChange={handlePlayerDirectionChange}
            handleConditionClick={handleConditionClick}
            handleRemoveCondition={handleRemoveCondition}
            handleClickItem={handleClickItem}
            handleRemoveItem={handleRemoveItem}
            handleObstacleClick={handleObstacleClick}
            handleDoorNorthChange={handleDoorNorthChange}
            handleDoorEastChange={handleDoorEastChange}
            handleDoorSouthChange={handleDoorSouthChange}
            handleDoorWestChange={handleDoorWestChange}
            selectedElementDoor={selectedElementDoor}
            mapHeight={mapHeight}
            mapWidth={mapWidth}
          />
        </Grid>
        <Grid item md={12}>
          {/* MAP DETAIL */}
          <MapDetailEditorCard
            mapDetailFormData={mapDetailFormData}
            worlds={worlds}
            loading={isLoading}
            setMapDetailFormData={setMapDetailFormData}
            onSelectImageFile={handleSelectImageFile}
          />
        </Grid>
        <Grid item md={8}>
          {/* RULES */}
          <RuleEditorCard
            rules={rules}
            handleSetRuleName={handleSetRuleName}
            handleSetRuleTheme={handleSetRuleTheme}
            handleSetRuleParameterValue={handleSetRuleParameterValue}
          />
        </Grid>
        <Grid item md={4}>
          {/* MAP ANALYZER */}
          <MapAnalyzerCard
            mapElements={mapElements}
            height={mapHeight}
            width={mapWidth}
            onApplyResult={(recommendedValues) => setMapDetailFormData({...mapDetailFormData, ...recommendedValues})}
          />
        </Grid>
      </Grid>

      <Stack direction="row" justifyContent="end" spacing={2} mt={2}>
        <Button variant="contained" onClick={handleEditMapSubmit}>Save</Button>
        <Button onClick={() => navigate("/maps")}>Cancel</Button>
      </Stack>
    </>
  );
};

export default MapEditor;