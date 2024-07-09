import { createContext, useEffect, useReducer } from "react";
import { canchaReducer } from "../reducers/cancha.js";
const INITIAL_STATE = {
  canchas: [],
  loading: true,
  error: "",
  selected: null,
  filteredCanchas: [],
  reservas: [],
};
//  1. crear el contexto
export const CanchaContext = createContext();

// 2. CUSTOM HOOK FOR CONTEXT
function useCanchaReducer() {
  //console.log("Reducer Hook.");
  const [state, dispatch] = useReducer(canchaReducer, INITIAL_STATE);

  useEffect(() => {
    //console.log("Fetching data");
    const controller = new AbortController();
    fetchCanchas(controller.signal);
    fetchReservas(controller.signal);
    return () => {
      controller.abort(); // Cleanup fetch requests on unmount
    };
  }, []);

  const ordenarCanchas = () =>
    dispatch({
      type: "ORDER",
    });

  const filtrarCanchas = (payload) => {
    console.log(payload);
    dispatch({
      type: "FILTER",
      payload: payload,
    });
  };

  const onCanchaSelected = (item) => {
    dispatch({ type: "SELECTED", payload: item });
  };

  const clearFilter = () => {
    dispatch({ type: "CLEAR-FILTER" });
  };

  const fetchCanchas = (signal) => {
    fetch(`${import.meta.env.VITE_BASE_URL_RESERVAS}canchas`, { signal })
      .then((response) => response.json())
      .then((data) => dispatch({ type: "FETCH-SUCCESS", payload: data }))
      .catch((error) => {
        if (error.name !== "AbortError") {
          dispatch({ type: "FETCH-ERROR", payload: error });
        }
      });
  };

  const fetchReservas = (signal) => {
    fetch(`${import.meta.env.VITE_BASE_URL_RESERVAS}`, { signal })
      .then((response) => response.json())
      .then((data) =>
        dispatch({ type: "FETCH-RESERVAS-SUCCESS", payload: data })
      )
      .catch((error) => {
        if (error.name !== "AbortError") {
          dispatch({ type: "FETCH-RESERVAS-ERROR", payload: error });
        }
      });
  };

  return {
    ordenarCanchas,
    filtrarCanchas,
    state,
    onCanchaSelected,
    clearFilter,
    fetchCanchas,
    fetchReservas,
  };
}

// 3. Crear el provider, para proveer el EL HOOK GLOBALMENTE
export function CanchaProvider({ children }) {
  //console.log("Provider..");
  const {
    state,
    ordenarCanchas,
    filtrarCanchas,
    onCanchaSelected,
    clearFilter,
    fetchCanchas,
    fetchReservas,
  } = useCanchaReducer();
  return (
    <CanchaContext.Provider
      value={{
        canchas: state.filteredCanchas,
        ordenarCanchas,
        filtrarCanchas,
        onCanchaSelected,
        canchaSelected: state.selected,
        clearFilter,
        reservas: state.reservas,
        fetchCanchas,
        fetchReservas,
      }}
    >
      {children}
    </CanchaContext.Provider>
  );
}
