import { useContext } from "react";
import { ReservaContext } from "../context/reservas";

export const useReservas = () => {
  const context = useContext(ReservaContext);
  if (!context) {
    new Error("useReserva must be used within a ReservaProvider");
  }
  return context;
};
export default useReservas;
