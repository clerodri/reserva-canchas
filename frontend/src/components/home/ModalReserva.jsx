import React, { useState } from "react";
import { IoCloseCircleOutline } from "react-icons/io5";
import { MdCircle } from "react-icons/md";
import { useCancha } from "../../hooks/useCancha";
import "../../css/ModalReserva.css";
import useReservas from "../../hooks/useReservas";
import IconInfo from "./IconInfo";
import { useCurrentUser } from "../../hooks/useUser";
import { useFilters } from "../../hooks/useFilters";

//
function ModalReserva() {
  //
  const { canchaSelected, onCloseModal } = useCancha();
  const { filterHorarios } = useFilters();
  const horariosFiltrados = filterHorarios(canchaSelected.horarios);

  return (
    <div className="reserva">
      <div className="bg-white p-8 rounded-lg shadow-lg ">
        <div className=" header-reserva  ">
          <div>
            <IoCloseCircleOutline size="2rem " onClick={onCloseModal} />
          </div>
          <div>
            <MdCircle
              color={`${canchaSelected.disponibilidad ? "green" : "red"}`}
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
          <Horarios horarios={horariosFiltrados} />
        </div>
      </div>
    </div>
  );
}

function Horarios({ horarios }) {
  //
  const { addReserva, validarReserva } = useReservas();
  const { loading, error, onCloseModal, getCanchas } = useCancha();
  const [itemSelected, setItemSelected] = useState(null);
  const { currentUser } = useCurrentUser();
  console.log("USER ID:", currentUser.id);

  const handleAddReserva = () => {
    const newReserva = {
      horario_id: horarios[itemSelected].id,
      persona: currentUser.id,
    };
    addReserva(newReserva).then(() => {
      getCanchas(); //actualizo canchas
      onCloseModal(); //cierro modal
    });
  };

  // no render until we get data from horarios custom hook
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  return (
    <>
      <div className="sm:max-h-60  overflow-y-auto  bg-white sm:py-2">
        <ul className="flex flex-col space-y-2 bg-white p-7 ">
          {horarios?.length === 0 ? (
            <p className="text-xl text-red-700">No horarios disponibles...</p>
          ) : (
            horarios?.map((item, idx) => (
              <li
                key={idx}
                className={`flex  gap-5 items-center justify-between horario-item ${
                  validarReserva(item.id)
                    ? "bg-red-500 cursor-not-allowed flex"
                    : "cursor-pointer"
                } ${
                  itemSelected === idx
                    ? "border-green-600 bg-green-50"
                    : "border-transparent"
                }`}
                onClick={() => setItemSelected(idx)}
              >
                {item.hora_inicio} - {item.hora_fin}
                {validarReserva(item.id) ? (
                  <IconInfo horarioId={item.id} />
                ) : null}
              </li>
            ))
          )}
        </ul>
      </div>
      <div className="bg-slate-200 w-fit h-fit p-2 rounded-xl shadow-lg text-3xl font-extrabold text-green-700 ">
        <button
          className={itemSelected === null ? "cursor-not-allowed" : ""}
          onClick={handleAddReserva}
          disabled={itemSelected === null}
        >
          Reservar
        </button>
      </div>
    </>
  );
}

export default ModalReserva;
