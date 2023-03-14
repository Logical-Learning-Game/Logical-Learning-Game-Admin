import { Box, Grid, List, ListItem, ListItemText, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { fetchSubmitHistoryData } from "../../api/fetchData";
import { useQuery } from "@tanstack/react-query";
import DataBox from "../../components/DataBox";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";

const submithistoryQuery = (sessionId) => ({
  queryKey: ["submitHistories", sessionId],
  queryFn: fetchSubmitHistoryData(sessionId)
});

export const loader = (queryClient) => {
  return async ({ params }) => {
    const query = submithistoryQuery(params.sessionId);
    const data = await queryClient.ensureQueryData(query);
    return data;
  };
};

const SessionInfo = () => {
  const { sessionId } = useParams();
  const { data: submitHistories, isLoading } = useQuery(submithistoryQuery(sessionId));

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

  const stateValueCommandDisplay = [
    {
      name: "Command",
      value: 1
    },
    {
      name: "Forward Command",
      value: 1
    },
    {
      name: "Right Command",
      value: 1
    },
    {
      name: "Back Command",
      value: 1
    },
    {
      name: "Left Command",
      value: 1
    },
    {
      name: "Condition Command",
      value: 1
    }
  ];

  const stateValueActionDisplay = [
    {
      name: "Action",
      value: 1
    },
    {
      name: "Forward Action",
      value: 1
    },
    {
      name: "Right Action",
      value: 1
    },
    {
      name: "Back Action",
      value: 1
    },
    {
      name: "Left Action",
      value: 1
    },
    {
      name: "Condition Action",
      value: 1
    }
  ];

  return (
    <>
      <Header title="SESSION INFO" subtitle="Session information" />

      <Grid container spacing={2}>
        <Grid item md={12}>
          <DataBox
            title="Submit Histories"
            sx={{
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: "background.paper",
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: "background.paper"
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: "background.paper"
              }
            }}
            contentComponent={
              !isLoading ? (
                <DataGrid
                  rows={submitHistories}
                  columns={columns}
                  components={{ Toolbar: GridToolbar }}
                  getRowId={(row) => row.submit_history_id}
                  autoPageSize
                  sx={{ height: "60vh", border: "none" }}
                />
              ) : (
                <DataGrid
                  loading
                  rows={[]}
                  columns={columns}
                  components={{ Toolbar: GridToolbar }}
                  getRowId={(row) => row.submit_history_id}
                  autoPageSize
                  sx={{ height: "60vh", border: "none" }}
                />
              )

            }
          />
        </Grid>
        <Grid item md={4}>
          <DataBox
            disableContentPadding
            title="State Value"
            contentComponent={
              <Grid container spacing={1}>
                <Grid item md={6}>
                  <List>
                    {
                      stateValueCommandDisplay.map((s, idx) => (
                        <ListItem key={idx}>
                          <ListItemText primary={
                            <>
                              <Box display="flex" justifyContent="space-between">
                                <Typography noWrap variant="subtitle2" fontWeight="medium">{s.name}: </Typography>
                                <Typography variant="subtitle2" fontWeight="light">{s.value}</Typography>
                              </Box>
                            </>
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
                        <ListItem key={idx}>
                          <ListItemText primary={
                            <>
                              <Box display="flex" justifyContent="space-between">
                                <Typography noWrap variant="subtitle2" fontWeight="medium">{s.name}: </Typography>
                                <Typography variant="subtitle2" fontWeight="light">{s.value}</Typography>
                              </Box>
                            </>
                          } />
                        </ListItem>
                      ))
                    }
                  </List>
                </Grid>
              </Grid>
            }
          />
        </Grid>
        <Grid item md={4}>
          <DataBox
            title="Rules"
          />
        </Grid>
        <Grid item md={4}>
          <DataBox
            title="Commands"
          />
        </Grid>
      </Grid>


    </>
  );
}

export default SessionInfo;