import React, { useState } from "react";
import "../../css/OrderModal.css";
import { FaCalendarAlt } from "react-icons/fa";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useCancha } from "../../hooks/useCancha";
//
export function OrderModal() {
  const { orderCanchasDisponibilidad } = useCancha();
  const [openModal, setOpenModal] = useState(false);

  const handleOrderDisponibilidad = () => {
    setOpenModal(false);
    orderCanchasDisponibilidad();
  };

  const handleOrderPrice = () => {
    setOpenModal(false);
  };
  //
  return (
    <>
      <div className="relative inline-block">
        <div
          onClick={() => setOpenModal((p) => !p)}
          className="relative z-10 p-2 "
        >
          <FaCalendarAlt size="3rem" color="green" className="cursor-pointer" />
          <span>Order</span>
        </div>
        {openModal && (
          <div className="absolute left-12 top-14  w-44 p-5 bg-gray-300 rounded-lg shadow-lg ">
            <div className="flex flex-col space-y-2 justify-center cursor-pointer">
              <div
                className="bg-slate-200 rounded-lg p-3 "
                onClick={handleOrderDisponibilidad}
              >
                Disponibilidad
              </div>
              <div
                className="bg-slate-200 rounded-lg p-3"
                onClick={handleOrderPrice}
              >
                Price
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default OrderModal;
