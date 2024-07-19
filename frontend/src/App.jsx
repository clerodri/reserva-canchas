import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Pagos from "./components/Pagos.jsx";
import Reservas from "./components/Reservas.jsx";
import Home from "./components/Home.jsx";
import { Header } from "./components/core/Header.jsx";
import { Footer } from "./components/core/Footer.jsx";

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/home"
          element={
            <>
              <Home />
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
