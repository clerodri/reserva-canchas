import { createContext, useEffect, useReducer, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { reducer } from "../reducer/canchaReducer";

//  1. crear el contexto
export const CanchaContext = createContext(null);

const INITIAL_STATE = {
  canchas: [],
  canchaSelected: {},
  showModal: false,
  horarios: [],
};

//CUSTOM HOOK REDUCER FOR CANCHAS
const useCanchaReducer = () => {
  const [state, dispatch] = useReducer(reducer, INITIAL_STATE);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getCanchas = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("/api/canchas");
      dispatch({ type: "LOAD_DATA", payload: res.data });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getHorarios = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("api/horarios");
      dispatch({ type: "LOAD_HORARIOS", payload: res.data });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    console.log("UseEffect useCanchaReducer hook ");
    getCanchas();
    getHorarios();
  }, []);

  const onCanchaSelected = (item) => {
    dispatch({ type: "SELECT_CANCHA", payload: item });
  };

  const onCloseModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  const orderCanchasDisponibilidad = () => {
    dispatch({ type: "ORDER_CANCHAS" });
  };
  return {
    onCanchaSelected,
    canchaSelected: state.canchaSelected,
    openModal: state.showModal,
    canchas: state.canchas,
    onCloseModal,
    getCanchas,
    orderCanchasDisponibilidad,
    loading,
    error,
  };
};
// 3. Crear el provider, para proveer el EL HOOK GLOBALMENTE
export function CanchaProvider({ children }) {
  const {
    canchas,
    onCanchaSelected,
    canchaSelected,
    openModal,
    onCloseModal,
    getCanchas,
    orderCanchasDisponibilidad,
    loading,
    error,
  } = useCanchaReducer();
  //
  return (
    <CanchaContext.Provider
      value={{
        canchas,
        onCanchaSelected,
        canchaSelected,
        openModal,
        onCloseModal,
        getCanchas,
        orderCanchasDisponibilidad,
        loading,
        error,
      }}
    >
      {children}
    </CanchaContext.Provider>
  );
}
