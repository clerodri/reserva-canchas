function compareTime(horario, inicio, fin) {
  const [startHour, startMinute] = inicio.split(":").map(Number);
  const [endHour, endMinute] = fin.split(":").map(Number);
  const horaInicio = new Date(horario.hora_inicio);
  const horaFin = new Date(horario.hora_fin);
  const inicioHour = horaInicio.getUTCHours();
  const inicioMinute = horaInicio.getUTCMinutes();
  const finHour = horaFin.getUTCHours();
  const finMinute = horaFin.getUTCMinutes();
  const isWithinStart =
    inicioHour > startHour ||
    (inicioHour === startHour && inicioMinute >= startMinute);
  const isWithinEnd =
    finHour < endHour || (finHour === endHour && finMinute <= endMinute);
  return isWithinStart && isWithinEnd;
}

function getFilteredHorarios(horarios, inicio, fin) {
  return horarios.filter((horario) => compareTime(horario, inicio, fin));
}

function filtrar(canchas, inicio, fin) {
  return canchas.map((cancha) => {
    const newHorarios = getFilteredHorarios(cancha.horarios, inicio, fin);
    return {
      ...cancha,
      horarios: newHorarios,
    };
  });
}

function ordernarCanchas(canchas) {
  const dis = canchas.filter((cancha) => cancha.disponible === "true");
  const no = canchas.filter((cancha) => cancha.disponible === "false");
  return dis.concat(no);
}

// Using canchaReducer to manage FILTERS AND ORDERS
export const canchaReducer = (state, action) => {
  switch (action.type) {
    case "FETCH-SUCCESS":
      return {
        ...state,
        loading: false,
        canchas: action.payload,
        filteredCanchas: action.payload,
        error: "",
      };
    case "FETCH-ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case "FETCH-RESERVAS-SUCCESS":
      return {
        ...state,
        reservas: action.payload,
      };
    case "FETCH-RESERVAS-ERROR":
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case "FILTER":
      const { inicio, fin } = action.payload;
      const filteredCanchas = filtrar(state.canchas, inicio, fin);
      console.log(filteredCanchas);
      return {
        ...state,
        filteredCanchas: filteredCanchas,
      };

    case "SELECTED":
      //console.log(action.payload.id);
      return {
        ...state,
        selected: state.filteredCanchas.find(
          (item) => item.id === action.payload.id
        ),
      };

    case "CLEAR-FILTER":
      return {
        ...state,
        filteredCanchas: state.canchas,
      };
    case "ORDER":
      return {
        ...state,
        //   filteredCanchas: ordernarCanchas(state.canchas)
      };
    default:
      return state;
  }
};
