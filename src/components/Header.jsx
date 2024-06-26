import React from "react";
import { Filters } from "./Filters";
export function Header() {
  return (
    <header>
      <h1 className="text-5xl font-mono sm:ms-16 ">
        Reservas de Canchas - CodingBootcamp ESPOL
      </h1>
      <Filters />
    </header>
  );
}
