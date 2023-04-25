import "./App.scss";
import { Routes, Route } from "react-router-dom";
import { Home } from "./Components/Home/Home";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home text={"Home"} />} />
        <Route path="/oficinas" element={<Home text={"Oficinas"} />} />
        <Route path="/flota" element={<Home text={"Flota"} />} />
        <Route path="/servicios" element={<Home text={"Servicios"} />} />
        <Route path="/acceso" element={<Home text={"Acceso"} />} />
        <Route path="/admin" element={<Home text={"Admin"} />} />
      </Routes>
    </>
  );
}

export default App;
