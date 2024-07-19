import { createContext, useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
import { calcularTotal } from "../utils/utils";

export const PagosContext = createContext(null);

const useFetchPagos = () => {
  const [pagos, setPagos] = useState([]);

  const getPagos = async () => {
    try {
      const res = await axiosInstance.get("api/pagos");
      setPagos(res.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getPagos();
  }, []);

  const payReserva = async (reserva) => {
    try {
      const total = calcularTotal(
        reserva.horario.hora_inicio,
        reserva.horario.hora_fin,
        reserva.horario.cancha.costo_por_hora
      );
      const payment = {
        reserva_id: reserva.id,
        total: total,
      };
      //POST REQUEST
      const res = await axiosInstance.post(
        "api/pagos/new/",
        JSON.stringify(payment)
      );
      console.log("PAYMENT ADDED:", res.data);
      setPagos((p) => [...p, res.data]); //ADD ITEM TO PAGOS LIST
    } catch (error) {
      console.log("error making the post request", error.message);
    }
  };

  const validarReserva = (reservaId) => {
    const value = pagos.some((p) => p.reserva.id === reservaId);
    return value;
  };
  return {
    pagos,
    validarReserva,
    payReserva,
  };
};

export function PagosProvider({ children }) {
  const { pagos, payReserva, validarReserva } = useFetchPagos();

  return (
    <PagosContext.Provider value={{ pagos, payReserva, validarReserva }}>
      {children}
    </PagosContext.Provider>
  );
}
