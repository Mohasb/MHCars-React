import "./App.scss";
import { Routes, Route } from "react-router-dom";
import Home from "./app/home/Home";
import ConfirmationBoocking from "./app/BookingConfirmation";
import CarListShow from "./app/CarListShow";
import AuthService from "./Services/login/auth.service";
import Register from "./Components/Register";
import NotFound from "./app/notFound/NotFound";
import ContextUser  from "./Services/contextUser/ContextUser";
import { useState, useEffect } from "react";
import NavBar from "./Components/NavBar/NavBar"

function App() {

  const [user, setUser] = useState()
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setUser(user);
    }
    console.log(user);
  }, []); 



  return (
    <>
      <ContextUser.Provider value={[user, setUser]}>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/reserva/coche" element={<CarListShow />} />
          <Route path="/booking" element={<ConfirmationBoocking />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/admin" element={<Home />} />
          <Route path="/login" element={<NavBar />}/>
        </Routes>
      </ContextUser.Provider>
    </>
  );
}

export default App;
