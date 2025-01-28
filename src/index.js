import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./global.css";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <ToastContainer position="top-center" />
    <App />
  </>
);
