import { createContext, useEffect, useState } from "react";
import axiosInstance from "../components/axiosInstance";
export const UserContext = createContext(null);

export function UserProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const fetchDataUser = async () => {
      try {
        await fetch("http://127.0.0.1:8000/reserva/current_user")
          .then((res) => res.json())
          .then((data) => setCurrentUser(data));
      } catch (error) {
        console.error(error);
      }
    };
    fetchDataUser();
  }, []);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
