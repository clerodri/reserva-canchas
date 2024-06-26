import { data as initialCanchas } from "../data";

function filtrarCanchas(canchas, inicio, fin) {
  if (inicio != "" && fin != "") {
    return canchas.filter((cancha) => {
      return cancha.horarios.some(
        (horario) => horario.h_inicio >= inicio && horario.h_fin <= fin
      );
    });
  }
  return initialCanchas;
}

function ordernarCanchas(canchas) {
  const dis = canchas.filter((cancha) => cancha.disponible === "true");
  const no = canchas.filter((cancha) => cancha.disponible === "false");
  return dis.concat(no);
}

// Using canchaReducer to manage FILTERS AND ORDERS
export const canchaReducer = (state, action) => {
  if (action.type === "ORDER") {
    console.log(state);
    return {
      ...state,
      canchas: ordernarCanchas(state.canchas),
    };
  }
  if (action.type === "FILTER") {
    return {
      ...state,
      canchas: filtrarCanchas(state.canchas, action.inicio, action.fin),
    };
  }
};
