import React from "react";
import { CgDollar } from "react-icons/cg";
import { usePagos } from "../hooks/usePagos";
import { formatDate, time } from "../utils/utils";

function Pagos() {
  const { pagos } = usePagos();
  console.log("PAGOS:", pagos);

  //
  return (
    <>
      <ul>
        {pagos?.map((item, idx) => (
          <PagoItem key={idx} data={item} />
        ))}
      </ul>
    </>
  );
}
function PagoItem({ data }) {
  const { fecha_creacion, reserva, total } = data;
  const { horario } = reserva;
  return (
    <div className="px-72">
      <div className="bg-white p-4 my-2 rounded-lg shadow-lg flex items-center justify-between gap-5">
        <div className="flex items-center">
          <CgDollar size="3rem" color="green" />
          <span className="ml-2 text-2xl font-bold mr-2">{total}</span>
        </div>
        <div className="flex flex-col ml-4">
          <h1 className="text-3xl font-bold">{horario.cancha.nombre}</h1>
          <div className="text-3xl text-gray-500">
            {time(horario.hora_inicio, horario.hora_fin)}
          </div>
        </div>
        <div className="text-gray-500 text-lg  font-semibold ml-auto">
          {formatDate(fecha_creacion)}
        </div>
      </div>
    </div>
  );
}

export default Pagos;
