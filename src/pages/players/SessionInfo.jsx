import { Card, CardContent, CardHeader, Grid, List, ListItem, ListItemIcon, ListItemText, Stack, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { useLocation } from "react-router-dom";
import { useMemo, useState } from "react";
import Header from "../../components/Header";
import { toAdjacencyList, commandDisplay } from "../../utils/command";
import { ruleDisplay } from "../../utils/rule";


const columns = [
  {
    field: "is_finited",
    headerName: "Is Finited",
    type: "boolean",
    flex: 1
  },
  {
    field: "is_completed",
    headerName: "Is Completed",
    type: "boolean",
    flex: 1
  },
  {
    field: "command_medal",
    headerName: "Command Medal",
    flex: 1
  },
  {
    field: "action_medal",
    headerName: "Action Medal",
    flex: 1
  },
  {
    field: "submit_datetime",
    headerName: "Submit Datetime",
    type: "date",
    valueGetter: (params) => new Date(params.value),
    valueFormatter: (params) => params.value.toLocaleString("en-GB"),
    flex: 1
  }
];

const SessionInfo = () => {
  const { state } = useLocation();
  const [selectedSubmitData, setSelectedSubmitData] = useState(null);

  const stateValueCommandDisplay = useMemo(() => {
    if (selectedSubmitData) {
      return [
        {
          name: "Command",
          value: selectedSubmitData.state_value.command_count
        },
        {
          name: "Forward Command",
          value: selectedSubmitData.state_value.forward_command_count
        },
        {
          name: "Right Command",
          value: selectedSubmitData.state_value.right_command_count
        },
        {
          name: "Back Command",
          value: selectedSubmitData.state_value.back_command_count
        },
        {
          name: "Left Command",
          value: selectedSubmitData.state_value.left_command_count
        },
        {
          name: "Condition Command",
          value: selectedSubmitData.state_value.condition_command_count
        }
      ];
    }
    return null;
  }, [selectedSubmitData])

  const stateValueActionDisplay = useMemo(() => {
    if (selectedSubmitData) {
      return [
        {
          name: "Action",
          value: selectedSubmitData.state_value.action_count
        },
        {
          name: "Forward Action",
          value: selectedSubmitData.state_value.forward_action_count
        },
        {
          name: "Right Action",
          value: selectedSubmitData.state_value.right_action_count
        },
        {
          name: "Back Action",
          value: selectedSubmitData.state_value.back_action_count
        },
        {
          name: "Left Action",
          value: selectedSubmitData.state_value.left_action_count
        },
        {
          name: "Condition Action",
          value: selectedSubmitData.state_value.condition_action_count
        }
      ];
    }
    return null;
  }, [selectedSubmitData])

  const stateValueItemDisplay = useMemo(() => {
    if (selectedSubmitData) {
      return [
        {
          name: "All Item",
          value: selectedSubmitData.state_value.all_item_count
        },
        {
          name: "Key A Item",
          value: selectedSubmitData.state_value.keya_item_count
        },
        {
          name: "Key B Item",
          value: selectedSubmitData.state_value.keyb_item_count
        },
        {
          name: "Key C Item",
          value: selectedSubmitData.state_value.keyc_item_count
        }
      ];
    }
    return null;
  }, [selectedSubmitData])

  const commandAdjacencyList = useMemo(() => {
    if (selectedSubmitData) {
      return toAdjacencyList(selectedSubmitData.command_nodes, selectedSubmitData.command_edges)
    }
    return null;
  }, [selectedSubmitData]);

  const handleSelectionChange = (selectionModel) => {
    const selectedRowId = selectionModel[0];
    const selectedData = state.submit_histories.find((s) => s.submit_history_id === selectedRowId);
    setSelectedSubmitData(selectedData);
  };

  return (
    <>
      <Header title="SESSION INFO" subtitle="Session information" />

      <Grid container spacing={2}>
        <Grid item md={12}>
          {/* Submit Histories */}
          <Card>
            <CardHeader
              title="Submit Histories"
              sx={{ backgroundColor: "primary.dark" }}
            />
            <CardContent
            >
              <DataGrid
                rows={state.submit_histories}
                columns={columns}
                components={{ Toolbar: GridToolbar }}
                getRowId={(row) => row.submit_history_id}
                autoPageSize
                onRowSelectionModelChange={handleSelectionChange}
                sx={{ height: "60vh", border: "none" }}
              />
            </CardContent>
          </Card>
        </Grid>
        {selectedSubmitData ?
          (<>
            <Grid item md={4}>
              {/* State Value */}
              <Card>
                <CardHeader
                  title="State Value"
                  sx={{ backgroundColor: "primary.dark" }}
                />
                <CardContent
                  sx={{ height: "400px", overflowY: "auto" }}
                >
                  <Grid container spacing={2}>
                    <Grid item md={6}>
                      <List>
                        {
                          stateValueCommandDisplay.map((s, idx) => (
                            <ListItem key={idx} disablePadding>
                              <ListItemText primary={
                                <Stack direction="row" justifyContent="space-between">
                                  <Typography noWrap variant="subtitle2" fontWeight="medium">{s.name}: </Typography>
                                  <Typography variant="subtitle2" fontWeight="light">{s.value}</Typography>
                                </Stack>
                              } />
                            </ListItem>
                          ))
                        }
                      </List>
                    </Grid>
                    <Grid item md={6}>
                      <List>
                        {
                          stateValueActionDisplay.map((s, idx) => (
                            <ListItem key={idx} disablePadding>
                              <ListItemText primary={
                                <Stack direction="row" justifyContent="space-between">
                                  <Typography noWrap variant="subtitle2" fontWeight="medium">{s.name}: </Typography>
                                  <Typography variant="subtitle2" fontWeight="light">{s.value}</Typography>
                                </Stack>
                              } />
                            </ListItem>
                          ))
                        }
                      </List>
                    </Grid>
                    <Grid item md={6}>
                      <List>
                        {
                          stateValueItemDisplay.map((s, idx) => (
                            <ListItem key={idx} disablePadding>
                              <ListItemText primary={
                                <Stack direction="row" justifyContent="space-between">
                                  <Typography noWrap variant="subtitle2" fontWeight="medium">{s.name}: </Typography>
                                  <Typography variant="subtitle2" fontWeight="light">{s.value}</Typography>
                                </Stack>
                              } />
                            </ListItem>
                          ))
                        }
                      </List>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={4}>
              {/* Rules */}
              <Card>
                <CardHeader
                  title="Rules"
                  sx={{ backgroundColor: "primary.dark" }}
                />
                <CardContent
                  sx={{ height: "400px", overflowY: "auto" }}
                >
                  <List>
                    {
                      selectedSubmitData.rules.map((r, idx) => (
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
                </CardContent>
              </Card>
            </Grid>
            <Grid item md={4}>
              {/* Commands */}
              <Card>
                <CardHeader
                  title="Commands"
                  sx={{ backgroundColor: "primary.dark" }}
                />
                <CardContent
                  sx={{ height: "400px", overflowY: "auto" }}
                >
                  <List>
                    {
                      commandAdjacencyList.map((c, idx) => (
                        <ListItem key={idx} disablePadding>
                          <ListItemText primary={commandDisplay(c, idx)} />
                        </ListItem>
                      ))
                    }
                  </List>
                </CardContent>
              </Card>
            </Grid>
          </>) : (<></>)
        }
      </Grid>


    </>
  );
}

export default SessionInfo;