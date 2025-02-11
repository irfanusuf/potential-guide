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
import { axiosInstance } from "./App";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

// import { Google as GoogleIcon } from "@mui/icons-material";



const LoginForm = () => {

  const navigate = useNavigate()
  const [email, setEmail] = useState("");
  const [isValid, setIsValid] = useState(true);
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

   useEffect(()=>{
      document.title = "passProtekt | Login"
    },[])

  const handleChange = (event) => {
    const value = event.target.value;
    setEmail(value);
    setIsValid(emailRegex.test(value));
  };



  const handleSubmit = async (event) => {

    try {
      event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const payload = {
      email: formData.get("email"),
      password: formData.get("password"),
    };
    const{data} =  await axiosInstance.post("/user/login" , payload)

    if(data.success){
      toast.success(data.message)
      localStorage.setItem("token" , data.token)
      
      setTimeout(() => {
        navigate("/user/profile")
      }, 2000);
    }
    else{
      toast.error(data.message)
    }
   
      
    } catch (error) {
      toast.error("Some Error")
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
          minheight: 600,
          paddingY: 4,
          paddingTop : 6,
          borderRadius: 3,
          marginTop: { xs: 5, md: 5 },
          marginBottom: 10,
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
              Login
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
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
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
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginBottom: 2,
                }}
              >
                <Link
                  href="#"
                  underline="hover"
                  color="primary"
                  variant="body2"
                >
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
                Don’t have an account?{" "}
                <Link href="/" underline="hover" color="primary">
                  Sign Up Now
                </Link>
              </Typography>
            </Box>
          </Box>
        </Container>
      </Container>
    </>
  );
};

export default LoginForm;
