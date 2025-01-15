import React from "react";
import LoginForm from "./Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import RegisterForm from "./Register";
import UserProfile from "./UserProfile";

const App = () => {
  return (
    <>
      <BrowserRouter>
        
          <div className="main-container">

          <Routes>
            <Route path="/user-profile" element={<UserProfile />} />
            <Route path="/" element={<RegisterForm />} />
            <Route path="/user/login" element={<LoginForm />} />
            </Routes>
          </div>
       
      </BrowserRouter>
    </>
  );
};

export default App;
