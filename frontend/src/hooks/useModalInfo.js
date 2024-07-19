import { useEffect, useState } from "react";
import axiosInstance from "../api/axiosInstance";

//CUSTOM HOOK FOR MODAL INFO COMPONENT
export const useModalInfo = ({ userId }) => {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const getUserData = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get("api/user/" + userId.persona);
      setUserInfo(res.data);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log("UseEffect useModalInfo.js");
    getUserData();
  }, [userId]);

  return { userInfo, getUserData, loading, error };
};
