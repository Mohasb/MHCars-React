import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import ConfirmationBoocking from "./Pages/Confirmation/Confirmation";
import CarList from "./Components/CarList/CarList";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/reserva/coche" element={<CarList />} />
        <Route path="/booking" element={<ConfirmationBoocking />} />




        <Route path="/login" element={<Home />} />
        <Route path="/oficinas" element={<Home />} />
        <Route path="/coches" element={<Home />} />
        <Route path="/servicios" element={<Home />} />
        <Route path="/acceso" element={<Home />} />
        <Route path="/admin" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;
