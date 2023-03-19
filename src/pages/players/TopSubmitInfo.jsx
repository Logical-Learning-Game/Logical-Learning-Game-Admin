import { Grid, List, ListItem, ListItemIcon, ListItemText, Box, Stack, Typography } from "@mui/material";
import Header from "../../components/Header";
import DataBox from "../../components/DataBox";
import { useLocation } from "react-router-dom";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { ruleDisplay } from "../../utils/rule";
import { commandDisplay, toAdjacencyList } from "../../utils/command";

const TopSubmitInfo = () => {
    const { state } = useLocation();
    console.log(state);

    const stateValueCommandDisplay = [
        {
            name: "Command",
            value: state.top_submit_history.state_value.command_count
        },
        {
            name: "Forward Command",
            value: state.top_submit_history.state_value.forward_command_count
        },
        {
            name: "Right Command",
            value: state.top_submit_history.state_value.right_command_count
        },
        {
            name: "Back Command",
            value: state.top_submit_history.state_value.back_command_count
        },
        {
            name: "Left Command",
            value: state.top_submit_history.state_value.left_command_count
        },
        {
            name: "Condition Command",
            value: state.top_submit_history.state_value.condition_command_count
        }
    ];

    const stateValueActionDisplay = [
        {
            name: "Action",
            value: state.top_submit_history.state_value.action_count
        },
        {
            name: "Forward Action",
            value: state.top_submit_history.state_value.forward_action_count
        },
        {
            name: "Right Action",
            value: state.top_submit_history.state_value.right_action_count
        },
        {
            name: "Back Action",
            value: state.top_submit_history.state_value.back_action_count
        },
        {
            name: "Left Action",
            value: state.top_submit_history.state_value.left_action_count
        },
        {
            name: "Condition Action",
            value: state.top_submit_history.state_value.condition_action_count
        }
    ];

    const stateValueItemDisplay = [
        {
            name: "All Item",
            value: state.top_submit_history.state_value.all_item_count
        },
        {
            name: "Key A Item",
            value: state.top_submit_history.state_value.keya_item_count
        },
        {
            name: "Key B Item",
            value: state.top_submit_history.state_value.keyb_item_count
        },
        {
            name: "Key C Item",
            value: state.top_submit_history.state_value.keyc_item_count
        }
    ];

    const commandAdjacencyList = toAdjacencyList(state.top_submit_history.command_nodes, state.top_submit_history.command_edges);

    return (
        <>
            <Header title="TOP SUBMIT INFO" subtitle="Top submit information" />

            <Grid container spacing={2}>
                <Grid item md={4}>
                    <DataBox
                        title="Top Submit Detail"
                        sx={{
                            height: "320px"
                        }}
                        contentComponent={
                            <List>
                                <ListItem disableGutters>
                                    <Stack direction="row" justifyContent="space-between" width="100%">
                                        <Typography>
                                            Is Finited
                                        </Typography>
                                        <Box>
                                            {state.top_submit_history.is_finited ? <CheckIcon /> : <CloseIcon />}
                                        </Box>
                                    </Stack>
                                </ListItem>
                                <ListItem disableGutters>
                                    <Stack direction="row" justifyContent="space-between" width="100%">
                                        <Typography>
                                            Is Completed
                                        </Typography>
                                        {state.top_submit_history.is_completed ? <CheckIcon /> : <CloseIcon />}
                                    </Stack>
                                </ListItem>
                                <ListItem disableGutters>
                                    <Stack direction="row" justifyContent="space-between" width="100%">
                                        <Typography>
                                            Command Medal
                                        </Typography>
                                        <Typography>
                                            {state.top_submit_history.command_medal}
                                        </Typography>
                                    </Stack>
                                </ListItem>
                                <ListItem disableGutters>
                                    <Stack direction="row" justifyContent="space-between" width="100%">
                                        <Typography>
                                            Action Medal
                                        </Typography>
                                        <Typography>
                                            {state.top_submit_history.action_medal}
                                        </Typography>
                                    </Stack>
                                </ListItem>
                                <ListItem disableGutters>
                                    <Stack direction="row" justifyContent="space-between" width="100%">
                                        <Typography>
                                            Submit Date/Time
                                        </Typography>
                                        <Typography>
                                            {new Date(state.top_submit_history.submit_datetime).toLocaleString("en-GB")}
                                        </Typography>
                                    </Stack>
                                </ListItem>
                            </List>
                        }
                    />
                </Grid>
                <Grid item md={8}>
                    <DataBox
                        title="State Value"
                        sx={{
                            height: "320px"
                        }}
                        contentComponent={
                            <Grid container spacing={2}>
                                <Grid item md={4}>
                                    <List>
                                        {
                                            stateValueCommandDisplay.map((s, idx) => (
                                                <ListItem key={idx} disablePadding>
                                                    <ListItemText
                                                        primary={
                                                            <Stack direction="row" justifyContent="space-between">
                                                                <Typography noWrap variant="subtitle2" fontWeight="medium">{s.name}: </Typography>
                                                                <Typography variant="subtitle2" fontWeight="light">{s.value}</Typography>
                                                            </Stack>
                                                        }
                                                    />
                                                </ListItem>
                                            ))
                                        }
                                    </List>
                                </Grid>
                                <Grid item md={4}>
                                    <List>
                                        {
                                            stateValueActionDisplay.map((s, idx) => (
                                                <ListItem key={idx} disablePadding>
                                                    <ListItemText
                                                        primary={
                                                            <Stack direction="row" justifyContent="space-between">
                                                                <Typography noWrap variant="subtitle2" fontWeight="medium">{s.name}: </Typography>
                                                                <Typography variant="subtitle2" fontWeight="light">{s.value}</Typography>
                                                            </Stack>
                                                        }
                                                    />
                                                </ListItem>
                                            ))
                                        }
                                    </List>
                                </Grid>
                                <Grid item md={4}>
                                    <List>
                                        {
                                            stateValueItemDisplay.map((s, idx) => (
                                                <ListItem key={idx} disablePadding>
                                                    <ListItemText
                                                        primary={
                                                            <Stack direction="row" justifyContent="space-between">
                                                                <Typography noWrap variant="subtitle2" fontWeight="medium">{s.name}: </Typography>
                                                                <Typography variant="subtitle2" fontWeight="light">{s.value}</Typography>
                                                            </Stack>
                                                        }
                                                    />
                                                </ListItem>
                                            ))
                                        }
                                    </List>
                                </Grid>
                            </Grid>
                        }
                    />
                </Grid>
                <Grid item md={6}>
                    <DataBox
                        title="Rules"
                        sx={{
                            height: "300px"
                        }}
                        contentComponent={
                            <List>
                                {
                                    state.top_submit_history.rules.map((r, idx) => (
                                        <ListItem key={idx} disablePadding>
                                            <ListItemText
                                                primary={ruleDisplay(r.rule)}
                                                secondary={`${r.rule.rule_theme} theme`}
                                            />
                                            <ListItemIcon>
                                                {r.is_pass ? <CheckIcon /> : <CloseIcon />}
                                            </ListItemIcon>
                                        </ListItem>
                                    ))
                                }
                            </List>
                        }
                    />
                </Grid>
                <Grid item md={6}>
                    <DataBox
                        title="Commands"
                        contentComponent={
                            <List>
                                {
                                    commandAdjacencyList.map((c, idx) => (
                                        <ListItem key={idx} disablePadding>
                                            <ListItemText primary={commandDisplay(c, idx)}/>
                                        </ListItem>
                                    ))
                                }
                            </List>
                        }
                    />
                </Grid>
            </Grid>
        </>
    );
};

export default TopSubmitInfo;