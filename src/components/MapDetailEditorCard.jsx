import { Card, CardHeader, CardContent, FormControl, InputLabel, Select, Grid, TextField, MenuItem, Button, Typography, Stack, Box } from "@mui/material";
import { difficultyType } from "../enums/difficulty";

const MapDetailEditorCard = ({ mapDetailFormData, worlds, loading, setMapDetailFormData, onSelectImageFile }) => {
    return (
        <Card>
            <CardHeader title="Detail" sx={{ backgroundColor: "primary.dark" }} />
            <CardContent>
                <Grid container spacing={2}>
                    <Grid item md={6}>
                        {/* WORLD NAME */}
                        <FormControl fullWidth>
                            <InputLabel>World</InputLabel>
                            <Select
                                variant="filled"
                                value={mapDetailFormData.worldId}
                                onChange={(event) => {
                                    setMapDetailFormData({ ...mapDetailFormData, worldId: event.target.value });
                                }}
                            >
                                {
                                    !loading && worlds.map((w, idx) => (
                                        <MenuItem key={idx} value={w.world_id}>{w.world_name}</MenuItem>
                                    ))
                                }
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item md={6}>
                        {/* MAP NAME */}
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Name"
                            value={mapDetailFormData.name}
                            onChange={(event) => {
                                setMapDetailFormData({ ...mapDetailFormData, name: event.target.value });
                            }}
                        />
                    </Grid>

                    <Grid item md={6}>
                        {/* DIFFICULTY */}
                        <FormControl fullWidth>
                            <InputLabel>Difficulty</InputLabel>
                            <Select
                                variant="filled"
                                value={mapDetailFormData.difficulty}
                                onChange={(event) => {
                                    setMapDetailFormData({ ...mapDetailFormData, difficulty: event.target.value });
                                }}
                            >
                                <MenuItem value={difficultyType.EASY}>Easy</MenuItem>
                                <MenuItem value={difficultyType.MEDIUM}>Medium</MenuItem>
                                <MenuItem value={difficultyType.HARD}>Hard</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item md={6}>
                        {/* STAR REQUIREMENT */}
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Star Requirement"
                            value={mapDetailFormData.starRequirement}
                            onChange={(event) => {
                                setMapDetailFormData({ ...mapDetailFormData, starRequirement: event.target.value });
                            }}
                            onBlur={(event) => {
                                if (event.target.value) {
                                    setMapDetailFormData({ ...mapDetailFormData, starRequirement: parseInt(event.target.value) });
                                }
                            }}
                        />
                    </Grid>

                    {/* LEASE SOLVABLE COMMAND 3 */}
                    <Grid item md={4}>
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Least Solvable Command Gold"
                            value={mapDetailFormData.leastSolvableCommandGold}
                            onChange={(event) => {
                                setMapDetailFormData({ ...mapDetailFormData, leastSolvableCommandGold: event.target.value });
                            }}
                            onBlur={(event) => {
                                if (event.target.value) {
                                    setMapDetailFormData({ ...mapDetailFormData, leastSolvableCommandGold: parseInt(event.target.value) });
                                }
                            }}
                        />
                    </Grid>
                    <Grid item md={4}>
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Least Solvable Command Silver"
                            value={mapDetailFormData.leastSolvableCommandSilver}
                            onChange={(event) => {
                                setMapDetailFormData({ ...mapDetailFormData, leastSolvableCommandSilver: event.target.value });
                            }}
                            onBlur={(event) => {
                                if (event.target.value) {
                                    setMapDetailFormData({ ...mapDetailFormData, leastSolvableCommandSilver: parseInt(event.target.value) });
                                }
                            }}
                        />
                    </Grid>
                    <Grid item md={4}>
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Least Solvable Command Bronze"
                            value={mapDetailFormData.leastSolvableCommandBronze}
                            onChange={(event) => {
                                setMapDetailFormData({ ...mapDetailFormData, leastSolvableCommandBronze: event.target.value });
                            }}
                            onBlur={(event) => {
                                if (event.target.value) {
                                    setMapDetailFormData({ ...mapDetailFormData, leastSolvableCommandBronze: parseInt(event.target.value) });
                                }
                            }}
                        />
                    </Grid>

                    {/* LEAST SOLVABLE ACTION 3 */}
                    <Grid item md={4}>
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Least Solvable Action Gold"
                            value={mapDetailFormData.leastSolvableActionGold}
                            onChange={(event) => {
                                setMapDetailFormData({ ...mapDetailFormData, leastSolvableActionGold: event.target.value });
                            }}
                            onBlur={(event) => {
                                if (event.target.value) {
                                    setMapDetailFormData({ ...mapDetailFormData, leastSolvableActionGold: parseInt(event.target.value) });
                                }
                            }}
                        />
                    </Grid>
                    <Grid item md={4}>
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Least Solvable Action Silver"
                            value={mapDetailFormData.leastSolvableActionSilver}
                            onChange={(event) => {
                                setMapDetailFormData({ ...mapDetailFormData, leastSolvableActionSilver: event.target.value });
                            }}
                            onBlur={(event) => {
                                if (event.target.value) {
                                    setMapDetailFormData({ ...mapDetailFormData, leastSolvableActionSilver: parseInt(event.target.value) });
                                }
                            }}
                        />
                    </Grid>
                    <Grid item md={4}>
                        <TextField
                            fullWidth
                            variant="filled"
                            type="text"
                            label="Least Solvable Action Bronze"
                            value={mapDetailFormData.leastSolvableActionBronze}
                            onChange={(event) => {
                                setMapDetailFormData({ ...mapDetailFormData, leastSolvableActionBronze: event.target.value });
                            }}
                            onBlur={(event) => {
                                if (event.target.value) {
                                    setMapDetailFormData({ ...mapDetailFormData, leastSolvableActionBronze: parseInt(event.target.value) });
                                }
                            }}
                        />
                    </Grid>

                    {/* MAP IMAGE */}
                    <Grid item md={12}>
                        <Stack direction="row" spacing={2} alignItems="center">
                            <Button variant="contained" component="label">
                                Choose Map Image
                                <input
                                    hidden
                                    accept="image/png, image/jpg, image/jpeg"
                                    type="file"
                                    onChange={onSelectImageFile}
                                />
                            </Button>
                            <Typography>
                                {mapDetailFormData.currentFile ? mapDetailFormData.currentFile.name : null}
                            </Typography>
                        </Stack>

                        {/* PREVIEW IMAGE */}
                        {
                            mapDetailFormData.previewImage && (
                                <Box mt={2}>
                                    <img height={225} width={225} src={mapDetailFormData.previewImage} alt="map" />
                                </Box>
                            )
                        }
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default MapDetailEditorCard;