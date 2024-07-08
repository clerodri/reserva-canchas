import React, { useEffect, useState } from "react";
import "../css/Filters.css";
import { FaCalendarAlt } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImFilter } from "react-icons/im";
import { useCancha } from "../hooks/useCancha";
import { useForm } from "react-hook-form";
import { OrderModal } from "./OrderModal";
let label = "Se muestran las canchas con horarios disponibles de";
const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
export function Filters({ isModalOpen }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const { filtrarCanchas, ordenarCanchas, clearFilter } = useCancha();
  const [msg, setMsg] = useState(false);
  const [orderModal, setOrderModal] = useState(false);

  const handleSelectOption = (option) => {
    console.log("Selected option:", option);
    // Handle the ordering logic here
  };
  const onSubmit = (data) => {
    console.log(data);
    label = `Se muestran las canchas con horarios disponibles de ${data.inicio} - ${data.fin}`;
    setMsg((prev) => !prev);
    filtrarCanchas(data);
  };
  const clear = () => {
    reset({
      inicio: "",
      fin: "",
    });
    setMsg(false);
    clearFilter();
  };
  return (
    <>
      <section
        className={`flex w-fit flex-col ${isModalOpen ? "px-44" : "px-72"}`}
      >
        <div className="  flex gap-5 justify-between">
          <div onClick={() => setOrderModal(true)}>
            <FaCalendarAlt
              size="3rem"
              color="green"
              className="cursor-pointer"
            />

            <span>Order</span>
          </div>
          <OrderModal
            isOpen={orderModal}
            onClose={() => setOrderModal(false)}
            onSelectOption={handleSelectOption}
          />
          <form id="timeForm" className="flex gap-5">
            <div className="mb-4">
              <label
                htmlFor="inicio"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Hora Inicio (hh:mm):
              </label>
              <input
                id="inicio"
                type="text"
                {...register("inicio", {
                  pattern: {
                    value: timePattern,
                    message: "Invalid time format (hh:mm)",
                  },
                  required: "Ingrese Hora",
                })}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.inicio ? "border-red-500" : ""
                }`}
              />
              {errors.inicio && (
                <p className="text-red-500 text-xs italic">
                  {errors.inicio.message}
                </p>
              )}
            </div>
            <span>Clear</span>
            <GrClearOption
              size="2rem"
              color="green"
              onClick={clear}
              className="cursor-pointer"
            />

            <div className="mb-4">
              <label
                htmlFor="fin"
                className="block text-gray-700 text-sm font-bold mb-2"
              >
                Hora Fin (hh:mm):
              </label>
              <input
                id="fin"
                type="text"
                {...register("fin", {
                  pattern: {
                    value: timePattern,
                    message: "Invalid time format (hh:mm)",
                  },
                  required: "Ingrese Hora",
                })}
                className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                  errors.fin ? "border-red-500" : ""
                }`}
              />
              {errors.fin && (
                <p className="text-red-500 text-xs italic">
                  {errors.fin.message}
                </p>
              )}
            </div>
            <div>
              <ImFilter
                onClick={handleSubmit(onSubmit)}
                size="3rem"
                color="green"
                className="cursor-pointer"
              />
              <span>Filter</span>
            </div>
          </form>
        </div>
        {msg && (
          <div className="mx-14 text-2xl font-serif font-semibold ">
            <h1>{label}</h1>
          </div>
        )}
      </section>
    </>
  );
}

export default Filters;
