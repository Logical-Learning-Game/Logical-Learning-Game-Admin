import { Box, Card, CardContent, CardHeader, Stack, Button, Typography, Grid, List, ListItem, ListItemText, CardActions, Dialog, DialogTitle, DialogContent, TextField, DialogActions } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import VideogameAssetOutlinedIcon from '@mui/icons-material/VideogameAssetOutlined';
import VideogameAssetOffOutlinedIcon from '@mui/icons-material/VideogameAssetOffOutlined';
import { useState } from "react";
import Header from "../../components/Header";
import { ruleDisplay } from "../../utils/rule";
import { useEditWorld } from "../../hooks/useEditWorld";
import { useCreateWorld } from "../../hooks/useCreateWorld";
import { useWorldQuery, worldQueryOption } from "../../hooks/useWorldQuery";
import { useWorldWithMapQuery, worldWithMapQueryOption } from "../../hooks/useWorldWithMapQuery";
import { useSetMapActive } from "../../hooks/useSetMapActive";
import mapConfig from "../../config/mapConfig";


export const loader = (queryClient) => {
  return async ({ params }) => {
    const worldQuery = worldQueryOption();
    const worldData = await queryClient.ensureQueryData(worldQuery);

    const worldWithMapQuery = worldWithMapQueryOption();
    const worldWithMapData = await queryClient.ensureQueryData(worldWithMapQuery);

    return {
      worlds: worldData,
      worldWithMaps: worldWithMapData
    };
  };
};

const MapList = () => {
  const [editWorldDialogOpen, setEditWorldDialogOpen] = useState(false);
  const [editWorldDialogFormData, setEditWorldDialogFormData] = useState({ id: null, name: null });
  const [createWorldDialogOpen, setCreateWorldDialogOpen] = useState(false);
  const [createWorldDialogFormData, setCreateWorldDialogFormData] = useState({ name: null });
  const { data: worlds, isLoading: isWorldsLoading } = useWorldQuery();
  const { data: worldWithMaps, isLoading: isWorldWithMapLoading } = useWorldWithMapQuery();
  const editWorldMutation = useEditWorld();
  const createWorldMutation = useCreateWorld();
  const setMapActiveMutation = useSetMapActive();

  const handleEditWorldDialogOpen = (id, worldName) => {
    setEditWorldDialogOpen(true);
    setEditWorldDialogFormData({ id: id, name: worldName })
  };

  const handleEditWorldDialogClose = () => {
    setEditWorldDialogOpen(false);
    setEditWorldDialogFormData({ id: null, name: null });
  };

  const handleEditWorldDialogSave = () => {
    editWorldMutation.mutate({ worldId: editWorldDialogFormData.id, data: { world_name: editWorldDialogFormData.name } })
    setEditWorldDialogOpen(false);
  };

  const handleCreateWorldDialogOpen = () => {
    setCreateWorldDialogOpen(true);
  };

  const handleCreateWorldDialogClose = () => {
    setCreateWorldDialogOpen(false);
    setCreateWorldDialogFormData({ name: null });
  };

  const handleCreateWorldDialogCreate = () => {
    createWorldMutation.mutate({ data: { world_name: createWorldDialogFormData.name } })
    setCreateWorldDialogOpen(false);
  };

  const handleEnableMap = (mapId) => {
    setMapActiveMutation.mutate({mapId: mapId, data: {active: true}});
  };

  const handleDisableMap = (mapId) => {
    setMapActiveMutation.mutate({mapId: mapId, data: {active: false}});
  };

  const worldColumns = [
    {
      field: "world_id",
      headerName: "ID",
      flex: 2
    },
    {
      field: "world_name",
      headerName: "Name",
      flex: 3
    },
    {
      field: "action",
      headerName: "Action",
      flex: 1,
      renderCell: (params) => {
        return (
          <Button
            onClick={() => handleEditWorldDialogOpen(params.id, params.row.world_name)}
            variant="contained"
            size="small"
            startIcon={<EditOutlinedIcon />}
            color="secondary"
          >
            Edit
          </Button>
        );
      }
    }
  ];

  return (
    <>
      <Header title="MAPS" subtitle="Managing the maps" />

      {/* EDIT WORLD DIALOG */}
      <Dialog
        open={editWorldDialogOpen}
        onClose={handleEditWorldDialogClose}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Edit World</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="world-name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            defaultValue={editWorldDialogFormData.name}
            onBlur={(event) => setEditWorldDialogFormData({ ...editWorldDialogFormData, name: event.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditWorldDialogClose}>Cancel</Button>
          <Button onClick={handleEditWorldDialogSave}>Save</Button>
        </DialogActions>
      </Dialog>

      {/* CREATE WORLD DIALOG */}
      <Dialog
        open={createWorldDialogOpen}
        onClose={handleCreateWorldDialogClose}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Create World</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            required
            margin="dense"
            id="world-name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            onBlur={(event) => setCreateWorldDialogFormData({ ...createWorldDialogFormData, name: event.target.value })}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateWorldDialogClose}>Cancel</Button>
          <Button onClick={handleCreateWorldDialogCreate}>Create</Button>
        </DialogActions>
      </Dialog>

      <Stack spacing={2}>
        <Card>
          <CardHeader
            title="World List"
            action={
              <Button
                onClick={handleCreateWorldDialogOpen}
                color="primary"
                variant="contained"
                startIcon={<AddCircleOutlineOutlinedIcon />}>
                Create
              </Button>
            }
            sx={{ backgroundColor: "primary.dark" }}
          />
          <CardContent>
            <DataGrid
              loading={isWorldsLoading}
              rows={!isWorldsLoading ? worlds : []}
              columns={worldColumns}
              getRowId={(row) => row.world_id}
              autoPageSize
              sx={{ height: "50vh", border: "none" }}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader
            title="Map List"
            action={
              <Button
                component={Link}
                to="build"
                color="primary"
                variant="contained"
                startIcon={<AddCircleOutlineOutlinedIcon />}
              >
                Create
              </Button>
            }
            sx={{ backgroundColor: "primary.dark" }}
          />
          <CardContent sx={{ height: 800, overflowY: "auto" }}>
            <Stack spacing={2}>
              {
                !isWorldWithMapLoading && worldWithMaps.map((m, idx) => (
                  <Card key={idx} sx={{ display: "flex", p: 1 }} raised>
                    <Box width={300} ml={2}>
                      <img src={m.map_image_path} alt={`Map ${m.map_id}`} style={{ objectFit: "contain", height: "100%", width: "100%" }} />
                    </Box>
                    <CardContent sx={{ width: "100%", ml: 2 }}>
                      <Grid container spacing={1}>
                        <Grid item md={3}>
                          <Stack direction="column" spacing={3}>
                            <Box>
                              <Typography variant="subtitle2" color="text.secondary">
                                World
                              </Typography>
                              <Typography variant="subtitle2" color="text.primary">
                                {m.world_name}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="subtitle2" color="text.secondary">
                                Name
                              </Typography>
                              <Typography variant="subtitle2" color="text.primary">
                                {m.map_name}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="subtitle2" color="text.secondary">
                                Difficulty
                              </Typography>
                              <Typography variant="subtitle2" color="text.primary">
                                {m.difficulty}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="subtitle2" color="text.secondary">
                                Star Requirement
                              </Typography>
                              <Typography variant="subtitle2" color="text.primary">
                                {m.star_requirement}
                              </Typography>
                            </Box>
                          </Stack>

                        </Grid>
                        <Grid item md={4}>
                          <Stack direction="column" spacing={1}>
                            <Box>
                              <Typography noWrap variant="subtitle2" color="text.secondary">
                                Least Solvable Command Gold
                              </Typography>
                              <Typography variant="subtitle2" color="text.primary">
                                {m.least_solvable_command_gold}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="subtitle2" color="text.secondary">
                                Least Solvable Command Silver
                              </Typography>
                              <Typography variant="subtitle2" color="text.primary">
                                {m.least_solvable_command_silver}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="subtitle2" color="text.secondary">
                                Least Solvable Command Bronze
                              </Typography>
                              <Typography variant="subtitle2" color="text.primary">
                                {m.least_solvable_command_bronze}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="subtitle2" color="text.secondary">
                                Least Solvable Action Gold
                              </Typography>
                              <Typography variant="subtitle2" color="text.primary">
                                {m.least_solvable_action_gold}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="subtitle2" color="text.secondary">
                                Least Solvable Action Silver
                              </Typography>
                              <Typography variant="subtitle2" color="text.primary">
                                {m.least_solvable_action_silver}
                              </Typography>
                            </Box>
                            <Box>
                              <Typography variant="subtitle2" color="text.secondary">
                                Least Solvable Action Bronze
                              </Typography>
                              <Typography variant="subtitle2" color="text.primary">
                                {m.least_solvable_action_bronze}
                              </Typography>
                            </Box>
                          </Stack>

                        </Grid>
                        <Grid item md={5}>

                          <Box>
                            <Typography variant="subtitle2" color="text.secondary">
                              Rules
                            </Typography>
                            <List disablePadding>
                              {
                                m.rules.map((r, idx) => (
                                  <ListItem key={idx} disablePadding>
                                    <ListItemText
                                      primary={ruleDisplay(r)}
                                      primaryTypographyProps={{ variant: "subtitle2" }}
                                      secondary={`${r.rule_theme} theme`}
                                      secondaryTypographyProps={{ variant: "body2", fontWeight: "light" }}
                                    />
                                  </ListItem>
                                ))
                              }
                            </List>
                          </Box>
                        </Grid>
                      </Grid>

                      <CardActions sx={{ justifyContent: 'flex-end', gap: 2 }}>
                        <Button
                          component={Link}
                          to={`${m.map_id}/edit`}
                          variant="contained"
                          startIcon={<EditOutlinedIcon />}
                          size="small"
                          color="secondary"
                          //disabled={mapConfig.defaultMap.includes(m.map_id)}
                        >
                          Edit
                        </Button>
                        {
                          m.active ? (
                            <Button
                              variant="contained"
                              startIcon={<VideogameAssetOffOutlinedIcon />}
                              size="small"
                              color="warning"
                              onClick={() => handleDisableMap(m.map_id)}
                              disabled={mapConfig.defaultMap.includes(m.map_id)}
                            >
                              Disable
                            </Button>) : (
                            <Button
                              variant="contained"
                              startIcon={<VideogameAssetOutlinedIcon />}
                              size="small"
                              color="success"
                              onClick={() => handleEnableMap(m.map_id)}
                              disabled={mapConfig.defaultMap.includes(m.map_id)}
                            >
                              Enable
                            </Button>
                          )
                        }

                      </CardActions>
                    </CardContent>
                  </Card>
                ))
              }
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </>
  );
}

export default MapList;