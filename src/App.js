import React from "react";
import LoginForm from "./Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterForm from "./Register";
import UserProfile from "./UserProfile";
import PassCheck from "./PassCheck"
import axios from "axios";



export  const axiosInstance = axios.create({
  baseURL: "http://localhost:4000",
  // baseURL : "https://crispy-spoon-9izq.onrender.com"
});

const App = () => {

  return (
    <>
      <BrowserRouter>
        
          <div className="main-container">

          <Routes>
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/" element={<RegisterForm />} />
            <Route path="/password/check" element={<PassCheck />} />
            <Route path="/user/login" element={<LoginForm />} />
            </Routes>
          </div>  
       
      </BrowserRouter>
    </>
  );
};

export default App;
