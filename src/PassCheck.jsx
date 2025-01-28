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
  const [decisionScore, setDecisionScore] = useState(0);
  const [similarityScore, setSimilarityScore] = useState(0);

  const [averageScore, setAverageScore] = useState(0);

  const [loading, setLoading] = useState(false);

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
      (regressionScore + randomForestScore + similarityScore) / 3
    );

    if (password) {
      setTimeout(() => {
        setLoading(true);
      }, 3000);
    }
  }, [regressionScore, randomForestScore, decisionScore, similarityScore]);

  useEffect(() => {
    if(loading){

      setTimeout(() => {
        setLoading(false)
      }, 3000);
 
    }
  }, [loading]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = {
      password: formData.get("password"),
    };
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Container
        component="main"
        maxWidth="md"
        sx={{
          height: "600px",
          backgroundColor: "#121212",
          minHeight: "600px",
          marginBottom: 4,
          paddingY: 4,
          borderRadius: 3,
          marginTop: { xs: 5, md: 10 },
        }}
      >
        {loading ? (
          <Container
            sx={{
              marginTop: { xs: 5, md: 5 },
              height: "600px",
            }}
          >
            <Typography
              variant="h5"
              color="primary"
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: 2,
              }}
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
                <Typography
                  variant="h6"
                  color="info"
                  sx={{ textAlign: "left" }}
                >
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
              sx={{
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: 2,
              }}
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
        ) : (
          <Container
            sx={{
              padding: 0,
            }}
          >
            <Box
              sx={{
                marginTop: 0,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* Title */}
              <Typography component="h1" variant="h5" sx={{ marginBottom: 2 }}>
                Choose Your Password
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
                  name="password"
                  label="Password"
                  value={password}
                  type="text"
                  id="password"
                  // autoComplete="current-password"
                  onChange={(e) => {
                    setPassword(e.target.value);
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
                  Submit
                </Button>
              </Box>
            </Box>
            <Typography color="secondary" variant="h6" sx={{ marginY: 2 }}>
    
              Password Remarks
            </Typography>


            <Typography sx={{ marginTop: 0 }}>
              
              1. Password Should be at 8 least characters long
            </Typography>
            <Typography sx={{ marginTop: 0 }}>
              
              2. Password should contain atleast one special character.
            </Typography>
            <Typography sx={{ marginTop: 0 }}>
              
              3. Password should contain atleast one uppercase
            </Typography>
            <Typography sx={{ marginTop: 0 }}>
              
              4. Password should contain atleast one digit
            </Typography>
            <Typography sx={{ marginTop: 0 }}>
              
              5. Password should contain lowercase
            </Typography>
            <Typography sx={{ marginTop: 0 }}>
              
              6. Don't use common predictable Passwords
            </Typography>
            {/* <Typography  sx={{marginTop : 0}} > 4. Make Combination of lowercase , uppercase , special character and numbers to make password unpredictable</Typography> */}
          </Container>
        )}
      </Container>
    </ThemeProvider>
  );
};

export default RegisterForm;
