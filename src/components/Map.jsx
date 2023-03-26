import { Box, Typography } from "@mui/material";
import { containEastDoor, containNorthDoor, containWestDoor, containSouthDoor } from "../pages/maps/MapBuilder";

const getElementAsText = (element) => {
    const elements = [];

    // check first 4 bit LSB: player with player direction
    if ((element & 0b0001) === 0b0001) {
        const playerDirection = element & 0b0110;
        if (playerDirection === 0b0000) {
            // player west
            elements.push("P:W");
        } else if (playerDirection === 0b0010) {
            // player north
            elements.push("P:N");
        } else if (playerDirection === 0b0100) {
            // player east
            elements.push("P:E");
        } else if (playerDirection === 0b0110) {
            // player south
            elements.push("P:S");
        }
    }
    // next 4 bit, check tile data wall, goal, condition
    const tileData = (element >> 4) & 0b1111;
    if (tileData === 0b0001) {
        elements.push("X");
    } else if (tileData === 0b0010) {
        elements.push("G");
    } else if (tileData === 0b0011) {
        elements.push("[A]");
    } else if (tileData === 0b0100) {
        elements.push("[B]");
    } else if (tileData === 0b0101) {
        elements.push("[C]");
    } else if (tileData === 0b0110) {
        elements.push("[D]");
    } else if (tileData === 0b0111) {
        elements.push("[E]");
    }

    // next 4 bit check item on tile data
    const itemData = (element >> 8) & 0b1111;
    if (itemData === 0b0001) {
        elements.push("*A");
    } else if (itemData === 0b0010) {
        elements.push("*B");
    } else if (itemData === 0b0011) {
        elements.push("*C");
    }

    return elements.join(", ");
};

const Map = ({
    height,
    width,
    mapElements,
    selectedElement,
    setSelectedElement
}) => {
    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: `repeat(${width}, 1fr)`,
                gridTemplateRows: `repeat(${height}, 1fr)`,
            }}
        >
            {
                mapElements.map((row, i) => {
                    return row.map((element, j) => {
                        return (
                            <Box
                                key={width * i + j}
                                onClick={() => setSelectedElement({ i: i, j: j })}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: (i === selectedElement?.i && j === selectedElement?.j) ? "primary.main" : "primary.light",
                                    width: "50px",
                                    aspectRatio: "1",
                                    border: 1,
                                    borderStyle: "solid",
                                    borderTopColor: containNorthDoor(mapElements, {i: i, j: j}) ? "secondary.main" : "white",
                                    borderRightColor: containEastDoor(mapElements, {i: i, j: j}) ? "secondary.main" : "white",
                                    borderLeftColor: containWestDoor(mapElements, {i: i, j: j}) ? "secondary.main" : "white",
                                    borderBottomColor: containSouthDoor(mapElements, {i: i, j: j}) ? "secondary.main" : "white",
                                    overflow: "hidden",
                                    cursor: "pointer"
                                }}
                            >
                                <Typography variant="subtitle2">
                                    {getElementAsText(element)}
                                </Typography>
                            </Box>
                        )
                    })
                })
            }
        </Box>
    );
}

export default Map;