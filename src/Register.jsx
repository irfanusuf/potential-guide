import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Container,
  CssBaseline,
  Divider,
  TextField,
  Typography,
  Link,
} from "@mui/material";

import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { axiosInstance } from "./App";
import logo from "./assets/logo.png"

const RegisterForm = () => {
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;



  useEffect(()=>{
    document.title = "passProtekt | Register"
  },[])

  const handleChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    setIsValid(emailRegex.test(value));
  };

  const navigate = useNavigate();


  
  const handleSubmit = async (event) => {
    try {
      event.preventDefault();
      const formData = new FormData(event.currentTarget);
      const payload = {
        email: formData.get("email"),
      };
  
      const { data } = await axiosInstance.post("/user/register", payload);
  
      if (data.success === true) {
        toast.success(data.message);
        localStorage.setItem("email", payload.email);
        setTimeout(() => {
          navigate("/password/check");
        }, 2000);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("some Error")
      console.log(error)
    }
  };

  return (
    <>
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
          marginTop: { xs: 5, md: 5 },
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
            sx={{ fontWeight: "bold", textAlign: "center" ,fontFamily: 'monospace', letterSpacing: '.2rem',}}
          >
            Welcome To PassProtekt
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
            <Box >
            
            <img src= {logo} alt="main-logo" width={200}/>
            </Box>

            {/* Title */}
            <Typography   variant="h6"
            // color="primary"
            sx={{ fontWeight: "semi-bold", textAlign: "center" }}>
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
                type="email"
                autoComplete="email"
                autoFocus
                variant="outlined"
                value={email}
                onChange={handleChange}
                error={!isValid}
                helperText={
                  !isValid ? "Please enter a valid email address" : ""
                }
                sx={{
                  input: { color: "#FFFFFF" },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: isValid ? "#1DFDBF" : "#FF1744", // Error border color
                    },
                    "&:hover fieldset": {
                      borderColor: isValid ? "#1DFDBF" : "#FF1744",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: isValid ? "#1DFDBF" : "#FF1744",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "#AFAFAF",
                  },
                  "& .MuiInputLabel-root.Mui-focused": {
                    color: isValid ? "#1DFDBF" : "#FF1744",
                  },
                }}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled = {!isValid}
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
    </>
  );
};

export default RegisterForm;
