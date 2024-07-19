import formatTime from "../utils/utils";

//
export const reducer = (state, action) => {
  const { type: actionType, payload: actionPayload } = action;
  switch (actionType) {
    //
    case "SELECT_CANCHA":
      const horariosByCancha = state.horarios.filter(
        (h) => h.cancha.id === actionPayload.id
      );
      return {
        ...state,
        showModal: !state.showModal,
        canchaSelected: {
          ...actionPayload,
          horarios: horariosByCancha,
        },
      };
    //
    case "CLOSE_MODAL":
      return {
        ...state,
        showModal: false,
      };
    //
    case "LOAD_DATA":
      return {
        ...state,
        canchas: actionPayload,
      };
    //
    case "LOAD_HORARIOS":
      actionPayload.map((h) => {
        h.hora_inicio = formatTime(h.hora_inicio);
        h.hora_fin = formatTime(h.hora_fin);
      });
      return {
        ...state,
        horarios: actionPayload,
      };
    //
    case "ORDER_CANCHAS":
      const copyCanchas = structuredClone(state.canchas);
      copyCanchas.map((c) => {
        if (!c.disponibilidad) {
          const idx = copyCanchas.findIndex((i) => i.id === c.id);
          console.log(idx);
          const [cancha] = copyCanchas.splice(idx, 1);
          copyCanchas.push(cancha);
        }
      });
      return {
        ...state,
        canchas: copyCanchas,
      };
  }

  return state;
};
