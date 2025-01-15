import React from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  TextField,
  Typography,
  Link,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { Google as GoogleIcon } from "@mui/icons-material";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#1DFDBF",
    },
    background: {
      default: "#0F0F0F",
      paper: "#121212",
    },
    text: {
      primary: "#FFFFFF",
      secondary: "#AFAFAF",
    },
  },
  typography: {
    fontFamily: "Arial, sans-serif",
  },
});

const LoginForm = () => {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    console.log("Login Data:", data);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Icon */}
          <Box sx={{ marginBottom: 2 }}>
            <Typography
              variant="h1"
              color="primary"
              sx={{ fontWeight: "bold", textAlign: "center" }}
            >
              ∞
            </Typography>
          </Box>

          {/* Title */}
          <Typography component="h1" variant="h4" sx={{ marginBottom: 2 }}>
            Log in
          </Typography>

          {/* Form */}
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{
              width: "100%", // Fixes container width
            }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              variant="outlined"
              InputLabelProps={{
                style: { color: "#AFAFAF" },
              }}
              sx={{
                input: { color: "#FFFFFF" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#1DFDBF",
                  },
                  "&:hover fieldset": {
                    borderColor: "#1DFDBF",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#1DFDBF",
                  },
                },
              }}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              InputLabelProps={{
                style: { color: "#AFAFAF" },
              }}
              sx={{
                input: { color: "#FFFFFF" },
                "& .MuiOutlinedInput-root": {
                  "& fieldset": {
                    borderColor: "#1DFDBF",
                  },
                  "&:hover fieldset": {
                    borderColor: "#1DFDBF",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#1DFDBF",
                  },
                },
              }}
            />
            {/* Forgot Password */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: 2,
              }}
            >
              <Link href="#" underline="hover" color="primary" variant="body2">
                Forgot password?
              </Link>
            </Box>

            {/* Submit Button */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                backgroundColor: "#1DFDBF",
                color: "#000000",
                fontWeight: "bold",
                "&:hover": {
                  backgroundColor: "#19D6A9",
                },
              }}
            >
              Log in
            </Button>

            {/* Divider */}
            <Divider sx={{ marginY: 3}}>
              OR
            </Divider>

            {/* Google Login Button */}
            <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              sx={{
                color: "#1DFDBF",
                borderColor: "#1DFDBF",
                textTransform: "none",
                fontWeight: "bold",
                "&:hover": {
                  borderColor: "#19D6A9",
                },
              }}
            >
              Login with Google
            </Button>

            {/* Footer */}
            <Typography
              variant="body2"
              sx={{
                marginTop: 2,
                textAlign: "center",
                color: "#AFAFAF",
              }}
            >
              Don’t have an account?{" "}
              <Link href="#" underline="hover" color="primary">
                Sign Up Now
              </Link>
            </Typography>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default LoginForm;
