import ReactDOM from "react-dom/client";
import React from "react";
import { App } from "./src/App";
import "./index.css";
import { CanchaProvider } from "./src/context/cancha";

ReactDOM.createRoot(document.getElementById("app")).render(
  <CanchaProvider>
    <App />
  </CanchaProvider>
);
