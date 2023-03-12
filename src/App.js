import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { theme } from "./theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from 'react-query'
import Sidebar from "./pages/global/Sidebar";
import Topbar from "./pages/global/Topbar";
import PlayerList from "./pages/players";
import PlayerInfo from "./pages/players/PlayerInfo";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />

          <Box
            display="flex"
            position="relative"
            height="100%"
            width="100%"
          >
            <Sidebar />
            <Box height="100%" width="100%">
              <Topbar />
              <Routes>
                <Route path="/players" element={<PlayerList />} />
                <Route path="/players/:id" element={<PlayerInfo />} />
              </Routes>
            </Box>
          </Box>

        </ThemeProvider>
      </BrowserRouter>
    </QueryClientProvider >
  );
}

export default App;