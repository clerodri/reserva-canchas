import React, { useId, useState } from "react";
import "../../css/Filters.css";

import { GrClearOption } from "react-icons/gr";
import { ImFilter } from "react-icons/im";
import { useForm } from "react-hook-form";
import { OrderModal } from "./OrderModal";
import { useFilters } from "../../hooks/useFilters";

const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;

export function Filters() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const { filters, setFilters } = useFilters();
  const [msg, setMsg] = useState(false);

  //
  const inicioId = useId();
  const finId = useId();

  //
  const onSubmit = (data) => {
    setMsg(true);
    setFilters({
      hora_inicio: data.inicio,
      hora_fin: data.fin,
    });
  };

  //
  const clear = () => {
    reset({
      inicio: "",
      fin: "",
    });
    setFilters({
      hora_inicio: "00:00",
      hora_fin: "23:59",
    });
    setMsg(false);
  };

  //
  return (
    <>
      <section className={`flex flex-col w-screen items-center `}>
        <div className="flex  sm:flex-col sm:gap-5 md:flex-row ">
          <div className="sm:flex sm:items-center sm:justify-around md:gap-5">
            <OrderModal />
            <div className="sm:flex sm:gap-2">
              <span>Clear</span>
              <GrClearOption
                size="2rem "
                color="green"
                onClick={clear}
                className="cursor-pointer"
              />
            </div>
          </div>
          <div>
            <form id="timeForm" className=" flex sm:px-5 sm:gap-3">
              <div className="mb-4">
                <label
                  htmlFor={inicioId}
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Hora Inicio (hh:mm):
                </label>
                <input
                  id={inicioId}
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

              <div className="mb-4">
                <label
                  htmlFor={finId}
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Hora Fin (hh:mm):
                </label>
                <input
                  id={finId}
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
        </div>
        {msg && (
          <div className="mx-14 text-2xl font-serif font-semibold ">
            <h1>
              Se muestran las canchas con horarios de {filters.hora_inicio} -{" "}
              {filters.hora_fin}
            </h1>
          </div>
        )}
      </section>
    </>
  );
}

export default Filters;
