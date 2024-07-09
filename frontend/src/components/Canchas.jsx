import React from "react";
import { useState } from "react";
import { MdCircle } from "react-icons/md";
import { Reserva } from "./Reserva";
import { useCancha } from "../hooks/useCancha";
import "../css/Cancha.css";
import { Header } from "./Header";
import Filters from "./Filters";
import { useUser } from "../hooks/useUser";

export function Canchas() {
  const { canchas } = useCancha();
  const { currentUser } = useUser();
  const [showReserva, setShowReserva] = useState(false);
  console.log(currentUser);
  return (
    <>
      <div
        className={`flex px-10 py-4 ${showReserva ? "overflow-hidden" : ""}`}
      >
        <div className="flex flex-col">
          <Header isModalOpen={showReserva} />
          <Filters isModalOpen={showReserva} />
          <main className="canchas px-48 gap-10">
            <ul className="grid grid-cols-3 auto-rows-[300px]  gap-5">
              {canchas?.map((item, index) => (
                <CanchaItem
                  key={item.id || index}
                  onClickCancha={() => setShowReserva(true)}
                  item={item}
                />
              ))}
            </ul>
          </main>
        </div>
        {showReserva && <Reserva onClose={() => setShowReserva(false)} />}
      </div>
    </>
  );
}

export default Canchas;

function CanchaItem({ onClickCancha, item }) {
  const { onCanchaSelected } = useCancha();
  const test = () => {
    onCanchaSelected(item);
    onClickCancha();
  };
  return (
    <li
      className="flex flex-col items-center gap-1 bg-slate-300 rounded-2xl p-2"
      onClick={test}
    >
      <div>
        <MdCircle
          color={`${item.disponible === true ? "green" : "red"}`}
          size="1.5rem"
        />
      </div>
      <img src="static/images/cancha.png" alt="cancha dibujo" />
      <div>
        <strong>{item.nombre}</strong>
      </div>
      <div>
        <span>${item.costo_por_hora} / hora</span>
      </div>
    </li>
  );
}
