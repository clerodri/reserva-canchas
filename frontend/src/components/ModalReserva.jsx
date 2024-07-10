import { React, useEffect, useState } from "react";
import { FaCircleInfo } from "react-icons/fa6";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useCancha } from "../hooks/useCancha";
import { formatTime } from "../utils";

const BASE_URL = "http://localhost:8000/reservas/user";
export function ModalReserva({ idxSelected }) {
  const [show, setShow] = useState(false);
  console.log("Modal Rendering");
  console.log("MODAL", idxSelected);
  const handleInfoClick = () => {
    setShow(true);
  };
  return (
    <>
      <div onClick={handleInfoClick}>
        <FaCircleInfo size="1.5rem" color="gray" />
      </div>
      {show ? (
        <ModalInfo idxSelected={idxSelected} onClose={() => setShow(false)} />
      ) : null}
    </>
  );
}

function ModalInfo({ onClose, idxSelected }) {
  const { canchaSelected, reservas } = useCancha();
  const [userInfo, setUserInfo] = useState({});
  console.log(reservas);
  console.log(canchaSelected);
  const userId = reservas.find(
    (r) => r.horario.id === canchaSelected.horarios[idxSelected].id
  ).persona;
  useEffect(() => {
    const fetchUserName = () => {
      fetch(`${BASE_URL}/${userId}`)
        .then((res) => res.json())
        .then((data) => setUserInfo(data));
    };
    fetchUserName();
  }, []);
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex flex-col text-white items-center justify-center">
      <div className="mt-10 flex flex-col gap-5">
        <IoCloseCircleOutline
          className="place-self-end"
          size="2.5rem"
          color="white"
          onClick={onClose}
        />
        <div className="bg-green-600 rounded-xl px-20 py-10 flex flex-col gap-5 items-center mx-4">
          <h1 className="text-5xl font-extrabold max-w-md text-center">
            {canchaSelected.nombre}
          </h1>
          <h2 className="text-5xl font-bold text-center">{`${formatTime(
            canchaSelected.horarios[idxSelected].hora_inicio
          )} - ${formatTime(
            canchaSelected.horarios[idxSelected].hora_fin
          )}`}</h2>
          <h2 className="text-3xl font-thin">
            Reservado por {userInfo.nombre} {userInfo.apellido}
          </h2>
        </div>
      </div>
    </div>
  );
}

// function formatTime(dateString) {
//   const date = new Date(dateString);
//   const hours = String(date.getUTCHours()).padStart(2, "0");
//   const minutes = String(date.getUTCMinutes()).padStart(2, "0");
//   return `${hours}:${minutes}`;
// }
