import { useState, useEffect, useRef } from "react";
import { MdCircle } from "react-icons/md";
import { IoCloseCircleOutline } from "react-icons/io5";
import { data } from "./data";
import "./App.css";

const styleOffSlide =
  "grid-cols-1 ms-20 md:grid-cols-2 md:ms-10 lg:grid-cols-3 lg:ms-12 xl:grid-cols-4 xl:ms-0 opacity-1";
const styleOnSlide =
  "md:ms-16 lg:grid-cols-2 lg:ms-8  xl:grid-cols-3 xl:ms-20 opacity-20 ";
const filterStyle =
  "flex  justify-evenly w-full md:flex-row sm:flex-col sm:gap-5 sm:items-center";
const filterBtn =
  "btn-wrapper  bg-gray-300 p-2  h-fit w-fit rounded-xl cursor-pointer border-gray-500 border-2";
const reservaStyle =
  "reserva-wrapper text-2xl w-96 flex flex-col gap-2 justify-center items-center h-fit pb-4";

export function App() {
  return (
    <>
      <header className="flex flex-col items-center  justify-center my-5 bg-slate-200 ">
        <h1 className="text-5xl font-mono sm:ms-16 ">
          Reservas de Canchas - CodingBootcamp ESPOL
        </h1>
      </header>
      <main className="flex flex-col ">
        <CanchaDashboard />
      </main>
    </>
  );
}

function CanchaDashboard() {
  const [showItem, setshowItem] = useState(false);
  const itemRef = useRef(null);
  const [item, setItem] = useState({});

  useEffect(() => {
    if (showItem && itemRef.current) {
      itemRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [showItem]);

  const showSiderOver = (item) => {
    setItem(item);
    setshowItem((prev) => !prev);
  };

  return (
    <>
      <FilterCanchas />
      <div className=" container flex  justify-around ">
        <div
          className={` flex-grow  overflow-y-scroll grid  auto-rows-[300px] p-3 gap-4 h-4/6  ${
            showItem ? styleOnSlide : styleOffSlide
          } `}
        >
          {data.map((item, i) => (
            <CanchaItem
              key={i}
              item={item}
              showSiderOver={showSiderOver}
              showItem={showItem}
            />
          ))}
        </div>
        {showItem && (
          <div ref={itemRef}>
            <CanchaSelected item={item} closeSideOver={showSiderOver} />
          </div>
        )}
      </div>
    </>
  );
}
function CanchaItem({ index, item, showSiderOver, showItem }) {
  const isDisponible = (item) => {
    return item.horarios.some((horario) => horario.disponible === "true");
  };
  return (
    <>
      <div
        onClick={() => {
          showSiderOver(item);
        }}
        className="bg-gray-100 border-2 rounded-xl w-fit h-full p-1 mx-2 my-2  "
      >
        <div className="flex justify-end me-2">
          <MdCircle
            color={`${isDisponible(item) === true ? "green" : "red"}`}
            size="1.5rem"
          />
        </div>
        <div className="flex flex-col  items-center  ">
          <img src="../public/cancha.png" alt="cancha dibujo" className="" />
          <h2 className="font-bold text-2xl mx-20 md:mx-10 sm:w-24 text-gray-600">
            {item.name}
          </h2>
          <p className="font-bold text-2xl md:-my-2 sm:-my-2 lg:-my-1">
            ${item.value} / hora
          </p>
        </div>
      </div>
    </>
  );
}

function CanchaSelected({ item, closeSideOver }) {
  const isDisponible = (item) => {
    return item.horarios.some((horario) => horario.disponible === "true");
  };
  return (
    <>
      <section className="bg-gray-300 items-baseline ">
        <div className=" flex  justify-end  p-2 cursor-pointer ">
          <IoCloseCircleOutline
            size="2rem "
            onClick={() => closeSideOver(item)}
          />
        </div>
        <div className={reservaStyle}>
          <h2 className="font-bold text-2xl mt-4 text-center">{item.name}</h2>
          <img src="../public/cancha.png" alt="cancha dibujo" />
          <p className="p-wrapper">{item.description}</p>
          <p className="font-bold text-2xl md:-my-1 ">${item.value} / hora</p>
          <Horarios horarios={item.horarios} />
          <div className="bg-green-50 p-2 rounded-2xl cursor-pointer font-semibold  ">
            <button className={`  ${isDisponible(item) ? "" : "hidden"}`}>
              Reservar
            </button>
          </div>
        </div>
      </section>
    </>
  );
}

function Horarios({ horarios }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const handleItemClick = (index) => {
    setSelectedItem((prev) => index);
  };
  return (
    <>
      <h2>Seleccion de Horarios</h2>
      <div className="w-72 h-56 overflow-y-auto border border-gray-300 p-3 bg-gray-50 rounded-lg">
        {horarios.map((horario, index) => (
          <div
            key={index}
            className={`p-3 my-2 border border-gray-400 rounded-md transition-colors ${
              horario.disponible === "false"
                ? "bg-red-500 cursor-not-allowed"
                : "cursor-pointer"
            } ${
              selectedItem === index
                ? "border-green-600 bg-green-50"
                : "border-transparent"
            }`}
            onClick={() => handleItemClick(index)}
          >
            {`${horario.h_inicio} - ${horario.h_fin}`}
          </div>
        ))}
      </div>
    </>
  );
}

function FilterCanchas() {
  return (
    <>
      <div className={filterStyle}>
        <div className={filterBtn}>
          <button>Filtrar</button>
        </div>
        <div className="filtro-wrapper ">
          <label htmlFor="f_inicio">Fecha Inicio</label>
          <input type="text" id="f_inicio" placeholder="Inicio" />
        </div>
        <div className="filtro-wrapper ">
          <label htmlFor="f_fin">Fecha Fin</label>
          <input type="text" id="f_fin" placeholder="Fin" />
        </div>
      </div>
    </>
  );
}
