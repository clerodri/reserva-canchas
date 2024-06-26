import { createContext, useReducer } from "react";
import { data as initialCanchas } from "../data.js";
import { canchaReducer } from "../reducers/cancha.js";
const INITIAL_STATE = {
  canchas: initialCanchas,
};
//  1. crear el contexto
export const CanchaContext = createContext();

// 2. CUSTOM HOOK FOR CONTEXT
function useCanchaReducer() {
  const [state, dispatch] = useReducer(canchaReducer, INITIAL_STATE);

  const ordenarCanchas = () =>
    dispatch({
      type: "ORDER",
    });

  const filtrarCanchas = (inicio, fin) =>
    dispatch({
      type: "FILTER",
      inicio: inicio,
      fin: fin,
    });

  return { ordenarCanchas, filtrarCanchas, state };
}

// 3. Crear el provider, para proveer el EL HOOK GLOBALMENTE
export function CanchaProvider({ children }) {
  const { state, ordenarCanchas, filtrarCanchas } = useCanchaReducer();
  return (
    <CanchaContext.Provider
      value={{
        canchas: state.canchas,
        ordenarCanchas,
        filtrarCanchas,
      }}
    >
      {children}
    </CanchaContext.Provider>
  );
}
