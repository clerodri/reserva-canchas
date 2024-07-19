import React from "react";
import { NavLink } from "react-router-dom";

//
export function Footer() {
  //
  return (
    <>
      <div className="flex fixed inset-x-0 bottom-0  items-center justify-center">
        <div className="flex mb:text-xl  sm:text-3xl mb:gap-4 mb:p-3   md:gap-10 text-black md:text-4xl rounded-t-3xl bg-gray-500 items-center justify-center  ">
          <NavLink
            to="/pagos"
            className={({ isActive }) =>
              isActive
                ? "border cursor-pointer rounded-xl p-3 bg-gray-300"
                : "border cursor-pointer rounded-xl p-3"
            }
          >
            Pagos
          </NavLink>
          <NavLink
            to="/home"
            className={({ isActive }) =>
              isActive
                ? "border cursor-pointer rounded-xl p-3 bg-gray-300"
                : "border cursor-pointer rounded-xl p-3"
            }
          >
            Home
          </NavLink>
          <NavLink
            to="/reservas"
            className={({ isActive }) =>
              isActive
                ? "border cursor-pointer rounded-xl p-3 bg-gray-300"
                : "border cursor-pointer rounded-xl p-3"
            }
          >
            Reservas
          </NavLink>
        </div>
      </div>
    </>
  );
}

export default Footer;
