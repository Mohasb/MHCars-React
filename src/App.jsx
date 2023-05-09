import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Home from "./app/Home";
import ConfirmationBoocking from "./app/BookingConfirmation";
import CarListShow from "./app/CarListShow";
import AuthService from "./Services/login/auth.service";
import { useState, useEffect } from "react";

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
    }
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/reserva/coche" element={<CarListShow />} />
        <Route path="/booking" element={<ConfirmationBoocking />} />

        <Route path="/login" element={<Home />} />
        <Route path="/oficinas" element={<Home />} />
        <Route path="/coches" element={<Home />} />
        <Route path="/servicios" element={<Home />} />
        <Route path="/acceso" element={<Home />} />
        {currentUser && <Route path="/admin" element={<Home />} />}
      </Routes>
    </>
  );
}

export default App;
