import React from "react";
import LoginForm from "./Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterForm from "./Register";
import UserProfile from "./UserProfile";
import PassCheck from "./PassCheck";
import axios from "axios";
import { createTheme, ThemeProvider } from "@mui/material";
import NavBar from "./AppBar";

export const axiosInstance = axios.create({
  // baseURL: "http://localhost:4000",
  baseURL : "https://crispy-spoon-9izq.onrender.com"
});

const App = () => {
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

  return (
    <>
      <ThemeProvider theme={theme}>
        <BrowserRouter>

          <NavBar/>

          <div className="main-container">
            <Routes>
              
              <Route path="/" element={<RegisterForm />} />
              <Route path="/password/check" element={<PassCheck />} />
              <Route path="/user/register" element={<RegisterForm />} />
              <Route path="/user/login" element={<LoginForm />} />
              <Route path="/user/profile" element={<UserProfile />} />
             
            </Routes>
          </div>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
};

export default App;
