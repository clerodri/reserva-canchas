import React, { useRef } from "react";
import "../css/Filters.css";

import { useCancha } from "../hooks/useCancha";
export function Filters() {
  const { filtrarCanchas, ordenarCanchas } = useCancha();
  const refInicio = useRef();
  const refFin = useRef();
  const filtrar = () => {
    filtrarCanchas(refInicio.current.value, refFin.current.value);
  };
  return (
    <>
      <section className="filters">
        <div>
          <button onClick={filtrar}>Filtrar</button>
        </div>
        <div>
          <button onClick={ordenarCanchas}>Ordenar</button>
        </div>
        <div>
          <label htmlFor="f_inicio">Fecha Inicio</label>
          <input
            ref={refInicio}
            type="text"
            id="f_inicio"
            placeholder="Inicio"
          />
        </div>
        <div>
          <label htmlFor="f_fin">Fecha Fin</label>
          <input ref={refFin} type="text" id="f_fin" placeholder="Fin" />
        </div>
      </section>
    </>
  );
}

export default Filters;
