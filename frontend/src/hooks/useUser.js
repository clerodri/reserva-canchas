import { useContext } from "react";
import { UserContext } from "../context/currentUser";

export const useUser = () => {
  const contexto = useContext(UserContext);
  if (contexto === undefined) {
    throw new Error("useUser must be used within a provider!");
  }

  return contexto;
};
