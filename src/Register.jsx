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
import axios from "axios";
import { toast } from "react-toastify";
import {useNavigate}from "react-router-dom"

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

const RegisterForm = () => {
  const axiosInstance = axios.create({
    baseURL: "http://localhost:4000",
    // baseURL : "https://crispy-spoon-9izq.onrender.com"
  });

  const navigate = useNavigate()
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = {
      email: formData.get("email"),
    };

    const { data } = await axiosInstance.post("/user/register", payload);

    if (data.success === true) {
      toast.success(data.message);
      setTimeout(() => {
        navigate("/pass-verification")
      }, 2000);
    
    } else {
      toast.error(data.message);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />

      <Container
        maxWidth="md"
        sx={{
          // border : "1px solid green ",
          backgroundColor: "#121212",
          minHeight: "600px",
          marginBottom: 4,
          paddingY: 4,
          borderRadius: 3,
          marginTop: { xs: 5, md: 10 },
          display: { xs: "block", md: "flex" },
        }}
      >
        <Container
          component="main"
          maxWidth="xs"
          sx={{
            height: "600px",
          }}
        >
          <Typography
            variant="h5"
            color="primary"
            sx={{ fontWeight: "bold", textAlign: "center" }}
          >
            ML based password validation system.
          </Typography>

          <Box
            sx={{
              marginTop: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {/* Icon */}
            <Box sx={{ marginBottom: 2 }}>
              <Typography
                variant="h2"
                color="primary"
                sx={{ fontWeight: "bold", textAlign: "center" }}
              >
                ∞
              </Typography>
            </Box>

            {/* Title */}
            <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
              Register With Us
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
                // InputLabelProps={{
                //   style: { color: "#AFAFAF" },
                // }}
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

              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{
                  backgroundColor: "#1DFDBF",
                  color: "#000000",
                  fontWeight: "bold",
                  marginTop: 4,
                  "&:hover": {
                    backgroundColor: "#19D6A9",
                  },
                }}
              >
                Register
              </Button>

              {/* Divider */}
              <Divider sx={{ marginY: 3 }}>OR</Divider>

              {/* Footer */}
              <Typography
                variant="body2"
                sx={{
                  marginTop: 2,
                  textAlign: "center",
                  color: "#AFAFAF",
                }}
              >
                Already have an Account?{" "}
                <Link href="/user/login" underline="hover" color="primary">
                  Login Now!
                </Link>
              </Typography>
            </Box>
          </Box>
        </Container>
      </Container>
    </ThemeProvider>
  );
};

export default RegisterForm;
