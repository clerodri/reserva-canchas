import { useState } from "react";
import { MdCircle } from "react-icons/md";
import { IoCloseCircleOutline } from "react-icons/io5";
import { data } from "./data";
import "./App.css";
export function App() {
  return (
    <>
      <header className="flex justify-center my-5 bg-slate-200 ">
        <div>
          <h1 className="text-5xl font-mono sm:ms-16 ">
            Reservas de Canchas - CodingBootcamp ESPOL
          </h1>
        </div>
      </header>
      <CanchaDashboard canchas={data} />
    </>
  );
}

function CanchaDashboard({ canchas }) {
  const [showItem, setshowItem] = useState(false);
  const [item, setItem] = useState({});
  const showSiderOver = (item) => {
    setItem(item);
    setshowItem((prev) => !prev);
  };
  const styleOffSlide =
    "grid-cols-1 ms-20 md:grid-cols-2 md:ms-10 lg:grid-cols-3 lg:ms-12 xl:grid-cols-4 xl:ms-0 opacity-1";
  const styleOnSlide =
    "md:ms-16 lg:grid-cols-2 lg:ms-8  xl:grid-cols-3 xl:ms-20 opacity-20 ";
  return (
    <div className="flex  justify-around">
      <div
        className={`grid  auto-rows-[300px] p-3 gap-4  ${
          showItem ? styleOnSlide : styleOffSlide
        } `}
      >
        {canchas.map((item, i) => (
          <div
            onClick={() => {
              if (!showItem) {
                showSiderOver(item);
              }
            }}
            key={i}
            className="bg-gray-100 border-2  rounded-xl   w-fit h-full p-1 mx-2 my-2  "
          >
            <div className="flex justify-end me-2">
              <MdCircle color="green" size="1.5rem" />
            </div>
            <div className="flex flex-col  items-center  ">
              <img
                src="../public/cancha.png"
                alt="cancha dibujo"
                className=""
              />
              <h2 className="font-bold text-2xl mx-20 md:mx-10 sm:w-24 text-gray-600">
                {item.name}
              </h2>
              <p className=" text-1xl mx-2 lg:mx-5 lg:text-xs sm:w-64  lg:w-60">
                {item.description}
              </p>
              <p className="font-bold text-2xl md:-my-1  ">
                ${item.value} / hora
              </p>
            </div>
          </div>
        ))}
      </div>
      {showItem && (
        <div className="bg-gray-300 items-baseline">
          <div className=" flex  justify-end  p-2 cursor-pointer ">
            <IoCloseCircleOutline
              size="2rem "
              onClick={() => showSiderOver()}
            />
          </div>
          <CanchaSelected item={item} />
        </div>
      )}
    </div>
  );
}

function CanchaSelected({ item }) {
  console.log(item);
  return (
    <>
      <div className="w-96 flex flex-col gap-5 justify-center items-center h-fit ">
        <h2 className="text-2xl mt-4 text-center">Reservar</h2>
        <img src="../public/cancha.png" alt="cancha dibujo" className="" />
        <h2 className="font-bold text-2xl mx-20 md:mx-10 text-gray-600">
          {item.name}
        </h2>
        <p className=" text-1xl mx-2 lg:mx-5 lg:text-xs">{item.description}</p>
        <p className="font-bold text-2xl md:-my-1 ">${item.value} / hora</p>
      </div>
      <div className="bg-green-50 mt-52 ms-40 h-10 w-fit p-2 rounded-2xl cursor-pointer font-semibold ">
        <button>Reservar</button>
      </div>
    </>
  );
}
