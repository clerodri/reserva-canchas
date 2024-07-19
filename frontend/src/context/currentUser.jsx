import { createContext, useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";
export const UserContext = createContext(null);

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState();

  const getCurrentUser = async () => {
    try {
      const res = await axiosInstance.get("usuarios/current_user");
      setCurrentUser(res.data);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getCurrentUser();
  }, []);

  return { currentUser };
};

export function UserProvider({ children }) {
  const { currentUser } = useCurrentUser();

  return (
    <UserContext.Provider
      value={{
        currentUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
