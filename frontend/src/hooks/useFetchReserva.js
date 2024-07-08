import { useEffect, useState } from "react";

const BASE_URL = "http://localhost:8000/reservas/";
export function useFetchReserva({ id }) {
  const [reserva, setReserva] = useState(null);
  const [errors, setErrors] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    fetch(`${BASE_URL}${id}`)
      .then((res) => res.json())
      .then((data) => setReserva(data))
      .catch((error) => setErrors("Error fetching data reserva"))
      .finally(() => setLoading(false));
  }, []);

  return { reserva, errors, loading };
}
