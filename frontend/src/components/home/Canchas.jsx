import React from "react";
import { MdCircle } from "react-icons/md";
import "../../css/Cancha.css";
import ModalReserva from "./ModalReserva";
import { useCancha } from "../../hooks/useCancha";

export function Canchas() {
  const { canchas, openModal, onCanchaSelected, loading, error } = useCancha();
  console.log("canchas:", canchas);
  // no render until we get data from canchas custom hook
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <>
      <main className="canchas overflow-y-auto sm:max-h-48  md:max-h-fit md:justify-center">
        <ul className="grid sm:grid-cols-2 lg:grid-cols-3 auto-rows-[300px]  sm:gap-10 sm:p-5">
          {canchas?.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-1 bg-slate-300 rounded-2xl p-2 sm:h-fit"
              onClick={() => onCanchaSelected(item)}
            >
              <div>
                <MdCircle
                  size="1.5rem"
                  color={`${item.disponibilidad ? "green" : "red"}`}
                />
              </div>
              <img src="static/images/cancha.png" alt="cancha dibujo" />
              <div>
                <strong>{item.nombre}</strong>
              </div>
              <div>
                <span>${item.costo_por_hora} / hora</span>
              </div>
            </div>
          ))}
        </ul>
        {openModal ? <ModalReserva /> : null}
      </main>
    </>
  );
}

export default Canchas;
