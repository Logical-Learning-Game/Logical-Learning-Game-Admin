export const limitType = {
    ALL: 0,
    FORWARD: 1,
    LEFT: 2,
    RIGHT: 3,
    BACK: 4,
    CONDITION: 5
};

export const ruleType = {
    LEVEL_CLEAR_RULE: "level_clear_rule",
    COMMAND_LIMIT_RULE: "command_limit_rule",
    ACTION_LIMIT_RULE: "action_limit_rule",
    ITEM_COLLECTOR_RULE: "item_collector_rule"
};

export const getLimitType = (param) => [limitType.ALL, limitType.FORWARD, limitType.LEFT, limitType.RIGHT, limitType.BACK, limitType.CONDITION][param];