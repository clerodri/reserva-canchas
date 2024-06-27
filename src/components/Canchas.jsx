import React from "react";
import { useState, useRef, useEffect } from "react";
import { MdCircle } from "react-icons/md";
import { Reserva } from "./Reserva";
import { useCancha } from "../hooks/useCancha";
import "../css/Cancha.css";
export function Canchas({}) {
  const { canchas } = useCancha();
  console.log(canchas);
  const [state, setState] = useState({
    showCancha: false,
    cancha: {},
  });
  const itemRef = useRef(null);

  //SCROOL INTO RESERVAVIEW
  useEffect(() => {
    if (state.showCancha && itemRef.current) {
      console.log("moving");
      itemRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [state.showCancha]);
  const toggleCancha = (item) => {
    setState((prevState) => ({
      ...prevState,
      cancha: item,
      showCancha: !state.showCancha,
    }));
  };
  const closeReserva = () => {
    setState((prevState) => ({
      ...prevState,
      showCancha: !state.showCancha,
    }));
  };

  return (
    <main className="canchas">
      <ul>
        {canchas &&
          canchas.map((item, index) => (
            <li key={index} onClick={() => toggleCancha(item)}>
              <div>
                <MdCircle
                  color={`${item.disponible === "true" ? "green" : "red"}`}
                  size="1.5rem"
                />
              </div>
              <img src="../public/cancha.png" alt="cancha dibujo" />
              <div>
                <strong>{item.name}</strong>
              </div>
              <div>
                <span>${item.value} / hora</span>
              </div>
            </li>
          ))}
      </ul>
      {state.showCancha && (
        <div ref={itemRef}>
          <Reserva cancha={state.cancha} toggle={closeReserva} />
        </div>
      )}
    </main>
  );
}

export default Canchas;
