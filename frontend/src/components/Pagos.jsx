import React, { useEffect, useState } from "react";
import { CgDollar } from "react-icons/cg";
import { format } from "date-fns";
const BASE_URL = "http://localhost:8000/pagos";
function Pagos() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPagos = async () => {
    try {
      const res = await fetch(BASE_URL);
      const pagosData = await res.json();

      const fetchReservaDetails = pagosData.map(async (pago) => {
        console.log(pago);
        const reservaRes = await fetch(
          `http://localhost:8000/reservas/${pago.reserva}`
        );
        const reservaData = await reservaRes.json();
        console.log(reservaData);
        return {
          hora_inicio: reservaData.horario.hora_inicio,
          hora_fin: reservaData.horario.hora_fin,
          cancha: reservaData.horario.cancha.nombre,
          fecha_creacion: pago.fecha_creacion,
          total: pago.total,
        };
      });

      const finalData = await Promise.all(fetchReservaDetails);
      setData(finalData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data: ", error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPagos();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  console.log(data);

  return (
    <>
      <ul>
        {data?.map((item, idx) => (
          <PagoItem key={idx} data={item} />
        ))}
      </ul>
    </>
  );
}
function PagoItem({ data }) {
  const { hora_inicio, hora_fin, fecha_creacion, total, cancha } = data;

  const formatDate = (dateString) => {
    return format(new Date(dateString), "yyyy-MM-dd HH:mm:ss");
  };
  return (
    <div className="px-72">
      <div className="bg-white p-4 my-2 rounded-lg shadow-lg flex items-center justify-between gap-5">
        <div className="flex items-center">
          <CgDollar size="3rem" color="green" />
          <span className="ml-2 text-2xl font-bold mr-2">{total}</span>
        </div>
        <div className="flex flex-col ml-4">
          <h1 className="text-3xl font-bold">{cancha}</h1>
          <div className="text-3xl text-gray-500">
            {`${formatTime(hora_inicio)} - ${formatTime(hora_fin)}`}
          </div>
        </div>
        <div className="text-gray-500 text-lg  font-semibold ml-auto">
          {formatDate(fecha_creacion)}
        </div>
      </div>
    </div>
  );
}
function formatTime(dateString) {
  const date = new Date(dateString);
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
}
export default Pagos;
