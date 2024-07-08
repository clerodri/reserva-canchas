import React, { useState } from "react";
import { NavLink } from "react-router-dom";
function Footer() {
  return (
    <>
      <div className="flex fixed inset-x-0 bottom-0  items-center justify-center">
        <div className="flex h-1/5 w-2/5  rounded-t-3xl bg-gray-500 items-center justify-center gap-20 text-black text-4xl p-2 mt-5">
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
