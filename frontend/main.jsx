import ReactDOM from "react-dom/client";
import React from "react";
import { App } from "./src/App";
import "./index.css";
import { CanchaProvider } from "./src/context/cancha";
import { UserProvider } from "./src/context/currentUser";

ReactDOM.createRoot(document.getElementById("app")).render(
  <UserProvider>
    <CanchaProvider>
      <App />
    </CanchaProvider>
  </UserProvider>
);
