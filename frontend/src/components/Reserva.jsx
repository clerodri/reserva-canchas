import React, { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdCircle } from "react-icons/md";
import "../css/Reserva.css";
import { useCancha } from "../hooks/useCancha";
import { ModalReserva } from "./ModalReserva";
import axiosInstance from "./axiosInstance";
import { useUser } from "../hooks/useUser";
import { formatTime } from "../utils";

export function Reserva({ onClose }) {
  const { canchaSelected, fetchCanchas, fetchReservas } = useCancha();
  const { currentUser } = useUser();
  console.log(canchaSelected);
  const [horarioId, setHorarioId] = useState(null);

  const handleHorarioId = (idx) => {
    setHorarioId(idx);
    console.log("horario selected:", canchaSelected.horarios[idx].id);
  };

  const submitReserva = async () => {
    console.log(canchaSelected.horarios);
    const horarioSelected = canchaSelected.horarios[horarioId];
    if (horarioId === null) return;
    if (horarioSelected.reserved) return;

    const myReserva = {
      horario: horarioSelected.id,
      persona: currentUser.id,
    };

    try {
      await axiosInstance.post("reservas/reserva", JSON.stringify(myReserva));
    } catch (error) {
      console.error("Error to save an reservas in DB", error);
    }
    fetchCanchas(); //actualizo horario de las canchas
    fetchReservas(); // actualizo lista de reservas
    onClose(); //Cierro el modal de reserva
  };
  return (
    <div className="reserva">
      <div className="bg-white p-8 rounded-lg shadow-lg ">
        <div className=" header-reserva  ">
          <div>
            <IoCloseCircleOutline size="2rem " onClick={onClose} />
          </div>
          <div>
            <MdCircle
              color={`${canchaSelected.disponible === true ? "green" : "red"}`}
              size="1.5rem"
            />
          </div>
        </div>
        <div className="body-reserva">
          <div>
            <h2 className="text-5xl font-bold">{canchaSelected.nombre}</h2>
          </div>
          <img
            className="rounded-xl shadow-md"
            src="static/images/cancha.png"
            alt="cancha dibujo"
          />
          <div>
            <p>{canchaSelected.descripcion}</p>
          </div>
          <div>
            <p>${canchaSelected.costo_por_hora} / hora</p>
          </div>
        </div>
        <div className="footer-reserva">
          <Horarios
            horarios={canchaSelected.horarios}
            isDisponible={canchaSelected.disponible}
            horarioIdSelected={handleHorarioId}
          />
          <div className="bg-slate-200 w-fit h-fit p-2 rounded-xl shadow-lg text-3xl font-extrabold text-green-700 ">
            <button
              className={`${canchaSelected.disponible ? "" : "hidden"}`}
              onClick={submitReserva}
            >
              Reservar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Horarios({ horarios, isDisponible, horarioIdSelected }) {
  console.log(horarios);

  const [itemSelected, setItemSelected] = useState(null);

  const handleSelection = (idx) => {
    setItemSelected(idx);

    horarioIdSelected(idx);
  };
  return (
    <>
      <div className="sm:max-h-60  overflow-y-auto  bg-white sm:py-2">
        <ul className="flex flex-col space-y-2 bg-white p-7 ">
          {horarios.map((item, idx) => (
            <li
              key={idx}
              className={`${
                isDisponible ? "items-center justify-between" : ""
              }flex  gap-5 items-center justify-between horario-item ${
                horarios[idx].reserved === true
                  ? "bg-red-500 cursor-not-allowed flex"
                  : "cursor-pointer"
              } ${
                itemSelected === idx
                  ? "border-green-600 bg-green-50"
                  : "border-transparent"
              }`}
              onClick={() => handleSelection(idx)}
            >
              {`${formatTime(item.hora_inicio)} - ${formatTime(item.hora_fin)}`}
              {horarios[idx].reserved ? (
                <ModalReserva idxSelected={itemSelected} />
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default Reserva;
