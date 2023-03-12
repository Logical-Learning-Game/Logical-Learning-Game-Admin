import { ThemeProvider, CssBaseline, Box } from "@mui/material";
import { theme } from "./theme";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Sidebar from "./pages/global/Sidebar";
import Topbar from "./pages/global/Topbar";
import Players from "./pages/players";

const App = () => {
  return (
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
              <Route path="/" element={<Players/>}/>
            </Routes>
          </Box>
        </Box>

      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;