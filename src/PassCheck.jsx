import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  LinearProgress,
} from "@mui/material";

import { axiosInstance } from "./App";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import FAQSection from "./Accordion";

const RegisterForm = () => {
  const [password, setPassword] = useState("");
  const [PassRemarks, setPassRemarks] = useState("");
  const [PassRemarks2, setPassRemarks2] = useState("");

  const [regressionScore, setRegressionScore] = useState(0);
  const [randomForestScore, setRandomForestScore] = useState(0);
  const [decisionScore, setDecisionScore] = useState(0);
  const [similarityScore, setSimilarityScore] = useState(0);

  const [averageScore, setAverageScore] = useState(0);
  const [textColor, setColor] = useState("red");

  const [load, setLoad] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    document.title = "passProtekt | Pass check";
  }, []);

  const getLogisticRegression = useCallback(
    async (password) => {
      try {
        const { data } = await axiosInstance.post("/check/regression", {
          password,
        });
        setRegressionScore(data.regressionScore || 0);
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
        setRandomForestScore(data.randomForestScore || 0);
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
        setDecisionScore(data.decisionTreeScore || 0);
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
        setSimilarityScore(data.score || 50);
      } catch (error) {
        console.log(error);
      }
    },
    [axiosInstance]
  );

  // api call
  useEffect(() => {
    if (password.length > 4) {
      getLogisticRegression(password);
      getRandomForest(password);
      getDecisionScore(password);
      getSimilarityScore(password);
    } else {
      setPassRemarks("");
      setDecisionScore(0);
      setRandomForestScore(0);
      setSimilarityScore(0);
      setRegressionScore(0);
    }
  }, [password]);

  // calculate average
  useEffect(() => {
    setAverageScore(
      (regressionScore + randomForestScore + similarityScore) / 3
    );
  }, [regressionScore, randomForestScore, decisionScore, similarityScore]);

  // decison tree for ui
  useEffect(() => {
    if (averageScore > 0 && averageScore <= 30) {
      setPassRemarks("Very Weak Password!");
      setColor("red");
    } else if (averageScore > 30 && averageScore <= 60) {
      setPassRemarks("Weak Password!");
      setColor("orange");
    } else if (averageScore > 60 && averageScore <= 80) {
      setPassRemarks("Medium Strength Password!");
      setColor("blue");
    } else if (averageScore > 80 && averageScore <= 90) {
      setPassRemarks("Strong Password!");
      setColor("purple");
    } else if (averageScore > 90 && averageScore <= 100) {
      setPassRemarks(" Very Strong Password!");
      setColor("green");
      setLoad(false);
    } else {
      setPassRemarks("");
      setPassRemarks2("");
    }

    if (
      averageScore > 10 &&
      averageScore < 99 &&
      similarityScore > 0 &&
      similarityScore < 50
    ) {
      setPassRemarks2("Commonly Used Passwords!");
      setColor("red");
    } else {
      setPassRemarks2("");
    }

    if (averageScore < 90) {
      setLoad(true);
    }
  }, [averageScore, similarityScore]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = {
      password: formData.get("password"),
    };

    if (averageScore > 90) {
      const query = localStorage.getItem("email");
      const { data } = await axiosInstance.post(
        `/user/registerPassword?email=${query}`,
        payload
      );
      if (data.success) {
        toast.success(data.message);
        setTimeout(() => {
          navigate("/user/login");
          localStorage.removeItem("email");
        }, 2000);
      } else {
        toast.success(data.message);
      }
    }
  };

  return (
    <>
      <CssBaseline />

      <Container 
         component="main"
          maxWidth="md"
          sx={{
            backgroundColor: "#121212",
            minHeight: "600px",
            marginBottom: 4,
            paddingY: 4,
            borderRadius: 3,
            marginTop: { xs: 3, md: 3 },
          }}>
            

        <Container
          // component="main"
          // maxWidth="md"
          sx={{
            backgroundColor: "#121212",
            // minHeight: "600px",
            // marginBottom: 4,
            // paddingY: 4,
            // borderRadius: 3,
            // marginTop: { xs: 3, md: 3 },
            display: { md: "flex", sm: "block" },
          }}
        >
          <Container
            sx={{
              padding: 0,
              display: "flex",
              flexDirection: "column",
              // alignItems:"center",
              // justifyContent: { md: "center", sm: "flex-start" },
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
              <Typography
                variant="h5"
                color="primary"
                sx={{ fontWeight: "bold", textAlign: "center" }}
              >
                ML based password validation system.
              </Typography>

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
              <Typography
                variant="h6"
                color="primary"
                sx={{
                  fontWeight: "semi-bold",
                  textAlign: "center",
                  marginBottom: 2,
                }}
              >
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
                  disabled={load}
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
                  {!load ? "Submit" : "Check Password"}
                </Button>
              </Box>
            </Box>

            <Typography variant="h6" color="secondary" sx={{ marginY: 2 }}>
              Password Remarks
              <Typography sx={{ color: `${textColor}` }}>
                {PassRemarks} <br /> {PassRemarks2}
              </Typography>
            </Typography>
          </Container>

          <Container
            sx={{
              marginTop: { md: 5, sm: 0 },
            }}
          >
            <Typography
              variant="h6"
              color="primary"
              sx={{
                fontWeight: "semi-bold",
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
                // minHeight: 300,
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
              variant="h6"
              color="primary"
              sx={{
                fontWeight: "semi-bold",
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
          
        </Container>

        <FAQSection/>

      </Container>
    </>
  );
};

export default RegisterForm;
