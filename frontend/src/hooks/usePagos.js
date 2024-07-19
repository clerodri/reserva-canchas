import { useContext } from "react";
import { PagosContext } from "../context/pagos";
export const usePagos = () => {
  const context = useContext(PagosContext);
  if (context === undefined) {
    new Error("Error de context pagos");
  }
  return context;
};
