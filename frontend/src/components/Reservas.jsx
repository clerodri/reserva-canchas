import React from "react";
import { AiFillDollarCircle } from "react-icons/ai";
import useReservas from "../hooks/useReservas";
import { calcularTotal, time } from "../utils/utils";
import { usePagos } from "../hooks/usePagos";

function Reservas() {
  //
  const { reservas, reOrderReservas } = useReservas();
  const { payReserva, validarReserva } = usePagos();
  console.log("RESERVAS", reservas);

  //
  const handlePayment = (reserva) => {
    if (reserva.id === null) return;
    payReserva(reserva).then(() => {
      reOrderReservas(reserva.id);
    });
  };

  return (
    <>
      <div className="">
        <ul className="mb:max-h-80 sm:max-h-80 overflow-y-auto md:max-h-96">
          {reservas?.map((item, idx) => (
            <div
              key={idx}
              className=" mb:max-h-fit sm:px-10  md:px-20 lg:px-40  2xl:px-80"
            >
              <div className="flex   mb:justify-between sm:items-center lg:justify-center lg:gap-x-52 2xl:gap-x-64 border p-4 rounded-md mb-2  bg-white shadow-xl">
                <div className="flex flex-col text-3xl mb:gap-5">
                  <span className="font-semibold mb:text-xl">
                    Cancha {item.horario.cancha.nombre}
                  </span>
                  <span className="text-gray-500 mb:text-sm md:text-2xl 2xl:text-3xl">
                    Horario:{" "}
                    {time(item.horario.hora_inicio, item.horario.hora_fin)}
                  </span>
                </div>
                <div className="flex mb:flex-col mb:justify-center mb:items-center md:flex-row ">
                  <div className="flex  items-center text-3xl ">
                    <h2 className="font-semibold mr-2   mb:text-xl">TOTAL: </h2>
                    <div className="flex justify-center items-center">
                      <h2 className=" font-bold  mr-2 mb:text-xl">
                        {calcularTotal(
                          item.horario.hora_inicio,
                          item.horario.hora_fin,
                          item.horario.cancha.costo_por_hora
                        )}
                      </h2>
                      <AiFillDollarCircle color="green" size="3rem" />
                    </div>
                  </div>
                  <div>
                    <button
                      className={`px-4 py-2 rounded-md ${
                        validarReserva(item.id)
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-gray-500 text-white cursor-pointer"
                      }`}
                      onClick={() => handlePayment(item)}
                      disabled={validarReserva(item.id)}
                    >
                      {validarReserva(item.id) ? "Pagado..." : "Pagar"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Reservas;
