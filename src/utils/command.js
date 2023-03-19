import { commandType, edgeType } from "../enums/command";

export const commandDisplay = (commandNode, nodeIndex) => {
    let displayText;
    if (commandNode.mainBranchNodeIndex) {
        if (commandNode.conditionalBranchNodeIndex) {
            const conditionText = getConditionText(commandNode.type);
            displayText = `${nodeIndex + 1}. if (${conditionText}) then ${commandNode.conditionalBranchNodeIndex + 1} else ${commandNode.mainBranchNodeIndex + 1}`;
        } else {
            displayText = `${nodeIndex + 1}. ${commandNode.type}  -->  ${commandNode.mainBranchNodeIndex + 1}`;
        }
    } else {
        displayText = `${nodeIndex + 1}. ${commandNode.type}`;
    }

    return displayText;
};

const getConditionText = (conditionType) => {
    let conditionText;
    switch (conditionType) {
        case commandType.CONDITIONAL_A:
            conditionText = "condition A";
            break;
        case commandType.CONDITIONAL_B:
            conditionText = "condition B";
            break;
        case commandType.CONDITIONAL_C:
            conditionText = "condition C";
            break;
        case commandType.CONDITIONAL_D:
            conditionText = "condition D";
            break;
        case commandType.CONDITIONAL_E:
            conditionText = "condition E";
            break;
        default:
            conditionText = "default condition";
            break;
    }

    return conditionText;
};

export const toAdjacencyList = (commandNodes, commandEdges) => {
    const adjacencyList = Array.from({ length: commandNodes.length });
    commandNodes.forEach((n) => {
        adjacencyList[n.index] = {
            type: n.type,
            mainBranchNodeIndex: null,
            conditionalBranchNodeIndex: null
        };
    });

    commandEdges.forEach((e) => {
        if (e.type === edgeType.CONDITIONAL) {
            adjacencyList[e.source_node_index].conditionalBranchNodeIndex = e.destination_node_index;
        } else if (e.type === edgeType.MAIN) {
            adjacencyList[e.source_node_index].mainBranchNodeIndex = e.destination_node_index;
        }
    });

    return adjacencyList;
};