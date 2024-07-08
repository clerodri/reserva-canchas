import "./App.css";
import { Header } from "./components/Header";
import { Canchas } from "./components/Canchas";
import { Filters } from "./components/Filters.jsx";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pagos from "./components/Pagos.jsx";
import Footer from "./components/Footer.jsx";
import Reservas from "./components/Reservas.jsx";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/home"
          element={
            <>
              <Canchas />
            </>
          }
        />
        <Route
          path="/pagos"
          element={
            <>
              <Header isModalOpen={false} />
              <Pagos />
            </>
          }
        />
        <Route
          path="/reservas"
          element={
            <>
              <Header isModalOpen={false} />
              <Reservas />
            </>
          }
        />
        <Route />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
