import { ThemeProvider, CssBaseline, Box, Container } from "@mui/material";
import { theme } from "./theme";
import { QueryClientProvider } from "@tanstack/react-query";
import { Outlet } from "react-router-dom";
import { queryClient } from "./queryClient";
import Sidebar from "./pages/global/Sidebar";
import Topbar from "./pages/global/Topbar";

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Box
          display="flex"
        >
          <Sidebar />
          <Box width="100%">
            <Topbar />
            <Container 
              fixed
              sx={{
                mb: 2
              }}
            >
              <Outlet />
            </Container>
          </Box>
        </Box>

      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;