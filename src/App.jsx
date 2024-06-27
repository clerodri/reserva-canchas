import "./App.css";
import { Header } from "./components/Header";
import { Canchas } from "./components/Canchas";
import { Filters } from "./components/Filters.jsx";
export function App() {
  return (
    <>
      <Header />
      <Filters />
      <Canchas />
    </>
  );
}
