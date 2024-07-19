import ReactDOM from "react-dom/client";
import React from "react";
import { App } from "./src/App";
import "./index.css";
import { CanchaProvider } from "./src/context/cancha";
import { UserProvider } from "./src/context/currentUser";
import { ReservaProvider } from "./src/context/reservas";
import { PagosProvider } from "./src/context/pagos";
import { FilterProvider } from "./src/context/filters";

ReactDOM.createRoot(document.getElementById("app")).render(
  <UserProvider>
    <ReservaProvider>
      <FilterProvider>
        <CanchaProvider>
          <PagosProvider>
            <App />
          </PagosProvider>
        </CanchaProvider>
      </FilterProvider>
    </ReservaProvider>
  </UserProvider>
);
