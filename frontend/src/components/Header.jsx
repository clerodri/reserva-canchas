import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { useEffect, useState } from "react";
import axiosInstance from "./axiosInstance";
const BASE_URL = "http://localhost:8000";
export function Header({ isModalOpen }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <header className={`${isModalOpen ? "w-fit p-3" : "w-screen  p-3"} `}>
      <Navbar>
        <Container>
          <Navbar.Brand href="#Home" className="flex gap-5 justify-around">
            <div className="flex flex-col">
              <img
                alt=""
                src="/static/coding_logo.png"
                width="300"
                height="300"
                className="d-inline-block align-top"
              />{" "}
              <h1 className="text-5xl font-mono sm:ms-16 ">
                Reservas de Canchas
              </h1>
            </div>
            <div className="border-4 p-1 border-gray-300 w-fit h-fit">
              <h2 className="text-7xl text-green-600 m-4">
                {time.toLocaleTimeString()}
              </h2>
            </div>
            <LogoutButton />
          </Navbar.Brand>
        </Container>
      </Navbar>
    </header>
  );
}
function LogoutButton() {
  const handleLogout = async () => {
    try {
      await axiosInstance.get("/logout_user");
      // const response = await fetch(`${BASE_URL}/reserva/logout_user`, {
      //   method: "GET",
      //   credentials: "include", // Include cookies for CSRF protection if necessary
      // });

      // if (response.redirected) {
      //   // Assuming the backend redirects to the login page
      //   window.location.href = `${BASE_URL}/reserva/login_user`; // Adjust the route as needed
      // } else {
      //   console.error("Logout failed");
      // }
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };
  return (
    <>
      <div>
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-xl"
        >
          Cerrar Sesion
        </button>
      </div>
    </>
  );
}
