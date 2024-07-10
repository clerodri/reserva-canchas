import React, { useEffect, useState } from "react";
import { AiFillDollarCircle } from "react-icons/ai";
import axiosInstance from "./axiosInstance";

function Reservas() {
  const [data, setData] = useState([]);
  const fetchReservas = async () => {
    await fetch(`${import.meta.env.VITE_BASE_URL_RESERVAS}info-reservas`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((error) => console.log("Error fetching data: ", error));
  };
  useEffect(() => {
    fetchReservas();
  }, []);

  const handlePayClick = async (item) => {
    if (item.id === null) return;
    //LOGIC TO GET DE ID OF THE RESERVA
    console.log(item);
    const payment = {
      reserva: item.id,
      total: item.data.Total,
    };

    try {
      await makePayRequest(payment);
      fetchReservas();
    } catch (error) {
      console.log("Error making payment: ", error);
    }
  };

  const makePayRequest = async (payment) => {
    try {
      const res = await axiosInstance.post("/pagos", JSON.stringify(payment));
      console.log(res);
      console.log("Payment done!");
    } catch (error) {
      console.log("error making the post request", error);
    }
  };
  return (
    <>
      <div className="">
        <ul className="mb:max-h-80 sm:max-h-80 overflow-y-auto md:max-h-96">
          {data?.map((item, idx) => (
            <ReservaItem
              key={idx}
              data={item.data}
              onClick={() => handlePayClick(item)}
            />
          ))}
        </ul>
      </div>
    </>
  );
}

function ReservaItem({ data, onClick }) {
  return (
    <div className=" mb:max-h-fit sm:px-10  md:px-20 lg:px-40  2xl:px-80">
      <div className="flex   mb:justify-between sm:items-center lg:justify-center lg:gap-x-52 2xl:gap-x-64 border p-4 rounded-md mb-2  bg-white shadow-xl">
        <div className="flex flex-col text-3xl mb:gap-5">
          <span className="font-semibold mb:text-xl">Cancha {data.cancha}</span>
          <span className="text-gray-500 mb:text-sm md:text-2xl 2xl:text-3xl">
            Horario: {data.horario}
          </span>
        </div>
        <div className="flex mb:flex-col mb:justify-center mb:items-center md:flex-row ">
          <div className="flex  items-center text-3xl ">
            <h2 className="font-semibold mr-2   mb:text-xl">TOTAL: </h2>
            <div className="flex justify-center items-center">
              <h2 className=" font-bold  mr-2 mb:text-xl">{data.Total}</h2>
              <AiFillDollarCircle color="green" size="3rem" />
            </div>
          </div>
          <div>
            <button
              className={`px-4 py-2 rounded-md ${
                data.isPagado
                  ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                  : "bg-gray-500 text-white cursor-pointer"
              }`}
              onClick={onClick}
              disabled={data.isPagado}
            >
              {data.isPagado ? "Pagado..." : "Pagar"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Reservas;
