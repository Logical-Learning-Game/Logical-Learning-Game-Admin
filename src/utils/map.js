export const makeArray = (height, width) => {
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