import { React, useState } from "react";
import { FaCircleInfo } from "react-icons/fa6";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useCancha } from "../../hooks/useCancha";
import { time } from "../../utils/utils";
import useReservas from "../../hooks/useReservas";

import { useModalInfo } from "../../hooks/useModalInfo";

export function IconInfo({ horarioId }) {
  //
  const [show, setShow] = useState(false);
  const handleInfoClick = () => {
    setShow(true);
  };
  return (
    <>
      <div onClick={handleInfoClick}>
        <FaCircleInfo size="1.5rem" color="gray" />
      </div>
      {show ? (
        <ModalInfo horarioId={horarioId} onClose={() => setShow(false)} />
      ) : null}
    </>
  );
}

function ModalInfo({ onClose, horarioId }) {
  //
  const { getUserIdByReserva } = useReservas();
  const userId = getUserIdByReserva(horarioId);
  const { userInfo, loading, error } = useModalInfo({ userId });
  const { canchaSelected } = useCancha();

  //NO RENDER UNTIL GET DATA FROM  CUSTOM HOOK USERINFO
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Errors: {error}</div>;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex flex-col text-white items-center justify-center">
      <div className="mt-10 flex flex-col gap-5">
        <IoCloseCircleOutline
          className="place-self-end"
          size="2.5rem"
          color="white"
          onClick={onClose}
        />
        {userInfo && (
          <div className="bg-green-600 rounded-xl px-20 py-10 flex flex-col gap-5 items-center mx-4">
            <h1 className="text-5xl font-extrabold max-w-md text-center">
              {canchaSelected.nombre}
            </h1>
            <h2 className="text-5xl font-bold text-center">
              {time(userId.horario.hora_inicio, userId.horario.hora_fin)}
            </h2>
            <h2 className="text-3xl font-thin">
              Reservado por {userInfo?.nombre} {userInfo?.apellido}
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}
export default IconInfo;
