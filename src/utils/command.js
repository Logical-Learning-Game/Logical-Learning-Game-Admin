import { commandType, edgeType } from "../enums/command";

export const commandDisplay = (commandNode, nodeIndex) => {
    let displayText;
    const allConditionCommand = [commandType.CONDITIONAL_A, commandType.CONDITIONAL_B, commandType.CONDITIONAL_C, commandType.CONDITIONAL_D, commandType.CONDITIONAL_E];

    if (allConditionCommand.includes(commandNode.type)) {
        const conditionText = getConditionText(commandNode.type);
        const conditionalBranchDisplay = commandNode.conditionalBranchNodeIndex ? commandNode.conditionalBranchNodeIndex + 1 : "?";
        const mainBranchDisplay = commandNode.mainBranchNodeIndex ? commandNode.mainBranchNodeIndex + 1 : "?";
        displayText = `${nodeIndex + 1}. if (${conditionText}) then ${conditionalBranchDisplay} else ${mainBranchDisplay}`;
    } else if (commandNode.mainBranchNodeIndex) {
        displayText = `${nodeIndex + 1}. ${commandNode.type}  -->  ${commandNode.mainBranchNodeIndex + 1}`;
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