import { format } from "date-fns";
import DateObject from "react-date-object";
export const formatTime = (dateString) => {
  const date = new Date(dateString);
  const hours = String(date.getUTCHours()).padStart(2, "0");
  const minutes = String(date.getUTCMinutes()).padStart(2, "0");
  return `${hours}:${minutes}`;
};
export const calculateHours = (timeRange) => {
  const [start, end] = timeRange.split(" - ");

  const [startHours, startMinutes] = start.split(":").map(Number);
  const [endHours, endMinutes] = end.split(":").map(Number);

  const startDate = new Date(0, 0, 0, startHours, startMinutes);
  const endDate = new Date(0, 0, 0, endHours, endMinutes);

  let difference = (endDate - startDate) / (1000 * 60 * 60); // Convert milliseconds to hours

  // Handle cases where end time is on the next day
  if (difference < 0) {
    difference += 24;
  }

  return difference;
};

export const time = (st, ft) => {
  return `${formatTime(st)} - ${formatTime(ft)}`;
};
export const calcularTotal = (st, ft, costo) => {
  const tiempoReserva = `${formatTime(st)} - ${formatTime(ft)}`;
  const horas = calculateHours(tiempoReserva);
  return horas * costo;
};
export const formatDate = (dateString) => {
  return format(new Date(dateString), "yyyy-MM-dd HH:mm:ss");
};

export const convertToDate = (time) => {
  const [hours, minutes] = time.split(":").map(Number);
  let obj_date = new DateObject({
    format: "HH:mm",
  });
  obj_date.setHour(hours);
  obj_date.setMinute(minutes);
  return obj_date;
};

export default formatTime;
