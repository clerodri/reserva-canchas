import { useContext } from "react";
import { CanchaContext } from "../context/cancha";
// Create a HOOKER CUSTOM to get the context and get acces to the state and dispatch from recuder.
export const useCancha = () => {
  const context = useContext(CanchaContext);

  if (context === undefined) {
    throw new Error("useCancha must be used within a CanchaProvider");
  }

  return context;
};
