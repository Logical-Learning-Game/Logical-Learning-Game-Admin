import { ruleType, getLimitType, limitType } from "../enums/rule";

const getCommandRuleText = (type) => {
    let commandText;
    switch (type) {
        case limitType.ALL:
            commandText = "All command";
            break;
        case limitType.FORWARD:
            commandText = "Forward command";
            break;
        case limitType.LEFT:
            commandText = "Left command";
            break;
        case limitType.RIGHT:
            commandText = "Right command";
            break;
        case limitType.BACK:
            commandText = "Back command";
            break;
        case limitType.CONDITION:
            commandText = "Condition command";
            break;
        default:
            commandText = "Default command";
            break;
    }

    return commandText;
};

const getActionRuleText = (type) => {
    let actionText;
    switch (type) {
        case limitType.ALL:
            actionText = "All action";
            break;
        case limitType.FORWARD:
            actionText = "Forward action";
            break;
        case limitType.LEFT:
            actionText = "Left action";
            break;
        case limitType.RIGHT:
            actionText = "Right action";
            break;
        case limitType.BACK:
            actionText = "Back action";
            break;
        case limitType.CONDITION:
            actionText = "Condition action";
            break;
        default:
            actionText = "Default action";
            break;
    }

    return actionText;
};

export const ruleDisplay = (rule) => {
    const ruleName = rule.rule_name;
    let displayData;
    switch (ruleName) {
        case ruleType.LEVEL_CLEAR_RULE:
            displayData = "Reach goal";
            break;
        case ruleType.COMMAND_LIMIT_RULE:
            const commandType = getLimitType(rule.parameters[2]);
            const commandText = getCommandRuleText(commandType);
            displayData = `${commandText} is ${rule.parameters[1] === 1 ? "more than" : "less than"} ${rule.parameters[0]}`;
            break;
        case ruleType.ACTION_LIMIT_RULE:
            const actionType = getLimitType(rule.parameters[2]);
            const actionText = getActionRuleText(actionType);
            displayData = `${actionText} is ${rule.parameters[1] === 1 ? "more than" : "less than"} ${rule.parameters[0]}`;
            break;
        case ruleType.ITEM_COLLECTOR_RULE:
            displayData = `Item is ${rule.parameters[1] === 1 ? "more than" : "less than"} ${rule.parameters[0]}`;
            break;
        default:
            displayData = "Default display data";
            break;
    }

    return displayData;
};