import React from "react";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";

export function Header() {
  return (
    <header className=" w-screen  p-3">
      <Navbar>
        <Container>
          <Navbar.Brand href="#Home">
            <img
              alt=""
              src="../public/coding_logo.png"
              width="300"
              height="300"
              className="d-inline-block align-top"
            />{" "}
            <h1 className="text-5xl font-mono sm:ms-16 ">
              Reservas de Canchas
            </h1>{" "}
          </Navbar.Brand>
        </Container>
      </Navbar>
    </header>
  );
}
