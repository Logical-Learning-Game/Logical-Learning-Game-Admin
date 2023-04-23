import { Box, Typography, TextField, Button } from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import { useState } from "react";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { onLogin, error } = useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    onLogin(username, password);
  };

  return (
    <Box
      sx={{
        mt: 20,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Typography component="h1" variant="h4">
        Logical Learning Game Admin
      </Typography>
      <Box component="form" noValidate sx={{ mt: 4 }} onSubmit={handleSubmit}>
        <TextField
          margin="normal"
          required
          fullWidth
          label="Username"
          autoComplete="username"
          autoFocus
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <TextField
          margin="normal"
          required
          fullWidth
          label="Password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Sign In
        </Button>

        <Box>
          {
            error?.response.status === 401 || error?.response.status === 404 ? (
              <Typography variant="subtitle2" color="error.main">
                Username or Password is incorrect
              </Typography>
            ) : null
          }
        </Box>
      </Box>
    </Box>
  );
};

export default SignIn;