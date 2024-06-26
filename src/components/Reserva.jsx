import React, { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdCircle } from "react-icons/md";

import "../css/Reserva.css";

export function Reserva({ cancha, toggle }) {
  return (
    <aside className="reserva">
      <div className=" header">
        <div>
          <IoCloseCircleOutline size="2rem " onClick={toggle} />
        </div>
        <div>
          <MdCircle
            color={`${cancha.disponible === "true" ? "green" : "red"}`}
            size="1.5rem"
          />
        </div>
      </div>
      <div>
        <h2>{cancha.name}</h2>
      </div>
      <img src="../public/cancha.png" alt="cancha dibujo" />
      <div>
        <p>{cancha.description}</p>
      </div>
      <div>
        <p>${cancha.value} / hora</p>
      </div>
      <Horarios horarios={cancha.horarios} />
      <div>
        <button onClick={toggle}>Reservar</button>
      </div>
    </aside>
  );
}

function Horarios({ horarios }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const handleItemClick = (index) => {
    setSelectedItem((prev) => index);
  };
  return (
    <>
      <h2>Seleccion de Horarios</h2>
      <div className="horarios">
        {horarios.map((horario, index) => (
          <div
            key={index}
            className={`p-3 my-2 border border-gray-400 rounded-md transition-colors ${
              horario.disponible === "false"
                ? "bg-red-500 cursor-not-allowed"
                : "cursor-pointer"
            } ${
              selectedItem === index
                ? "border-green-600 bg-green-50"
                : "border-transparent"
            }`}
            onClick={() => handleItemClick(index)}
          >
            {`${horario.h_inicio} - ${horario.h_fin}`}
          </div>
        ))}
      </div>
    </>
  );
}
export default Reserva;
