import { useContext } from "react";
import { convertToDate } from "../utils/utils";
import { FilterContext } from "../context/filters";

//
export const useFilters = () => {
  const { filters, setFilters } = useContext(FilterContext);
  console.log("filters HOOK:", filters);

  const filterHorarios = (horarios) => {
    return horarios.filter(
      (h) =>
        convertToDate(h.hora_inicio) >= convertToDate(filters.hora_inicio) &&
        convertToDate(h.hora_fin) <= convertToDate(filters.hora_fin)
    );
  };

  return {
    filters,
    setFilters,
    filterHorarios,
  };
};
