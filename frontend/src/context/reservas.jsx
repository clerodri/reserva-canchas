import { createContext, useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

export const ReservaContext = createContext(null);

const useReserva = () => {
  const [reservas, setReservas] = useState([]); //list reservas

  //
  const getReservas = async () => {
    try {
      const res = await axiosInstance.get("api/reservas");
      setReservas(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  //
  useEffect(() => {
    console.log("UseEffect: useReservas custom hook inside context:");
    getReservas();
  }, []); //re-run getReservas cuando pagos cambia.

  //
  const getUserIdByReserva = (horario_id) =>
    reservas.find((r) => r.horario.id === horario_id);

  //
  const reOrderReservas = (id) => {
    const indexReserva = reservas.findIndex((reserva) => reserva.id === id);
    if (indexReserva !== -1) {
      const newReservas = [...reservas];
      const [reserva] = newReservas.splice(indexReserva, 1);
      console.log("elemento eliminado:", reserva);
      newReservas.push(reserva);
      console.log("NUEVA REVERSAS", reservas);
      setReservas(newReservas);
    }
  };

  const addReserva = async (newReserva) => {
    try {
      const res = await axiosInstance.post(
        "api/reservas/new/",
        JSON.stringify(newReserva)
      );

      setReservas((p) => [...p, res.data]); //anade la reserva a la lista.
    } catch (error) {
      console.log(error.message);
    }
  };

  const validarReserva = (horarioId) => {
    const res = reservas.some((r) => r.horario.id === horarioId);
    return res;
  };

  //
  return {
    reservas,
    getUserIdByReserva,
    reOrderReservas,
    validarReserva,
    addReserva,
  };
};

export function ReservaProvider({ children }) {
  const {
    reservas,
    getUserIdByReserva,
    reOrderReservas,
    validarReserva,
    addReserva,
  } = useReserva();

  return (
    <ReservaContext.Provider
      value={{
        reservas,
        getUserIdByReserva,
        reOrderReservas,
        addReserva,
        validarReserva,
      }}
    >
      {children}
    </ReservaContext.Provider>
  );
}
