import React, { useEffect, useRef, useState } from "react";
import "../css/Filters.css";
import { FaCalendarAlt } from "react-icons/fa";
import { GrClearOption } from "react-icons/gr";
import { ImFilter } from "react-icons/im";
import { useCancha } from "../hooks/useCancha";
import { useForm } from "react-hook-form";

const timePattern = /^([01]\d|2[0-3]):([0-5]\d)$/;
export function Filters() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [time, setTime] = useState(new Date());
  const { filtrarCanchas, ordenarCanchas } = useCancha();

  console.log("rendering");
  useEffect(() => {
    console.log("rendering");
    const interval = setInterval(() => setTime(new Date()), 2000);

    return () => clearInterval(interval);
  }, []);

  const onSubmit = (data) => {
    console.log("form");
    console.log(data);
    filtrarCanchas(data.inicio, data.fin);
  };
  const clear = () => {
    console.log("clear");
    reset({
      inicio: "",
      fin: "",
    });
    filtrarCanchas("", "");
  };
  return (
    <>
      <section className="filters m-4 ">
        <div className="border-4 p-1 border-gray-300">
          <h2 className="text-7xl text-green-600 m-4">
            {time.toLocaleTimeString()}
          </h2>
        </div>
        <div onClick={ordenarCanchas}>
          <FaCalendarAlt size="3rem" color="green" className="cursor-pointer" />
          <span>Order</span>
        </div>

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
      </section>
    </>
  );
}

export default Filters;
