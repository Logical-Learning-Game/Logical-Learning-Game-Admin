import { Card, CardHeader, Box, CardContent, Grid, InputLabel, MenuItem, FormControl, Select, TextField } from "@mui/material";
import { ruleType, ruleThemeType } from "../enums/rule";

const RuleEditorCard = ({ rules, handleSetRuleName, handleSetRuleTheme, handleSetRuleParameterValue }) => {
    return (
        <Card
            sx={{
                height: "584px"
            }}
        >
            <CardHeader title="Rules" sx={{ backgroundColor: "primary.dark" }} />

            <CardContent>
                <Box display="flex" flexDirection="column" gap={6}>
                    {
                        rules.map((r, idx) => (
                            <Grid key={idx} container spacing={2}>
                                <Grid item md={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>Rule {idx + 1}</InputLabel>
                                        <Select
                                            variant="filled"
                                            value={r.name}
                                            onChange={(event) => handleSetRuleName(idx, event.target.value)}
                                        >
                                            <MenuItem value={ruleType.LEVEL_CLEAR_RULE}>Level Clear Rule</MenuItem>
                                            <MenuItem value={ruleType.COMMAND_LIMIT_RULE}>Command Limit Rule</MenuItem>
                                            <MenuItem value={ruleType.ACTION_LIMIT_RULE}>Action Limit Rule</MenuItem>
                                            <MenuItem value={ruleType.ITEM_COLLECTOR_RULE}>Item Collector Rule</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>
                                <Grid item md={6}>
                                    <FormControl fullWidth>
                                        <InputLabel>Theme</InputLabel>
                                        <Select
                                            variant="filled"
                                            value={r.theme}
                                            onChange={(event) => handleSetRuleTheme(idx, event.target.value)}
                                        >
                                            <MenuItem value={ruleThemeType.NORMAL}>Normal Theme</MenuItem>
                                            <MenuItem value={ruleThemeType.LOOP}>Loop Theme</MenuItem>
                                            <MenuItem value={ruleThemeType.CONDITIONAL}>Conditional Theme</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                {
                                    (r.name === ruleType.COMMAND_LIMIT_RULE || r.name === ruleType.ACTION_LIMIT_RULE) ? (
                                        <>
                                            {
                                                r.name === ruleType.COMMAND_LIMIT_RULE ? (
                                                    <Grid item md={4}>
                                                        <FormControl fullWidth>
                                                            <InputLabel>Command</InputLabel>
                                                            <Select
                                                                variant="filled"
                                                                value={r.parameters[2]}
                                                                onChange={(event) => handleSetRuleParameterValue(idx, 2, event.target.value)}
                                                            >
                                                                <MenuItem value={0}>All Command</MenuItem>
                                                                <MenuItem value={1}>Forward Command</MenuItem>
                                                                <MenuItem value={2}>Left Command</MenuItem>
                                                                <MenuItem value={3}>Right Command</MenuItem>
                                                                <MenuItem value={4}>Back Command</MenuItem>
                                                                <MenuItem value={5}>Condition Command</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                ) : r.name === ruleType.ACTION_LIMIT_RULE ? (
                                                    <Grid item md={4}>
                                                        <FormControl fullWidth>
                                                            <InputLabel>Action</InputLabel>
                                                            <Select
                                                                variant="filled"
                                                                value={r.parameters[2]}
                                                                onChange={(event) => handleSetRuleParameterValue(idx, 2, event.target.value)}
                                                            >
                                                                <MenuItem value={0}>All Action</MenuItem>
                                                                <MenuItem value={1}>Forward Action</MenuItem>
                                                                <MenuItem value={2}>Left Action</MenuItem>
                                                                <MenuItem value={3}>Right Action</MenuItem>
                                                                <MenuItem value={4}>Back Action</MenuItem>
                                                                <MenuItem value={5}>Condition Action</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                ) : null
                                            }
                                            <Grid item md={4}>
                                                <FormControl fullWidth>
                                                    <Select
                                                        variant="filled"
                                                        value={r.parameters[1]}
                                                        onChange={(event) => handleSetRuleParameterValue(idx, 1, event.target.value)}
                                                    >
                                                        <MenuItem value={0}>less than or equal to</MenuItem>
                                                        <MenuItem value={1}>more than or equal to</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item md={4}>
                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    label="Value"
                                                    type="text"
                                                    value={r.parameters[0]}
                                                    onChange={(event) => handleSetRuleParameterValue(idx, 0, event.target.value)}
                                                    onBlur={(event) => handleSetRuleParameterValue(idx, 0, parseInt(event.target.value))}
                                                />
                                            </Grid>
                                        </>
                                    ) : r.name === ruleType.ITEM_COLLECTOR_RULE ? (
                                        <>
                                            <Grid item md={7}>
                                                <FormControl fullWidth>
                                                    <Select
                                                        variant="filled"
                                                        value={r.parameters[1]}
                                                        onChange={(event) => handleSetRuleParameterValue(idx, 1, event.target.value)}
                                                    >
                                                        <MenuItem value={0}>Have item in inventory less than or equal to</MenuItem>
                                                        <MenuItem value={1}>Have item in inventory more than or equal to</MenuItem>
                                                    </Select>
                                                </FormControl>
                                            </Grid>
                                            <Grid item md={5}>
                                                <TextField
                                                    fullWidth
                                                    variant="filled"
                                                    label="Value"
                                                    type="text"
                                                    value={r.parameters[0]}
                                                    onChange={(event) => handleSetRuleParameterValue(idx, 0, event.target.value)}
                                                    onBlur={(event) => handleSetRuleParameterValue(idx, 0, parseInt(event.target.value))}
                                                />
                                            </Grid>
                                        </>
                                    ) : null
                                }
                            </Grid>
                        ))
                    }
                </Box>
            </CardContent>
        </Card>
    );
};

export default RuleEditorCard;