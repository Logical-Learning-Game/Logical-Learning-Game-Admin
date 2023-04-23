import { Card, CardHeader, CardContent, Button, List, ListItem, ListItemText, Typography, CircularProgress } from "@mui/material";
import { useMapAnalyze } from "../hooks/useMapAnalyzer";
import { useMemo, useState } from "react";
import { commandType, edgeType } from "../enums/command";
import { toAdjacencyList } from "../utils/command";
import { commandDisplay } from "../utils/command";

const MapAnalyzerCard = ({ mapElements, height, width }) => {
    const [analyzeResult, setAnalyzeResult] = useState(null);
    const mapAnalyzeMutation = useMapAnalyze();
    const commandAdjacencyList = useMemo(() => {
        if (analyzeResult) {
            return toAdjacencyList(analyzeResult.commandNodes, analyzeResult.commandEdges);
        }
    }, [analyzeResult]);

    const handleMapAnalyze = () => {
        setAnalyzeResult(null);

        mapAnalyzeMutation.mutate({
            data: {
                tile: mapElements,
                height: height,
                width: width
            }
        }, {
            onSuccess: (data) => {
                const transformedData = {
                    ...data,
                    commandNodes: data.commandNodes.map((c) => {
                        let transformedType;
                        if (c.type === "Start") {
                            transformedType = commandType.START;
                        } else if (c.type === "Forward") {
                            transformedType = commandType.FORWARD;
                        } else if (c.type === "Left") {
                            transformedType = commandType.LEFT;
                        } else if (c.type === "Back") {
                            transformedType = commandType.BACK;
                        } else if (c.type === "Right") {
                            transformedType = commandType.RIGHT;
                        } else if (c.type === "ConditionalA") {
                            transformedType = commandType.CONDITIONAL_A;
                        } else if (c.type === "ConditionalB") {
                            transformedType = commandType.CONDITIONAL_B;
                        } else if (c.type === "ConditionalC") {
                            transformedType = commandType.CONDITIONAL_C;
                        } else if (c.type === "ConditionalD") {
                            transformedType = commandType.CONDITIONAL_D;
                        } else if (c.type === "ConditionalE") {
                            transformedType = commandType.CONDITIONAL_E;
                        }

                        return {
                            index: c.index,
                            type: transformedType
                        };
                    }),
                    commandEdges: data.commandEdges.map((e) => {
                        let transformedType;
                        if (e.type === "MainBranch") {
                            transformedType = edgeType.MAIN;
                        } else if (e.type === "ConditionalBranch") {
                            transformedType = edgeType.CONDITIONAL;
                        }

                        return {
                            source_node_index: e.sourceNodeIndex,
                            destination_node_index: e.destinationNodeIndex,
                            type: transformedType
                        };
                    })
                }

                console.log(transformedData);
                setAnalyzeResult(transformedData);
            },
        });
    };

    return (
        <Card
            sx={{
                display: "flex",
                flexDirection: "column",
                height: "584px"
            }}
        >
            <CardHeader
                title="Map Analyzer"
                sx={{ backgroundColor: "primary.dark" }}
                action={
                    <Button variant="contained" onClick={handleMapAnalyze}>
                        Analyze
                    </Button>
                }
            />

            {
                analyzeResult ? (
                    <CardContent
                        sx={{
                            overflowY: "auto",
                        }}
                    >
                        <>
                            <Typography variant="h6">
                                Commands
                            </Typography>
                            <List>
                                {
                                    commandAdjacencyList.map((c, idx) => (
                                        <ListItem key={idx} disablePadding>
                                            <ListItemText primary={commandDisplay(c, idx)} />
                                        </ListItem>
                                    ))
                                }
                            </List>

                            <Typography variant="h6">
                                Recommended Values
                            </Typography>
                            <List>
                                <ListItem disablePadding>
                                    <ListItemText primary={`Least Solvable Command Gold: ${analyzeResult.leastSolvableCommandGold}`} />
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemText primary={`Least Solvable Command Silver: ${analyzeResult.leastSolvableCommandSilver}`} />
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemText primary={`Least Solvable Command Bronze: ${analyzeResult.leastSolvableCommandBronze}`} />
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemText primary={`Least Solvable Action Gold: ${analyzeResult.leastSolvableActionGold}`} />
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemText primary={`Least Solvable Action Silver: ${analyzeResult.leastSolvableActionSilver}`} />
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemText primary={`Least Solvable Action Bronze: ${analyzeResult.leastSolvableActionBronze}`} />
                                </ListItem>
                            </List>
                        </>
                    </CardContent>
                ) : (
                    <CardContent
                        sx={{
                            overflowY: "auto",
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                            alignItems: "center",
                            flex: 1
                        }}
                    >
                        {
                            mapAnalyzeMutation.isLoading ? (
                                <CircularProgress color="secondary"/>
                            ) : mapAnalyzeMutation.isError ? (
                                mapAnalyzeMutation.error.code === 204 ? (
                                    <Typography textAlign="center">
                                        Solution not found
                                    </Typography>
                                ) : mapAnalyzeMutation.error.code === 504 ? (
                                    <Typography textAlign="center">
                                        Timeout
                                    </Typography>
                                ) : (
                                    null
                                )
                            ) : (
                                <Typography textAlign="center">
                                    Press analyze to start
                                </Typography>
                            )
                        }
                    </CardContent>
                )
            }
        </Card>
    );
};

export default MapAnalyzerCard;