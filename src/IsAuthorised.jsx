import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const IsAuthorised = () => {
  const navigate = useNavigate();

  const isLoggedIn = localStorage.getItem("adminLogin");

  useEffect(() => {
    if (!isLoggedIn || isLoggedIn !== "success") {
      navigate("/user/login");
    }
  }, []);
};

export default IsAuthorised;
