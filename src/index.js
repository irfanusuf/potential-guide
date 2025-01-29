import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./global.css";
import { ToastContainer } from "react-toastify";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <>
    <ToastContainer
      position="top-center"
      autoClose={1000}
      hideProgressBar= {true}
      newestOnTop={false}
      closeOnClick={false}
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover={false}
      // theme="dark"
    />
    <App />
  </>
);
