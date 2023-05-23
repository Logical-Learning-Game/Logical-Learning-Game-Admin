import { ThemeProvider, CssBaseline } from "@mui/material";
import { theme } from "./theme";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./queryClient";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import SignIn from "./pages/SignIn";
import Content from "./pages/Content";
import PlayerList, { loader as playerListLoader } from "./pages/players";
import PlayerInfo, { loader as playerInfoLoader } from "./pages/players/PlayerInfo";
import SessionInfo from "./pages/players/SessionInfo";
import TopSubmitInfo from "./pages/players/TopSubmitInfo";
import MapList, { loader as mapListLoader } from "./pages/maps";
import MapEditor, { loader as mapEditLoader } from "./pages/maps/MapEditor";
import MapBuilder from "./pages/maps/MapBuilder";

const App = () => {
  const { token } = useAuth();

  return (

    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        {
          !token ? (
            <Routes>
              <Route path="*" element={<SignIn />} />
            </Routes>
          ) : (
            <Routes>
              <Route path="/" element={<Content />}>
                <Route
                  path="players"
                  element={<PlayerList />}
                  loader={playerListLoader(queryClient)}
                />
                <Route
                  path="players/:playerId"
                  element={<PlayerInfo />}
                  loader={playerInfoLoader(queryClient)}
                />
                <Route
                  path="players/:playerId/sessions/:sessionId"
                  element={<SessionInfo />}
                />
                <Route
                  path="players/:playerId/map/:mapForPlayerId/top_submit"
                  element={<TopSubmitInfo />}
                />
                <Route
                  path="maps"
                  element={<MapList />}
                  loader={mapListLoader(queryClient)}
                />
                <Route
                  path="maps/:mapId/edit"
                  element={<MapEditor />}
                  loader={mapEditLoader(queryClient)}
                />
                <Route
                  path="maps/build"
                  element={<MapBuilder />}
                />
                <Route
                  index
                  element={<PlayerList/>}
                />
              </Route>
            </Routes>
          )
        }

      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;