import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Home from "./app/Home";
import ConfirmationBoocking from "./app/BookingConfirmation";
import CarListShow from "./app/CarListShow";
import AuthService from "./Services/login/auth.service";
import { useState, useEffect } from "react";
import Register from "./Components/Register";

function App() {
  const [currentUser, setCurrentUser] = useState(undefined);
  
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    
    if (user) {
      setCurrentUser(user);
    }
  }, []);

  useEffect(() => {
    console.log(currentUser);
  },[currentUser])





  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/reserva/coche" element={<CarListShow />} />
        <Route path="/booking" element={<ConfirmationBoocking />} />
        <Route path="/registro" element={<Register/>} />

        
        {currentUser && <Route path="/admin" element={<Home />} />}
      </Routes>
    </>
  );
}

export default App;
