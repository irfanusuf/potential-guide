import React, { useCallback, useEffect, useState } from "react";
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
  LinearProgress,
} from "@mui/material";
import axios from "axios";
// import { Google as GoogleIcon } from "@mui/icons-material";

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
  const [password, setPassword] = useState("");
  const [regressionScore, setRegressionScore] = useState(0);
  const [randomForestScore, setRandomForestScore] = useState(0);
  const [decisionScore , setDecisionScore] = useState(0)
  const [similarityScore , setSimilarityScore] = useState(0)

  const [averageScore, setAverageScore] = useState(0);

  const axiosInstance = axios.create({
    // baseURL: "http://localhost:4000",
    baseURL : "https://crispy-spoon-9izq.onrender.com"
  });

  const getLogisticRegression = useCallback(
    async (password) => {
      try {
        const { data } = await axiosInstance.post("/check/regression", {
          password,
        });
        setRegressionScore(data.regressionScore);
      } catch (error) {
        console.log(error);
      }
    },
    [axiosInstance]
  );

  const getRandomForest = useCallback(
    async (password) => {
      try {
        const { data } = await axiosInstance.post("/check/randomForest", {
          password,
        });
        setRandomForestScore(data.randomForestScore);
      } catch (error) {
        console.log(error);
      }
    },
    [axiosInstance]
  );

 
  const getDecisionScore = useCallback(
    async (password) => {
      try {
        const { data } = await axiosInstance.post("/check/decision", {
          password,
        });
        setDecisionScore(data.decisionTreeScore);
      } catch (error) {
        console.log(error);
      }
    },
    [axiosInstance]
  );

  const getSimilarityScore = useCallback(
    async (password) => {
      try {
        const { data } = await axiosInstance.post("/check/similarity", {
          password,
        });
        setSimilarityScore(data.score);
      } catch (error) {
        console.log(error);
      }
    },
    [axiosInstance]
  );



  useEffect(() => {
    if (password) {
     
      getLogisticRegression(password);
      getRandomForest(password);
      getDecisionScore(password);
      getSimilarityScore(password);
    }
  }, [password]);
  
  useEffect(() => {
    setAverageScore(
      (regressionScore + randomForestScore  + similarityScore) / 3
    );
  }, [regressionScore, randomForestScore, decisionScore, similarityScore]);

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

      <Container
        maxWidth="md"
        sx={{
          // border : "1px solid green ",
          backgroundColor: "#121212",
          minHeight: "600px",
          marginBottom : 4,
          paddingY: 4,
          borderRadius: 3,
          marginTop: { xs: 5, md: 10 },
          display: { xs: "block", md: "flex" },
        }}
      >
        <Container component="main" maxWidth="xs" sx={{
          height : "600px"
        }}>
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
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="text"
                id="password"
                autoComplete="current-password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
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
              {/* Forgot Password */}
              {/* <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                marginBottom: 2,
              }}
            >
              <Link href="#" underline="hover" color="primary" variant="body2">
                Forgot password?
              </Link>
            </Box> */}

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

              {/* Google Login Button */}
              {/* <Button
              fullWidth
              variant="outlined"
              startIcon={<GoogleIcon />}
              sx={{
                color: "#1DFDBF",
                borderColor: "#1DFDBF",
                textTransform: "none",
                fontWeight: "bold",
                // fontFamily: "code",
                "&:hover": {
                  borderColor: "#19D6A9",
                },
              }}
            >
              Login with Google
            </Button> */}

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

        <Container sx={{ 
          marginTop: { xs: 5, md: 0 },
          height : "600px"
      }}>
          <Typography
            variant="h5"
            color="primary"
            sx={{ fontWeight: "bold", textAlign: "center", marginBottom: 2 }}
          >
            Password Strength
          </Typography>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: 300,
            }}
          >
            <Box sx={{ marginBottom: 2, width: "100%" }}>
              <Typography
                variant="h6"
                color="secondary"
                sx={{ textAlign: "left" }}
              >
                Decision Tree
              </Typography>
              <LinearProgress
                color="secondary"
                variant="determinate"
                value={decisionScore}
                sx={{ marginTop: 1 }}
              />
            </Box>

            <Box sx={{ marginBottom: 2, width: "100%" }}>
              <Typography
                variant="h6"
                color="success"
                sx={{ textAlign: "left" }}
              >
                Logistic Regression
              </Typography>
              <LinearProgress
                color="success"
                variant="determinate"
                value={regressionScore}
                sx={{ marginTop: 1 }}
              />
            </Box>

            <Box sx={{ marginBottom: 2, width: "100%" }}>
              <Typography variant="h6" color="info" sx={{ textAlign: "left" }}>
                Neural Network 
              </Typography>
              <LinearProgress
                color="info"
                variant="determinate"
                value={similarityScore}
                sx={{ marginTop: 1 }}
              />
            </Box>

            <Box sx={{ marginBottom: 2, width: "100%" }}>
              <Typography
                variant="h6"
                color="warning"
                sx={{ textAlign: "left" }}
              >
                Random Forest
              </Typography>
              <LinearProgress
                color="warning"
                variant="determinate"
                value={randomForestScore}
                sx={{ marginTop: 1 }}
              />
            </Box>
          </Box>

          <Typography
            variant="h5"
            color="primary"
            sx={{ fontWeight: "bold", textAlign: "center", marginBottom: 2 }}
          >
            Aggregrate Strength
          </Typography>

          <Box sx={{ marginBottom: 2, width: "100%" }}>
            <Typography variant="h6" color="#fff" sx={{ textAlign: "left" }}>
              Average ({averageScore.toFixed(2)}%)
            </Typography>
            <LinearProgress
              color="primary"
              variant="determinate"
              value={averageScore}
              sx={{ marginTop: 1 }}
            />
          </Box>
        </Container>
        
      </Container>
    </ThemeProvider>
  );
};

export default RegisterForm;
