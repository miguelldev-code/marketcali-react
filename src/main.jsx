import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import "./css/App.css";
import "./css/base.css";
import "./css/HomePage.css";
import "./css/Navbar.css";
import "./css/Footer.css";
import "./css/HomePage.css";
import "./css/About.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
